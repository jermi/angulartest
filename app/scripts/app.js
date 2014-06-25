/*jshint unused: vars */
define([
        'angular',
        // post
        'post/postListCtrl',
        'post/postEditCtrl',
        'post/postService',
        'requirejs-text!post/postListTemplate.html',
        'requirejs-text!post/postEditTemplate.html',
        // comment
        'comment/commentCtrl',
        'comment/commentService',
        'requirejs-text!comment/comments.html',
        // auth
        'auth/authService',
        'auth/loginCtrl',
        'requirejs-text!auth/loginTemplate.html',
    ],
    function(
        angular,
        // post
        postListCtrl,
        postEditCtrl,
        postService,
        postListTemplate,
        postEditTemplate,
        // comment
        commentCtrl,
        commentService,
        commentsTemplate,
        // auth
        authService,
        loginCtrl,
        loginTemplate
    ) {
        'use strict';

        return angular.module('angularTestApp', [
            postListCtrl,
            postEditCtrl,
            postService,
            commentCtrl,
            commentService,
            authService,
            loginCtrl,

            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngRoute'
        ])
            .config(function($routeProvider) {
                $routeProvider
                    .when('/', {
                        template: postListTemplate,
                        controller: 'PostListCtrl'
                    })
                    .when('/login', {
                        template: loginTemplate,
                        controller: 'LoginCtrl'
                    })
                    .when('/post/:id', {
                        template: postEditTemplate,
                        controller: 'PostEditCtrl'
                    })
                    .when('/post/new', {
                        template: postEditTemplate,
                        controller: 'PostEditCtrl'
                    })
                    .when('/comments/:postId', {
                        template: commentsTemplate,
                        controller: 'CommentsCtrl'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            });
    });