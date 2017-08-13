(function () {
    'use strict';

    angular.module('FT').controller('locationCtrl', ['firebaseUrl', '$state', 'eventService',
                                    '$firebaseArray', '$ionicLoading', '$scope',
                                    '$cordovaGeolocation', '$timeout',  locationCtrl]);

    function locationCtrl(firebaseUrl, $state, eventService, $firebaseArray, $ionicLoading, $scope,
        $cordovaGeolocation, $timeout) {
        var vm = this;
        $scope.map = {};
        var latLng = {};
        var pos = {};
        vm.location = {};
        var ref = new Firebase(firebaseUrl);

        init();

        function init() {
            var options = { timeout: 10000, enableHighAccuracy: true };

            eventService.getEvent(function (response) {
                vm.location = response;

                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                    //pos = position;
                    pos = vm.location;
                    //latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    latLng = new google.maps.LatLng(pos.business.Latitude, pos.business.Longitude);

                    var mapOptions = {
                        center: latLng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

                    addListener();

                }, function (error) {
                    console.log("Could not get location");
                });
            })
        }

        function addListener() {

            google.maps.event.addListenerOnce($scope.map, 'idle', function () {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: "Here I am!"
                });

                google.maps.event.addListener(marker, 'click', function () {
                    window.location = "geo:" + pos.business.Latitude + "," + pos.business.Longitude + ";=u35";
                    //infoWindow.open($scope.map, marker);
                });

            });
        }

    }
})();