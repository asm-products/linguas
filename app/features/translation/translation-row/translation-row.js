linguas.directive('translationListRow', ['$window', '$rootScope', 'TranslationService',
  function ($window, $rootScope, TranslationService) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        translation: '=translation',
        bunch: '=bunch'
      },
      templateUrl: 'app/features/translation/translation-row/translation-row.html',
      controller: function ($scope) {

        $scope.dictionary = $rootScope.dictionary

        if ($scope.translation.attributes && $scope.translation.attributes.owner && Parse.User.current()) {
          $scope.isOwner = Parse.User.current().id == $scope.translation.attributes.owner.id
        }

        $scope.removeTranslation = function () {

          TranslationService.deleteTranslation($scope.bunch, $scope.translation)
            .then(
            function (bunch) {

              // if there is no more translaitons left in bunch, reload the page
              if (bunch.attributes.translations.length == 0)
                $window.location.reload()
            },
            function (error) {
              console.log('Delete translation failed.')
              console.log(error)
            }
          )

        }

        $scope.listenTranslation = function (translation) {
          window.open("http://translate.google.com/translate_tts?ie=UTF-8&q=" + translation.attributes.sentence
              + "&tl=" + translation.attributes.language,
            translation.sentence, "width=400, height=150");
        }

        /*$scope.generateTranslatedWords = function (translation) {

         // finding the translated words in user's primary language
         */
        /*var translatedWords;
         if (translation.wordTranslations) {
         var indexOfTranslations = -1;
         for (var i = 0; i < translation.wordTranslations.length; i++) {
         if (translation.wordTranslations[i].language == $scope.primaryLanguage.code) {
         indexOfTranslations = i;
         }
         }

         if (indexOfTranslations != -1)
         translatedWords = translation.wordTranslations[indexOfTranslations].words
         }*/
        /*

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
         //            if (translatedWords) word.translation = translatedWords[i]

         // adding word to words array
         translation.words.push(word)
         }
         return translation;
         }*/
//        $scope.translation = $scope.generateTranslatedWords($scope.translation)

      }
    };
  }]);