/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @description
 * # apiFactory
 * # Factory to make api calls to prevent http-pollution in mainController code
 * @returns {Object} apiFactory
 */
angular.module('myApp')
    .factory('apiFactory', [function() {
        var apiFactory = {};

        apiFactory.demo = function(value) {
          return value;

        };
       

        return apiFactory;
    }]);
