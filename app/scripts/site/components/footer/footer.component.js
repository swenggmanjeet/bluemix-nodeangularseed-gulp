/*global jQuery, $, angular*/
'use strict';

/**
 * @ngdoc function
 * @name myApp.component:Footer
 * @description
 * # HeaderComponent
 * Controller of the angularBluemixSeedApp
 */

function FooterController($scope, contentFactory) {

  console.log('FooterController ready!')

  $scope.myFooter = {};
  contentFactory.getContent().then(function(response) {
    $scope.myFooter = response.data.footer;    
  }).catch(function (response) {
    console.error('Footer error', response.status, response.data);
  }).finally(function () {
    console.log("finally finished header");
  });


};

angular.module('myApp').component('appFooter', {
  templateUrl: 'footer/footer.component.html',
  controller: FooterController,
  bindings: {}
});