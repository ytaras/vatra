angular.module("Vatra.model.userInput", [])
  .factory("targetProperties", () -> () -> new Target())
  .factory("firingPosition", () -> () -> new FiringPosition())


class Target
  constructor: (@type = 'single', @distance = 400, @trajectory = 'flat', @elevation = 100) ->

  isSingle: () -> @type == 'single'
  isMoving: () -> @type == 'moving'
  isArea: () -> @type == 'area'

  isFlatTrajectory: () -> @trajectory == 'flat'
  isHoverTrajectory: () -> @trajectory == 'hover'

  isSuppressTask: () -> @task == 'suppress'
  isDestroyTask: () -> @task == 'destroy'

  validate: () ->
    @errors = []

    if @distance <= 0
      @errors.push { source: 'target.distance', message: 'Дистанція повинна бути більша 0' }
    if @elevation < 0
      @errors.push { source: 'target.elevation', message: 'Висота над рівнем моря повинна бути більшою 0'}
    unless isSingle() || isMoving() || isArea()
      @errors.push { source: 'target.type', message: "Невідомий тип цілі - #{@type}"}
    unless isFlatTrajectory() || isHoverTrajectory()
      @errors.push { source: 'target.trajectory', message: "Невідомий тип траекторії - #{@trajectory}"}
    unless isSuppressTask() || isDestroyTask()
      @errors.push { source: 'target.task', message: "Невідомий тип задачі - #{@task}"}
    return @errors.empty()

class FiringPosition
  constructor: (@devicesNumber = 1, @interval = 15, @positionElevation = 100) ->

class Meteo
  constructor: (@windSpeed = 0, @windDirection = 12, @temperature = 15) ->


