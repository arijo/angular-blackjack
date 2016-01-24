(function() {
    'use strict';

    var app = angular.module('app', ['ui.router', 'rt.asyncseries']);

    app.config(function( $stateProvider, $urlRouterProvider) {

      $urlRouterProvider
        .when('/', '/main')
        .otherwise('/');

      $stateProvider
        .state('main', {
          url: '/main',
          templateUrl: 'app/templates/main.html',
          controller: 'MainCtl'
        })
    });

    app.run(['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $state.go('main');
      }
    ]);
})();
