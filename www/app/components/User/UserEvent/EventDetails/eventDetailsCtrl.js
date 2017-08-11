(function () {
    'use strict';

    angular.module('FT').controller('EventDetailsCtrl', ['firebaseUrl', '$state', 'eventService',
                                    '$firebaseArray', '$ionicLoading', '$ionicPopup', '$scope', 
                                    'loginService', '$firebaseObject','$rootScope',
                                    EventDetailsCtrl]);
    function EventDetailsCtrl(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading, $ionicPopup,
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

        init();

        function init() {
            eventService.getEvent(function (data) {
                if (data.name != undefined){
                    vm.event = data;
                    vm.following = true;
                if (today > vm.event.date){
                    vm.isDatePassed = true;
                }
                }
            });
        }

        vm.canceEvent = function () {
            if (!vm.following) {
                
            var confirmPopup = $ionicPopup.confirm({
                title: 'Unbooked',
                template: 'Are you sure you wan to unbook this event'
            });
            confirmPopup.then(function(res){
                if(res){
                vm.following != vm.following;
                vm.user = $rootScope.user;
                var amt = parseInt(vm.event.amountInToken);
                vm.user.availableToken = $rootScope.availableToken + amt;
               CancelBookedEvent(self.event, function(response){
                if(response){
                    UpdateUserBalance(vm.user);
                    alert('successfully removed this booking'); 
                    $state.go("user.profile");
                };
               });       
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

        function CancelBookedEvent(event, callback) {
        var bookedEvent = {};
          vm.actualE =  $firebaseArray(ref.child('BookedTicket'));
          vm.actualE.$loaded(function(data){
            for (var k = 0; k < vm.actualE.length; k++) {
                if(vm.actualE[k].eventId == event.id){
                    bookedEvent = vm.actualE[k];
                    break;
                }
            }
            vm.actualE.$remove(bookedEvent)
            callback(event);
          })
        }

    }
})();