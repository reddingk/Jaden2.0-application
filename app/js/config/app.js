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
