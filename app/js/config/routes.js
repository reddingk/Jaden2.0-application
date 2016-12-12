jadenApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state('app', {
    url: "/",
    views: {
      'content':{
        component: 'home'
      }
    }
  })
  .state('app.construction', {
    url: "underconstruction",
    views: {
      'content@': {
        component: 'underConstruction'
      }
    }
  })


  $urlRouterProvider.otherwise('/');
  //$locationProvider.html5Mode(true);
}]);
