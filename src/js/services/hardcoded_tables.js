angular.module('Vatra.services.HardcodedTables', [
    'Vatra.services.TableFunctions'
])
    .factory('singleTargetGrenadeConsumption', function () {
        return {
            supress: {
                400: 4,
                600: 6,
                800: 8,
                1000: 10,
                1200: 12,
                1400: 13,
                1600: 15
            },
            destroy: {
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
    }).factory('sightsTable', function () {
        return {
            flat: {
                50: 2,
                100: 9,
                150: 17,
                200: 25,
                250: 33,
                300: 41,
                350: 49,
                400: 58,
                450: 67,
                500: 76,
                550: 86,
                600: 96,
                650: 106,
                700: 116,
                750: 127,
                800: 139,
                850: 151,
                900: 161,
                950: 177,
                1000: 191,
                1050: 206,
                1100: 221,
                1150: 237,
                1200: 254,
                1250: 273,
                1300: 292,
                1350: 313,
                1400: 335,
                1450: 359,
                1500: 386,
                1550: 417,
                1600: 453,
                1650: 496,
                1700: 557,
                1730: 667
            },
            hover: {
                1700: 768,
                1650: 833,
                1600: 879,
                1550: 917,
                1500: 949,
                1450: 978,
                1400: 1005,
                1350: 1029,
                1300: 1052,
                1250: 1074,
                1200: 1094,
                1150: 1113,
                1100: 1131,
                1050: 1149,
                1000: 1167
            }
        }
    }).factory('derivationAdjustments', function () {
        return {
            flat: {
                50: 0,
                100: 0,
                150: 0,
                200: -1,
                250: -1,
                300: -1,
                350: -1,
                400: -1,
                450: -1,
                500: -1,
                550: -1,
                600: -2,
                650: -2,
                700: -2,
                750: -3,
                800: -3,
                850: -3,
                900: -4,
                950: -4,
                1000: -5,
                1050: -5,
                1100: -6,
                1150: -6,
                1200: -7,
                1250: -7,
                1300: -8,
                1350: -8,
                1400: -9,
                1450: -10,
                1500: -11,
                1550: -12,
                1600: -14,
                1650: -16,
                1700: -19,
                1730: -24
            },
            hover: {
                1700: -30,
                1650: -35,
                1600: -39,
                1550: -43,
                1500: -47,
                1450: -51,
                1400: -54,
                1350: -58,
                1300: -62,
                1250: -66,
                1200: -70,
                1150: -75,
                1100: -80,
                1050: -85,
                1000: -90

            }
        }
    }).factory('sideWindAdjustment', function () {
        return {
            flat: {
                50: -1,
                100: -1,
                150: -2,
                200: -3,
                250: -4,
                300: -5,
                350: -5,
                400: -6,
                450: -6,
                500: -7,
                550: -8,
                600: -8,
                650: -9,
                700: -9,
                750: -10,
                800: -10,
                850: -11,
                900: -12,
                950: -13,
                1000: -14,
                1050: -15,
                1100: -16,
                1150: -17,
                1200: -18,
                1250: -19,
                1300: -21,
                1350: -22,
                1400: -23,
                1450: -24,
                1500: -25,
                1550: -27,
                1600: -29,
                1650: -32,
                1700: -36,
                1730: -41
            },
            hover: {
                1700: -48,
                1650: -53,
                1600: -57,
                1550: -60,
                1500: -64,
                1450: -67,
                1400: -71,
                1350: -74,
                1300: -78,
                1250: -82,
                1200: -87,
                1150: -91,
                1100: -96,
                1050: -101,
                1000: -106

            }
        }
    }).factory('forwardWindAdjustment', function () {
        return {
            flat: {
                50: 0,
                100: 0,
                150: -1,
                200: -2,
                250: -3,
                300: -4,
                350: -5,
                400: -6,
                450: -7,
                500: -8,
                550: -9,
                600: -11,
                650: -13,
                700: -15,
                750: -17,
                800: -19,
                850: -22,
                900: -25,
                950: -28,
                1000: -31,
                1050: -34,
                1100: -37,
                1150: -40,
                1200: -43,
                1250: -47,
                1300: -51,
                1350: -56,
                1400: -61,
                1450: -66,
                1500: -71,
                1550: -77,
                1600: -84,
                1650: -92,
                1700: -102,
                1730: -117

            },
            hover: {
                1700: -127,
                1650: -131,
                1600: -133,
                1550: -135,
                1500: -136,
                1450: -136,
                1400: -136,
                1350: -136,
                1300: -136,
                1250: -135,
                1200: -135,
                1150: -134,
                1100: -134,
                1050: -133,
                1000: -133

            }
        }
    }).factory('temperatureOfAirAdjustment', function () {
        return {
            flat: {
                50: 0,
                100: 0,
                150: 0,
                200: -1,
                250: -1,
                300: -2,
                350: -2,
                400: -2,
                450: -3,
                500: -3,
                550: -3,
                600: -4,
                650: -4,
                700: -5,
                750: -5,
                800: -6,
                850: -6,
                900: -7,
                950: -8,
                1000: -9,
                1050: -10,
                1100: -11,
                1150: -12,
                1200: -13,
                1250: -14,
                1300: -15,
                1350: -16,
                1400: -17,
                1450: -18,
                1500: -19,
                1550: -21,
                1600: -22,
                1650: -23,
                1700: -25,
                1730: -26
            },
            hover: {
                1700: -26,
                1650: -26,
                1600: -26,
                1550: -25,
                1500: -24,
                1450: -23,
                1400: -23,
                1350: -22,
                1300: -21,
                1250: -21,
                1200: -20,
                1150: -19,
                1100: -18,
                1050: -18,
                1000: -17
            }
        }
    }).factory('temperatureOfShellAdjustment', function () {
        return {
            flat: {
                50: 0,
                100: -1,
                150: -1,
                200: -2,
                250: -3,
                300: -3,
                350: -4,
                400: -4,
                450: -4,
                500: -5,
                550: -5,
                600: -6,
                650: -6,
                700: -7,
                750: -7,
                800: -7,
                850: -7,
                900: -8,
                950: -8,
                1000: -8,
                1050: -8,
                1100: -9,
                1150: -9,
                1200: -9,
                1250: -10,
                1300: -10,
                1350: -10,
                1400: -10,
                1450: -11,
                1500: -11,
                1550: -11,
                1600: -11,
                1650: -12,
                1700: -12,
                1730: -11

            },
            hover: {
                1700: -11,
                1650: -10,
                1600: -10,
                1550: -10,
                1500: -10,
                1450: -9,
                1400: -9,
                1350: -8,
                1300: -8,
                1250: -8,
                1200: -7,
                1150: -7,
                1100: -7,
                1050: -6,
                1000: -6
            }
        }
    }).factory('pressureAdjustment', function () {
        return {
            flat: {
                50: 0,
                100: 0,
                150: 0,
                200: 0,
                250: 0,
                300: 0,
                350: 0,
                400: -1,
                450: -1,
                500: -1,
                550: -1,
                600: -1,
                650: -1,
                700: -2,
                750: -2,
                800: -2,
                850: -3,
                900: -3,
                950: -3,
                1000: -4,
                1050: -4,
                1100: -4,
                1150: -5,
                1200: -5,
                1250: -5,
                1300: -6,
                1350: -6,
                1400: -7,
                1450: -7,
                1500: -8,
                1550: -8,
                1600: -9,
                1650: -9,
                1700: -10,
                1730: -10
            },
            hover: {
                1700: -11,
                1650: -10,
                1600: -10,
                1550: -10,
                1500: -10,
                1450: -9,
                1400: -9,
                1350: -9,
                1300: -9,
                1250: -8,
                1200: -8,
                1150: -8,
                1100: -7,
                1050: -7,
                1000: -7

            }
        }
    }).factory('thinFork', function () {
        return {
            flat: {
                50: 1,
                100: 1,
                150: 2,
                200: 2,
                250: 2,
                300: 2,
                350: 3,
                400: 3,
                450: 4,
                500: 4,
                550: 5,
                600: 5,
                650: 6,
                700: 7,
                750: 8,
                800: 9,
                850: 10,
                900: 11,
                950: 13,
                1000: 14,
                1050: 16,
                1100: 17,
                1150: 19,
                1200: 20,
                1250: 21,
                1300: 23,
                1350: 25,
                1400: 27,
                1450: 30,
                1500: 33,
                1550: 37,
                1600: 47,
                1650: 75,
                1700: 75,
                1730: 80

            },
            hover: {
                1700: 85,
                1650: 58,
                1600: 46,
                1550: 39,
                1500: 34,
                1450: 30,
                1400: 27,
                1350: 25,
                1300: 23,
                1250: 21,
                1200: 20,
                1150: 18,
                1100: 17,
                1050: 16,
                1000: 16


            }
        }
    }).factory('distanceChangePer1M', function () {
        return {
            flat: {
                50: 6.6,
                100: 6.5,
                150: 6.4,
                200: 6.2,
                250: 6.1,
                300: 5.9,
                350: 5.7,
                400: 5.5,
                450: 5.3,
                500: 5.1,
                550: 5.0,
                600: 7.8,
                650: 4.6,
                700: 4.4,
                750: 4.2,
                800: 4.0,
                850: 3.9,
                900: 3.7,
                950: 3.6,
                1000: 3.4,
                1050: 3.2,
                1100: 3.0,
                1150: 2.8,
                1200: 2.7,
                1250: 2.5,
                1300: 2.4,
                1350: 2.2,
                1400: 2.1,
                1450: 1.9,
                1500: 1.7,
                1550: 1.5,
                1600: 1.2,
                1650: 0.8,
                1700: 0.8,
                1730: 0.8
            },
            hover: {
                1700: 0.8,
                1650: 1.1,
                1600: 1.3,
                1550: 1.5,
                1500: 1.7,
                1450: 1.9,
                1400: 2.0,
                1350: 2.2,
                1300: 2.3,
                1250: 2.5,
                1200: 2.6,
                1150: 2.7,
                1100: 2.8,
                1050: 2.9,
                1000: 3.0

            }
        }
    }).factory('minimalDistanceForCrest', function (findMinimalRow, minimalSightsForCrest) {
        var availableDistances = _.keys(minimalSightsForCrest[_.head(_.keys(minimalSightsForCrest))]);
        return _.object(_.map(availableDistances, function (distance) {
            var row = findMinimalRow(minimalSightsForCrest, function (row) {
                return row[distance];
            });
            return [distance, row[0]]
        }));
    }).factory('minimalSightsForCrest', function () {
        var distances = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        var minimalSightsForCrestRaw = {
            100: [580, 800, 900, 1140, 1260, 1370, 1460, 1540, 1600, 1640],
            150: [545, 720, 820, 990, 1095, 1190, 1280, 1350, 1415, 1465],
            200: [510, 640, 740, 840, 930, 1010, 1100, 1160, 1230, 1290],
            250: [525, 635, 720, 810, 880, 955, 1030, 1085, 1145, 1200],
            300: [540, 630, 700, 780, 830, 900, 960, 1010, 1060, 1110],
            350: [575, 645, 710, 775, 825, 885, 940, 990, 1080, 1075],
            400: [610, 660, 720, 770, 820, 870, 920, 970, 1100, 1040],
            450: [650, 695, 745, 790, 835, 880, 925, 965, 1050, 1035],
            500: [690, 730, 770, 810, 850, 890, 930, 960, 1000, 1030],
            550: [735, 770, 805, 840, 880, 915, 950, 975, 1010, 1040],
            600: [780, 810, 840, 870, 910, 940, 970, 990, 1020, 1050],
            650: [825, 850, 885, 910, 940, 970, 995, 1015, 1045, 1070],
            700: [870, 890, 930, 950, 970, 1000, 1020, 1040, 1070, 1090],
            750: [920, 935, 970, 990, 1010, 1035, 1055, 1075, 1095, 1120],
            800: [970, 980, 1010, 1030, 1050, 1070, 1090, 1110, 1120, 1150],
            850: [1020, 1030, 1055, 1075, 1090, 1110, 1130, 1145, 1155, 1180],
            900: [1070, 1080, 1100, 1120, 1130, 1150, 1170, 1180, 1190, 1210],
            950: [1120, 1130, 1145, 1165, 1175, 1190, 1210, 1220, 1230, 1245],
            1000: [1170, 1180, 1190, 1210, 1220, 1230, 1250, 1260, 1270, 1280]
        };
        return _.mapObject(minimalSightsForCrestRaw, function (row) {
            return _.object(distances, row);
        });
    }).factory('flightTime', function () {
        return {
            flat: {
                50: 0.3,
                100: 0.5,
                150: 0.8,
                200: 1.1,
                250: 1.4,
                300: 1.7,
                350: 2.0,
                400: 2.3,
                450: 2.6,
                500: 3.0,
                550: 3.3,
                600: 3.7,
                650: 4.1,
                700: 4.5,
                750: 4.9,
                800: 5.3,
                850: 5.7,
                900: 6.1,
                950: 6.5,
                1000: 7.0,
                1050: 7.5,
                1100: 8.0,
                1150: 8.5,
                1200: 9.1,
                1250: 9.6,
                1300: 10,
                1350: 11,
                1400: 11,
                1450: 12,
                1500: 13,
                1550: 14,
                1600: 15,
                1650: 16,
                1700: 17,
                1730: 20


            },
            hover: {
                1700: 22,
                1650: 23,
                1600: 24,
                1550: 24,
                1500: 25,
                1450: 25,
                1400: 26,
                1350: 26,
                1300: 26,
                1250: 26,
                1200: 27,
                1150: 27,
                1100: 27,
                1050: 27,
                1000: 27
            }
        }
    });
