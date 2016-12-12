"use strict";

var routes = angular.module('routes', ['ui.router']);
var directives = angular.module('directives', []);
var components = angular.module('components', ['ui.bootstrap', 'ngAnimate']);
var controller = angular.module('controller', ['ui.bootstrap', 'ngAnimate']);

/**/
var jadenApp = angular.module('JadenApp', ['ngMaterial','ngAnimate', 'ui.router','directives',	'components',	'routes']);

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

// root component: all other components will be under this component
// objects: view - this will store the state and other high level objects
components.component('all', {
  bindings: {},
  controllerAs: 'mc',
	controller: function () {
    var vm = this;
    vm.title = "TEST - ALL";
    vm.test = "this is test text in [all]";

   },
   templateUrl: 'views/all.html'
});

// footer component for DKWSite
components.component('home', {
  bindings: {},
	controller: function () {
      var vm = this;
      vm.title = "Home - Title";
      vm.test = "this is test text in [home]";

   },
   templateUrl: 'views/home.html'
});
