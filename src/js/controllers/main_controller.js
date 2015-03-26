angular.module('Vatra.controllers.Main', [
    'Vatra.services.Data'
]).controller('MainController', function ($scope, grenadesConsumptionCoefficient, sightsValues) {
    $scope.types = [
        {label: 'Одиночна', value: 'single'},
        {label: 'Площинна', value: 'extended'}
    ];
    $scope.trajectories = [
        {label: 'Настильна', value: 'flat'},
        {label: 'Навісна', value: 'hover'}
    ];

    $scope.tasks = [
        {label: 'Знищити', value: 'destroy'},
        {label: 'Подавити', value: 'supress'}
    ];
    $scope.counts = [
        {label: '1', value: 1},
        {label: '2', value: 2}
    ];

    $scope.data = {
            devicesNumber: 2,
            type: 'single',
            trajectory: 'flat',
        task: 'supress',
            distance: 400,
            front: 20,
        depth: 20,
        windSpeed: 0,
        temperature: 15,
        windDirection: 12
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