(function () {
    'use strict';

    angular.module('FT').controller('userEventCtrl', ['firebaseUrl', '$state', 'eventService',
                                    '$firebaseArray', '$ionicLoading', '$rootScope', userEventCtrl]);
    function userEventCtrl(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading, $rootScope) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.bookedEvents = [];
        vm.events = [];
        vm.actualE = [];
        vm.eventToDisplay = [];

        init();

        function init() {
            $ionicLoading.show({ template: "Loading..." });
            $firebaseArray(ref.child('BookedTicket')).$loaded().then(function (reponse) {
                self.bookedEvents = reponse;
                var eventLoc = {};
                for (var i = 0; i < self.bookedEvents.length; i++) {
                    if (self.bookedEvents[i].userId == $rootScope.userId) {
                        vm.events.push(self.bookedEvents[i]);
                    }
                }

                //get the actual event from the booked events
                $firebaseArray(ref.child('Event')).$loaded().then(function (response) {
                    vm.actualE = response;
                    for (var k = 0; k < vm.actualE.length; k++) {
                        for (var i = 0; i < vm.events.length; i++) {
                            if (vm.actualE[k].id == vm.events[i].eventId) {
                                vm.eventToDisplay.push(vm.actualE[k]);
                            }

                        }
                    }
                })

                $ionicLoading.hide();
            });
        }

        vm.eventDetails = function (event) {
            eventService.saveEvent(event);
            $state.go("user.eventDetails");
        };




    }
})();