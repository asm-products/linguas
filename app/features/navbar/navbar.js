linguas.directive('navbar', function ($location, $rootScope) {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'app/features/navbar/navbar.html',
    controller: function ($scope) {

      console.log("nav: " + $rootScope.level)

      /*$scope.$watch(function () {
        return $rootScope.level;
      }, function () {
        $scope.userPLevel = $rootScope.uPLevel;
      }, true);*/

      $scope.setLevel = function (level) {
        $rootScope.level = level
        $location.path('/' + level)
      }

    }
  };
});