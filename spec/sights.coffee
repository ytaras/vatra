assert = require('assert')

describe 'SightsCalculator', () ->
  defaultTargetData = () ->
    type: 'single'
    trajectory: 'flat'
    task: 'supress'
    distance: 400
    elevation: 100

  defaultMeteoData = () ->
    windSpeed: 0
    temperature: 15
    windDirection: 12

  defaultPositionData = () ->
    glNumber: 1
    glInterval: 15
    elevation: 100

  defaultData = () ->
    target: defaultTargetData()
    meteo: defaultMeteoData()
    position: defaultPositionData()

  calculator = new SightsCalculator(new Database())

  it 'calculates data from table by default', () ->
    result = calculator.calculate(defaultData())
    assert.equal(58, result.sights)
    assert.equal(-1, result.sideAdjustment)
    assert.equal(2.3, result.flightTime)