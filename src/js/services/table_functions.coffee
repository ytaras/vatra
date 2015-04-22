angular.module("Vatra.services.TableFunctions", []).factory("averageByDistance", ->
  (table, distance) ->
    availableDistances = _.map(_.keys(table), (k) ->
      k * 1
    )
    partitioned = _.partition(availableDistances, (key) ->
      key < distance
    )
    distancesLessThen = _.sortBy(partitioned[0], _.identity())
    distancesGreaterThen = _.sortBy(partitioned[1], _.identity())
    return table[distancesGreaterThen[0]]  if _.isEmpty(distancesLessThen)
    return table[_.last(distancesLessThen)]  if _.isEmpty(distancesGreaterThen)
    closestLess = _.last(distancesLessThen)
    closestGreater = distancesGreaterThen[0]
    delta = closestGreater - closestLess
    greaterCoef = (distance - closestLess) / delta
    lessCoef = (closestGreater - distance) / delta
    lessCoef * table[closestLess] + greaterCoef * table[closestGreater]
).factory("findMinimalRow", ->
  (table, iterator) ->
    _.min _.pairs(table), (row) ->
      iterator row[1]
).factory("lookupSupportDistance", ->
  (table, distance) ->
    error = Infinity
    currentError = undefined
    key = undefined
    for currentKey of table
      currentError = Math.abs(currentKey - distance)
      if currentError < error
        error = currentError
        key = currentKey
    key
).factory "lookupByDistance", (lookupSupportDistance) ->
  (table, distance) ->
    table[lookupSupportDistance(table, distance)]
