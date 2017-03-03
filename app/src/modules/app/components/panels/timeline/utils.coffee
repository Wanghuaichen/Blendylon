Utils =
	merge: (opts, overrides) ->
		@extend (@extend {}, opts), overrides

	extend: (object, props) ->
		for key, val of props
			object[key] = val
		object

module.exports = Utils
