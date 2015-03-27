angular.module('Vatra.controllers.Main', [
    'Vatra.services.Data'
]).controller('MainController', function ($scope, grenadesConsumption, sightsValues) {
    $scope.types = [
        {label: 'Точечна', value: 'single'},
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

    $scope.showFrontDispersal = function () {
        return $scope.data.front > 20;
    };

    $scope.showFan = function () {
        return $scope.showFrontDispersal() && $scope.data.devicesNumber == 2;
    };

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
        windDirection: 12,
        interval: 15
        };
        $scope.result = {};

        $scope.count = function (data) {
            var result = {};
            result.grenades = grenadesConsumption(data);
            result.sights = sightsValues(data);
            $scope.result = result;
        };
    });