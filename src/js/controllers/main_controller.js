angular.module('Vatra.controllers.Main', [
    'Vatra.services.Data'
]).controller('MainController', function ($scope, calculateSights) {
    $scope.types = [
        {label: 'Точечна (до 15х15)', value: 'single'},
        {label: 'Площинна (понад 15х15)', value: 'extended'},
        {label: 'Рухома', value: 'moving'}
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
        return $scope.data.type == 'extended' && $scope.data.front > 20;
    };

    $scope.showCollapsedFan = function () {
        return $scope.data.devicesNumber == 2 && $scope.singleTarget();
    };

    $scope.showWidthFan = function () {
        return $scope.data.devicesNumber == 2 && $scope.extendedTarget();
    };

    $scope.showInterval = function() {
        return $scope.data.devicesNumber == 2;
    };

    $scope.singleTarget = function () {
        return $scope.data.type == 'single';
    };

    $scope.extendedTarget = function () {
        return $scope.data.type == 'extended';
    };

    $scope.movingTarget = function () {
        return $scope.data.type == 'moving';
    };

    $scope.calculated = function () {
        return !(_.isEmpty($scope.result))
    };

    $scope.showMinimalSights = function () {
        return !(_.isEmpty($scope.result.minimalSights));
    };

    $scope.showSafeSights = function () {
        return $scope.data.ourForcesDistance > 0 && $scope.data.trajectory == 'flat';
    };

    $scope.isNotSafe = function () {
        if (!$scope.calculated()) {
            return false;
        }
        return $scope.result.sights.adjustedSights < $scope.result.sights.safeSights;
    };

    $scope.data = {
        devicesNumber: 1,
        type: 'single',
        trajectory: 'flat',
        task: 'supress',
        distance: 400,
        windSpeed: 0,
        temperature: 15,
        windDirection: 12,
        interval: 15,
        positionElevation: 100,
        targetElevation: 100,
        targetVelocityDirection: 0,
        targetVelocity: 0,
        ourForcesDistance: 0
    };
    $scope.result = {};

    $scope.count = function (data) {
        $scope.result = calculateSights(data);

        var invalidFlat = data.trajectory == 'flat' && $scope.result.sights.adjustedSights > 667;
        var invalidHover = data.trajectory == 'hover' &&
            ($scope.result.sights.adjustedSights < 768 || $scope.result.sights.adjustedSights > 1167);
        $scope.result.invalid = invalidFlat || invalidHover;
    };
});