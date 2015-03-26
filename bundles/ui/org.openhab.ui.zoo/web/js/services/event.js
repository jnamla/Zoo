// Generated by CoffeeScript 1.9.1
angular.module('SmartHome.services', []).factory('eventService', [
  function() {
    var EventService, eventSrc;
    eventSrc = new EventSource('/rest/events');
    return new (EventService = (function() {
      function EventService() {}

      EventService.prototype.onEvent = function(topic, callback) {
        var topicRegex;
        topicRegex = topic.replace('/', '\/').replace('*', '.*');
        return eventSrc.addEventListener('message', function(event) {
          var data;
          data = JSON.parse(event.data);
          if (data.topic.match(topicRegex)) {
            return callback(data.topic, data.object);
          }
        });
      };

      return EventService;

    })());
  }
]);
