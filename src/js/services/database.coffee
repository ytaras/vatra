class Database
  constructor: () ->

  getDataForDistance: (distance, trajectory) ->
    if (trajectory == 'flat')
      return this.getDataForFlatTrajectory(distance)
    else
      throw new Error('Unknown trajectory ' + trajectory)
    # TODO: Put real tables here
    # TODO: Add validation?

  getDataForFlatTrajectory: (distance) ->
    sights: 58
    adjustments:
      side:
        derivation: -1
        wind: -6
      forward:
        wind: -6
        pressure: -1
        temperature:
          air: -2
          shells: -4
    smallFork: 3
    deltaX: 5.5
    flightTime: 2.3