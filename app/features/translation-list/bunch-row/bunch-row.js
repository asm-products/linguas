linguas.directive('bunchRow', ['$window', 'TranslationService',
  function ($window, TranslationService) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        bunch: '=bunch'
      },
      templateUrl: 'app/features/translation-list/bunch-row/bunch-row.html',
      controller: function ($scope) {



      }
    };
  }]);