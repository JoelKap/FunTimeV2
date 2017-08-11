(function () {
    'use strict';

    angular.module('FT').controller('eventDetailsCtrl', ['firebaseUrl', '$state',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', '$firebaseObject', 
                                    'eventServiceOwner', eventDetailsCtrl]);

    function eventDetailsCtrl(firebaseUrl, $state, $firebaseArray, $ionicLoading, $ionicPopup,
                                $firebaseObject, eventServiceOwner) {
        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.event = {};

        init();

        function init() {
            eventServiceOwner.getEvent(function (data) {
                vm.event = data;
                window.localStorage.clear();
            });
        }

        vm.EditEvent = function(event){
            eventServiceOwner.saveEventLocal(event);
            $state.go("app.eventAddEdit");
        }
    }
})();