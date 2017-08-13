(function () {
    'use strict';

    angular.module('FT').controller('registrationCtrl', ['$state', 'registrationService', '$firebaseArray', 'loginService', '$ionicLoading', '$timeout', registrationCtrl]);
    function registrationCtrl($state, registrationService, $firebaseArray, loginService, $ionicLoading, $timeout) {

        var vm = this;
        vm.userExist = false;
        vm.user = {};

        vm.register = function (user) {
            try {
                $ionicLoading.show({ template: 'Loading...' })
                $timeout(function () {
                    registrationService.verifyUser(user, function (response) {
                        user.userType = "Customer"
                        if (!response) {
                            registrationService.register(user, function (response) {
                                if (response) {
                                    $ionicLoading.hide();
                                    $state.go("tab.login");
                                }
                            })
                        } else {
                            vm.userExist = response;
                        }
                    })
                     $ionicLoading.hide();
                },3000) 
            }
            catch (ex) {
                $ionicLoading.hide();
                Console.log('user was not register, please contact administrator');
            }


        }




    }
})();