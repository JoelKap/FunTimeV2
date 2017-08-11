(function () {
    'use strict';

    angular.module('FT').controller('specialHomeCtr', ['firebaseUrl', '$state', 'eventService', 
                                    '$firebaseArray', '$ionicLoading', specialHomeCtr]);
    function specialHomeCtr(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.specials = [];

        init();

        function init() {
            $ionicLoading.show({ template: "Loading..." });
            $firebaseArray(ref.child('Special')).$loaded().then(function (reponse) {
                vm.specials = reponse;
                $ionicLoading.hide();
            });

        }

        vm.specialLocation = function (special) 
        {
            eventService.saveEvent(special);
            $state.go("loc.details");
        };




    }
})();