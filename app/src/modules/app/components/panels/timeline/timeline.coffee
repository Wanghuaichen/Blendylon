Graph  = require './graph'
Cursor = require './cursor'

class Timeline
	constructor: ->
		@defaults =
			width: window.innerWidth
			height: window.innerHeight
		@canvas = window.document.getElementById 'timeline'

		if @canvas
			@ctx = @canvas.getContext '2d'
			$(() =>
				@canvas.width = $('#entities_list').width()
				@canvas.height = $('#entities_list').height()

				@graph = new Graph()
				@cursor = new Cursor()
				@graph.draw @ctx
				@cursor.draw @ctx
				@listenEvents @ctx, @graph, @cursor
			)

	listenEvents: (ctx, graph, cursor) ->
		startX = 0
		startY = 0
		onResize = ->
			ctx.canvas.width  = @defaults.width
			ctx.canvas.height = @defaults.height
			graph.draw ctx

		onMouseWheel = (e) ->
			delta = Math.max -1, Math.min 1, e.wheelDelta or -e.detail
			console.log delta

		onMouseMoveGraph = (e) ->
			graph.move e.clientX - startX, e.pageY - startY
#			console.log graph.origin
			graph.draw ctx
			cursor.draw ctx, e.clientX - graph.origin.x - 50

		onMouseMoveCursor = (e) ->
			graph.draw ctx
			cursor.draw ctx, e.clientX - 50

		onMouseDown = (e) ->
			if e.which == 2
				startX = e.clientX - graph.origin.x
				startY = e.clientY - graph.origin.y
				window.addEventListener 'mousemove', onMouseMoveGraph

			if e.which == 1
				cursor.position.x = 0
				graph.draw ctx
				cursor.draw ctx, startX - 50
				window.addEventListener 'mousemove', onMouseMoveCursor

		onMouseUp = ->
			window.removeEventListener 'mousemove', onMouseMoveGraph
			window.removeEventListener 'mousemove', onMouseMoveCursor

		window.addEventListener 'resize', onResize, false
		@canvas.addEventListener 'mousewheel', onMouseWheel, false
		@canvas.addEventListener 'mousedown', onMouseDown, false
		window.addEventListener 'mouseup', onMouseUp, false

module.exports = Timeline
