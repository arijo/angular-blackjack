(function() {
    'use strict';

    var positions = [];

    for(var i=0; i<3; i++) {
      positions.push({
        id: i+1,
        empty: true
      });
    }

    var players = [{
        name: 'Sultan Saidov',
        bid: 10
      },{
        name: 'Alex Gomes',
        bid: 5
      },{
        name: 'Pope Francis',
        bid: 25
    }];

    function MainCtl($scope, $state, $game) {

      $game.create({
        decks: 1,
        players: players
      });

      positions.forEach(function(p, i) {
        var player = $game.getPlayer(i);
        if(player) {
          p.player = $game.getPlayer(i);
          p.empty = false;
        }
      });

      $scope.dealer = $game.getDealer();
      $scope.positions = positions;

      $game.start();
    }

    MainCtl.$inject = ['$scope', '$state', '$game'];

    angular.module('app')
      .controller('MainCtl', MainCtl);

})();
