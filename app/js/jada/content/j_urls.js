services.factory("japi", function($http){
  var key= "";
  return {
    weather: {
      current: function() {
        return "http://api.openweathermap.org/data/2.5/";
      },
      forecast: {
        all: function(){
          return "http://api.openweathermap.org/data/2.5/";
        },
        detailed: function() {
          return "http://api.openweathermap.org/data/2.5/";
        }
      }
    }
  }
});
