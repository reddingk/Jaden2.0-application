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
