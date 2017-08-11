(function () {
    'use strict';

    angular.module('FT').factory('locationDetailsService', ['firebaseUrl', '$firebaseArray', '$rootScope', locationDetailsService]);

    function locationDetailsService(firebaseUrl, $firebaseArray, $rootScope) {
        self = this;
        self.users = [];
        self.user = {};
        self.event = {};
        var ref = new Firebase(firebaseUrl);


        var saveEvent = function (event) {
            self.event = event;
        }

        var getEvent = function(){
            return self.event;
        }

        return {

            saveEvent: saveEvent,
            getEvent:getEvent
        }
    }
})();