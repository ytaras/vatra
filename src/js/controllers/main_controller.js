angular.module('Vatra.controllers.Main', [
    'Vatra.services.Data'
]).controller('MainController', function ($scope, grenadesConsumptionCoefficient, sightsValues) {
        $scope.data = {
            devicesNumber: 2,
            type: 'single',
            trajectory: 'flat',
            task: 'destroy',
            distance: 400,
            front: 20,
            depth: 20
        };
        $scope.result = {};

        $scope.count = function (data) {
            var result = {};
            result.grenadesCoeffitient = grenadesConsumptionCoefficient(data);
            result.totalGrenades = (result.grenadesCoeffitient * data.front * data.depth) / 100;
            result.grenadesPerDevice = result.totalGrenades / data.devicesNumber;
            result.sights = sightsValues(data);
            $scope.result = result;
        };
    });