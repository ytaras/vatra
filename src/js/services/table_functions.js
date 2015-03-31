angular.module('Vatra.services.TableFunctions', [])
    .factory('averageByDistance', function () {
        return function (table, distance) {
            var availableDistances = _.map(_.keys(table), function (k) {
                return k * 1
            });
            var partitioned = _.partition(availableDistances, function (key) {
                return key < distance;
            });
            var distancesLessThen = _.sortBy(partitioned[0], _.identity());
            var distancesGreaterThen = _.sortBy(partitioned[1], _.identity());
            if (_.isEmpty(distancesLessThen)) {
                return table[distancesGreaterThen[0]];
            }
            if (_.isEmpty(distancesGreaterThen)) {
                return table[_.last(distancesLessThen)]
            }
            var closestLess = _.last(distancesLessThen);
            var closestGreater = distancesGreaterThen[0];
            var delta = closestGreater - closestLess;
            var greaterCoef = (distance - closestLess) / delta;
            var lessCoef = (closestGreater - distance) / delta;
            return lessCoef * table[closestLess] + greaterCoef * table[closestGreater];
        }
    }).factory('lookupSupportDistance', function () {
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
            return key;
        }
    }).factory('lookupByDistance', function (lookupSupportDistance) {
        return function (table, distance) {
            return table[lookupSupportDistance(table, distance)];
        }
    });
