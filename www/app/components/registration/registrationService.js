(function () {
    'use strict';

    angular.module('FT').factory('registrationService', ['firebaseUrl', '$firebaseArray', 
                                    '$rootScope', '$firebaseObject', registrationService]);

    function registrationService(firebaseUrl, $firebaseArray, $rootScope, $firebaseObject) {
        self = this;
        self.users = [];
        self.user = {};
        self.userExist = false;
        var db = new Firebase(firebaseUrl + '/User');
        var newInstance = new Firebase(firebaseUrl);
        var id = newInstance.ref().push().key();

        var register = function (user, callback) {
            user.id = id;
            var AddUser = $firebaseArray(db);
            AddUser.$add(user);
            callback(AddUser);
        }

            var updateUserInfo2 = function (user, callback) {
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
            callback(user1);
        }


        var verifyUser = function (user, callback) {
            $firebaseArray(newInstance.child('User')).$loaded(function (reponse) {
                self.users = reponse;

                for (var i = 0; i < self.users.length; i++) {
                    if (self.users[i].email == user.email) {
                        self.userExist = true;
                       return callback(self.userExist);
                        //break;
                    }
                }
                self.userExist = false;
              return callback(self.userExist);
            })
        }

        var getUserByEmail = function(email, callback){
                $firebaseArray(newInstance.child('User')).$loaded(function (reponse) {
                self.users = reponse;

                for (var i = 0; i < self.users.length; i++) {
                    if (self.users[i].email == email) {
                      self.user = self.users[i];
                       return callback(self.user);
                        //break;
                    }
                }
              return callback(self.user);
            })
        }



        return {
            register: register,
            verifyUser: verifyUser,
            updateUserInfo2:updateUserInfo2,
            getUserByEmail:getUserByEmail
        }
    }
})();