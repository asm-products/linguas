tutorialProject.directive('translationList', function () {
  return {
    restrict: 'AE',
    scope: {
      movie: '=info'
    },
    replace: true,
    templateUrl: 'app/features/translation-list/translation-list.html',
    controller: function ($scope) {

      $scope.user = Parse.User.current();

      $scope.translationBunches = [];
      $scope.languages = availableLanguages;

      $scope.addTranslation = function (bunch) {

        if (!$scope.user) console.error("User doesn't exist.");

        if (bunch.newTranslation.selectedLanguage && bunch.newTranslation.sentence.length > 0) {

          var newTranslation = {
            language: bunch.newTranslation.selectedLanguage.code,
            translation: bunch.newTranslation.sentence,
            owner: $scope.user.id
          };

          bunch.attributes.translations.push(newTranslation);
          bunch.save(null, {
            success: function (bunch) {
              console.log(bunch)
            }
          });
        }
      }

      $scope.removeTranslation = function (bunch, translation) {

        // if there are other translations, just remove this one
        if (bunch.attributes.translations.length > 1) {
          for (var i = 0; i < bunch.attributes.translations.length; i++) {
            if (bunch.attributes.translations[i] == translation) {
              bunch.attributes.translations.splice(i, 1);
              break;
            }
          }

          bunch.save(null, {
            success: function (bunch) {
              console.log(bunch)
              console.log('translation successfully removed from bunch')
            }
          });

        } else {
          // if there is no more translation, remove whole bunch
          bunch.destroy({
            success: function (bunch) {

              for (var i = 0; i < $scope.translationBunches.length; i++) {
                if ($scope.translationBunches[i] == bunch) {
                  $scope.translationBunches.splice(i, 1);
                  $scope.$apply();
                  break;
                }
              }
              console.log('bunch is successfully removed')
            },
            error: function (myObject, error) {
              console.error('bunch remove failed')
            }
          });
        }

      }

      $scope.listenTranslation = function (translation) {
        console.log(translation)

        window.open("http://translate.google.com/translate_tts?ie=UTF-8&q=" + translation.translation
            + "&tl=" + translation.language,
          translation.translation, "width=400, height=150");

      }

      $scope.getTranslations = function () {
        var TranslationBunch = Parse.Object.extend("TranslationBunch");
        var query = new Parse.Query(TranslationBunch);
        query.descending("createdAt");
        query.find({
          success: function (results) {

            $scope.translationBunches = results;
            $scope.$apply()
          },
          error: function (error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
      }
      $scope.getTranslations();

    },
    link: function (scope, element, attrs) {

    }
  };
});