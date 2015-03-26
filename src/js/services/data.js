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