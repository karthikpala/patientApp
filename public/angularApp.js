var app = angular.module('patientRegApp', ['ngRoute','ui.bootstrap','smart-table']);

app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/registerPatient', {
            templateUrl : 'templates/registration.html',
            controller  : 'MainController'
        })
        .when('/home', {
            templateUrl : 'templates/patientDetails.html',
            controller  : 'DetailsController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}).run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.currentURL = current.$$route.originalPath;
        if($rootScope.currentURL == "/home"){
        $rootScope.activeClass='home';
        }else if($rootScope.currentURL == "/registerPatient"){
        $rootScope.activeClass='register';
        }
    });
});
