linguas.directive('createTranslation', ['$window', 'TranslationService' ,
  function ($window, TranslationService) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/features/translation/create-translation/create-translation.html',
      controller: function ($scope) {

        $scope.user = Parse.User.current();

        $scope.languages = availableLanguages;
        $scope.selectedLanguage = $scope.languages[0];
        $scope.sentence = "";

        $scope.createTranslation = function () {

          TranslationService.createTranslation($scope.selectedLanguage.code, $scope.sentence).then(
            function (translation) {
              console.log("translation created. creating bunch now")
              $scope.createTranslationBunch(translation)
            },
            function (error) {
              console.error(error)
            }
          )
        }

        $scope.createTranslationBunch = function (translation) {
          console.log("translation bunch created")
          TranslationService.createTranslationBunch(translation).then(
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