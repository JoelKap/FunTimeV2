(function () {
    'use strict';

    angular.module('FT').controller('purchaseCtrl', ['firebaseUrl', '$state', '$firebaseArray',
        '$rootScope', '$cordovaBarcodeScanner', purchaseCtrl]);
    function purchaseCtrl(firebaseUrl, $state, $firebaseArray, $rootScope, $cordovaBarcodeScanner) {

        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.email = "";
        vm.password = ""
        vm.eventToBook = {};


        vm.scanToPurchase = function () {

            document.addEventListener("deviceready", function () {

                $scope.scanBarcode = function () {

                    $cordovaBarcodeScanner.scan().then(function (imageData) {
                        alert(imageData.text);
                        console.log('Format ' + imageData.format);
                    }, function (error) {
                        console.log('Um erro: ' + error);
                    });

                };

            }, false);

            // window.plugins.barcodeScanner.scan(
            //     function (result) {
            //         document.getElementById('qrText').value = result.text;
            //         /*          alert("We got a barcode\n" +
            //                         "Result: " + result.text + "\n" +
            //                         "Format: " + result.format + "\n" +
            //                         "Cancelled: " + result.cancelled);*/
            //     },
            //     function (error) {
            //         alert("Scanning failed: " + error);
            //     }
            // );
            // $cordovaBarcodeScanner.scan().then(function(imageData){
            //     alert(imageDate.text);
            //     alert(imageData.format);
            // }, function(error){
            //     alert('The following error occur' + ' ' + error);
            // })
        }




    }
})();