(function () {
    'use strict';

    angular.module('FT').controller('eventHomeCtr', ['firebaseUrl', '$state', 'eventService', 
                                    '$firebaseArray', '$ionicLoading', eventHomeCtr]);
    function eventHomeCtr(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.events = [];

        init();

        function init() {
            $ionicLoading.show({ template: "Loading..." });
            $firebaseArray(ref.child('Event')).$loaded().then(function (reponse) {
                vm.events = reponse;
                $ionicLoading.hide();
            });

        }

        vm.eventLocation = function (event) 
        {
            eventService.saveEvent(event);
            $state.go("loc.details");
        };




    }
})();