Parse.initialize("1OvgqBw2CbJZ5imywS7BnQYcSv5ZxhDoUxjMKMBu", "9S6LjTTm9iyLiTrsqgTieRdQB7TXrM6020F3tmKV");

var availableLanguages = [
  {name: 'English', code: 'en-us'},
  {name: 'Turkish', code: 'tr-tr'},
  {name: 'German (Germany)', code: 'de-de'},
  {name: 'Arabic (S.Arabia)', code: 'ar-sa'},
  {name: 'Russian', code: 'ru-ru'},
  {name: 'Spanish (Spain)', code: 'es-es'},
  {name: 'French (France)', code: 'fr-fr'}
];

var tutorialProject = angular.module('TranslationFeedApp', [])

tutorialProject.config(['$httpProvider', function ($httpProvider) {
//  $httpProvider.defaults.useXDomain = true;
//  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

tutorialProject.controller('RootController', ['$scope',
    function ($scope) {

      cheet('o p e n s i m s i m', function () {
        $scope.opensimsim = true;
        $scope.$apply();
      });
    }]
);