'use strict';

angular
.module('angularDjango', [
    'ngResource',
    'ngRoute',
    'angularDjangoControllers',
    'ui.bootstrap'
])
.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl'
            })
            .when('/details', {
                templateUrl: 'partials/details.html',
                controller: 'DetailsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });    
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Basic YWRtaW46MTIz';
}]);
