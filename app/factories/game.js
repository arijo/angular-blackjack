(function() {
    'use strict';

    var __eachSeries;

    var dealer;
    var players = [];
    var decks = 1;

    function create($dealer, $player, options){
      options.players.forEach(function(player, i) {
        players.push($player.create(player));
      });
      decks = options.decks;
      dealer = $dealer.create({
        decks: decks
      });
    }

    function start(){
      dealer.shuffle();
      dealer.deal(players);
      __eachSeries(players.slice(0), function(player) {
        dealer.setPlayer(player);
        return player.play();
      }).then(function(a, b) {

        dealer.play();
        __settleBets();
      });
    }

    function __settleBets() {

      players.forEach(function(player) {

        if(dealer.blackjack()) {

          if(!player.blackjack() && !player.busted) {
    
            player.balance = player.balance - player.bid;
            player.looser = true;
            return;
          }
        }

        if(player.busted && !dealer.busted) {

          player.balance = player.balance - player.bid;
          return;
        }

        if(dealer.busted && !player.busted) {

          player.balance = player.balance + player.bid;
          player.winner = true;
          return;
        }

        if((dealer.score() > player.score()) && !dealer.busted) {

          player.balance = player.balance - player.bid;
          player.looser = true;
          return;
        }

        if(dealer.score() < player.score() && !player.busted) {

          player.balance = player.balance + 2*player.bid;
          player.winner = true;
          return;
        }
      });
    }

    function getDealer() {
      return dealer;
    }

    function getPlayer(i) {
      if(i<players.length) {
        return players[i];
      }
    }

    function $game($dealer, $player, eachSeries) {

      __eachSeries = eachSeries;

      return {
        create: angular.bind(
          this, create, $dealer, $player
        ),
        start: start,
        getDealer: getDealer,
        getPlayer: getPlayer
      }
    }

    $game.$inject = ['$dealer', '$player', 'eachSeries'];

    angular.module('app')
      .factory('$game', $game);
})();
