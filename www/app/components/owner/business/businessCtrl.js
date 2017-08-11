
(function () {
    'use strict';

    angular.module('FT').controller('businessCtrl', ['firebaseUrl', '$state',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', 
                                     '$firebaseObject','$rootScope', 'businessService',
                                    businessCtrl]);
    function businessCtrl(firebaseUrl, $state, $firebaseArray, $ionicLoading, $ionicPopup,
                            $firebaseObject, $rootScope, businessService) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.businesses = [];
        vm.businessToDisplay = [];
        vm.following = false;

        init();

        function init() {
            $ionicLoading.show({ template: "Loading..." });
            $firebaseArray(ref.child('Business')).$loaded().then(function (reponse) {
                vm.businesses = reponse;
                for (var i = 0; i < vm.businesses.length; i++) {
                    if (vm.businesses[i].OwnerId == $rootScope.userId) {
                        vm.businessToDisplay.push(vm.businesses[i]);
                    }
                }
                $ionicLoading.hide();
            });
        }

        vm.businessDetails = function(business){
            //save it to service
            businessService.saveBusiness(business);
           $state.go("app.businessDetails");
        }

        vm.createBusiness = function(){
            $state.go("app.businessAddEdit");
        }
    }
})();