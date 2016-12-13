components.component('chip', {
  bindings: {
    chipinfo:'='
  },
	controller: function (jInfo) {
      var vm = this;
      vm.currentUser = jInfo.user.getCurrent();

   },
   templateUrl: 'views/chips/chip.html'
});
