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
    },
    chips:{
      library: function(){
        return jData.chipsLibrary;
      }
    }
  }
}])
.factory("jData", function(){
  function JInfoData(){
    var vm = this;
    vm.currentUser = {};

    vm.chipsLibrary = {
      "default":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-circle-o-notch"},
      "settings":{"size":1, "template": "views/chips/_templates/settings.html", "icon":"fa fa-cogs"},
      "weather":{"size":4, "template": "views/chips/_templates/weather.html", "icon":"fa fa-sun-o"},
      "camera":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-camera"},
      "social_apps":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-circle-o-notch"},
      "maps":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-map-o"},
      "google":{"size":1, "template": "views/chips/_templates/default.html", "icon":"fa fa-google"},
      "dinner_time":{"size":2, "template": "views/chips/_templates/default.html", "icon":"fa fa-cutlery"}
    };

    vm.setCurrentUser = function(user){
      vm.currentUser = user;
      return true;
    }
  }

  return new JInfoData();
});
