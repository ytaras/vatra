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
    }).factory('calculateSights', function (grenadesConsumption, meteoAdjustments, sightsValues) {
        return function (data) {
            var result = {};
            result.grenadesConsumption = grenadesConsumption(data);
            result.meteoAdjustments = meteoAdjustments(data);
            result.sights = sightsValues(data, result.meteoAdjustments);
            return result;
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
    }).factory('sightsValues', function (sightsTable, derivationAdjustments, clockToRadian, sideWindAdjustment,
                                         temperatureOfAirAdjustment, temperatureOfShellAdjustment, pressureAdjustment,
                                         thinFork, distanceChangePer1M, flightTime,
                                         forwardWindAdjustment, lookupByDistance) {
        return function (data, meteoAdjustments) {
            var angleSign = 0;
            if (data.trajectory == 'flat') {
                angleSign = 1;
            } else if (data.trajectory == 'hover') {
                angleSign = -1;
            }

            var result = {
                originalSights: lookupByDistance(sightsTable[data.trajectory], meteoAdjustments.effectiveDistance),
                derivationAdjustment: lookupByDistance(derivationAdjustments[data.trajectory], meteoAdjustments.effectiveDistance),
                angleAdjustment: ((data.targetElevation - data.positionElevation) * 1000) / meteoAdjustments.effectiveDistance * angleSign,
                // TODO: Verify which distance should be used in following formulas:
                thinFork: lookupByDistance(thinFork[data.trajectory], data.distance),
                distanceChangePer1M: lookupByDistance(distanceChangePer1M[data.trajectory], meteoAdjustments.effectiveDistance),
                flightTime: lookupByDistance(flightTime[data.trajectory], meteoAdjustments.effectiveDistance),
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
