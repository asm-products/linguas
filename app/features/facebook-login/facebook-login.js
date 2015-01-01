linguas.directive('facebookLogin', function ($window) {
  return {
    restrict: 'AE',
    replace: true,
    template: '<p class="navbar-text" ng-click="login()"><a>Login with Facebook</a></p>',
    controller: function ($scope) {

      $scope.login = function () {
        Parse.FacebookUtils.logIn(null, {
          success: function (user) {
            FB.api('/me', function (response) {
              Parse.User.current().set("firstName", response.first_name);
              Parse.User.current().set("lastName", response.last_name);
              Parse.User.current().save();
              $window.location.reload();
            });
            if (!user.existed()) {
              // User signed up and logged in through Facebook
            } else {
              // User logged in through Facebook!
            }
          },
          error: function (user, error) {
            console.error("User cancelled the Facebook login or did not fully authorize.");
          }
        });
      }
    }
  };
});