(function () {
    'use strict';

    angular.module('FT').factory('eventService', ['firebaseUrl', '$firebaseArray',
        '$rootScope', '$ionicLoading', eventService]);

    function eventService(firebaseUrl, $firebaseArray, $rootScope, $ionicLoading) {
        self = this;
        self.users = [];
        var response = [];
        self.user = {};
        self.event = {};
        var ref = new Firebase(firebaseUrl);


        var saveEvent = function (event) {
            self.event = event;
            window.localStorage.setItem('eventData', JSON.stringify(self.event));
        }

        var getEvent = function (callback) {
            $ionicLoading.show({ template: "Loading..." });
            $firebaseArray(ref.child('Business')).$loaded().then(function (reponse) {
                self.businesses = reponse;
                var eventLoc = {};
                for (var i = 0; i < self.businesses.length; i++) {
                    self.event = JSON.parse(window.localStorage.getItem('eventData'));
                    if (self.businesses[i].id == self.event.businessId) {
                        break;
                    }
                }
                self.event.business = self.businesses[i];

                $ionicLoading.hide();
                callback(self.event);
            });
        }

        return {

            saveEvent: saveEvent,
            getEvent: getEvent
        }
    }
})();