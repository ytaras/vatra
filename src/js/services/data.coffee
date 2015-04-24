angular.module("Vatra.services.Data",
  ["Vatra.services.HardcodedTables", "Vatra.services.TableFunctions"]).factory("grenadesConsumption",
(singleTargetGrenadeConsumption, groupTargetGrenadeConsumption, averageByDistance) ->
  (data) ->
    dictionary = undefined
    result = {}
    isPoint = (data.type is "single") or (data.front <= 15 and data.depth <= 15)
    if isPoint
      dictionary = singleTargetGrenadeConsumption[data.task]
      result.totalGrenades = averageByDistance(dictionary, data.distance)
    else
      dictionary = groupTargetGrenadeConsumption[data.trajectory][data.task]
      result.grenadesCoeffitient = averageByDistance(dictionary, data.distance)
      result.totalGrenades = (result.grenadesCoeffitient * data.front * data.depth) / 100
    result.grenadesPerDevice = result.totalGrenades / data.devicesNumber
    result
).factory("calculateSights",
(grenadesConsumption, meteoAdjustments, sightsValues, calculateMinimalSights, movingAdjustments) ->
  (data) ->
    result = {}
    result.grenadesConsumption = grenadesConsumption(data)
    result.meteoAdjustments = meteoAdjustments(data)
    result.movingAdjustments = movingAdjustments(data)
    result.sights = sightsValues(data, result.meteoAdjustments, result.movingAdjustments)
    result.minimalSights = calculateMinimalSights(data)
    result
).factory("calculateMinimalSights",
(minimalSightsForCrest, lookupByDistance, lookupSupportDistance, minimalDistanceForCrest) ->
  (data) ->
    return {}  if not data.crestHeight or not data.crestDistance
    row = lookupByDistance(minimalSightsForCrest, data.crestDistance)
    crestSupportDistance = lookupSupportDistance(row, data.crestHeight)
    crestSupportDistance: crestSupportDistance
    minimalSights: row[crestSupportDistance]
    minimalDistance: minimalDistanceForCrest[crestSupportDistance]
).factory("meteoAdjustments",
(forwardWindAdjustment, sideWindAdjustment, pressureAdjustment, temperatureOfAirAdjustment, temperatureOfShellAdjustment, clockToRadian, lookupByDistance) ->
  (data) ->
    windDirection = clockToRadian(data.windDirection)
    forwardWind = Math.cos(windDirection) * data.windSpeed
    sideWind = Math.sin(windDirection) * data.windSpeed
    normTemperature = data.temperature - 15
    normPressure = 9 * (data.positionElevation - 110) / 100
    normPressure = 0  if normPressure < 0
    result =
      forwardWind: forwardWind
      sideWind: sideWind
      forwardWindDistanceAdjustment: -lookupByDistance(forwardWindAdjustment[data.trajectory], data.distance) * forwardWind / 10
      sideWindAdjustment: -lookupByDistance(sideWindAdjustment[data.trajectory], data.distance) * sideWind / 10
      pressureAdjustment: lookupByDistance(pressureAdjustment[data.trajectory], data.distance) * normPressure / 10
      temperatureOfAirAdjustment: lookupByDistance(temperatureOfAirAdjustment[data.trajectory],
        data.distance) * normTemperature / 10
      temperatureOfShellAdjustment: lookupByDistance(temperatureOfShellAdjustment[data.trajectory],
        data.distance) * normTemperature / 10

    result.effectiveDistance = data.distance + result.forwardWindDistanceAdjustment + result.pressureAdjustment + result.temperatureOfAirAdjustment + result.temperatureOfShellAdjustment
    result
).factory("movingAdjustments", (clockToRadian, kmphToMps, lookupByDistance, flightTime) ->
  (data) ->
    targetVelocity = undefined
    if data.type is "moving"
      targetVelocity = kmphToMps(data.targetVelocity)
    else
      targetVelocity = 0
    result =
      flightTime: lookupByDistance(flightTime[data.trajectory], data.distance)
      targetVelocityDirection: clockToRadian(data.targetVelocityDirection)
      targetVelocity: targetVelocity

    result.forwardVelocity = Math.cos(result.targetVelocityDirection) * result.targetVelocity
    result.sideVelocity = Math.sin(result.targetVelocityDirection) * result.targetVelocity
    result.forwardOffset = result.forwardVelocity * result.flightTime
    result.sideOffset = result.sideVelocity * result.flightTime
    result
).factory("sightsValues",
(sightsTable, derivationAdjustments, thinFork, distanceChangePer1M, flightTime, forwardWindAdjustment, lookupByDistance, lookupSupportDistance) ->
  (data, meteoAdjustments, movingAdjustments) ->
    angleSign = 0
    if data.trajectory is "flat"
      angleSign = 1
    else angleSign = -1  if data.trajectory is "hover"
    fan = undefined
    if data.type is "single"
      fan = data.interval * 5 / data.distance
    else fan = (data.interval - data.front) * 5 / data.distance  if data.type is "extended"
    topoSupportDistance = lookupSupportDistance(sightsTable[data.trajectory], data.distance)
    supportDistance = lookupSupportDistance(sightsTable[data.trajectory], meteoAdjustments.effectiveDistance)
    supportSights = sightsTable[data.trajectory][supportDistance]
    deltaX = distanceChangePer1M[data.trajectory][supportDistance]
    precisionAdjustment = angleSign * (meteoAdjustments.effectiveDistance - supportDistance) / deltaX
    result =
      supportSights: supportSights
      precisionAdjustment: precisionAdjustment
      originalSights: supportSights + precisionAdjustment
      derivationAdjustment: derivationAdjustments[data.trajectory][topoSupportDistance]
      angleAdjustment: ((data.targetElevation - data.positionElevation) * 1000) / data.distance * angleSign
      supportDistance: supportDistance
      thinFork: lookupByDistance(thinFork[data.trajectory], data.distance)
      distanceChangePer1M: deltaX
      flightTime: flightTime[data.trajectory][topoSupportDistance]
      oneDeviceFront: ((data.front * 10) / (data.distance * data.devicesNumber))
      frontDispersal: 150 / data.distance
      fan: fan

    result.forwardMovingAdjustment = movingAdjustments.forwardOffset / deltaX
    result.sideMovingAdjustment = (movingAdjustments.sideOffset * 1000) / data.distance
    result.adjustedSights = result.originalSights + result.angleAdjustment + result.forwardMovingAdjustment
    result.sideAdjustment = (meteoAdjustments.sideWindAdjustment + result.derivationAdjustment + result.sideMovingAdjustment) * 0.01
    if data.ourForcesDistance > 0
      safeDistance = data.ourForcesDistance + 300
      result.safeSights = lookupByDistance(sightsTable[data.trajectory], safeDistance)
    result
).factory("kmphToMps", ->
  (kmph) ->
    kmph * 100 / 6
).factory "clockToRadian", ->
  (clock) ->
    degrees = (clock % 12) * 30
    degrees * (Math.PI / 180)
