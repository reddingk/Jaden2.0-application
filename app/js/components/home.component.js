// footer component for DKWSite
components.component('home', {
  bindings: {},
	controller: function () {
      var vm = this;
      vm.title = "Home - Title";
      vm.test = "this is test text in [home]";

   },
   templateUrl: 'views/home.html'
});
