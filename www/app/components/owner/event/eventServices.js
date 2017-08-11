(function () {
    'use strict';

    angular.module('FT').factory('eventServiceOwner', ['firebaseUrl', '$firebaseArray',
                                     '$rootScope', '$ionicLoading', '$firebaseObject', eventServiceOwner]);

    function eventServiceOwner(firebaseUrl, $firebaseArray, $rootScope, $ionicLoading, $firebaseObject) {
       
        self = this;
        self.event = {};
        self.businesses = [];
        var ref = new Firebase(firebaseUrl);
        var db = new Firebase(firebaseUrl + '/Event');
        var newInstance = new Firebase(firebaseUrl);
        var id = newInstance.ref().push().key();


        var saveEventLocal = function (event) {
            self.event = event;
            window.localStorage.setItem('eventOwnerData', JSON.stringify(self.event));
        }

        var getEvent = function (callback) {
            $ionicLoading.show({ template: "Loading..." });
            self.event = JSON.parse(window.localStorage.getItem('eventOwnerData'));
            $ionicLoading.hide();
            callback(self.event);
        }

        var saveEvent = function(event, callback){
            event.id = id;
            var AddEvent = $firebaseArray(db);
            AddEvent.$add(event);
            callback(AddEvent);
        }

        var saveUpdateEvent = function(event, callback){
            var editRef = new Firebase(firebaseUrl + "/Event/" + event.$id);
            var event1 = $firebaseObject(editRef);
            event1.$id = event.$id;
            event1.amountInToken = event.amountInToken;
            event1.businessId = event.businessId;
            event1.date = event.date;
            event1.description = event.description;
            event1.id = event.id;
            event1.name = event.name;
            event1.$save();
            callback(event1);
        }

        return {
            saveEvent: saveEvent,
            getEvent: getEvent,
            saveEvent:saveEvent,
            saveEventLocal:saveEventLocal,
            saveUpdateEvent:saveUpdateEvent

        }
    }
})();