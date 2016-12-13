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
