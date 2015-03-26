angular.module('Vatra.services.HardcodedTables', [])
    .factory('singleTargetGrenadeConsumption', function () {
        return {
            destroy: {
                400: 4,
                600: 6,
                800: 8,
                1000: 10,
                1200: 12,
                1400: 13,
                1600: 15
            },
            supress: {
                400: 6,
                600: 9,
                800: 12,
                1000: 16,
                1200: 19,
                1400: 21,
                1600: 24
            }
        };
    });
