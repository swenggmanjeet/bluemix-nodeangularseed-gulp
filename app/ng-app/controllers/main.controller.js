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
      ['$scope', 'contentFactory',
      function($scope, contentFactory) {

        // Getting web content (wc)  
        $scope.wc = {};
        contentFactory.getContent().then(function(response) {
          $scope.wc = response.data;    
        }).catch(function (response) {
          console.error('MainCtrl error', response.status, response.data);
        }).finally(function(){
          console.log('MainCtrl ready!');
        });

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
