components.component('home', {
  bindings: {},
	controller: function ($state, jInfo) {
      var vm = this;
      vm.currentUser = jInfo.user.getCurrent();      

   },
   templateUrl: 'views/home.html'
});
