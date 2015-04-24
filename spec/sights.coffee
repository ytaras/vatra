should = require('should');

describe 'AggregatedCalculator', () ->
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

  calculator = new AggregatedCalculator(new Database())
  data = undefined

  beforeEach () ->
    data = defaultData()

  it 'calculates data from table by default', () ->
    result = calculator.calculate(defaultData())
    result.sights.should.be.approximately(58, 0.01)
    result.flightTime.should.be.exactly(2.3)
    result.sideAdjustment.should.be.approximately(-1, 0.01)

  describe 'wind adjustment', () ->
    beforeEach () ->
      data.meteo.windSpeed = 35

    it 'calculates side wind adjustment', () ->
      data.meteo.windDirection = 3

      result = calculator.calculate(data)
      result.sights.should.be.approximately(58, 0.01)
      result.flightTime.should.be.exactly(2.3)
      result.sideAdjustment.should.be.approximately(20, 0.01)

    it 'calculates forward wind adjustment', () ->
      data.meteo.windDirection = 6
      result = calculator.calculate(data)
      result.sights.should.be.approximately(54.18, 0.01)
      result.flightTime.should.be.exactly(2.3)
      result.sideAdjustment.should.be.approximately(-1, 0.01)

    it 'calculates diagonal wind adjustment', () ->
      data.meteo.windDirection = 7
      result = calculator.calculate(data)
      result.sights.should.be.approximately(54.69, 0.01)
      result.flightTime.should.be.exactly(2.3)
      result.sideAdjustment.should.be.approximately(-11.5, 0.01)

  describe 'pressure adjustment', () ->
    it 'doesnt add adjustment if elevation < 110', () ->
      data.target.elevation = 110
      data.position.elevation = 110
      result = calculator.calculate(data)
      result.sights.should.be.approximately(58, 0.01)


    it 'does add adjustment if elevation > 110', () ->
      data.target.elevation = 210
      data.position.elevation = 210
      result = calculator.calculate(data)
      result.sights.should.be.approximately(57.84, 0.01)

  describe 'temperature adjustment', () ->
    it 'calculates for low temperature', () ->
      data.meteo.temperature = 5
      result = calculator.calculate(data)
      result.sights.should.be.approximately(59.09, 0.01)

    it 'calculates for high temperature', () ->
      data.meteo.temperature = 25
      result = calculator.calculate(data)
      result.sights.should.be.approximately(56.9, 0.01)