linguas.controller('MainCtrl', function ($scope, ngDialog) {
});

linguas.directive('createWordTranslation', ['ngDialog' ,

  function (ngDialog) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/features/translation/word-translations/create/create-word-translation.html',
      controller: function ($scope) {

        $scope.user = Parse.User.current();

        $scope.languages = availableLanguages;
        $scope.selectedLanguage = $scope.languages[0];
        $scope.sentence = "";

        $scope.setToLanguage = function(language) {
          $scope.toLanguage = language;
        }

        $scope.createTranslation = function () {

          TranslationService.createTranslationBunch($scope.selectedLanguage, $scope.sentence).then(
            function (translationBunch) {
              $window.location.reload();
            },
            function (error) {
              console.error(error)
            }
          )
        }
      }
    };
  }]);