tutorialProject.directive('createTranslation', function ($window) {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'app/features/create-translation/create-translation.html',
    controller: function ($scope) {

      $scope.languages = availableLanguages;
      $scope.selectedLanguage = $scope.languages[0];
      $scope.sentence = "";

      $scope.createTranslation = function () {
        console.log($scope.selectedLanguage)
        console.log($scope.sentence)

        if ($scope.selectedLanguage && $scope.sentence.length > 0) {

          var TranslationBunch = Parse.Object.extend("TranslationBunch");
          var translationBunch = new TranslationBunch();

          var translations = [
            {
              language: $scope.selectedLanguage.code,
              translation: $scope.sentence
            }
          ];

          translationBunch.set("translations", translations);

          translationBunch.save(null, {
            success: function (translationBunch) {
              $window.location.reload();
            },
            error: function (translationBunch, error) {
            }
          });

        }
      }

    }
  };
});