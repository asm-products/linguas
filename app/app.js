Parse.initialize("1OvgqBw2CbJZ5imywS7BnQYcSv5ZxhDoUxjMKMBu", "9S6LjTTm9iyLiTrsqgTieRdQB7TXrM6020F3tmKV");

window.fbAsyncInit = function () {
  Parse.FacebookUtils.init({ // this line replaces FB.init({
    appId: '395094303975272', // Facebook App ID
    status: true, // check Facebook Login status
    cookie: true, // enable cookies to allow Parse to access the session
    xfbml: true,
    version: 'v2.1'
  });

  // Run code after the Facebook SDK is loaded.
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* end of parse and facebook configuration  */


var availableLanguages = [
  {name: 'English', code: 'en-us'},
  {name: 'Turkish', code: 'tr-tr'},
  {name: 'German', code: 'de-de'},
  {name: 'Arabic', code: 'ar-sa'},
  {name: 'Russian', code: 'ru-ru'},
  {name: 'Spanish', code: 'es-es'},
  {name: 'French', code: 'fr-fr'}
];

var linguas = angular.module('TranslationFeedApp', ['ngStorage', 'ngDialog', 'ui.bootstrap', 'ui.bootstrap.tooltip', 'ui.bootstrap.dropdown'])

linguas.config(['$httpProvider', function ($httpProvider) {
//  $httpProvider.defaults.useXDomain = true;
//  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

linguas.controller('RootController', ['$scope', '$window', '$localStorage', 'DictionaryService',
    function ($scope, $window, $localStorage, DictionaryService) {

      $scope.description = "<span class='description'><span class='linguas-title'>Linguas</span>, " + DictionaryService.en.description + "</span>";

      $scope.user = Parse.User.current();
      $scope.primaryLanguage;

      $scope.logout = function () {
        Parse.User.logOut();
        $window.location.reload();
      };

      // getting primary language if selected before
      var isLanguageSet = false;
      if ($localStorage.primaryLanguage) {
        var languages = availableLanguages.filter(function (language) {
          return language.code == $localStorage.primaryLanguage.code;
        });
        $scope.primaryLanguage = languages[0]
      } else {
        $scope.primaryLanguage = availableLanguages[0]
      }

      $scope.setPrimaryLanguage = function (language) {
        $scope.primaryLanguage = language;
        $localStorage.primaryLanguage = $scope.primaryLanguage;
        setTimeout(function () {
          $window.location.reload();
        }, 300);
      }

      cheet('o p e n s i m s i m', function () {
        $scope.opensimsim = true;
        $scope.$apply();
      });
    }]
);

linguas.factory('TranslationService', function ($q) {

  return {

    trimTranslationBunch: function (translationBunch) {

      // deleting the temporarily added values
      translationBunch.attributes.translations.forEach(function (translation) {
        delete translation.words;
      });
      return translationBunch
    },

    saveTranslationBunch: function (translationBunch) {
      var mDefer = $q.defer();
      /*
       // deleting the temporarily added values
       translationBunch.attributes.translations.forEach(function (translation) {
       delete translation.words;
       });*/

      translationBunch = this.trimTranslationBunch((translationBunch))

      translationBunch.save(null, {
        success: function (translationBunch) {
          mDefer.resolve(translationBunch);
        },
        error: function (translationBunch, error) {
          mDefer.reject(error);
        }
      });

      return mDefer.promise;
    },

    createTranslationBunch: function (language, sentence) {
      var mDefer = $q.defer();

      var user = Parse.User.current();
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      if (language && sentence.length > 0) {

        var TranslationBunch = Parse.Object.extend("TranslationBunch");
        var translationBunch = new TranslationBunch();

        var translations = [
          {
            language: language.code,
            sentence: sentence,
            owner: user.id
          }
        ];
        translationBunch.set("translations", translations);

        translationBunch.save(null, {
          success: function (translationBunch) {
            mDefer.resolve(translationBunch);
          },
          error: function (translationBunch, error) {
            mDefer.reject(error);
          }
        });

      }

      return mDefer.promise;
    },

    getTranslationBunches: function () {
      var mDefer = $q.defer();

      var TranslationBunch = Parse.Object.extend("TranslationBunch");
      var query = new Parse.Query(TranslationBunch);
      query.descending("createdAt");
      query.find({
        success: function (results) {
          mDefer.resolve(results);
        },
        error: function (error) {
          mDefer.reject(error);
        }
      });

      return mDefer.promise;
    },

    addTranslationToBunch: function (bunch, language, sentence) {
      var mDefer = $q.defer();

      var user = Parse.User.current();

      if (!user) {
        mDefer.reject("User is not logged in.");

      } else if (language && sentence.length > 0) {

        var translation = {
          language: language,
          sentence: sentence,
          owner: user.id
        }

        bunch.attributes.translations.push(translation);
        return this.saveTranslationBunch(bunch)

      } else {
        mDefer.reject("Invalid attributes. Language or sentence is missing.");
      }

      return mDefer.promise;
    },

    deleteTranslation: function (bunch, translation) {
      var mDefer = $q.defer();

      if (!Parse.User.current()) {
        console.error("User is not logged in.");
        return;
      }

      var translationCount = bunch.attributes.translations.length

      // iterating through all translations, finding the index and splicing the list
      for (var i = 0; i < translationCount; i++) {
        if (bunch.attributes.translations[i] == translation) {
          bunch.attributes.translations.splice(i, 1);
          break;
        }
      }

      // if the length is still same, no translation is removed
      if (translationCount == bunch.attributes.translations.length)
        mDefer.reject();
      else
        return this.saveTranslationBunch(bunch)

      return mDefer.promise;
    },

    deleteBunch: function (bunch) {
      var mDefer = $q.defer();

      if (!Parse.User.current()) {
        console.error("User is not logged in.");
        return;
      }

      bunch.destroy({
        success: function (bunch) {
          mDefer.resolve(bunch);
        },
        error: function (myObject, error) {
          mDefer.reject(error);
        }
      });

      return mDefer.promise;
    }

  }
})


linguas.factory('DictionaryService', function ($q) {

  return {

    en: {
      description: "Translation Feed is a page where we share a new sentence everyday."
        + "The translations in other languages are added by the other users voluntarily. You can use it without signing in "
        + "but we'd like you to join us and help others to learn and practice languages."
        + "<br/>Thanks in advance!"
    }

  }
})

