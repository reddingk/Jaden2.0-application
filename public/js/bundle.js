"use strict";

// App Ctrls
var services = angular.module('services', []);
var dataconfig = angular.module('dataconfig', []);
// View Ctrls
var routes = angular.module('routes', ['ui.router']);
var directives = angular.module('directives', []);
var components = angular.module('components', ['ui.bootstrap', 'ngAnimate']);

/**/
var jadenApp = angular.module('JadenApp', ['ngMaterial','ngAnimate', 'ui.router','dataconfig','services','directives','components',	'routes']);

dataconfig.service('jInfo', ['jData', '$filter', 'userService', function JInfo(jData, $filter, userService){
  /* Variables */

  /* Full Service*/
  return {
    user: {
      getCurrent: function(){
        return jData.currentUser;
      },
      setCurrent: function(user, callback) {
        return jData.setCurrentUser(user);
      },
      loginUser: function(uname, pwd, callback){
        userService.loginUser(uname, pwd, function(res){
          if(res.data.length == 1){
            callback(jData.setCurrentUser(res.data[0]));
          }
          else {
            callback(false);
          }
        });
      },
      getAllUsers: function(admin, callback){
        if(admin){
          userService.getAllUsers(function(res){
            callback(res.data);
          });
        }
        else {
          callback({"error":"INVALID PRIVILEGES"});
        }
      }
    },
    chips:{
      library: function(){
        return jData.chipsLibrary;
      }
    }
  }
}])
.factory("jData", function(){
  function JInfoData(){
    var vm = this;
    vm.currentUser = {};

    vm.chipsLibrary = {
      "default":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-circle-o-notch"},
      "settings":{"size":1, "template": "views/chips/_templates/settings.html", "icon":"fa fa-cogs"},
      "weather":{"size":4, "template": "views/chips/_templates/weather.html", "icon":"fa fa-sun-o"},
      "camera":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-camera"},
      "social_apps":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-circle-o-notch"},
      "maps":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-map-o"},
      "google":{"size":1, "template": "views/chips/_templates/default.html", "icon":"fa fa-google"},
      "dinner_time":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-cutlery"}
    };

    vm.setCurrentUser = function(user){
      vm.currentUser = user;
      return true;
    }
  }

  return new JInfoData();
});

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

services.service('userService', ['$http', 'api', function UserService($http, api) {

    return {
      getAllUsers: function(callback){
        $http({
            method: 'GET',
            url: api.users.all()
          }).then(function successCallback(response) {
            callback(response);
          }, function errorCallback(response){
            callback(response);
          });
      },
      loginUser: function($uname, $pwd, callback){
        $http({
            method: 'GET',
            url: api.users.login($uname, $pwd)
          }).then(function successCallback(response) {
            callback(response);
          }, function errorCallback(response){
            callback(response);
          });
      }
    }
}]);


services.factory("api", function($http){
  var key= "";
  return {
    users: {
      all: function() {
        return "/api/users_all";
      },
      login: function(username, password){
        return "/api/users/"+username+"/"+password
      }
    }
  }
});

// root component: all other components will be under this component
// objects: view - this will store the state and other high level objects
components.component('all', {
  bindings: {},
  controllerAs: 'mc',
	controller: function ($state, jInfo) {
    var vm = this;

    vm.currentUser = { name:{first:'N/A'} };

    //vm.currentUser = jInfo.user.getCurrent();

    if(vm.currentUser.name.first == 'N/A' || Object.keys(vm.currentUser).length === 0){
      jInfo.user.getAllUsers(true, function(res){
        vm.allUsers = res;
      });
      $state.go('app.login');
    }

   },
   templateUrl: 'views/all.html'
});

components.component('chip', {
  bindings: {
    chipinfo:'='
  },
	controller: function (jInfo) {
      var vm = this;
      vm.currentUser = jInfo.user.getCurrent();
      vm.chipContent = {};
      
      vm.getChipSize = function(size){
        return "crd"+size;
      }
   },
   templateUrl: 'views/chips/chip.html'
});

components.component('home', {
  bindings: {},
	controller: function ($state, jInfo) {
      var vm = this;
      vm.currentUser = jInfo.user.getCurrent();

      var chipsLib = jInfo.chips.library();

      /* Functions */
      vm.getChipTemplate = function(name){
        if(chipsLib[name] != undefined){
          return chipsLib[name].template;
        }
        else {
          return chipsLib.default.template;
        }
      }

      vm.jigsaw = function(chips){
        // Set Chip Settings
        for(var i=0; i < chips.length; i++){
          if(chipsLib[chips[i].name] != undefined){
            chips[i].settings = chipsLib[chips[i].name];
          }
          else {
            chips[i].settings = chipsLib.default;
          }
        }
        // adjust chips
        var tmpChips = chips;
        var jigsawChips = [];
        var rowLength = 0;

        while(tmpChips.length > 0){
          if(jigsawChips.length == 0 || rowLength == 0){
            rowLength += tmpChips[0].settings.size;
            jigsawChips.push(tmpChips[0]);
            tmpChips.splice(0,1);
          }
          else {
            rowLength = (rowLength >= 5 ? 0 : rowLength);
            // find next piece
            // check for piece size
            var pSize = -1;
            for(var j= (5 - rowLength); j > 0; j--){
              var validPieces = $.grep(tmpChips, function(e){ return e.settings.size == j });
              if(validPieces.length > 0){
                pSize = j;
                break;
              }
            }
            if(pSize > 0) {
              //find piece with size
              for(var i =0; i < tmpChips.length; i++){
                if(tmpChips[i].settings.size == pSize){
                  rowLength += tmpChips[i].settings.size;
                  jigsawChips.push(tmpChips[i]);
                  tmpChips.splice(i,1);
                  break;
                }
              }
            }
            else {
              rowLength = 0;
            }

          }
        }
        return jigsawChips;
      }

      vm.userChips = vm.jigsaw(vm.currentUser.chips);

   },
   templateUrl: 'views/home.html'
});

components.component('jHeader', {
  bindings: {
    usr: '='
  },
  controllerAs: 'hc',
	controller: function ($state, $rootScope, jInfo) {
      var vm = this;

      vm.welcome = "Have A Good Day!"

      vm.isLoggedIn = function(){
        return (vm.usr._id != undefined);
      }

      vm.login = function(uname, pwd){
        jInfo.user.loginUser(uname, pwd, function(res){
          var loggedIn = res;
          if(loggedIn){
            vm.usr = jInfo.user.getCurrent();
            $state.go('app');
          }
          else { }
        });
      }
   },
   templateUrl: 'views/templates/_header.html'
});

components.component('login', {
  bindings: {
    usr: '='
  },
	controller: function () {
      var vm = this;

   },
   templateUrl: 'views/login.html'
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
