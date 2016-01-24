(function() {

    function __Emitter() {

      this.__events = [];
    }

    __Emitter.prototype.emit = function(ev, data) {

      var handlers = this.__events[ev];
      handlers.forEach(function(handler) {

        handler.apply(null, [data]);
      });
    }

    __Emitter.prototype.on = function(ev, handler) {

      var handlers = this.__events[ev] || [];
      handlers.push(handler);
      this.__events[ev] = handlers;
    }

    Emitter = __Emitter;
})();
