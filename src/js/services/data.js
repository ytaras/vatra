angular.module('Vatra.services.Data', ['Vatra.services.HardcodedTables'])
    .factory('grenadesConsumptionCoefficient', function (lookupByDistance, singleTargetGrenadeConsumption, groupTargetGrenadeConsumption) {
        return function (data) {
            var dictionary;
            if (data.type == 'single') {
                dictionary = singleTargetGrenadeConsumption[data.task];
            } else {
                dictionary = groupTargetGrenadeConsumption[data.trajectory][data.task];
            }
            return lookupByDistance(dictionary, data.distance)
        }
    }).factory('sightsValues', function (sightsTable, derivationAdjustments, clockToRadian, sideWindAdjustment, lookupByDistance) {
        return function (data) {
            var windDirection = clockToRadian(data.windDirection);
            var forwardWind = Math.cos(windDirection) * data.windSpeed;
            var sideWind = Math.sin(windDirection) * data.windSpeed;
            return {
                originalSights: lookupByDistance(sightsTable[data.trajectory], data.distance),
                derivationAdjustment: lookupByDistance(derivationAdjustments[data.trajectory], data.distance),
                sideWindAdjustment: lookupByDistance(sideWindAdjustment[data.trajectory], data.distance) * sideWind / 10,
                windInRadians: windDirection,
                forwardWind: forwardWind,
                sideWind: sideWind
            }
        }
    }).factory('clockToRadian', function () {
        return function (clock) {
            var degrees = (clock % 12) * 30;
            return degrees * (Math.PI / 180);
        }
    }).factory('lookupByDistance', function () {
        return function (table, distance) {
            error = Infinity;
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