
(function () {
    'use strict';

    angular.module('FT').controller('userAccountCtrl', ['firebaseUrl', '$state', 'eventService',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', '$scope', 
                                    'loginService', '$firebaseObject','$rootScope',
                                    userAccountCtrl]);
    function userAccountCtrl(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading, $ionicPopup,
        $scope, loginService, $firebaseObject, $rootScope) {
        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.events = [];
        vm.event = {};
        vm.user = {};
        vm.event.description
        vm.following = false;
        vm.login = {};
        vm.bEvent = [];
       var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        vm.isDatePassed = false;
        vm.actualE = [];
        vm.amount = "";

        init();

        function init() {
                vm.user = $rootScope.user;
                //vm.user.availableToken = 'R' + ' ' + $rootScope.user.availableToken;
                vm.amount = 'R' + ' ' + $rootScope.user.availableToken;
        }

        vm.addAmount = function () {
            if (!vm.following) {
                $ionicPopup.prompt({
                    title: "Amount to buy",
                    inputPlaceholder: "Amount",
                    okText: 'Add'
                }).then(function(res) { 
                 var amt =   parseInt(res);   // promise
                    if (!isNaN(amt)){
                        if(amt <= 0){
                            alert('Enter valid number');
                        }else{
                            //update user account
                            vm.user.availableToken += amt;
                            UpdateUserBalance(vm.user);
                            alert('account updated successfully');
                            vm.amount = "";
                            vm.amount = 'R' + ' ' + vm.user.availableToken;
                        }
                        
                    }else{
                        alert('Please enter numbers only');
                    }
                })
            } else {
                vm.followin != vm.following;
            }
        };
        function UpdateUserBalance(user) {
            var editRef = new Firebase(firebaseUrl + "/User/" + user.$id);
            var user1 = $firebaseObject(editRef);
            user1.$id = user.$id;
            user1.availableToken = user.availableToken;
            user1.email = user.email;
            user1.id = user.id;
            user1.name = user.name;
            user1.password = user.password;
            user1.surname = user.surname;
            user1.userType = user.userType;
            user1.$save();
        }
    }
})();