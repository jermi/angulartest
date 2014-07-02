define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.utils';
    var utilsModule = angular.module(moduleName, []);

    // http://stackoverflow.com/questions/15847726/is-there-a-simple-way-to-use-button-to-navigate-page-as-a-link-does-in-angularjs
    utilsModule.directive('goClick', function($location) {
        return function(scope, element, attrs) {
            var path;

            attrs.$observe('goClick', function(val) {
                path = val;
            });

            element.bind('click', function() {
                scope.$apply(function() {
                    $location.path(path);
                });
            });
        };
    });

    return moduleName;
});