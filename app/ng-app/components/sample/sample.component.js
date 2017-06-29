/*global jQuery, $, angular*/
'use strict';

/**
 * @ngdoc function
 * @name myApp.component:Header
 * @description
 * # HeaderComponent
 * Controller of the angularBluemixSeedApp
 */

function SampleController($scope) {

  console.log('Sample component ready!');
  $scope.sample = 'sample';

};

angular.module('myApp').component('appSample', {
  templateUrl: 'sample/sample.template.html',
  controller: SampleController,
  bindings: {
    content: '='
  }
});