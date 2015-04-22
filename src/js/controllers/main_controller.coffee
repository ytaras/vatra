angular.module("Vatra.controllers.Main",
  ["Vatra.services.Data"]).controller "MainController", ($scope, calculateSights) ->
  $scope.types = [
    label: "Точечна (до 15х15)"
    value: "single"
  ,
    label: "Площинна (понад 15х15)"
    value: "extended"
  ,
    label: "Рухома"
    value: "moving"
  ]
  $scope.trajectories = [
    label: "Настильна"
    value: "flat"
  ,
    label: "Навісна"
    value: "hover"
  ]
  $scope.tasks = [
    label: "Знищити"
    value: "destroy"
  ,
    label: "Подавити"
    value: "supress"
  ]
  $scope.counts = [
    label: "1"
    value: 1
  ,
    label: "2"
    value: 2
  ]
  $scope.tapOnTargetSize = ->
    alert "Виберіть характер цілі Площинна (понад 15х15)"  if $scope.singleTarget()

  $scope.showFrontDispersal = ->
    $scope.type = "extended" and $scope.data.front > 20

  $scope.showFan = ->
    ($scope.showFrontDispersal() or $scope.singleTarget()) and $scope.data.devicesNumber is 2

  $scope.singleTarget = ->
    $scope.data.type is "single"

  $scope.movingTarget = ->
    $scope.data.type is "moving"

  $scope.calculated = ->
    not (_.isEmpty($scope.result))

  $scope.showMinimalSights = ->
    not (_.isEmpty($scope.result.minimalSights))

  $scope.showSafeSights = ->
    $scope.data.ourForcesDistance > 0 and $scope.data.trajectory is "flat"

  $scope.isNotSafe = ->
    return false  unless $scope.calculated()
    $scope.result.sights.adjustedSights <= $scope.result.sights.safeSights

  $scope.data =
    devicesNumber: 1
    type: "single"
    trajectory: "flat"
    task: "supress"
    distance: 400
    front: 15
    depth: 15
    windSpeed: 0
    temperature: 15
    windDirection: 12
    interval: 15
    positionElevation: 100
    targetElevation: 100
    targetVelocityDirection: 0
    targetVelocity: 0
    ourForcesDistance: 0

  $scope.result = {}
  $scope.count = (data) ->
    $scope.result = calculateSights(data)
    invalidFlat = data.trajectory is "flat" and $scope.result.sights.adjustedSights > 667
    invalidHover = data.trajectory is "hover" and ($scope.result.sights.adjustedSights < 768 or $scope.result.sights.adjustedSights > 1167)
    $scope.result.invalid = invalidFlat or invalidHover
