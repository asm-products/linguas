linguas.directive('createBunch', ['$window', '$routeParams', 'TranslationService' ,
  function ($window, $routeParams, TranslationService) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/features/translation-bunch/create/create-bunch.html',
      controller: function ($scope) {

        $scope.user = Parse.User.current();
        $scope.level = $routeParams.level ? $routeParams.level : 'a1';

        $scope.languages = availableLanguages;
        $scope.selectedLanguage = $scope.languages[0];
        $scope.sentence = "";

        $scope.createTranslation = function () {

          TranslationService.createTranslation($scope.selectedLanguage.code, $scope.sentence).then(
            function (translation) {
              console.log("translation created. creating bunch now");
              $scope.createTranslationBunch(translation);
            },
            function (error) {
              console.error(error);
            }
          );
        };

        $scope.createTranslationBunch = function (translation) {
          console.log("translation bunch created");
          TranslationService.createTranslationBunch(translation, $scope.level).then(
            function (translationBunch) {

              $window.location.reload();
            },
            function (error) {
              console.error(error);
            }
          );
        };

        $scope.setLanguage = function (language) {
          $scope.selectedLanguage = language;
        };
      }
    };
  }]);