Graph = require './graph'
Cursor = require './cursor'
Track = require './track'

class TimelineGui
	trackLabelWidth           : 147
	trackLabelHeight          : 12
	tracksScrollWidth         : 12
	tracksScrollHeight        : 0
	tracksScrollThumbPos      : 0
	tracksScrollThumbHeight   : 0
	tracksScrollY             : 0
	timeScrollWidth           : 0
	timeScrollHeight          : 12
	timeScrollThumbPos        : 0
	timeScrollThumbWidth      : 0
	timeScrollX               : 0
	headerHeight              : 40
	canvasHeight              : 160
	draggingTime              : false
	draggingTracksScrollThumb : false
	draggingTimeScrollThumb   : false
	draggingKeys              : false
	draggingTimeScale         : false
	selectedKeys              : []
	timeScale                 : 1
	trackNameCounter          : 0

	constructor : (container, @timeline) ->
		$ =>
			@canvas = window.document.getElementById container
			@$timeline = $('#'+container)
			@canvasHeight = @$timeline.height()
			@canvas.width = @$timeline.width()
			@canvas.height = @canvasHeight
			@ctx = @canvas.getContext '2d'
			@graph = new Graph @ctx
			@cursor = new Cursor @ctx
			@initTracks()
			@init()

	init : ->
		@canvas.addEventListener 'mousewheel', (event) =>
			@onCanvasMousewheel event
		@canvas.addEventListener 'mousedown', (event) =>
			@onMouseDown event
		window.document.body.addEventListener 'mousemove', (event) =>
			@onDocumentMouseMove event
		@canvas.addEventListener 'mousemove', (event) =>
			@onCanvasMouseMove event
		window.document.body.addEventListener 'mouseup', =>
			@onMouseUp()
		@canvas.addEventListener 'dblclick', (event) =>
			@onMouseDoubleClick event

		window.resizeEvents.on 'drag_resize', (type) =>
			@canvasHeight = @$timeline.height()
			@canvas.width = @$timeline.width()
			@canvas.height = @canvasHeight
			@update()

	onMouseUp : ->
		@draggingTime = false if @draggingTime
		@draggingKeys = false if @draggingKeys
		@draggingTracksScrollThumb = false if @draggingTracksScrollThumb
		@draggingTimeScale = false if @draggingTimeScale
		@draggingTimeScrollThumb = false if @draggingTimeScrollThumb

	onMouseDown : (event) ->
		x = event.layerX
		y = event.layerY

		console.log y, @canvasHeight - @timeScrollHeight

		if y < @headerHeight
			@draggingTime = true
			@setTime x
			@onCanvasMouseMove event

		else if x > @canvas.width - @tracksScrollWidth && y > @headerHeight
			if y >= @headerHeight + @tracksScrollThumbPos && y <= @headerHeight + @tracksScrollThumbPos + @tracksScrollThumbHeight
				@tracksScrollThumbDragOffset = y - @headerHeight - @tracksScrollThumbPos
				@draggingTracksScrollThumb = true

		else if y > @headerHeight && y < @canvasHeight - @timeScrollHeight
			this.selectKeys event.layerX, event.layerY
			@draggingKeys = true if @selectedKeys.length > 0
			@cancelKeyClick = false

		else if y > @canvasHeight - @timeScrollHeight
			console.log 'ok'
			if x >= @timeScrollThumbPos && x <= @timeScrollThumbPos + @timeScrollThumbWidth
				@timeScrollThumbDragOffset = x - @timeScrollThumbPos
				@draggingTimeScrollThumb = true

	onCanvasMousewheel : (event) ->
		increment = 0.010000
		value = if event.wheelDelta < 0 then @timeScale + increment else @timeScale - increment
		@timeScale = Math.max(0.01, Math.min(value, 1))

	onDocumentMouseMove : (event) ->
		x = event.layerX
		y = event.layerY

		if @draggingTime
			@setTime x

		if @draggingKeys
			for i in [0 .. @selectedKeys.length]
				draggedKey = @selectedKeys[i];
				draggedKey.time = Math.max 0, @xToTime(x)
		#				@sortTrackKeys draggedKey.track
		#				@rebuildSelectedTracks()

		@cancelKeyClick = true;
		@timeScrollThumbPos = @timeScrollX * (@timeScrollWidth - @timeScrollThumbWidth)

		if @draggingTracksScrollThumb
			@tracksScrollThumbPos = y - (@headerHeight) - (@tracksScrollThumbDragOffset)
			@tracksScrollThumbPos = 0 if @tracksScrollThumbPos < 0

			if @tracksScrollThumbPos + @tracksScrollThumbHeight > @tracksScrollHeight
				@tracksScrollThumbPos = Math.max(0, @tracksScrollHeight - (@tracksScrollThumbHeight))
			if @tracksScrollHeight - (@tracksScrollThumbHeight) > 0
				@tracksScrollY = @tracksScrollThumbPos / (@tracksScrollHeight - (@tracksScrollThumbHeight))
			else
				@tracksScrollY = 0

		if @draggingTimeScrollThumb
			@timeScrollThumbPos = x - @timeScrollThumbDragOffset
			@timeScrollThumbPos = 0 if @timeScrollThumbPos < 0

			if @timeScrollThumbPos + @timeScrollThumbWidth > @timeScrollWidth
				@timeScrollThumbPos = Math.max(0, @timeScrollWidth - (@timeScrollThumbWidth))
			if @timeScrollWidth - (@timeScrollThumbWidth) > 0
				@timeScrollX = @timeScrollThumbPos / (@timeScrollWidth - (@timeScrollThumbWidth))
			else
				@timeScrollX = 0

	onCanvasMouseMove   : (event) ->
		x = event.layerX
		y = event.layerY


	onMouseDoubleClick : (event) ->

	initTracks         : ->
		@tracks = []
		i = undefined
		j = undefined
		anim = undefined
		i = 0

		while i < @timeline.animations.length
			anim = @timeline.animations[i]
			objectTrack = null
			propertyTrack = null

			j = 0
			while j < @tracks.length
				if @tracks[j].type == 'object' and @tracks[j].target == anim.target
					objectTrack = @tracks[j]
				if @tracks[j].type == 'property' and @tracks[j].target == anim.target and @tracks[j].propertyName == anim.propertyName
					propertyTrack = @tracks[j]
				j++


			if !objectTrack
				objectTrack =
					type           : 'object'
					id             : anim.targetName
					name           : anim.targetName
					target         : anim.target
					propertyTracks : []

				if !objectTrack.name
					objectTrack.name = 'Object' + @trackNameCounter++
				@tracks.push objectTrack

			if !propertyTrack
				propertyTrack =
					type         : 'property'
					id           : objectTrack.name + '.' + anim.propertyName
					name         : anim.propertyName
					propertyName : anim.propertyName
					target       : anim.target
					parent       : objectTrack
					anims        : []

				#find place to insert
				parentObjectTrack = null
				nextObjectTrack = null
				k = 0
				while k < @tracks.length
					if @tracks[k].type == 'object'
						nextObjectTrack = @tracks[k] if parentObjectTrack and !nextObjectTrack
						parentObjectTrack = @tracks[k] if @tracks[k].target == propertyTrack.target
					k++
				if nextObjectTrack
					nextTrackIndex = @tracks.indexOf(nextObjectTrack)
					@tracks.splice nextTrackIndex, 0, propertyTrack
				else
					@tracks.push propertyTrack
				parentObjectTrack.propertyTracks.push propertyTrack
			propertyTrack.anims.push anim
			i++

		i = 0
		while i < @tracks.length
			track = @tracks[i]
			track.keys = []

			if track.type == 'object'
				i++
				continue

			j = 0
			while j < track.anims.length
				anim = track.anims[j]

				if anim.delay > 0
					startValue = 0
					easing = anim.easing

					if j == 0
						startValue = track.target[track.propertyName]
					else
						startValue = track.anims[j - 1].endValue

					track.keys.push
						time   : anim.startTime
						value  : startValue
						easing : easing
						track  : track

				easingFunc = (k) -> k
				if j < track.anims.length - 1
					if track.anims[j + 1].delay == 0
						easingFunc = track.anims[j + 1].easing

				track.keys.push
					time   : anim.endTime
					value  : anim.endValue
					easing : easingFunc
					track  : track
				j++
			i++
		return

	selectKeys            : (x, y) ->
	sortTrackKeys         : ->
	rebuildSelectedTracks : ->
	findAnimationEnd      : ->

	drawRect              : (x, y, w, h, color, stroke = false) ->
		@ctx.beginPath()
		@ctx.strokeStyle = @shadeColor2(color, 300) if stroke
		@ctx.strokeWidth = 2 if stroke
		@ctx.strokeRect x, y, w, h if stroke
		@ctx.fillStyle = color
		@ctx.fillRect x, y, w, h
		@ctx.closePath()

	drawLine : (x1, y1, x2, y2, color) ->
		@ctx.strokeStyle = color
		@ctx.beginPath()
		@ctx.moveTo x1 + .5, y1 + .5
		@ctx.lineTo x2 + .5, y2 + .5
		@ctx.closePath()
		@ctx.stroke()

	drawTimeMarker : (x, y, w, h, color) ->
		sec = @xToTime x
		seconds = sec % 60
		sign = if seconds < 0 then '-' else ''
		s = seconds.toFixed(2).toString().split('.')
		millis = Math.abs(s[1])
		time = sign + (if seconds < 10 then '0' else '') + Math.abs(s[0]) + '+' + millis + (if millis < 10 then '0' else '')

		@drawRect x, y, w, h, color
		@ctx.font = '13px sans-serif'
		@ctx.fillStyle = 'black'
		@ctx.fillText time, x + 4, y + 14


	setTime : (x) ->
		@timeline.time = @xToTime x
		animationEnd = @findAnimationEnd()
		@timeline.time = 0 if @timeline.time < 0
		@timeline.time = animationEnd if @timeline.time > animationEnd

	timeToX : (time) ->
		animationEnd = @timeline.findAnimationEnd()
		visibleTime = @xToTime(@canvas.width - (@tracksScrollWidth)) - @xToTime(20)
		time -= (animationEnd - visibleTime) * @timeScrollX if visibleTime < animationEnd
		time * @timeScale * 200 + 10

	xToTime : (x) ->
		animationEnd = @timeline.findAnimationEnd()
		visibleTime = (@canvas.width - (@tracksScrollWidth) - 20) / (@timeScale * 200)
		timeShift = Math.max(0, (animationEnd - visibleTime) * @timeScrollX)
		(x - 10) / (@timeScale * 200) + timeShift

	disableShadows : ->
		@ctx.shadowColor = 'rgba(0,0,0,0)'
		@ctx.shadowBlur = 0
		@ctx.shadowOffsetX = 0
		@ctx.shadowOffsetY = 0

	shadeColor2 : (color, percent) ->
		R = parseInt color.substring(1, 3), 16
		G = parseInt color.substring(3, 5), 16
		B = parseInt color.substring(5, 7), 16
		R = parseInt R * (100 + percent) / 100
		G = parseInt G * (100 + percent) / 100
		B = parseInt B * (100 + percent) / 100
		R = if R < 255 then R else 255
		G = if G < 255 then G else 255
		B = if B < 255 then B else 255
		RR = if R.toString(16).length == 1 then '0' + R.toString(16) else R.toString 16
		GG = if G.toString(16).length == 1 then '0' + G.toString(16) else G.toString 16
		BB = if B.toString(16).length == 1 then '0' + B.toString(16) else B.toString 16
		'#' + RR + GG + BB



	update : ->
		if @canvas
			w = @canvas.width
			h = @canvas.height

			@tracksScrollHeight = @canvas.height - (@headerHeight) - (@timeScrollHeight)
			totalTracksHeight = @tracks.length * @trackLabelHeight
			tracksScrollRatio = @tracksScrollHeight / totalTracksHeight
			@tracksScrollThumbHeight = Math.min(Math.max(20, @tracksScrollHeight * tracksScrollRatio), @tracksScrollHeight)

			@timeScrollWidth = @canvas.width
			animationEnd = @timeline.findAnimationEnd()
			visibleTime = @xToTime(@canvas.width - (@tracksScrollWidth)) - @xToTime(0)

			timeScrollRatio = Math.max(0, Math.min(visibleTime / animationEnd, 1))
			@timeScrollThumbWidth = timeScrollRatio * @timeScrollWidth

			if @timeScrollThumbPos + @timeScrollThumbWidth > @timeScrollWidth
				@timeScrollThumbPos = Math.max(0, @timeScrollWidth - (@timeScrollThumbWidth))

			@ctx.clearRect 0, 0, w, h


			#tracks area clipping path
			@ctx.save()
			@ctx.beginPath()
			@ctx.moveTo 0, @headerHeight + 1
			@ctx.lineTo @canvas.width, @headerHeight + 1
			@ctx.lineTo @canvas.width, @canvas.height - (@timeScrollHeight)
			@ctx.lineTo 0, @canvas.height - (@timeScrollHeight)
			@ctx.clip()

			i = 0
			while i < @tracks.length
				yshift = @headerHeight + @trackLabelHeight * (i + 1)
				scrollY = @tracksScrollY * (@tracks.length * @trackLabelHeight - (@canvas.height) + @headerHeight)
				yshift -= scrollY
				if yshift < @headerHeight
					i++
					continue
				@drawTrack @tracks[i], yshift
				i++
			@ctx.restore()

			#timeline
			timelineStart = 0
			timelineEnd = 10
			lastTimeLabelX = 0

			@disableShadows()
			@ctx.fillStyle = '#666666'
			x = @timeToX 0
			sec = timelineStart
			while x < @canvas.width
				x = @timeToX(sec)
				@drawLine x + i, @headerHeight, x + i, @headerHeight * 0.8, 'rgba(102, 102, 102, 0.3)'

				minutes = Math.floor(sec / 60)
				seconds = sec % 60
				time = (if minutes < 10 then '0' else '') + minutes + ':' + (if seconds < 10 then '0' else '') + seconds
				if x - lastTimeLabelX > 30
					@ctx.font = 'bold 11px sans-serif'
					@ctx.fillText time, x - 13, @headerHeight * 0.6
					lastTimeLabelX = x
				sec += 1

			#time ticker
			@drawRect @timeToX(@timeline.time), 0, 2.5, h - 12, 'rgb(96, 192, 64)'
			@drawTimeMarker @timeToX(@timeline.time), h - 35, 45, 20, 'rgb(96, 192, 64)'


			#tracks scrollbar
			@drawRect @canvas.width - (@tracksScrollWidth), @headerHeight + 1, @tracksScrollWidth, @tracksScrollHeight - 2, '#535353'
			if @tracksScrollThumbHeight < @tracksScrollHeight
				@drawRect(
				  @canvas.width - (@tracksScrollWidth),
				  @headerHeight + 1 + @tracksScrollThumbPos,
				  @tracksScrollWidth,
				  @tracksScrollThumbHeight - 2,
				  'rgba(58, 58, 58, 0.85)'
				)


			#time scrollbar
			@drawRect 0, h - (@timeScrollHeight), w, @timeScrollHeight, 'rgba(58, 58, 58, 0.85)'
			if @timeScrollThumbWidth < @timeScrollWidth
				@drawRect 1 + @timeScrollThumbPos, h - (@timeScrollHeight), @timeScrollThumbWidth, @timeScrollHeight, '#535353'

			#header borders
			@drawLine 0, @headerHeight, w, @headerHeight, 'rgba(102, 102, 102, 0.3)'

module.exports = TimelineGui
