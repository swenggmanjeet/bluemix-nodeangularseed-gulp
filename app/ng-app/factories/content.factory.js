/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @description
 * # contentFactory
 * # Factory to set the variable content for each prototype
 * @returns {Object} contentFactory
 */
angular.module('myApp')
    .factory('contentFactory', ['$http', function($http) {
        var contentFactory = {},
            contentEndpoint = './data/web-content.json';

        contentFactory.getContent = function() {
          return $http.get(contentEndpoint);
        };

        return contentFactory;
        
    }]);
