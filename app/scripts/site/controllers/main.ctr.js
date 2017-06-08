/*global jQuery, $, angular*/
'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularBluemixSeedApp
 */

angular.module('myApp')
    .controller('MainCtrl',
      ['$scope',
      function($scope) {

      console.log('MainCtrl ready!');

      $scope.username = '';
      $scope.result = '';

      $scope.demoPrintUsername = function() {
        $scope.result = $scope.username;
        if ($scope.result !== '') {
          angular.element('.demo-print').show();
        }
      };

      $scope.test = 'watch';
      
    }]);
