define(['angular', 'auth/authService', 'utils/goClickDirective'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.controllers.PostListCtrl';
    var postsCtrl = angular.module(moduleName, ['angularTestApp.utils']);

    function PostListCtrl($scope, $http, Post, Comment, AuthService) {

        var DEFAULT_PAGE_SIZE = 5;

        $scope.pagination = {
            currentPage: 0,
            pageSize: DEFAULT_PAGE_SIZE,
            itemCount: Post.getCount(),
            pageCount: Math.ceil(Post.getCount() / DEFAULT_PAGE_SIZE)
        };

        $scope.hasNextPage = false;
        $scope.hasPrevPage = false;

        $scope.showComments = {};

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
            if (post.commentsCount > 0 && $scope.showComments[postId]) { // get comments on show only if count > 0                                
                post.comments = Comment.getForPost(postId);
                post.newComment = {};
                post.newComment.author = AuthService.getUserLogin();
            }
        };

        $scope.addComment = function(post, comment) {
            if (this.commentForm.$valid) {
                comment = angular.copy(comment); // comment object is from model, cannot be saved directly
                Comment.save(post.id, comment);
                if (!post.comments) {
                    post.comments = [];
                }
                post.comments.push(comment);
                post.commentsCount = post.commentsCount + 1;
                post.newComment.message = "";
                this.commentForm.$setPristine(true);
            }
        };

        $scope.updatePageSize = function() {
            $scope.pagination.pageCount = Math.ceil(Post.getCount() / $scope.pagination.pageSize);
            $scope.pagination.currentPage = 0;
            $scope.changePage(0);
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

    return moduleName;
});