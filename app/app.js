var linguas = angular.module('TranslationFeedApp', ['ngStorage', 'ngRoute', 'ngDialog', 'ui.bootstrap', 'ui.bootstrap.tooltip', 'ui.bootstrap.dropdown'])

linguas.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
//  $httpProvider.defaults.useXDomain = true;
//  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $httpProvider.interceptors.push('AuthenticationInterceptor');

  $routeProvider.
    when('/', {
      templateUrl: 'app/features/main-stream/main-stream.html'
    })
    .when('/:level', {
      templateUrl: 'app/features/main-stream/main-stream.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}
]);

linguas.controller('RootController', ['$scope', '$window', '$routeParams', '$localStorage', 'DictionaryService',
    function ($scope, $window, $routeParams, $localStorage, DictionaryService) {

      $scope.user = Parse.User.current();

      $scope.logout = function () {
        Parse.User.logOut();
        $window.location.reload();
      };

      cheet('o p e n s i m s i m', function () {
        $scope.opensimsim = true;
        $scope.$apply();
      });
    }]
);

linguas.factory('TranslationService', function ($q, $http) {

  return {

    saveTranslationBunch: function (translationBunch) {
      var mDefer = $q.defer();

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

    createTranslation: function (languageCode, sentence, level) {
      var mDefer = $q.defer();

      var user = Parse.User.current();
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      if (languageCode && sentence.length > 0) {

        var Translation = Parse.Object.extend("Translation");
        var translation = new Translation();
        translation.set("language", languageCode)
        translation.set("sentence", sentence)
        translation.set("owner", user)

        translation.save(null, {
          success: function (translation) {
            mDefer.resolve(translation);
          },
          error: function (translation, error) {
            mDefer.reject(error);
          }
        });

      }

      return mDefer.promise;
    },

    createTranslationBunch: function (initialTranslation, level) {
      var mDefer = $q.defer();

      var user = Parse.User.current();
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      if (initialTranslation) {

        var TranslationBunch = Parse.Object.extend("TranslationBunch");
        var translationBunch = new TranslationBunch();

        var translations = [initialTranslation];
        translationBunch.set("level", level);
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

    getTranslationBunches: function (level) {
      var mDefer = $q.defer();

      if (!level) level = 'a1'

      var conditions = '{"level":"' + level + '"}'

      console.log(conditions)
      $http.get(
        'https://api.parse.com/1/classes/TranslationBunch',
        {
          params: {
            where: conditions,
            include: 'translations.owner',
            order: '-createdAt'
          }
        })
        .success(function (data, status, headers, config) {
          mDefer.resolve(data.results);
        }).
        error(function (data, status, headers, config) {
          mDefer.reject(data);
        });

      /*var TranslationBunch = Parse.Object.extend("TranslationBunch");
      var query = new Parse.Query(TranslationBunch);
      query.equalTo("level", level);
      query.include("translations.owner");
      query.descending("createdAt");
      query.find({
        success: function (results) {
          mDefer.resolve(results);
        },
        error: function (error) {
          mDefer.reject(error);
        }
      });*/

      return mDefer.promise;
    },

    addTranslationToBunch: function (bunch, translation) {
      var mDefer = $q.defer();

      var user = Parse.User.current();

      if (!user) {
        mDefer.reject("User is not logged in.");

      } else if (translation) {

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

      translation.destroy({
        success: function (translation) {

          // iterating through all translations, finding the index and splicing the list
          for (var i = 0; i < bunch.attributes.translations.length; i++) {
            if (bunch.attributes.translations[i] == translation) {
              bunch.attributes.translations.splice(i, 1);
              break;
            }
          }

          if (bunch.attributes.translations.length > 0) {
            // if there are more translations, just save the bunch
            bunch.save(null, {
              success: function (bunch) {
                mDefer.resolve(bunch);
              },
              error: function (bunch, error) {
                mDefer.reject(error);
              }
            });

          } else {
            // if there are no more translations left, delete the bunch too
            bunch.destroy({
              success: function (bunch) {
                mDefer.resolve(bunch);
              },
              error: function (myObject, error) {
                mDefer.reject(error);
              }
            });
          }
        },
        error: function (myObject, error) {
          mDefer.reject(error);
        }
      });

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

linguas.factory('AuthenticationInterceptor', ['$rootScope', '$q', '$window', '$location', function ($rootScope, $q, $window, $location) {
  var request = function (config) {
    if (config && config.url) {
      var isParseRequest = config.url.indexOf('api.parse.com') > 0

      if (isParseRequest) {
        console.log(config.url)

        config.headers = config.headers || {};
        config.headers['X-Parse-Application-Id'] = '1OvgqBw2CbJZ5imywS7BnQYcSv5ZxhDoUxjMKMBu'
        config.headers['X-Parse-REST-API-Key'] = 'YoQCqXUxj0rVFWLfVdpHHBoT6zcVIyiU5kX6FYPK'
      }

    }
    return config;
  };
  /*
   var response = function (response) {
   return response || $q.when(response);
   };

   var responseError = function (response) {
   if (response.status === 401) {
   $window.localStorage.removeItem('user');
   $window.localStorage.removeItem('profile');
   */
  /*
   if($window.fbAsyncInit){
   $window.fbAsyncInit();
   }
   */
  /*
   } else if (response.status === 403) {
   console.log("User not authorized to login into maidan.");
   toastr.info("Unfortunately you are not allowed to signup yet. Stay patient.");
   }
   return response || $q.when(response);
   };*/

  return {
    request: request
  };
}])

