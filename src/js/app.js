angular.module('Vatra', [
  'ngRoute',
  'mobile-angular-ui',
  'Vatra.controllers.Main',
  'Vatra.services.Data',
  'Vatra.services.Cordova'

])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {redirectTo: '/input'})
    .when('/input', {templateUrl:'input.html',  reloadOnSearch: false})
    .when('/result', {templateUrl:'result.html',  reloadOnSearch: false});
});