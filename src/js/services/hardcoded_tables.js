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
    }).factory('groupTargetGrenadeConsumption', function () {
        return {
            flat: {
                supress: {
                    400: 1.94,
                    600: 2.24,
                    800: 2.79,
                    1000: 3.56,
                    1200: 3.94,
                    1400: 3.90,
                    1600: 3.65
                },
                destroy: {
                    400: 6.11,
                    600: 7.25,
                    800: 8.81,
                    1000: 11.24,
                    1200: 12.49,
                    1400: 12.40,
                    1600: 11.66
                }
            },
            hover: {
                supress: {
                    1000: 1.87,
                    1200: 2.14,
                    1400: 2.33,
                    1600: 2.93

                },
                destroy: {
                    1000: 5.87,
                    1200: 6.76,
                    1400: 7.34,
                    1600: 9.25

                }
            }
        }
    });
