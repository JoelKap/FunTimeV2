(function () {
    'use strict';

    angular.module('FT').factory('loginService', ['firebaseUrl', '$firebaseArray', '$rootScope', loginService]);

    function loginService(firebaseUrl, $firebaseArray, $rootScope) {
        self = this;
        self.users = [];
        self.user = {};
        var ref = new Firebase(firebaseUrl);

        var login = function (email, password, callback) {

            $firebaseArray(ref.child('User')).$loaded(function (reponse) {
                self.users = reponse;

                for (var i = 0; i < self.users.length; i++) {
                    if (self.users[i].email == email && self.users[i].password == password) {
                        self.user = self.users[i];
                        $rootScope.userType = self.user.userType;
                        $rootScope.name = self.user.name;
                        $rootScope.availableToken = self.user.availableToken;
                        $rootScope.userId = self.user.id;
                        $rootScope.user = self.users[i];
                        callback(self.user);
                    }
                }
                callback(self.user);
            })
        }

        function getEventData() {
            return eventData;
        }

        return {
            login: login
        }
    }
})();