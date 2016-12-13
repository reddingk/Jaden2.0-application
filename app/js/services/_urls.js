
services.factory("api", function($http){
  var key= "";
  return {
    users: {
      all: function() {
        return "/api/users_all";
      },
      login: function(username, password){
        return "/api/users/"+username+"/"+password
      }
    }
  }
});
