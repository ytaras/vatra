angular.module('Vatra.services.Data', [])
.factory('grenadesCoeffitient', function(singleTargetGrenadesCoef) {
  return function(data) {
    if(data.type == 'single') {
      return singleTargetGrenadesCoef(data.task, data.distance);
    } else {
      console.log('Not supported');
    }
  }
}).factory('singleTargetGrenadesCoef', function(lookupByDistance) {
  return function(task, distance) {
    table = {
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
    return lookupByDistance(table[task], distance);
  }
}).factory('lookupByDistance', function() {
  return function(table, distance) {
    error = Infinity;
    for(var currentKey in table) {
      currentError = Math.abs(currentKey - distance);
      if (currentError < error) {
        error = currentError;
        key = currentKey;
      }
    }
    return table[key];
  }
});