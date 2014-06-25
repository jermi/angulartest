define(['angular'], function(angular) {
    'use strict';

    var moduleName = 'angularTestApp.services.PostService';
    var postService = angular.module(moduleName, []);


    function PostService(AuthService) {

        var LOCAL_STORAGE_KEY = "posts";

        this.save = function(post) {
            if (!AuthService.isLoggedIn()) {
                throw "user not logged in";
            }
            var posts = getAll();
            if (post.id) {
                for (var i = 0; i < posts.length; i++) {
                    var p = posts[i];
                    if (p.id === post.id) {
                        p.title = post.title;
                        p.body = post.body;
                        p.edited = Date.now();
                        p.author = AuthService.getUserLogin();
                        break;
                    }
                }
            } else {
                post.id = Date.now();
                post.commentsCount = 0;
                post.date = Date.now();
                post.author = AuthService.getUserLogin();
                posts.push(post);
            }

            saveAll(posts);
        };

        this.getCount = function() {
            return getAll().length;
        };

        this.getById = function(postId) {
            var posts = getAll();
            return getPostWithId(posts, postId);
        }

        this.list = function(start, count) {
            var posts = getAll().sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            });;
            return posts.slice(start, start + count);
        };

        this.delete = function(postId) {
            var posts = getAll();
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id === postId) {
                    posts.splice(i, 1);
                    saveAll(posts);
                    break;
                }
            }

        };

        this.incrementCommentCount = function(postId) {
            var posts = getAll();
            var post = getPostWithId(posts, postId);
            post.commentsCount++;
            saveAll(posts);
        };

        function getPostWithId(posts, postId) {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id === postId) {
                    return posts[i];
                }
            }
            return null;
        }

        function getAll() {
            return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        }

        function saveAll(posts) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
        }

    }

    postService.factory('Post', ['AuthService',

        function(AuthService) {
            return new PostService(AuthService);
        }
    ]);

    return moduleName;

});