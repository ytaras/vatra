class SightsCalculator
  constructor: (@database) ->

  calculate: (data) ->
    tableValues = @database.getDataForDistance(data.target.distance, data.target.trajectory)

    sights: tableValues.sights
    sideAdjustment: tableValues.adjustments.side.derivation
    flightTime: tableValues.flightTime
