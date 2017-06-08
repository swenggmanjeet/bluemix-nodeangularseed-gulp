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
    .factory('conversationFactory', ['$http', function($http) {
        var conversationFactory = {},
            requestPayload,
            responsePayload,
            messageEndpoint = '/api/message';

    
        conversationFactory.sendRequest = function(text, context) {
          // Build request payload
          var payloadToWatson = {},
              params = {}; 

          if (text) {
            payloadToWatson.input = {
              text: text
            };
          }
          
          if (context) {
            payloadToWatson.context = context;
          }

          params = JSON.stringify(payloadToWatson);
          
          // Built http request
          return $http.post(messageEndpoint, params);
         
        };


        // The request/response getters/setters are defined here to prevent internal methods
        // from calling the methods without any of the callbacks that are added elsewhere.
        conversationFactory.getRequestPayload = function() {
          return requestPayload;
        };


        conversationFactory.setRequestPayload = function(newPayloadStr) {
          requestPayload = JSON.parse(newPayloadStr);
        };


        conversationFactory.getResponsePayload = function() {
          return responsePayload;
        };


        conversationFactory.setResponsePayload = function(newPayloadStr) {
          responsePayload = JSON.parse(newPayloadStr);
        };


        return conversationFactory;
    }]);
