linguas.directive('navbar', function ($location, $rootScope, $localStorage, $window) {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'app/features/navbar/navbar.html',
    controller: function ($scope) {

      $scope.user = Parse.User.current();
      $scope.languages = availableLanguages.slice(0);

      var existingPrimaryLanguageCode;
      if ($scope.user && $scope.user.attributes.primaryLanguage) {
        // getting primary language from users info
        existingPrimaryLanguageCode = $scope.user.attributes.primaryLanguage
      } else if ($localStorage.primaryLanguage) {
        // getting primary language from local storage
        existingPrimaryLanguageCode = $localStorage.primaryLanguage
      }

      // finding appropriate language from language-code
      if (existingPrimaryLanguageCode) {
        var languages = availableLanguages.filter(function (language) {
          return language.code == existingPrimaryLanguageCode
        });
        $scope.primaryLanguage = languages[0]
      } else {
        $scope.primaryLanguage = availableLanguages[0]
      }

      // setting dictionary
      $scope.setDictionary = function (code) {
        if (code == "tr-tr") {
          $rootScope.dictionary = dictionary.tr_tr;
        } else {
          $rootScope.dictionary = dictionary.en_us;
        }
        $scope.dictionary = $rootScope.dictionary
      }

      $scope.setPrimaryLanguage = function (language) {
        $scope.primaryLanguage = language;
        if ($scope.user) {
          $scope.user.attributes.primaryLanguage = language.code
          $scope.user.set("primaryLanguage", language.code)
          $scope.user.save()
        } else {
          $localStorage.primaryLanguage = language.code;
        }
        $scope.setDictionary(language.code)
        setTimeout(function () {
          $window.location.reload();
        }, 300);
      }

      $scope.setLevel = function (level) {
        $rootScope.level = level
        $location.path('/' + level)
      }

      $scope.setDictionary($scope.primaryLanguage.code)
    }
  };
});