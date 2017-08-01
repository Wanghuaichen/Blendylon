TimelineGui = require './timeline.gui'
Animation = require './Animation'
Easing = require './easing'

class Timeline
	name       : 'Global'
	animations : []
	totalTime  : 0
	loopCount  : 0
	loopMode   : 0
	interval   : 0
	reversed   : false
	playing    : false
	fps        : 60

	constructor : (container) ->
		@time = 0
		@gui = new TimelineGui container, this
		@interval = setInterval =>
			@update()
			@gui.time = @time
			@gui.update()
		, 1000 / @fps

	play : (reversed = false) ->
		@playing = true
		@reversed = reversed

	pause : ->
		@playing = false

	stop : ->
		@playing = false
		@time = 0

	goToStart : ->
		@time = 0

	goToEnd : ->
		@time = @findAnimationEnd()

	findAnimationEnd : ->
		endTime = 60
		i = 0
		while i < @animations.length
			if @animations[i].endTime > endTime
				endTime = @animations[i].endTime
			i++
		endTime

	applyValues : ->
		i = 0
		while i < @animations.length
			properties = @animations[i]

			if @time < properties.startTime or properties.hasEnded
				i++
				continue

			if @time >= properties.startTime and !properties.hasStarted
				startValue = properties.target[properties.propertyName]

				if startValue.length and startValue.indexOf('px') > -1
					properties.startValue = Number(startValue.replace('px', ''))
					properties.unit = 'px'
				else
					properties.startValue = Number(startValue)

				properties.hasStarted = true
				properties.onStart() if properties.onStart

			duration = properties.endTime - (properties.startTime)
			t = if duration then (@time - (properties.startTime)) / duration else 1
			t = Math.max(0, Math.min(t, 1))
			t = properties.easing(t)
			value = properties.startValue + (properties.endValue - (properties.startValue)) * t
			value += properties.unit if properties.unit
			properties.target[properties.propertyName] = value

			if properties.parent and properties.parent.onUpdateCallback
				properties.parent.onUpdateCallback properties

			if @time >= properties.endTime and !properties.hasEnded
				properties.hasEnded = true
				properties.onEnd() if properties.onEnd

			if t == 1
				if @loopMode == 0
					@animations.splice i, 1
					i--
			i++
		return

	update : (deltaTime) ->
		if typeof deltaTime != 'undefined'
			if @loopInterval != 0
				clearInterval @loopInterval
				@loopInterval = 0
		else
			deltaTime = 1 / @fps

		if @playing
			@totalTime += deltaTime if !@reversed
			@time += deltaTime if !@reversed
			@totalTime -= deltaTime if @reversed
			@time -= deltaTime if @reversed

		if @loopMode != 0
			animationEnd = @findAnimationEnd()
			if @time > animationEnd
				if @loopMode == -1 or @loopCount < @loopMode
					@time = 0
					@loopCount++
					i = 0
					while i < @anims.length
						@animations[i].hasStarted = false
						@animations[i].hasEnded = false
						i++
				else
					@playing = false
					@time = 0

			if @time < 0
				@time = animationEnd

		@applyValues()

module.exports = Timeline
