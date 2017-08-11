(function () {
    'use strict';

    angular.module('FT').controller('businessAddEdtCtrl', ['$state', 'registrationService', 
                                    '$firebaseArray', 'loginService', '$ionicLoading', '$timeout', 
                                    'businessService', '$cordovaGeolocation','$rootScope',
                                    businessAddEdtCtrl]);
    function businessAddEdtCtrl($state, registrationService, $firebaseArray, loginService, $ionicLoading, 
                                    $timeout, businessService, $cordovaGeolocation, $rootScope) {

        var vm = this;
        vm.isEdit = false;
        vm.business = {};

        init();

        function init(){
            businessService.getBusiness(function(business){
                    if(business != null){
                        vm.business = business;
                        vm.isEdit = true;
                    }
            })
        }


        vm.registerBusiness = function (business) {
            try {
             $ionicLoading.show({ template: "Saving..." });
              var addr = business.businessLocation + ' ' + business.city + ', ' + business.province + '  ' + business.zipcode;
              var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: addr }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    business.Latitude = lat;
                    business.Longitude = lng;
                    business.OwnerId = $rootScope.user.id;
                    businessService.saveBusinessRegister(business, function(data){
                        if(data){
                            alert('business registered successfully');
                            $state.go("app.owernerBusiness");
                            $ionicLoading.hide();
                        }
                    })
                    
                } else {
                    $ionicLoading.hide();
                    alert('Geocode Error', 'Geocode was not successful for the following reason: ' + status);
                }
                })
            }
            catch (ex) {
                $ionicLoading.hide();
                alert('user was not register, please contact administrator');
            }
        
    }

        vm.updateBusiness = function(business){
            try {
             $ionicLoading.show({ template: "Saving..." });
              var addr = business.businessLocation + ' ' + business.city + ', ' + business.province + '  ' + business.zipcode;
              var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: addr }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat();
                    var lng = results[0].geometry.location.lng();
                    business.Latitude = lat;
                    business.Longitude = lng;
                    business.OwnerId = $rootScope.user.id;
                    businessService.saveUpdateBusiness(business, function(data){
                        if(data){
                            alert('business updated successfully');
                            $state.go("app.owernerBusiness");
                            $ionicLoading.hide();
                        }
                    })
                    
                } else {
                    $ionicLoading.hide();
                    alert('Geocode Error', 'Geocode was not successful for the following reason: ' + status);
                }
                })
            }
            catch (ex) {
                $ionicLoading.hide();
                alert('user was not register, please contact administrator');
            }
        }

        vm.selectedBusinessType = function(type){
        vm.business.businessTypeName = type;
        }
        vm.selectedCity = function(city){
            vm.business.city = city;
        }
        vm.selectedProvince = function(province){
            vm.business.province = province;
        }
    }
})();