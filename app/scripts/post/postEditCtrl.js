define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.controllers.PostEditCtrl';
    var postsCtrl = angular.module(moduleName, []);

    function PostEditCtrl($scope, $routeParams, $location, Post) {

        var postId = $routeParams.id;
        if (!isNaN(postId)) {
            $scope.post = Post.getById(parseInt(postId));
        }

        $scope.save = function() {
            if (this.postForm.$valid) {
                try {
                    Post.save($scope.post);
                    $location.url('/');
                } catch (e) {
                    alert(e);
                }
            }

        };

        $scope.cancel = function() {
            $location.url('/');
        };

    }

    postsCtrl.controller('PostEditCtrl', ['$scope', '$routeParams', '$location', 'Post', PostEditCtrl]);

    return moduleName;
});