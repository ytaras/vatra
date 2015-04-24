class AggregatedCalculator
  constructor: (@database) ->

  calculate: (data) ->
    tableValues = @database.getDataForDistance(data.target.distance, data.target.trajectory)

    mA = @meteoAdjustments(data, tableValues)

    sights: tableValues.sights + mA.forwardAdjustment()
    sideAdjustment: tableValues.adjustments.side.derivation + mA.sideAdjustment()
    flightTime: tableValues.flightTime

  meteoAdjustments: (data, tableValues) ->
    new MeteoAdjustments(new Util(), data, tableValues)

class MeteoAdjustments
  constructor: (@util, @data, @tableValue) ->
    @meteo = @data.meteo

  sideAdjustment: () -> @sideWindAdjustment()

  forwardAdjustment: () ->
    difference = @meteoDistance() - @data.target.distance
    difference / @tableValue.deltaX

  meteoDistance: () -> @data.target.distance + @forwardWindDistanceAdjustment()

  sideWindAdjustment: ->
    -@sideWind() * @tableValue.adjustments.side.wind / 10

  forwardWindDistanceAdjustment: ->
    -@forwardWind() * @tableValue.adjustments.forward.wind / 10

  sideWind: () ->
    @util.sidePart(@meteo.windSpeed, @meteo.windDirection)

  forwardWind: () ->
    @util.forwardPart(@meteo.windSpeed, @meteo.windDirection)

class Util
  constructor: () ->

  sidePart: (value, clockDirection) ->
    Math.sin(this.clockToRadian(clockDirection)) * value

  forwardPart: (value, clockDirection) ->
    Math.cos(this.clockToRadian((clockDirection))) * value

  clockToRadian: (clockDirection) ->
    degrees = (clockDirection % 12) * 30
    degrees * (Math.PI / 180)