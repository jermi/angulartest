define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.controllers.CommentsCtrl';
    var commentsCtrl = angular.module(moduleName, []);

    function CommentsListCtrl($scope, $http) {
        $http.get('data/comments.json').success(function(data) {
            $scope.comments = data;
        });
    }

    commentsCtrl.controller('CommentsCtrl', ['$scope', '$http', CommentsListCtrl]);

    return moduleName;
});