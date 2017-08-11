(function () {
    'use strict';

    angular.module('FT').controller('eventAddEditCtrl', ['$state', 'registrationService', 
                                    '$firebaseArray', 'loginService', '$ionicLoading', '$timeout', 
                                    'eventServiceOwner', '$cordovaGeolocation','$rootScope',
                                    eventAddEditCtrl]);
    function eventAddEditCtrl($state, registrationService, $firebaseArray, loginService, $ionicLoading, 
                                    $timeout, eventServiceOwner, $cordovaGeolocation, $rootScope) {

        var vm = this;
        vm.isEdit = false;
        vm.event = {};

        init();

        function init(){
            eventServiceOwner.getEvent(function(event){
                    if(event != null){
                        vm.event = event;
                        vm.isEdit = true;
                    }
            })
        }


        vm.registerEvent = function (event) {
            $ionicLoading.show({ template: "Saving..." });
            event.businessId = $rootScope.business.id;
                eventServiceOwner.saveEvent(event, function(data){
                        if(data){
                            alert('Event saved successfully');
                            $state.go("app.event");
                            $ionicLoading.hide();
                        }
                })   
            }

        vm.updateEvent = function(event){
             $ionicLoading.show({ template: "Saving..." });
             event.businessId = $rootScope.business.id;
            eventServiceOwner.saveUpdateEvent(event, function(data){
                if(data){
                    alert('Event updated successfully');
                    $state.go("app.event");
                    $ionicLoading.hide();
                }
            })

        }

        vm.selectedBusinessType = function(type){
        vm.business.businessTypeName = type;
        }
        vm.selectedCity = function(city){
            vm.business.city = city;
        }
        vm.selectedProvince = function(province){
            vm.business.province = province;
        }
    }
})();