dataconfig.service('jInfo', ['jData', '$filter', 'userService', function JInfo(jData, $filter, userService){
  /* Variables */

  /* Full Service*/
  return {
    user: {
      getCurrent: function(){
        return jData.currentUser;
      },
      setCurrent: function(user, callback) {
        return jData.setCurrentUser(user);
      },
      loginUser: function(uname, pwd, callback){
        userService.loginUser(uname, pwd, function(res){
          if(res.data.length == 1){
            callback(jData.setCurrentUser(res.data[0]));
          }
          else {
            callback(false);
          }
        });
      },
      getAllUsers: function(admin, callback){
        if(admin){
          userService.getAllUsers(function(res){
            callback(res.data);
          });
        }
        else {
          callback({"error":"INVALID PRIVILEGES"});
        }
      }
    }
  }
}])
.factory("jData", function(){
  function JInfoData(){
    var vm = this;
    vm.currentUser = {};

    vm.setCurrentUser = function(user){
      vm.currentUser = user;
      return true;
    }
  }

  return new JInfoData();
});
