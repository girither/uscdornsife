angular.module('foodpipeApp',['ngRoute','ui.bootstrap','ngActivityIndicator'])
			.config(['$routeProvider',function($routeProvider){
              $routeProvider.when('/signin', {
                templateUrl: 'views/userlogin.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
              }).when('/', {
                templateUrl: 'views/main.html',
                controller: 'AppController',
                controllerAs: 'appCtrl'
              }).when('/signup', {
                templateUrl: 'views/usersignup.html',
                controller: 'SignupController',
                controllerAs: 'signupctrl'
              }).when('/homepage',{
                templateUrl: 'views/homepage.html',
                controller: 'HomePageController',
                controllerAs: 'hmepgectrl',
                resolve:{
                auth:['$q','$location','UserService',function($q,$location,UserService){
                      return UserService.checkexpiry().then(function(success){},function(error)
                      {
                           $location.path('/signin');
                           $location.replace();
                      });
                }]}
              })
              .when('/dashboard',{
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardPageController',
                controllerAs: 'dashboardpgectrl',
                resolve:{
                auth:['$q','$location','UserService',function($q,$location,UserService){
                      return UserService.checkexpiry().then(function(success){},function(error)
                      {
                           $location.path('/signin');
                           $location.replace();
                      });
                }]}
              })
              .when('/menusupload',{
                templateUrl: 'views/menusupload.html',
                controller: 'MenuUploadController',
                controllerAs: 'menusuploadpgectrl',
                resolve:{
                auth:['$q','$location','UserService','MenuService',function($q,$location,UserService,MenuService){
                      return UserService.checkexpiry().then(function(success){ MenuService.fetchgroups();},function(error)
                      {
                           $location.path('/signin');
                           $location.replace();
                      });
                }]}
              })
              .otherwise({redirectTo:'/'});
			}]
		  );		
