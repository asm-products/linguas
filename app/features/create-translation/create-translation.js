tutorialProject.directive('createTranslation', ['$window', 'TranslationService' ,
  function ($window, TranslationService) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/features/create-translation/create-translation.html',
      controller: function ($scope) {

        $scope.user = Parse.User.current();

        $scope.languages = availableLanguages;
        $scope.selectedLanguage = $scope.languages[0];
        $scope.sentence = "";

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