Utils = require './utils'

class Graph
	constructor: (opts) ->
		@defaults =
			frames     : 500,
			distance   : 40
			background : '#313131'
			lineColor  : '#4c4c4c'
			lineWidth  : 2
			caption    : true
			font       : '10px Verdana'
			fontColor  : '#ccc'
			xAxis      : true
			yAxis      : false

		@origin = x: 0, y: 0
		@opts = Utils.merge @defaults, opts

	textHalfWidth: (ctx, text) ->
		ctx.measureText(text).width * .5

	move: (dx, dy) ->
		@origin = x: dx, y: dy

	draw: (ctx) ->
		ctx.fillStyle   = @opts.background
		ctx.lineWidth   = @opts.lineWidth
		ctx.strokeStyle = @opts.lineColor
		ctx.font        = @opts.font

		ctx.fillRect 0, 0, ctx.canvas.width, ctx.canvas.height

		for x in [0 .. ctx.canvas.width] by ~~((@opts.frames / ctx.canvas.width) * 100)

			if @opts.xAxis
				ctx.lineWidth = 1

				ctx.beginPath()
				ctx.moveTo (@origin.x) + x + .5, 0
				ctx.lineTo (@origin.x) + x + .5, ctx.canvas.height
				ctx.closePath()
				ctx.stroke()

			if @opts.caption && @opts.yAxis
				ctx.fillStyle = @opts.fontColor
				xPos = @opts.distance * .5 - @textHalfWidth ctx, x
				yPos = (@origin.y) + x + (@opts.distance * .5 + @textHalfWidth ctx, 'y')
				ctx.fillText x * 2, xPos, yPos

		for y in [0 .. ctx.canvas.width] by ~~((@opts.frames / ctx.canvas.width) * 100)
			if @opts.yAxis
				if y % @opts.distance == 0
					ctx.lineWidth = @opts.lineWidth / 3
				else
					ctx.lineWidth = @opts.lineWidth

				ctx.beginPath()
				ctx.moveTo 0, @origin.y + y + .5
				ctx.lineTo ctx.canvas.width, @origin.y + y + .5
				ctx.closePath()
				ctx.stroke()

			if @opts.caption && @opts.xAxis
				ctx.fillStyle = @opts.fontColor
				xPos = (@origin.x) + y + ((@opts.distance * .5) - @textHalfWidth ctx, y)
				yPos = ctx.canvas.height - 10
				ctx.fillText y, xPos, yPos

	update: (ctx) ->

module.exports = Graph;
