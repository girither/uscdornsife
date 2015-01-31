angular.module('foodpipeApp',['ngRoute'])
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
                controller: 'HomepageController as hmepgectrl'
                /*resolve:{
                auth:['$q','$location','UserService',function($q,$location,UserService){
                      return UserService.checkexpiry().then(function(success){},function(error)
                      {
                           $location.path('/login');
                           $location.replace();
                           return $q.reject(err);
                      });
                }]}*/
              })
              .otherwise({redirectTo:'/'});
			}]
		  );		
