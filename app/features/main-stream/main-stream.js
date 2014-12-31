linguas.controller('MainStreamController', ['$scope', '$window', '$localStorage', 'TranslationService',
    function ($scope, $window, $localStorage, TranslationService) {

      // used for showing or hiding the 'add translation' button
      $scope.user = Parse.User.current();

      $scope.translationBunches = [];
      $scope.languages = availableLanguages.slice(0);

      $scope.primaryLanguage = $localStorage.primaryLanguage || availableLanguages[0];

      $scope.getTranslationBunches = function () {

        TranslationService.getTranslationBunches().then(
          function (results) {
            $scope.translationBunches = results;
          },
          function (error) {
            console.error(error)
          }
        )
      }
      $scope.getTranslationBunches();

    }]
);
