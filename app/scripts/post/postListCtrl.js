define(['angular', 'auth/authService'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.controllers.PostListCtrl';
    var postsCtrl = angular.module(moduleName, []);

    function PostListCtrl($scope, $http, Post, Comment, AuthService) {

        var PAGE_SIZE = 5;

        $scope.pagination = {
            currentPage: 0,
            pageSize: PAGE_SIZE,
            itemCount: Post.getCount(),
            pageCount: Math.ceil(Post.getCount() / PAGE_SIZE)
        };

        $scope.hasNextPage = false;
        $scope.hasPrevPage = false;

        $scope.showComments = {};

        $scope.comment = {
            author: AuthService.getUserLogin(),
            message: ''
        };

        $scope.changePage = function(diff) {
            $scope.pagination.currentPage += diff;
            var start = $scope.pagination.currentPage * $scope.pagination.pageSize;
            var count = $scope.pagination.pageSize;
            $scope.posts = Post.list(start, count);
            $scope.hasNextPage = hasPage(1);
            $scope.hasPrevPage = hasPage(-1);
        };

        $scope.toggleComments = function(post) {
            var postId = post.id;
            $scope.showComments[postId] = !$scope.showComments[postId];
            if (post.commentsCount > 0 && $scope.showComments[postId]) {
                post.comments = Comment.getForPost(postId);
            }
        };

        $scope.addComment = function(post, comment) {
            if (!this.commentForm.$invalid) {
                Comment.save(post.id, comment);
                if (!post.comments) {
                    post.comments = [];
                }
                post.comments.push(comment);
                post.commentsCount = post.commentsCount + 1;
                $scope.comment = {};
                this.commentForm.$setPristine(true);
            }
        };

        $scope.isLoggedIn = AuthService.isLoggedIn();
        $scope.login = AuthService.getUserLogin();
        $scope.logout = function() {
            AuthService.logout();
            $scope.isLoggedIn = false;
        };

        function hasPage(diff) {
            var page = $scope.pagination.currentPage + diff;
            return page >= 0 && page < $scope.pagination.pageCount;
        }

        $scope.changePage(0);

    }

    postsCtrl.controller('PostListCtrl', ['$scope', '$http', 'Post', 'Comment', 'AuthService', PostListCtrl]);

    // http://stackoverflow.com/questions/15847726/is-there-a-simple-way-to-use-button-to-navigate-page-as-a-link-does-in-angularjs
    postsCtrl.directive('goClick', function($location) {
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