(function () {
    'use strict';

    angular.module('FT').controller('userProfile2Ctrl', ['$state', 'registrationService', '$firebaseArray', 
                                    'loginService', '$ionicLoading', '$timeout', '$rootScope', userProfile2Ctrl]);
    function userProfile2Ctrl($state, registrationService, $firebaseArray, loginService, 
                            $ionicLoading, $timeout, $rootScope) {

        var vm = this;
        vm.userExist = false;
        vm.user = {};

        init();

        function init(){
            vm.user = $rootScope.user;
        }

        vm.updateUserInfo = function (user) {
            $ionicLoading.show({ template: 'Loading...' })
            registrationService.updateUserInfo2(user, function (response) {
                if (response) {
                    $ionicLoading.hide();
                    alert('successfully updated');
                }
            })
        }
    }
})();