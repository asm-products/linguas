linguas.directive('navbar', function ($location, $rootScope, $localStorage, $window) {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'app/features/navbar/navbar.html',
    controller: function ($scope) {

      $scope.user = Parse.User.current();

      // available languages are only "English" and "Turkish" so far. So add only these two.
      var languages = availableLanguages.slice(0);
      $scope.languages = [];
      $scope.languages[0] = languages[0];
      $scope.languages[1] = languages[1];
      $scope.languages[8] = languages[8];


      // setting dictionary
      $scope.setDictionary = function (code) {
        if (code == "tr-tr") {
          $rootScope.dictionary = dictionary.tr_tr;
        } else {
          $rootScope.dictionary = dictionary.en_us;
        }
        $scope.dictionary = $rootScope.dictionary;
      };

      $scope.changePrimaryLanguage = function (language) {
        $scope.primaryLanguage = language;
        if ($scope.user) {
          $scope.user.attributes.primaryLanguage = language.code;
          $scope.user.set("primaryLanguage", language.code);
          $scope.user.save();
        } else {
          $localStorage.primaryLanguage = language.code;
        }
        $scope.setDictionary(language.code);
        setTimeout(function () {
          $window.location.reload();
        }, 300);
      };

      $scope.setLevel = function (level) {
        $rootScope.level = level;
        $location.path('/' + level);
      };

      var existingPrimaryLanguageCode = null;
      if ($scope.user && $scope.user.attributes.primaryLanguage) {
        // getting primary language from users info
        existingPrimaryLanguageCode = $scope.user.attributes.primaryLanguage;
      } else if ($localStorage.primaryLanguage) {
        // getting primary language from local storage

        if ($localStorage.primaryLanguage.code)
          existingPrimaryLanguageCode = $localStorage.primaryLanguage.code;  // for old versions
        else
          existingPrimaryLanguageCode = $localStorage.primaryLanguage;
      }

      // finding appropriate language from language-code
      if (existingPrimaryLanguageCode && existingPrimaryLanguageCode !== null) {
        var langs = availableLanguages.filter(function (language) {
          return language.code == existingPrimaryLanguageCode;
        });
        $scope.primaryLanguage = langs[0];
      } else {
        $scope.primaryLanguage = availableLanguages[0];
      }
      $scope.setDictionary($scope.primaryLanguage.code);

    }
  };
});