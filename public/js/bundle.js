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
        component: 'underconstruction'
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

   },
   templateUrl: 'views/home.html'
});

components.component('jHeader', {
  bindings: {},
  require: {
      parent: '^all'
  },
  controllerAs: 'hc',
	controller: function () {
      var vm = this;
      vm.username = "Kristopher";
      vm.welcome = "Have A Good Day!"

   },
   templateUrl: 'views/templates/_header.html'
});

components.component('underconstruction', {
  bindings: {},
	controller: function () {
      var vm = this;

   },
   templateUrl: 'views/underConstruction.html'
});

directives.directive('navHold', ['$window', function($window) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {

          angular.element($window).bind("scroll", function() {

            var windowp = angular.element($window)[0];
            var bodyTop = angular.element(document.getElementsByClassName("contentBody"))[0];
            var bodyThreshold = bodyTop.offsetTop - element[0].clientHeight;

            var topSection = bodyTop;
            var topThreshhold = topSection.offsetTop - element[0].clientHeight - 50;


            if(windowp.pageYOffset >= topThreshhold){
              if(!element.hasClass("screenPass")){
                element.addClass("screenPass");
              }
            }
            else {
              if(element.hasClass("screenPass")){
                element.removeClass("screenPass");
              }
            }

          });
        }
      }

    }]);
