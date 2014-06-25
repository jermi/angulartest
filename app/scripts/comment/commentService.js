define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.services.commentService';
    var commentService = angular.module(moduleName, []);

    function CommentService(PostService) {

        var LOCAL_STORAGE_KEY = "comments";

        this.save = function(postId, comment) {
            var comments = getAll();
            var postComments = comments[postId];
            if (!postComments) {
                postComments = [];
                comments[postId] = postComments;
            }
            comment.date = Date.now();
            postComments.push(comment);
            saveAll(comments);
            PostService.incrementCommentCount(postId);
        };

        this.getForPost = function(postId) {
            var comments = getAll();
            return comments[postId];
        };

        function getAll() {
            return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
        }

        function saveAll(comments) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(comments));
        }

    }

    commentService.factory('Comment', ['Post',
        function(Post) {
            return new CommentService(Post);
        }
    ]);

    return moduleName;

});