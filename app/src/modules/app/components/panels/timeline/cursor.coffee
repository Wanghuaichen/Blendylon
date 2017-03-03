Utils = require './utils'

class Cursor
	constructor: (opts) ->
		@position = x: 0, y: 0
		@offset = 0

	draw: (ctx, offset, opts) ->
		@defaults =
			color : 'rgb(96, 192, 64)'
			height: 400
			width: 2
		@opts = Utils.merge @defaults, opts

		if(offset isnt undefined)
			@offset = offset

		ctx.strokeStyle = @opts.color
		ctx.lineWidth = @opts.width
		ctx.beginPath()
		ctx.moveTo @offset + @position.x, 0
		ctx.lineTo @offset + @position.x, ctx.canvas.height
		ctx.closePath()
		ctx.stroke()

		i = 0
		shades = [140, 163, 184, 201, 217, 229, 240, 247, 252]
		width = ctx.canvas.width;
		height = ctx.canvas.height;
		for i in [0 .. shades.length]
			shade = 1 - (shades[i] / 255)
			shade = "rgba(0, 0, 0, " + shade + ")"
			ctx.fillStyle = shade;
			ctx.fillRect(0, i, width, 1)
			ctx.fillRect(0, height - i + 1, width, 1)
			ctx.fillRect(i, 0, 1, height);
			ctx.fillRect(width - i + 1, 0, 1, height)
	update: (ctx) ->

module.exports = Cursor
