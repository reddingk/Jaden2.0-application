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
  .state('app.login', {
    url: "login",
    views: {
      'content@': {
        component: 'login'
      }
    }
  })
  .state('app.construction', {
    url: "underconstruction",
    views: {
      'content@': {
        component: 'underconstruction'
      }
    }
  });


  $urlRouterProvider.otherwise('/');
  //$locationProvider.html5Mode(true);
}]);
