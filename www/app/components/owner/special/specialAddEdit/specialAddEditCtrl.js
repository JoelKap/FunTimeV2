(function () {
    'use strict';

    angular.module('FT').controller('specialAddEditCtrl', ['$state', 'registrationService', 
                                    '$firebaseArray', 'loginService', '$ionicLoading', '$timeout', 
                                    'specialServiceOwner', '$cordovaGeolocation','$rootScope',
                                    specialAddEditCtrl]);
    function specialAddEditCtrl($state, registrationService, $firebaseArray, loginService, $ionicLoading, 
                                    $timeout, specialServiceOwner, $cordovaGeolocation, $rootScope) {

        var vm = this;
        vm.isEdit = false;
        vm.special = {};

        init();

        function init(){
            specialServiceOwner.getSpecial(function(special){
                    if(special != null){
                        vm.special = special;
                        vm.isEdit = true;
                    }
            })
        }


        vm.registerSpecial = function (special) {
            $ionicLoading.show({ template: "Saving..." });
            special.businessId = $rootScope.business.id;
                specialServiceOwner.saveSpecial(special, function(data){
                        if(data){
                            alert('Special saved successfully');
                            $state.go("app.owernerBusiness");
                            $ionicLoading.hide();
                        }
                })   
            }

        vm.updateSpecial = function(special){
             $ionicLoading.show({ template: "Saving..." });
             special.businessId = $rootScope.business.id;
            specialServiceOwner.saveUpdateSpecial(special, function(data){
                if(data){
                    alert('Special updated successfully');
                    $state.go("app.owernerBusiness");
                    $ionicLoading.hide();
                }
            })

        }
    }
})();