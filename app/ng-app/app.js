/*global angular*/
'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
angular
    .module('myApp', [
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'appTemplates'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.template.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/chat', {
                templateUrl: 'demo.template.html',
                controller: 'DemoCtrl',
                controllerAs: 'demo'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
