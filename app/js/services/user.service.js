services.service('userService', ['$http', 'api', function UserService($http, api) {

    return {
      getAllUsers: function(callback){
        $http({
            method: 'GET',
            url: api.users.all()
          }).then(function successCallback(response) {
            callback(response);
          }, function errorCallback(response){
            callback(response);
          });
      },
      loginUser: function($uname, $pwd, callback){
        $http({
            method: 'GET',
            url: api.users.login($uname, $pwd)
          }).then(function successCallback(response) {
            callback(response);
          }, function errorCallback(response){
            callback(response);
          });
      }
    }
}]);
