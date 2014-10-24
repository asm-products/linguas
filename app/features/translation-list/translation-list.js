tutorialProject.directive('translationList', ['TranslationService' , function () {
  return {
    restrict: 'AE',
    scope: {
      movie: '=info'
    },
    replace: true,
    templateUrl: 'app/features/translation-list/translation-list.html',
    controller: function ($scope, TranslationService) {

      // used for showing or hiding the 'add translation' button
      $scope.user = Parse.User.current();

      $scope.translationBunches = [];
      $scope.languages = availableLanguages;

      $scope.addTranslation = function (bunch) {

        TranslationService
          .addTranslationToBunch(bunch, bunch.newTranslation.selectedLanguage.code, bunch.newTranslation.sentence)
          .then(
          function (bunch) {
            console.log("Translation is successfully added to the bunch")
          },
          function (error) {
            console.log(error)
          })
      }

      $scope.removeTranslation = function (bunch, translation) {

        if (bunch.attributes.translations.length > 1) {
          // if there are other translations, just remove this one

          TranslationService.deleteTranslation(bunch, translation)
            .then(
            function (bunch) {
              console.log('Translation successfully deleted from bunch.')
            },
            function (error) {
              console.log('Delete translation failed.')
              console.log(error)
            }
          )
        } else {
          // if this is the last translation in the bunch, remove all bunch

          TranslationService.deleteBunch(bunch)
            .then(
            function (bunch) {

              for (var i = 0; i < $scope.translationBunches.length; i++) {
                if ($scope.translationBunches[i] == bunch) {
                  $scope.translationBunches.splice(i, 1);
                  break;
                }
              }
              console.log('Bunch is successfully deleted.')
            },
            function (error) {
              console.error('Deleting bunch failed.')
              console.error(error)
            }
          )
        }

      }

      $scope.listenTranslation = function (translation) {
        console.log(translation)

        window.open("http://translate.google.com/translate_tts?ie=UTF-8&q=" + translation.translation
            + "&tl=" + translation.language,
          translation.translation, "width=400, height=150");

      }

      $scope.getTranslations = function () {

        TranslationService.getTranslationBunches().then(
          function (results) {
            $scope.translationBunches = results;
          },
          function (error) {
            console.error(error)
          }
        )
      }
      $scope.getTranslations();

    },
    link: function (scope, element, attrs) {

    }
  };
}]);