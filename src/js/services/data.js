angular.module('Vatra.services.Data', ['Vatra.services.HardcodedTables'])
    .factory('grenadesCoeffitient', function (singleTargetGrenadesCoef) {
        return function (data) {
            if (data.type == 'single') {
                return singleTargetGrenadesCoef(data.task, data.distance);
            } else {
                console.log('Not supported');
            }
        }
    }).factory('singleTargetGrenadesCoef', function (lookupByDistance, singleTargetGrenadeConsumption) {
        return function (task, distance) {
            return lookupByDistance(singleTargetGrenadeConsumption[task], distance);
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