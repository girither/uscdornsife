angular.module('foodpipeApp',['ngRoute'])
			.config(['$routeProvider',function($routeProvider){
              $routeProvider.when('/signin', {
                templateUrl: 'views/userlogin.html'
              }).when('/', {
                templateUrl: 'views/main.html'
              }).when('/signup', {
                templateUrl: 'views/usersignup.html'
              }).when('/homepage',{
                templateUrl: 'views/homepage.html',
                controller: 'HomePageCtrl as hmepagectrl',
                resolve:{
                auth:['$q','$location','UserService',function($q,$location,UserService){
                      return UserService.checkexpiry().then(function(success){},function(error)
                      {
                           $location.path('/login');
                           $location.replace();
                           return $q.reject(err);
                      });
                }]}
              })
              .otherwise({redirectTo:'/'});
			}]
		  );		
