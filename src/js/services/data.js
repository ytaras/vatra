angular.module('Vatra.services.Data', ['Vatra.services.HardcodedTables'])
    .factory('grenadesConsumptionCoefficient', function (lookupByDistance, singleTargetGrenadeConsumption, groupTargetGrenadeConsumption) {
        return function (data) {
            var dictionary;
            if (data.type.value == 'single') {
                dictionary = singleTargetGrenadeConsumption[data.task];
            } else {
                dictionary = groupTargetGrenadeConsumption[data.trajectory][data.task];
            }
            return lookupByDistance(dictionary, data.distance)
        }
    }).factory('sightsValues', function (sightsTable, derivationAdjustments, clockToRadian, sideWindAdjustment,
                                         temperatureOfAirAdjustment, temperatureOfShellAdjustment, pressureAdjustment,
                                         thinFork, distanceChangePer1M, flightTime,
                                         forwardWindAdjustment, lookupByDistance, adjustSights) {
        return function (data) {
            var windDirection = clockToRadian(data.windDirection);
            var forwardWind = Math.cos(windDirection) * data.windSpeed;
            var sideWind = Math.sin(windDirection) * data.windSpeed;
            var normTemperature = data.temperature - 15;
            var normPressure = 9 * (data.positionElevation - 110) / 100;
            if (normPressure < 0) {
                normPressure = 0
            }
            var angleSign = 0;
            var trajectory = data.trajectory;
            if (trajectory == 'flat') {
                angleSign = 1;
            } else if (trajectory == 'hover') {
                angleSign = -1;
            }
            var result = {
                originalSights: lookupByDistance(sightsTable[trajectory], data.distance),
                derivationAdjustment: lookupByDistance(derivationAdjustments[trajectory], data.distance),
                sideWindAdjustment: lookupByDistance(sideWindAdjustment[trajectory], data.distance) * sideWind / 10,
                forwardWindAdjustment: lookupByDistance(forwardWindAdjustment[trajectory], data.distance) * forwardWind / 10,
                temperatureOfAirAdjustment: lookupByDistance(temperatureOfAirAdjustment[trajectory], data.distance) * normTemperature / 10,
                temperatureOfShellAdjustment: lookupByDistance(temperatureOfShellAdjustment[trajectory], data.distance) * normTemperature / 10,
                pressureAdjustment: lookupByDistance(pressureAdjustment[trajectory], data.distance) * normPressure / 10,
                angleAdjustment: ((data.targetElevation - data.positionElevation) * 1000) / data.distance * angleSign,
                thinFork: lookupByDistance(thinFork[trajectory], data.distance),
                distanceChangePer1M: lookupByDistance(distanceChangePer1M[trajectory], data.distance),
                flightTime: lookupByDistance(flightTime[trajectory], data.distance),
                windInRadians: windDirection,
                forwardWind: forwardWind,
                sideWind: sideWind,
                normalizedPressure: normPressure,
                oneDeviceFront: ((data.front * 100) / (data.distance * data.devicesNumber)),
                frontDispersal: 150 / data.distance,
                fan: (data.front - data.interval) * 10 / (data.distance * 2)
            };
            adjustSights(result);
            return result;
        }
    }).factory('adjustSights', function () {
        return function (result) {
            result.adjustedSights = result.originalSights + result.forwardWindAdjustment
            + result.temperatureOfAirAdjustment + result.temperatureOfShellAdjustment + result.pressureAdjustment
            + result.angleAdjustment;
            result.sideAdjustment = result.sideWindAdjustment + result.derivationAdjustment;
        }
    }).factory('clockToRadian', function () {
        return function (clock) {
            var degrees = (clock % 12) * 30;
            return degrees * (Math.PI / 180);
        }
    }).factory('lookupByDistance', function () {
        return function (table, distance) {
            var error = Infinity;
            var currentError;
            var key;
            for (var currentKey in table) {
                currentError = Math.abs(currentKey - distance);
                if (currentError < error) {
                    error = currentError;
                    key = currentKey;
                }
            }
            return table[key];
        }
    });