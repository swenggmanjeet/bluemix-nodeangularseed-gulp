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

  $scope.myHeader = {};
  contentFactory.getContent().then(function(response) {
    $scope.myHeader = response.data.header;    
  }).catch(function (response) {
    console.error('Header error', response.status, response.data);
  });

};

angular.module('myApp').component('appHeader', {
  templateUrl: 'header/header.template.html',
  controller: HeaderController,
  bindings: {}
});