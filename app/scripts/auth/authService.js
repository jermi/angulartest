define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.services.authService';
    var commentService = angular.module(moduleName, []);

    function AuthService() {

        var loggedIn = false;
        var userLogin = null;

        this.login = function(login, password) {
            if (login && password && login === password) {
                loggedIn = true;
                userLogin = login;
            } else {
                loggedIn = false;
                userLogin = null;
            }
            return loggedIn;
        };

        this.logout = function() {
            loggedIn = false;
        };

        this.isLoggedIn = function() {
            return loggedIn;
        };

        this.getUserLogin = function() {
            return userLogin;
        };

    }

    commentService.factory('AuthService', [

        function() {
            return new AuthService();
        }
    ]);

    return moduleName;

});