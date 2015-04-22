angular.module("Vatra",
  ["ngRoute", "mobile-angular-ui", "underscore.string", "Vatra.controllers.Main", "Vatra.services.Data",
   "Vatra.services.Cordova", "ui.bootstrap.showErrors"]).config ($routeProvider) ->
  $routeProvider.when("/",
    redirectTo: "/input"
  ).when("/input",
    templateUrl: "input.html"
    reloadOnSearch: false
  ).when("/tasks",
    templateUrl: "tasks.html"
    reloadOnSearch: false
  ).when "/result",
    templateUrl: "result.html"
    reloadOnSearch: false