
(function () {
    'use strict';

    angular.module('FT').controller('homeCtrl', ['firebaseUrl', '$state',  '$firebaseArray', 
                                                '$ionicLoading', '$ionicPopup', '$scope', 
                                                '$firebaseObject','$rootScope',
                                                 homeCtrl]);
    function homeCtrl(firebaseUrl, $state, $firebaseArray, $ionicLoading, $ionicPopup,
        $scope,  $firebaseObject, $rootScope) {
        
        init();

        function init() {
             
        }
    }
})();