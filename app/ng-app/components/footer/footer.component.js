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

  $scope.myFooter = {};
  contentFactory.getContent().then(function(response) {
    $scope.myFooter = response.data.footer;    
  }).catch(function (response) {
    console.error('Footer error', response.status, response.data);
  });

};

angular.module('myApp').component('appFooter', {
  templateUrl: 'footer/footer.template.html',
  controller: FooterController,
  bindings: {}
});