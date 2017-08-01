Easing = require './easing'

class Animation
	@startTime  : 0
	@endTime    : 0
	@time       : 0
	@properties : []
	@groups     : []
	@started    : false
	@ended      : false

	constructor : (@name, @target, @timeline) ->

	to          : ->
		args = []
		i = 0
		while i < arguments.length
			args.push arguments[i]
			i++

		delay = undefined
		properties = undefined
		duration = undefined
		easing = undefined

		delay      = if typeof args[0] == 'number'   then args.shift() else 0
		properties = if typeof args[0] == 'object'   then args.shift() else {}
		duration   = if typeof args[0] == 'number'   then args.shift() else 1
		easing     = if typeof args[0] == 'function' then args.shift() else Easing.Linear.EaseNone

		group = []

		nop = ->

		for propertyName of properties
			animInfo =
				hasStarted   : false
				timeline     : @timeline
				targetName   : @name
				target       : @target
				propertyName : propertyName
				endValue     : properties[propertyName]
				delay        : delay
				startTime    : @timeline.time + delay + @endTime
				endTime      : @timeline.time + delay + @endTime + duration
				easing       : easing
				parent       : this
				onStart      : nop
				onEnd        : nop

			@timeline.anims.push animInfo
			group.push animInfo

		@groups.push group
		@endTime += delay + duration
		this


	onStart : (callback) ->
		currentGroup = @groups[@groups.length - 1]
		return if !currentGroup
		called = false

		currentGroup.forEach (animation) ->
			animation.onStart = ->
				if !called
					called = true
					callback()
				return
			return
		this

	onUpdate : (callback) ->
		@onUpdateCallback = =>
			callback()
			return
		this

	onEnd : (callback) ->
		currentGroup = @groups[@groups.length - 1]
		return if !currentGroup
		called = false

		currentGroup.forEach (animation) ->
			animation.onEnd = ->
				if !called
					called = true
					callback()
				return
			return
		this

module.exports = Animation
