angular.module("Vatra.model.calculations",  ["Vatra.services.HardcodedTables", "Vatra.services.TableFunctions"])
  .factory("", (singleTargetGrenadeConsumption, groupTargetGrenadeConsumption, averageByDistance) ->
    new GrenadesCalculator(singleTargetGrenadeConsumption, groupTargetGrenadeConsumption, averageByDistance)
)

class GrenadesCalculator
  constructor: (@singleTargetTable, @groupTargetTable, @averageFunction) ->

  grenadesCount: (target) ->
    valueFromTable = averageByDistance(tableFor(target), table.distance)
    return valueFromTable if target.isSingle()
    return valueFromTable * target.area()

  tableFor: (target) ->
    if target.isSingle()
      return @singleTargetTable[target.task]
    else if target.isArea()
      return @groupTargetTable[target.trajectory][target.task]