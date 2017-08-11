
(function () {
    'use strict';

    angular.module('FT').controller('eventOwnerCtrl', ['firebaseUrl', '$state',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', 
                                     '$firebaseObject','$rootScope', 'businessService', 'eventServiceOwner',
                                     eventOwnerCtrl]);
    function eventOwnerCtrl(firebaseUrl, $state, $firebaseArray, $ionicLoading, $ionicPopup,
                            $firebaseObject, $rootScope, businessService, eventServiceOwner) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.events = [];
        vm.eventToDisplay = [];
        vm.following = false;

        init();

        function init() {
            $ionicLoading.show({ template: "Loading..." });
            $firebaseArray(ref.child('Event')).$loaded().then(function (reponse) {
                vm.events = reponse;
                businessService.getBusiness(function(business){
                    for (var i = 0; i < vm.events.length; i++) {
                    if (vm.events[i].businessId == business.id) {
                        vm.eventToDisplay.push(vm.events[i]);
                    }
                 }
                })
            });
             $ionicLoading.hide();
        }

        vm.eventDetails = function(event){
            //save it to service
            eventServiceOwner.saveEventLocal(event);
             $state.go("app.eventDetails");
           
        }

        vm.createEvent = function(){
            $state.go("app.eventAddEdit");
        }
    }
})();