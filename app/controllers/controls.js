(function() {
    'use strict';

    function ControlsCtl($scope, $state) {

      $scope.player = $scope.$parent.p.player;
    }

    ControlsCtl.$inject = ['$scope', '$state'];

    angular.module('app')
      .controller('ControlsCtl', ControlsCtl);

})();
