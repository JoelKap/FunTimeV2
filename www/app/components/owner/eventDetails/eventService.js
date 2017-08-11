(function () {
    'use strict';

    angular.module('FT').factory('eventService', [eventService]);
    function eventService() {
 
        //var db = new Firebase("https://fun-time-9c827.firebaseio.com/Business");
        var events = JSON.parse('[{"id": 1005, "name": "Test"}, {"id": 1005, "name": "Test2"},{"id": 1005, "name": "Test3"}, {"id": 1005, "name": "Test4"}]');
        var eventData = "Name: Joel"

        function getEvents(){
            return events;
        }

        function getEventData(){
            return eventData;
        }

        return{
            getEvents: getEvents,
            getEventData: getEventData
        }
    }
})();