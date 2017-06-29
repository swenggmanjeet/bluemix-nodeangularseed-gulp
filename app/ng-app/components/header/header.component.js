/*global jQuery, $, angular*/
'use strict';

/**
 * @ngdoc function
 * @name myApp.component:Header
 * @description
 * # HeaderComponent
 * Controller of the angularBluemixSeedApp
 */

function HeaderController($scope, contentFactory) {

  // Need to get the content as it load outside the ng-view
  $scope.myHeader = {};
  contentFactory.getContent().then(function(response) {
    $scope.myHeader = response.data.components.header;    
  }).catch(function (response) {
    console.error('Header error', response.status, response.data);
  });

};

angular.module('myApp').component('appHeader', {
  templateUrl: 'header/header.template.html',
  controller: HeaderController,
  bindings: {}
});