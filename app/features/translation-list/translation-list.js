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

      $scope.setNewTranslationLanguage = function (bunch, language) {
        bunch.newTranslation.selectedLanguage = language;
      }

      $scope.addTranslation = function (bunch) {

        TranslationService
          .addTranslationToBunch(bunch, bunch.newTranslation.selectedLanguage.code, bunch.newTranslation.sentence)
          .then(
          function (bunch) {
            bunch = $scope.generateTranslatedWords(bunch)
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
              $scope.generateTranslatedWords(bunch)
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
        window.open("http://translate.google.com/translate_tts?ie=UTF-8&q=" + translation.sentence
            + "&tl=" + translation.language,
          translation.sentence, "width=400, height=150");

      }

      /*$scope.addWordTranslation = function (bunch, translation) {

       var wordTranslationScope = $scope.$new(true);
       wordTranslationScope.bunch = bunch
       wordTranslationScope.translation = translation
       wordTranslationScope.successListener = function (b) {
       bunch = $scope.generateTranslatedWords(b)
       }

       ngDialog.open({
       template: 'app/features/translation/word-translations/create/create-word-translation.html',
       className: 'ngdialog-theme-plain',
       scope: wordTranslationScope,
       controller: ['$scope', 'TranslationService', function ($scope, TranslationService) {

       var fromLanguage = availableLanguages.filter(function (obj) {
       return obj.code == $scope.translation.language;
       });
       $scope.fromLanguage = fromLanguage[0];

       $scope.words = $scope.translation.sentence.replace(/[!?.,]/g, '').split(" ")
       $scope.wTranslations = new Array($scope.words.length)
       $scope.languages = availableLanguages.slice(0)                              // copying array
       $scope.languages.splice($scope.languages.indexOf($scope.fromLanguage), 1)   // removing 'from' language
       $scope.toLanguage = $scope.languages[0]
       $scope.isInProgress = false

       $scope.setToLanguage = function (language) {
       $scope.toLanguage = language
       }

       $scope.addWordTranslations = function () {

       var wordTranslation = {
       language: $scope.toLanguage.code,
       words: $scope.wTranslations
       }

       if ($scope.translation.wordTranslations)
       $scope.translation.wordTranslations.push(wordTranslation);
       else
       $scope.translation.wordTranslations = [wordTranslation]

       $scope.isInProgress = true
       TranslationService.saveTranslationBunch(bunch).then(function () {
       $scope.successListener($scope.bunch)
       console.log('Translation bunch is successfully saved.')
       $scope.closeThisDialog()
       }, function () {
       $scope.isInProgress = false
       console.error('Tranlsation bunch save failed.')
       })
       }
       }]
       })
       }*/

      $scope.generateTranslatedWords = function (bunch) {

        // for each translation
        bunch.attributes.translations.forEach(function (translation) {

          // finding the translated words in user's primary language
          var translatedWords;
          if (translation.wordTranslations) {
            var indexOfTranslations = -1;
            for (var i = 0; i < translation.wordTranslations.length; i++) {
              if (translation.wordTranslations[i].language == $scope.primaryLanguage.code) {
                indexOfTranslations = i;
              }
            }

            if (indexOfTranslations != -1)
              translatedWords = translation.wordTranslations[indexOfTranslations].words
          }

          console.log(translation)
          var sentenceWords
          // creating words array
          if (translation.attributes)
            sentenceWords = translation.attributes.sentence.split(' ');
          else
            sentenceWords = translation.sentence.split(' ');
          translation.words = [];
          for (var i = 0; i < sentenceWords.length; i++) {
            var word = {
              value: sentenceWords[i]
            }

            // adding word translation if exists
            if (translatedWords) word.translation = translatedWords[i]

            // adding word to words array
            translation.words.push(word)
          }
        })
        return bunch;
      }

      $scope.getTranslations = function () {

        TranslationService.getTranslationBunches().then(
          function (results) {

            // for each translation bunch
            results.forEach(function (bunch) {
              $scope.generateTranslatedWords(bunch)
            })

            $scope.translationBunches = results;
          },
          function (error) {
            console.error(error)
          }
        )
      }
      $scope.getTranslations();

    }
  };
}]);