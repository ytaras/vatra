angular.module('Vatra', [
  'ngRoute',
  'mobile-angular-ui',
  'Vatra.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});