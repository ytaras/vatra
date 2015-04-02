angular.module('Vatra.controllers.Main', [
    'Vatra.services.Data'
]).controller('MainController', function ($scope, calculateSights) {
    $scope.types = [
        {label: 'Точечна (до 15х15)', value: 'single'},
        {label: 'Площинна (понад 15х15)', value: 'extended'}
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
        return $scope.type = 'extended' && $scope.data.front > 20;
    };

    $scope.showFan = function () {
        return ($scope.showFrontDispersal() || $scope.singleTarget()) && $scope.data.devicesNumber == 2;
    };

    $scope.singleTarget = function () {
        return $scope.data.type == 'single';
    };

    $scope.calculated = function () {
        return !(_.isEmpty($scope.result))
    };

    $scope.showMinimalSights = function () {
        return !(_.isEmpty($scope.result.minimalSights));
    };

    $scope.data = {
        devicesNumber: 1,
        type: 'single',
        trajectory: 'flat',
        task: 'supress',
        distance: 400,
        front: 15,
        depth: 15,
        windSpeed: 0,
        temperature: 15,
        windDirection: 12,
        interval: 15,
        positionElevation: 100,
        targetElevation: 100
    };
    $scope.result = {};

    $scope.count = function (data) {
        $scope.result = calculateSights(data);
    };
});