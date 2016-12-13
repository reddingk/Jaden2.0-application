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
