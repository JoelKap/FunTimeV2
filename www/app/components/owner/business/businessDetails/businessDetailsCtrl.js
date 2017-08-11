(function () {
    'use strict';

    angular.module('FT').controller('businessDetailsCtrl', ['firebaseUrl', '$state',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', '$firebaseObject', 
                                    'businessService', '$rootScope', businessDetailsCtrl]);

    function businessDetailsCtrl(firebaseUrl, $state, $firebaseArray, $ionicLoading, $ionicPopup,
                                $firebaseObject, businessService, $rootScope) {
        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.business = {};

        init();

        function init() {
            businessService.getBusiness(function (data) {
                vm.business = data;
                window.localStorage.clear();
            });
        }

        vm.EditBusiness = function(business){
            businessService.saveBusiness(business);
            $state.go("app.businessAddEdit");
        }

        vm.viewEvent = function(business){
             businessService.saveBusiness(business);
             $rootScope.business = business;
            $state.go("app.event");
        }
        vm.viewSpecial = function(business){
            businessService.saveBusiness(business);
            $rootScope.business = business;
            $state.go("app.special");
        }
    }
})();