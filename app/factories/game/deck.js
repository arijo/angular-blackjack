(function() {
    'use strict';

    var suits = [
      'spades', 
      'hearts', 
      'clubs', 
      'diamonds'
    ];

    var ranks = [{
        name: '2',
        value: 2
      },{
        name: '3',
        value: 3
      },{
        name: '4',
        value: 4
      },{
        name: '5',
        value: 5
      },{
        name: '6',
        value: 6
      },{
        name: '7',
        value: 7
      },{
        name: '8',
        value: 8
      },{
        name: '9',
        value: 9
      },{
        name: '10',
        value: 10
      },{
        name: 'jack',
        value: 10
      },{
        name: 'queen',
        value: 10
      },{
        name: 'king',
        value: 10
      },{
        name: 'ace',
        value: 11
    }];

    function Deck() {

      this.cards = [];

      suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
          var card = {
            suit: suit,
            rank: rank.name,
            value: rank.value,
            url: rank.name + '_of_' + suit + '.png'
          }
          this.cards.push(card);
        }, this); 
      }, this);
    }

    Deck.prototype.getCards = function() {

      return this.cards;
    }

    function create(n) {

      var decks = []; 
      for(var i=0; i<n; i++) {
        decks.push(new Deck);
      }
      return {
        getCards: function() {
          var cards = [];
          decks.forEach(function(deck) {
            cards = cards.concat(deck.getCards());
          });
          return cards;
        }
      }
    }

    function $deck() {

      return {
        create: create
      }
    }

    $deck.$inject = ['$q'];

    angular.module('app')
      .factory('$deck', $deck);
})();
