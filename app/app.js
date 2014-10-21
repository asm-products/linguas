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

tutorialProject.controller('RootController', ['$scope', '$window',
    function ($scope, $window) {

      $scope.user = Parse.User.current();
      console.log($scope.user)

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