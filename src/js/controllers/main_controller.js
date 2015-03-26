angular.module('Vatra.controllers.Main', [
  'Vatra.services.Data'
  ])

.controller('MainController', function($scope, grenadesCoeffitient){
  $scope.data = {
    devicesNumber: 2,
    type: 'single',
    trajectory: 'flat',
    distance: 400,
    front: 20,
    depth: 20
  }
  $scope.result = {};

  $scope.count = function (data) {
    result = {};
    result.grenadesCoeffitient = grenadesCoeffitient(data);
    result.totalGrenades = (result.grenadesCoeffitient * data.front * data.depth) / 100;
    result.grenadesPerDevice = result.totalGrenades / data.devicesNumber;
    $scope.result = result;
  };
});