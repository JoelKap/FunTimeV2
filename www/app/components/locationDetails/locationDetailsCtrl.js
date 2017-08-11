(function () {
    'use strict';

    angular.module('FT').controller('locationDetailsCtrl', ['firebaseUrl', '$state', 'eventService',
        '$firebaseArray', '$ionicLoading', '$ionicPopup', '$scope', 'loginService',
        '$firebaseObject',
        locationDetailsCtrl]);
    function locationDetailsCtrl(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading, $ionicPopup,
        $scope, loginService, $firebaseObject) {
        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.events = [];
        vm.event = {};
        vm.event.description
        vm.following = false;
        vm.isBooked = false;
        vm.login = {};

        init();

        function init() {
            eventService.getEvent(function (data) {
                vm.event = data;
            });
        }

        vm.bookEvent = function () {
            if (vm.following) {
                //do something

                //$scope.data = {}

                $ionicPopup.show({

                    template: ' Enter Username<input type="text" ng-model="vm.login.username"> <br> Enter Password  <input type="password" ng-model="vm.login.password" > ',
                    title: 'Enter Credential',
                    subTitle: 'Please login to pay',
                    scope: $scope,
                    buttons: [{

                        text: 'Cancel'

                    }, {

                        text: '<b>Login</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!vm.login.username) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return vm.login;
                            }
                        }
                    },]

                }).then(function (res) {
                    var counter = 0;
                    if (res) {
                        loginService.login(res.username, res.password, function (user) {
                            if (user.email != undefined) {
                                if (user.availableToken != undefined) {
                                    if (user.availableToken < 0 || vm.event.amountInToken > user.availableToken) {
                                        //insufficient amount 
                                        alert('insufficient funds');
                                    } else {
                                        if (counter >= 1) {
                                            return;
                                        } else {
                                            var amt = parseInt(vm.event.amountInToken);
                                            var availableAmt = user.availableToken - amt;
                                            user.availableToken = availableAmt;
                                            UpdateUserBalance(user);
                                            BookEvent(user, self.event);
                                            counter++;
                                            alert('booking done successfully');
                                            vm.isBooked = true;
                                        }
                                    }

                                } else {
                                    vm.following = false;
                                    alert('This user has no fund, please load funds');
                                }
                            } else {
                                vm.following = false;
                                alert('incorect username or password');
                            }
                        })
                    } else {
                        vm.following = false;
                    }
                });

            } else {
                vm.following = vm.following;
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

        function BookEvent(user, event) {
            var db = new Firebase(firebaseUrl + '/BookedTicket');
            var newInstance = new Firebase(firebaseUrl);
            var id = newInstance.ref().push().key();

            var booking = {
                eventId: event.id,
                firstName: user.name,
                surname: user.surname,
                id: id,
                userId: user.id
            }

            var book = $firebaseArray(db);
            book.$add(booking);
        }

    }
})();