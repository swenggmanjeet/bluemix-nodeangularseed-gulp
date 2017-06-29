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
    .controller('DemoCtrl',
     ['$scope', '$rootScope', '$http', '$timeout', '$location', '$window', 'conversationFactory', 'contentFactory',
      function($scope, $rootScope, $http, $timeout, $location, $window, conversationFactory, contentFactory) {

        // Getting web content (wc)  
        $scope.wc = {};
        contentFactory.getContent().then(function(response) {
          $scope.wc = response.data;    
          console.log($scope.wc.components.sample);
        }).catch(function (response) {
          console.error('DemoCtrl error', response.status, response.data);
        }).finally(function(){
          console.log('DemoCtrl ready!');
        });


        $scope.inputText = '';
        $scope.conversationContext = {};
        $scope.messages = [];

        // Init conversation
        $scope.initConversation = function() {
          console.log('--- initConversation');
          conversationFactory.sendRequest('', null).then(function(result){
            $scope.conversationContext = result.data.context;
          });
          $scope.conversationStarted = true;
        };

        // Send message
        $scope.sendMessage = function() {
          var text = $scope.inputText.toString(),
              userResponse = {
                who: 'user',
                type: 'text',
                date: new Date(),
                text: text
              };

          $scope.messages.push(userResponse);

          console.log('--- user message: ' + text);
          
          conversationFactory.sendRequest( text, $scope.conversationContext ).then(function(result){
            console.log(result);
            $scope.updateMessages(result);
          });
        };

        // Update messages response
        $scope.updateMessages = function(response) {
          var output = response.data.output,
              botResponse = {};

          if (output.text.length) {
              botResponse.who = 'bot';
              botResponse.type = 'text';
              botResponse.date = new Date();
              botResponse.text = output.text[0];
          }

          $scope.conversationContext = response.data.context;
          $scope.messages.push(botResponse);
          $scope.inputText = '';
        };

        $scope.initConversation();
      
    }]);
