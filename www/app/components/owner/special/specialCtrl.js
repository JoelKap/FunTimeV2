
(function () {
    'use strict';

    angular.module('FT').controller('specialOwnerCtrl', ['firebaseUrl', '$state',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', 
                                     '$firebaseObject','$rootScope', 'businessService', 
                                     'eventServiceOwner', 'specialServiceOwner',
                                     specialOwnerCtrl]);
    function specialOwnerCtrl(firebaseUrl, $state, $firebaseArray, $ionicLoading, $ionicPopup,
                            $firebaseObject, $rootScope, businessService, eventServiceOwner, 
                            specialServiceOwner) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.specials = [];
        vm.specialToDisplay = [];
        vm.following = false;

        init();

        function init() {
            $ionicLoading.show({ template: "Loading..." });
            $firebaseArray(ref.child('Special')).$loaded().then(function (reponse) {
                vm.specials = reponse;
                businessService.getBusiness(function(business){
                    for (var i = 0; i < vm.specials.length; i++) {
                    if (vm.specials[i].businessId == business.id) {
                        vm.specialToDisplay.push(vm.specials[i]);
                    }
                 }
                })
                $ionicLoading.hide();
            });
        }

        vm.specialDetails = function(special){
            //save it to service
            specialServiceOwner.saveSpecialLocal(special);
             $state.go("app.specialDetails");
        }

        vm.createSpecial = function(){
            $state.go("app.specialAddEdit");
        }
    }
})();