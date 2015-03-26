angular.module('Vatra', [
  'ngRoute',
  'mobile-angular-ui',
  'Vatra.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {redirectTo: '/input'})
    .when('/input', {templateUrl:'input.html',  reloadOnSearch: false});
});