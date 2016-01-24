(function() {
    'use strict';

    var __$q;

    function Player(name, bid) {
      this.name = name;
      this.bid = bid;
      this.balance = 0;
      this.hand = [];
      this.__events = [];
      this.deferred = __$q.defer();
    }

    Player.prototype = new Emitter;

    Player.prototype.play = function() {

      this.playing = true;

      return this.deferred.promise;
    }

    Player.prototype.stand = function() {

      this.playing = false;

      return this.deferred.resolve();
    }

    Player.prototype.hit = function() {

      this.emit('hit', this);
    }

    Player.prototype.score = function() {

      var aces = this.hand.filter(function(card) {
        return card.rank === 'ace';
      });

      if(__score.bind(this)() > 21 && aces.length) {

        var ace = aces.splice(0, 1)[0];
        ace.value = 1; 
      }

      return __score.bind(this)();

      function __score() {

        return this.hand.map(function(card) {
          return card.value;
        })
        .reduce(function(current, previous) {
          return current + previous;
        });
      };
    }

    Player.prototype.bust = function() {

      this.busted = true;
      this.playing = false;

      return this.deferred.resolve();
    }

    Player.prototype.blackjack = function() {

      return (this.hand[0].value + this.hand[1] === 21);
    }

    function create(player) {

      return new Player(player.name, player.bid);
    }

    function $player($q) {

      __$q = $q;

      return {
        create: create
      }
    }

    $player.$inject = ['$q'];

    angular.module('app')
      .factory('$player', $player);
})();
