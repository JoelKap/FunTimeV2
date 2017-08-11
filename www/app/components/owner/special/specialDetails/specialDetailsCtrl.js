(function () {
    'use strict';

    angular.module('FT').controller('specialDetailsCtrl', ['firebaseUrl', '$state',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', '$firebaseObject', 
                                    'eventServiceOwner', 'specialServiceOwner', specialDetailsCtrl]);

    function specialDetailsCtrl(firebaseUrl, $state, $firebaseArray, $ionicLoading, $ionicPopup,
                                $firebaseObject, eventServiceOwner, specialServiceOwner) {
        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.special = {};

        init();

        function init() {
            specialServiceOwner.getSpecial(function (data) {
                vm.special = data;
                window.localStorage.clear();
            });
        }

        vm.EditSpecial = function(special){
            specialServiceOwner.saveSpecialLocal(special);
            $state.go("app.specialAddEdit");
        }
    }
})();