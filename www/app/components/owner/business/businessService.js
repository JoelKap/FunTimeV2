(function () {
    'use strict';

    angular.module('FT').factory('businessService', ['firebaseUrl', '$firebaseArray',
                                     '$rootScope', '$ionicLoading', '$firebaseObject', businessService]);

    function businessService(firebaseUrl, $firebaseArray, $rootScope, $ionicLoading, $firebaseObject) {
       
        self = this;
        self.business = {};
        self.businesses = [];
        var ref = new Firebase(firebaseUrl);
        var db = new Firebase(firebaseUrl + '/Business');
        var newInstance = new Firebase(firebaseUrl);
        var id = newInstance.ref().push().key();


        var saveBusiness = function (business) {
            self.business = business;
            window.localStorage.setItem('businessData', JSON.stringify(self.business));
        }

        var getBusiness = function (callback) {
            $ionicLoading.show({ template: "Loading..." });
            self.business = JSON.parse(window.localStorage.getItem('businessData'));
            $ionicLoading.hide();
            callback(self.business);
        }

        var saveBusinessRegister = function(business, callback){
            business.id = id;
            var AddBusiness = $firebaseArray(db);
            AddBusiness.$add(business);
            callback(AddBusiness);
        }

        var saveUpdateBusiness = function(business, callback){
            var editRef = new Firebase(firebaseUrl + "/Business/" + business.$id);
            var business1 = $firebaseObject(editRef);
            business1.$id = business.$id;
            business1.Latitude = business.Latitude;
            business1.Longitude = business.Longitude;
            business1.OwnerId = business.OwnerId;
            business1.businessContactNumber = business.businessContactNumber;
            business1.businessDescription = business.businessDescription;
            business1.businessLocation = business.businessLocation;
            business1.businessName = business.businessName;
            business1.businessTypeName = business.businessTypeName;
            business1.city = business.city;
            business1.id = business.id;
            business1.province = business.province;
            business1.zipcode = business.zipcode;
            business1.$save();
            callback(business1);
        }

        return {
            saveBusiness: saveBusiness,
            getBusiness: getBusiness,
            saveBusinessRegister:saveBusinessRegister,
            saveUpdateBusiness:saveUpdateBusiness

        }
    }
})();