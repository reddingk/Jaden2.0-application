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
