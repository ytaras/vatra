angular
.module("Vatra.services.Cordova", [])
.factory "deviceReady", ->
  (done) ->
    if typeof window.cordova is "object"
      document.addEventListener "deviceready", (->
        done()
      ), false
    else
      done()