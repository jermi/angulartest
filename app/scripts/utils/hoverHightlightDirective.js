define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.utils';
    var utilsModule = angular.module(moduleName, []);

    // http://stackoverflow.com/questions/15847726/is-there-a-simple-way-to-use-button-to-navigate-page-as-a-link-does-in-angularjs
    utilsModule.directive('hoverHighlight', function($location) {
        return function(scope, element, attrs) {

            element.on('mouseenter', function() {
                element.css('background', 'rgb(251, 255, 150)');
            });

            element.on('mouseleave', function() {
                element.css('background', 'none');
            });

            element.on('$destroy', function() {
                element.off('mouseenter mouseleave');
            });

        };
    });

    return moduleName;
});