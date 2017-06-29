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
    .controller('NotFoundCtrl',
      ['$scope', 'contentFactory',
      function($scope, contentFactory) {

        // Getting web content (wc)  
        $scope.wc = {};
        contentFactory.getContent().then(function(response) {
          $scope.wc = response.data;    
        }).catch(function (response) {
          console.error('NotFoundCtrl error', response.status, response.data);
        }).finally(function(){
          console.log('NotFoundCtrl ready!');
        });
      
    }]);
