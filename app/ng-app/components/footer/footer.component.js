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

  // Need to get the content as it load outside the ng-view
  $scope.myFooter = {};
  contentFactory.getContent().then(function(response) {
    $scope.myFooter = response.data.components.footer;    
  }).catch(function (response) {
    console.error('Footer error', response.status, response.data);
  });

};

angular.module('myApp').component('appFooter', {
  templateUrl: 'footer/footer.template.html',
  controller: FooterController,
  bindings: {}
});