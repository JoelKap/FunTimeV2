
(function () {
    'use strict';

    angular.module('FT').controller('LayoutCtrl', ['$rootScope', LayoutCtrl]);
    function LayoutCtrl($rootScope) {
     
        var vm = this;
        vm.user = {};
        init();

        function init(){
            vm.user =  $rootScope.user;
        }

    }
})();