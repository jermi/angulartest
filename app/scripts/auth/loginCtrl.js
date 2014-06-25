define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.controllers.LoginCtrl';
    var loginCtrl = angular.module(moduleName, []);

    function LoginCtrl($scope, $location, AuthService) {

        $scope.login = '';
        $scope.password = '';
        $scope.error = null;

        $scope.submitLogin = function() {
            var result = AuthService.login($scope.login, $scope.password);
            if (result) {
                $location.url('/');
            } else {
                $scope.error = 'Incorrect login and password (must be the same).'
            }
        };

        $scope.cancel = function() {
            $location.url('/');
        }

    }

    loginCtrl.controller('LoginCtrl', ['$scope', '$location', 'AuthService', LoginCtrl]);

    return moduleName;
});