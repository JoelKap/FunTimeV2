(function () {
    'use strict';

    angular.module('FT').controller('OwnerAccountCtrl', ['firebaseUrl', '$state', 'eventService',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', '$scope', 
                                    'loginService', '$firebaseObject','$rootScope', 'registrationService',
                                    OwnerAccountCtrl]);
    function OwnerAccountCtrl(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading, $ionicPopup,
        $scope, loginService, $firebaseObject, $rootScope, registrationService) {
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
                //do something
                $ionicPopup.show({

                    template: ' Enter Amount<input type="text" ng-model="vm.user.amount"> <br> Enter User Email  <input type="text" ng-model="vm.email" > ',
                    title: 'Load User Credit',
                    subTitle: 'Loading user account',
                    scope: $scope,
                    buttons: [{

                        text: 'Cancel'

                    }, {

                        text: '<b>Load</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!vm.email) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return vm.user;
                            }
                        }
                    },]

                }).then(function (res) {
                    var counter = 0;
                    if (res) {
                        //verify user account
                        vm.user.email = vm.email;
                        registrationService.verifyUser(vm.user, function (user) {
                            if (user) {
                            //Get User Details
                            registrationService.getUserByEmail(vm.email, function(resp){
                                if(counter > 0){
                                    return;
                                }else{
                                    if(resp.email != undefined)
                                        {       
                                            var amount = vm.user.amount;
                                            var amt =   parseInt(amount);
                                            if(resp.availableToken == undefined){
                                                resp.availableToken = 0;
                                            }
                                            resp.availableToken += amt;
                                            UpdateUserBalance(resp);
                                            alert('credit updated' + ' ' +  'for user' + ' ' + resp.name);
                                            counter++;
                                        }
                                }

                            })
                                    //Update user balance
                            } else {
                                vm.following = false;
                                alert('incorect email address');
                            }
                        })
                    } else {
                        vm.following = false;
                    }
                });

            } else {
                vm.following = vm.following;
            }
            // if (!vm.following) {
            //     $ionicPopup.prompt({
            //         title: "Amount to buy",
            //         inputPlaceholder: "Amount",
            //         okText: 'Add'
            //     }).then(function(res) { 
            //         if (res != undefined){
            //      var amt =   parseInt(res);   // promise
            //         if (!isNaN(amt)){
            //             if(amt <= 0){
            //                 alert('Enter valid number');
            //             }else{
            //                 //update user account
            //                 vm.user.availableToken += amt;
            //                 UpdateUserBalance(vm.user);
            //                 alert('account updated successfully');
            //                 vm.amount = "";
            //                 vm.amount = 'R' + ' ' + vm.user.availableToken;
            //             }
                        
            //         }else{
            //             alert('Please enter numbers only');
            //         }
            //     }else{
            //         vm.followin = false;
            //     }
            //     })
            // } else {
            //     vm.followin != vm.following;
            // }
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