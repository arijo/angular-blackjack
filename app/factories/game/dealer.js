(function() {
    'use strict';

    var __$deck;

    function Dealer(decks) {

      this.hand = [];

      this.cards = __$deck.create(decks).getCards();
    }

    Dealer.prototype.shuffle = function() {

      this.cards = __shuffle(this.cards);

      function __shuffle(array) {
        var m = array.length, t, i;

        while (m) {
          i = Math.floor(Math.random() * m--);

          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }

        return array;
      } 
    }

    Dealer.prototype.deal = function(players) {

      var turns = [1, 2];

      turns.forEach(function(turn) {
        players.forEach(function(player) {
          if(this.cards.length) {
            player.hand.push(this.cards.splice(0, 1)[0]);
          }
        }, this);
        this.hand.push(this.cards.splice(0, 1)[0]); 
      }, this);
    }

    Dealer.prototype.setPlayer = function(player) {

      this.curPlayer = player;

      this.curPlayer.on('hit', function(source) {

        if(source !== this.curPlayer) {
          return;
        }

        if(this.cards.length) {

          this.curPlayer.hand.push(this.cards.splice(0, 1)[0]);

          if(this.curPlayer.score() > 21) {

            this.curPlayer.bust();
          } 
        }
      }.bind(this));
    }

    Dealer.prototype.play = function() {

      while(this.score() <= 17 && !this.busted) {

        this.hit();

        if(this.score() > 21) {

          this.bust(); 
        }
      }
    }

    Dealer.prototype.hit = function() {

      if(this.cards.length) {
        this.hand.push(this.cards.splice(0, 1)[0]);
      }
    }

    Dealer.prototype.score = function() {

      return this.hand.map(function(card) {
        return card.value;
      })
      .reduce(function(current, previous) {
        return current + previous;
      });
    }

    Dealer.prototype.bust = function() {

        this.busted = true;
    }

    Dealer.prototype.blackjack = function() {

      return (this.hand[0].value + this.hand[1] === 21);
    }

    function create(options) {
      return new Dealer(options.decks);
    }

    function $dealer($deck) {

      __$deck = $deck;

      return {
        create: create
      }
    }

    $dealer.$inject = ['$deck'];

    angular.module('app')
      .factory('$dealer', $dealer);
})();
