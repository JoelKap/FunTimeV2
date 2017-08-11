(function () {
    'use strict';

    angular.module('FT').controller('loginCtrl', ['firebaseUrl', '$state', 'eventService', '$firebaseArray',
        'loginService', '$rootScope', loginCtrl]);
    function loginCtrl(firebaseUrl, $state, eventService, $firebaseArray, loginService, $rootScope) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.email = "";
        vm.password = ""
        vm.eventToBook = {};


        vm.login = function (email, password) {
            loginService.login(email, password, function (response) {
                if (response.email != undefined) {
                    if ($rootScope.userType == "Customer") {
                        $state.go("user.event");
                    } else {
                        $state.go("app.owernerBusiness");
                    }

                } else {
                   alert("incorrect credentials");
                }
            })
        }




    }
})();