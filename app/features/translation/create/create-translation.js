linguas.directive('createTranslation', ['$window', '$rootScope', 'TranslationService' ,
  function ($window, $rootScope, TranslationService) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        bunch: '=bunch'
      },
      templateUrl: 'app/features/translation/create/create-translation.html',
      controller: function ($scope) {

        $scope.user = Parse.User.current();
        $scope.languages = availableLanguages.slice(0);
        $scope.dictionary = $rootScope.dictionary;

        $scope.addingTranslation = false;
        $scope.selectedLanguage = $scope.languages[0];
        $scope.sentence = "";

        $scope.setLanguage = function (language) {
          $scope.selectedLanguage = language;
        };

        $scope.addTranslation = function () {

          // first create the translation object
          TranslationService.createTranslation($scope.selectedLanguage.code, $scope.sentence).then(
            function (translation) {

              // then add the created object to existing translation bunch
              TranslationService.addTranslationToBunch($scope.bunch, translation).then(
                function (bunch) {
                },
                function (error) {
                  console.log(error);
                });
            },
            function (error) {
              console.error(error);
            }
          );
        };

        $scope.showAddTranslationForm = function () {
          $scope.addingTranslation = true;
          $scope.selectedLanguage = $scope.languages[0];
          $scope.translation = "";
        };

      }
    };
  }]);