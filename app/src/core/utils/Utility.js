/*
 * Copyright (c) Fenx Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Mel Florance <mel.florance@gmail.com>, 2016
 */

export default
{
    toRadians      : deg => deg * Math.PI / 180,
    toDegrees      : rad => rad * 180 / Math.PI,
    lerp           : (a, b, t) => a * (1 - t) + b * t,
    clamp          : (n, min, max) => n <= min ? min : n >= max ? max : n,
    capitalize     : s => s.replace(/\b\w/g, l => l.toUpperCase()),
    camelCaseToStr : s => s.split(/(?=[A-Z])/).join(' '),
    camelize       : str => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    },
    decimals: n =>
    {
        var match = (''+n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) { return 0; }
        return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
    },
    pad: (n, width, z) =>
    {
        z = z || '0';
        n = n + '';
        return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n;
    },
    childOf: (c,p) => { while((c = c.parentNode) && c !== p); return !! c }
}
