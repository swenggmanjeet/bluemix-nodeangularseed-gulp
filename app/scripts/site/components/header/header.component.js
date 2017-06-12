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

  console.log('HeaderController ready!')

  $scope.myHeader = {};
  contentFactory.getContent().then(function(response) {
    $scope.myHeader = response.data.header;    
  }).catch(function (response) {
    console.error('Header error', response.status, response.data);
  }).finally(function () {
    console.log("finally finished header");
  });



};

angular.module('myApp').component('appHeader', {
  templateUrl: 'header/header.component.html',
  controller: HeaderController,
  bindings: {
    title: '@',
    logo: '@',
    menu: '='
  }
});