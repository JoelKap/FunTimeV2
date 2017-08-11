(function () {
    'use strict';

    angular.module('FT').factory('specialServiceOwner', ['firebaseUrl', '$firebaseArray',
                                     '$rootScope', '$ionicLoading', '$firebaseObject', specialServiceOwner]);

    function specialServiceOwner(firebaseUrl, $firebaseArray, $rootScope, $ionicLoading, $firebaseObject) {
       
        self = this;
        self.special = {};
        var ref = new Firebase(firebaseUrl);
        var db = new Firebase(firebaseUrl + '/Special');
        var newInstance = new Firebase(firebaseUrl);
        var id = newInstance.ref().push().key();


        var saveSpecialLocal = function (special) {
            self.special = special;
            window.localStorage.setItem('specialOwnerData', JSON.stringify(self.special));
        }

        var getSpecial = function (callback) {
            $ionicLoading.show({ template: "Loading..." });
            self.special = JSON.parse(window.localStorage.getItem('specialOwnerData'));
            $ionicLoading.hide();
            callback(self.special);
        }

        var saveSpecial = function(special, callback){
            special.id = id;
            var AddSpecial = $firebaseArray(db);
            AddSpecial.$add(special);
            callback(AddSpecial);
        }

        var saveUpdateSpecial = function(special, callback){
            var editRef = new Firebase(firebaseUrl + "/Special/" + special.$id);
            var special1 = $firebaseObject(editRef);
            special1.$id = special.$id;
            special1.businessId = special.businessId;
            special1.description = special.description;
            special1.id = special.id;
            special1.name = special.name;
            special1.validFromDate = special.validToDate;
            special1.validToDate = special.validToDate;
            special1.$save();
            callback(special1);
        }

        return {
            saveSpecial: saveSpecial,
            getSpecial: getSpecial,
            saveSpecialLocal:saveSpecialLocal,
            saveUpdateSpecial:saveUpdateSpecial

        }
    }
})();