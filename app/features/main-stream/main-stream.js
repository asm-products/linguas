linguas.controller('MainStreamController', ['$scope', '$window', '$routeParams', '$localStorage', 'TranslationService',
    function ($scope, $window, $routeParams, $localStorage, TranslationService) {

      // used for showing or hiding the 'add translation' button
      $scope.user = Parse.User.current();
      $scope.level = $routeParams.level ? $routeParams.level : 'a1'

      $scope.translationBunches = null;
      $scope.languages = availableLanguages.slice(0);

      $scope.primaryLanguage = $localStorage.primaryLanguage || availableLanguages[0];

      $scope.getTranslationBunches = function () {

        TranslationService.getTranslationBunches($scope.level).then(
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
