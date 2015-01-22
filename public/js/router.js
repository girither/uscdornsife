angular.module('foodpipeApp',['ngRoute'])
			.config(['$routeProvider',function($routeProvider){
              $routeProvider.when('/signin', {
                templateUrl: 'views/userlogin.html'
              }).when('/', {
                templateUrl: 'views/main.html'
              }).when('/signup', {
                templateUrl: 'views/usersignup.html'
              }).otherwise({redirectTo:'/'});
			}]
		  );		
