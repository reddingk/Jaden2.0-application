directives.directive('navHold', ['$window', function($window) {
      return {
        restrict: 'EA',
        link: function ($scope, element, attrs) {

          angular.element($window).bind("scroll", function() {

            var windowp = angular.element($window)[0];
            var bodyTop = angular.element(document.getElementsByClassName("contentBody"))[0];
            var bodyThreshold = bodyTop.offsetTop - element[0].clientHeight;

            var topSection = bodyTop;
            var topThreshhold = topSection.offsetTop - element[0].clientHeight - 50;


            if(windowp.pageYOffset >= topThreshhold){
              if(!element.hasClass("screenPass")){
                element.addClass("screenPass");
              }
            }
            else {
              if(element.hasClass("screenPass")){
                element.removeClass("screenPass");
              }
            }

          });
        }
      }

    }]);
