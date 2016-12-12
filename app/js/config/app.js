"use strict";

var routes = angular.module('routes', ['ui.router']);
var directives = angular.module('directives', []);
var components = angular.module('components', ['ui.bootstrap', 'ngAnimate']);
var controller = angular.module('controller', ['ui.bootstrap', 'ngAnimate']);

/**/
var jadenApp = angular.module('JadenApp', ['ngMaterial','ngAnimate', 'ui.router','directives',	'components',	'routes']);
