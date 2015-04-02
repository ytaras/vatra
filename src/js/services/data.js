angular.module('Vatra.services.Data', ['Vatra.services.HardcodedTables', 'Vatra.services.TableFunctions'])
    .factory('grenadesConsumption', function (singleTargetGrenadeConsumption, groupTargetGrenadeConsumption, averageByDistance) {
        return function (data) {
            var dictionary;
            var result = {};
            var isPoint = (data.type == 'single') || (data.front <= 15 && data.depth <= 15);
            if (isPoint) {
                dictionary = singleTargetGrenadeConsumption[data.task];
                result.totalGrenades = averageByDistance(dictionary, data.distance);
            } else {
                dictionary = groupTargetGrenadeConsumption[data.trajectory][data.task];
                result.grenadesCoeffitient = averageByDistance(dictionary, data.distance);
                result.totalGrenades = (result.grenadesCoeffitient * data.front * data.depth) / 100;
            }
            result.grenadesPerDevice = result.totalGrenades / data.devicesNumber;
            return result;
        }
    }).factory('calculateSights', function (grenadesConsumption, meteoAdjustments, sightsValues, calculateMinimalSights) {
        return function (data) {
            var result = {};
            result.grenadesConsumption = grenadesConsumption(data);
            result.meteoAdjustments = meteoAdjustments(data);
            result.sights = sightsValues(data, result.meteoAdjustments);
            result.minimalSights = calculateMinimalSights(data);
            return result;
        }
    }).factory('calculateMinimalSights', function (minimalSightsForCrest, lookupByDistance, lookupSupportDistance, minimalDistanceForCrest) {
        return function (data) {
            if (!data.crestHeight || !data.crestDistance) {
                return {}
            }
            var row = lookupByDistance(minimalSightsForCrest, data.crestDistance);
            var crestSupportDistance = lookupSupportDistance(row, data.crestHeight);
            return {
                crestSupportDistance: crestSupportDistance,
                minimalSights: row[crestSupportDistance],
                minimalDistance: minimalDistanceForCrest[crestSupportDistance]
            }
        }
    }).factory('meteoAdjustments', function (forwardWindAdjustment, sideWindAdjustment, pressureAdjustment,
                                             temperatureOfAirAdjustment, temperatureOfShellAdjustment, clockToRadian,
                                             lookupByDistance) {
        return function (data) {
            var windDirection = clockToRadian(data.windDirection);
            var forwardWind = Math.cos(windDirection) * data.windSpeed;
            var sideWind = Math.sin(windDirection) * data.windSpeed;
            var normTemperature = data.temperature - 15;
            var normPressure = 9 * (data.positionElevation - 110) / 100;
            if (normPressure < 0) {
                normPressure = 0
            }
            var result = {
                forwardWind: forwardWind,
                sideWind: sideWind,
                forwardWindAdjustment: -lookupByDistance(forwardWindAdjustment[data.trajectory], data.distance) * forwardWind / 10,
                sideWindAdjustment: -lookupByDistance(sideWindAdjustment[data.trajectory], data.distance) * sideWind / 10,
                pressureAdjustment: lookupByDistance(pressureAdjustment[data.trajectory], data.distance) * normPressure / 10,
                temperatureOfAirAdjustment: lookupByDistance(temperatureOfAirAdjustment[data.trajectory], data.distance) * normTemperature / 10,
                temperatureOfShellAdjustment: lookupByDistance(temperatureOfShellAdjustment[data.trajectory], data.distance) * normTemperature / 10
            };
            result.effectiveDistance = data.distance + result.forwardWindAdjustment + result.pressureAdjustment +
            result.temperatureOfAirAdjustment + result.temperatureOfShellAdjustment;
            return result;
        }
    }).factory('sightsValues', function (sightsTable, derivationAdjustments,
                                         thinFork, distanceChangePer1M, flightTime,
                                         forwardWindAdjustment, lookupByDistance, lookupSupportDistance) {
        return function (data, meteoAdjustments) {
            var angleSign = 0;
            if (data.trajectory == 'flat') {
                angleSign = 1;
            } else if (data.trajectory == 'hover') {
                angleSign = -1;
            }
            var topoSupportDistance = lookupSupportDistance(sightsTable[data.trajectory], data.distance);
            var supportDistance = lookupSupportDistance(sightsTable[data.trajectory], meteoAdjustments.effectiveDistance);
            var supportSights = sightsTable[data.trajectory][supportDistance];
            var deltaX = distanceChangePer1M[data.trajectory][supportDistance];
            var precisionAdjustment = angleSign * (meteoAdjustments.effectiveDistance - supportDistance) / deltaX;
            var result = {
                supportSights: supportSights,
                precisionAdjustment: precisionAdjustment,
                originalSights: supportSights + precisionAdjustment,
                derivationAdjustment: derivationAdjustments[data.trajectory][topoSupportDistance],
                angleAdjustment: ((data.targetElevation - data.positionElevation) * 1000) / data.distance * angleSign,
                supportDistance: supportDistance,
                thinFork: lookupByDistance(thinFork[data.trajectory], data.distance),
                distanceChangePer1M: deltaX,
                flightTime: flightTime[data.trajectory][topoSupportDistance],
                oneDeviceFront: ((data.front * 10) / (data.distance * data.devicesNumber)),
                frontDispersal: 150 / data.distance,
                fan: (data.front - data.interval) * 10 / (data.distance * 2)
            };
            result.adjustedSights = result.originalSights + result.angleAdjustment;
            result.sideAdjustment = (meteoAdjustments.sideWindAdjustment + result.derivationAdjustment) * 0.01;
            return result;
        }
    }).factory('clockToRadian', function () {
        return function (clock) {
            var degrees = (clock % 12) * 30;
            return degrees * (Math.PI / 180);
        }
    });
