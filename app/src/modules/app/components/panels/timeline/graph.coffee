Utils = require './utils'

class Graph
	defaults :
		background : '#313131'
		font       : '13px Verdana'
		fontColor  : '#ccc'

	constructor : (@ctx, opts) ->
		@opts = Utils.merge @defaults, opts

	draw   : ->

	update : ->

module.exports = Graph
