
(function () {
    'use strict';

    angular.module('FT').controller('userLayoutCtrl', ['$rootScope', userLayoutCtrl]);
    function userLayoutCtrl($rootScope) {
     
        var vm = this;
        vm.user = {};
        init();

        function init(){
            vm.user =  $rootScope.user;
        }

    }
})();