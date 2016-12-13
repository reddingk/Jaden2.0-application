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
