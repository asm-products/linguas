linguas.controller('MainStreamController', ['$scope', '$rootScope', '$window', '$routeParams', '$localStorage', 'TranslationService',
    function ($scope, $rootScope, $window, $routeParams, $localStorage, TranslationService) {

      $scope.user = Parse.User.current();
      $scope.level = $routeParams.level ? $routeParams.level : 'a1'
      $rootScope.level = $scope.level

      $scope.translationBunches = null;
      $scope.languages = availableLanguages.slice(0);

      $scope.primaryLanguage = $localStorage.primaryLanguage || availableLanguages[0];

      $scope.levelTitle = $rootScope.dictionary[$scope.level]

      $scope.getTranslationBunches = function () {

        TranslationService.getTranslationBunches($scope.level).then(
          function (results) {
            $scope.translationBunches = results;
          },
          function (error) {
            console.error(error)
          }
        )
      }
      $scope.getTranslationBunches();

    }]
);
