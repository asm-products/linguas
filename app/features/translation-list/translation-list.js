linguas.directive('translationList', ['$localStorage', '$window', 'TranslationService', 'ngDialog', function () {
  return {
    restrict: 'AE',
    scope: {
      movie: '=info'
    },
    replace: true,
    templateUrl: 'app/features/translation-list/translation-list.html',
    controller: function ($scope, $localStorage, $window, TranslationService, ngDialog) {

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

    }
  };
}]);