Utils = require './utils'

class Cursor
	defaults:
		color  : 'rgb(96, 192, 64)'
		height : 400
		width  : 2
	position:
		x : 0
		y : 0

	constructor: (@ctx, opts) ->
		@opts = Utils.merge @defaults, opts

	draw: ->

	update: ->


module.exports = Cursor
