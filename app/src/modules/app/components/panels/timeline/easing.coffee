Easing =
	Map         : {}
	Linear      : {}
	Quadratic   : {}
	Cubic       : {}
	Quartic     : {}
	Quintic     : {}
	Sinusoidal  : {}
	Exponential : {}
	Circular    : {}
	Elastic     : {}
	Back        : {}
	Bounce      : {}

Easing.Linear.EaseNone = (k) ->
	k

Easing.Quadratic.EaseIn = (k) ->
	k * k

Easing.Quadratic.EaseOut = (k) ->
	-k * (k - 2)

Easing.Quadratic.EaseInOut = (k) ->
	if (k *= 2) < 1
		return 0.5 * k * k
	-0.5 * (--k * (k - 2) - 1)

Easing.Cubic.EaseIn = (k) ->
	k * k * k

Easing.Cubic.EaseOut = (k) ->
	--k * k * k + 1

Easing.Cubic.EaseInOut = (k) ->
	if (k *= 2) < 1
		return 0.5 * k * k * k
	0.5 * ((k -= 2) * k * k + 2)

Easing.Elastic.EaseIn = (k) ->
	s = undefined
	a = 0.1
	p = 0.4
	if k == 0
		return 0
	if k == 1
		return 1
	if !p
		p = 0.3
	if !a or a < 1
		a = 1
		s = p / 4
	else
		s = p / (2 * Math.PI) * Math.asin(1 / a)
	-(a * 2 ** (10 * (k -= 1)) * Math.sin((k - s) * 2 * Math.PI / p))

Easing.Elastic.EaseOut = (k) ->
	s = undefined
	a = 0.1
	p = 0.4
	if k == 0
		return 0
	if k == 1
		return 1
	if !p
		p = 0.3
	if !a or a < 1
		a = 1
		s = p / 4
	else
		s = p / (2 * Math.PI) * Math.asin(1 / a)
	a * 2 ** (-10 * k) * Math.sin((k - s) * 2 * Math.PI / p) + 1

Easing.Elastic.EaseInOut = (k) ->
	s = undefined
	a = 0.1
	p = 0.4
	if k == 0
		return 0
	if k == 1
		return 1
	if !p
		p = 0.3
	if !a or a < 1
		a = 1
		s = p / 4
	else
		s = p / (2 * Math.PI) * Math.asin(1 / a)
	if (k *= 2) < 1
		return -0.5 * a * 2 ** (10 * (k -= 1)) * Math.sin((k - s) * 2 * Math.PI / p)
	a * 2 ** (-10 * (k -= 1)) * Math.sin((k - s) * 2 * Math.PI / p) * 0.5 + 1

Easing.Back.EaseIn = (k) ->
	s = 1.70158
	k * k * ((s + 1) * k - s)

Easing.Back.EaseOut = (k) ->
	s = 1.70158
	(k = k - 1) * k * ((s + 1) * k + s) + 1

Easing.Back.EaseInOut = (k) ->
	s = 1.70158 * 1.525
	if (k *= 2) < 1
		return 0.5 * k * k * ((s + 1) * k - s)
	0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)

Easing.Bounce.EaseIn = (k) ->
	1 - Easing.Bounce.EaseOut(1 - k)

Easing.Bounce.EaseOut = (k) ->
	if (k /= 1) < 1 / 2.75
		7.5625 * k * k
	else if k < 2 / 2.75
		7.5625 * (k -= 1.5 / 2.75) * k + 0.75
	else if k < 2.5 / 2.75
		7.5625 * (k -= 2.25 / 2.75) * k + 0.9375
	else
		7.5625 * (k -= 2.625 / 2.75) * k + 0.984375

Easing.Bounce.EaseInOut = (k) ->
	if k < 0.5
		return Easing.Bounce.EaseIn(k * 2) * 0.5
	Easing.Bounce.EaseOut(k * 2 - 1) * 0.5 + 0.5

Easing.toString = (f) ->
	for name of Easing.Map
		if Easing.Map[name] == f
			return name
	return

Easing.strToEasing = (name) ->
	Easing.Map[name]

module.exports = Easing
