// Generated by CoffeeScript 1.12.2
var Track, Utils;

Utils = require('./utils');

Track = (function() {
  Track.prototype.defaults = {
    labelWidth: 'rgb(96, 192, 64)',
    height: 400,
    width: 2
  };

  Track.prototype.position = {
    x: 0,
    y: 0
  };

  function Track(ctx, opts) {
    this.ctx = ctx;
    this.opts = Utils.merge(this.defaults, opts);
  }

  Track.prototype.draw = function() {};

  Track.prototype.update = function() {};

  return Track;

})();

module.exports = Track;

//# sourceMappingURL=track.js.map
