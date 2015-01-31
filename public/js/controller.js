angular.module('foodpipeApp')
		        .controller('HomePageController',['UserService','$location',function(UserService,$location)
             {
                this.userservice = UserService;
                userservice.checkexpiry();
             }])
		       .controller('AppController',['UserService',function(UserService)
             {
                this.userservice = UserService;
                userservice.checkexpiry();
             }])
             .controller('LoginCtrl',['UserService','$location',function(UserService,$location)
             	{
             		this.user = {
             			email:'',
             			password:''
             		};
             		this.login = function(){
                          UserService.login(this.user).then(function(success){
                                 $location.path('/homepage'); 
                                 $location.replace();
                          },function(error){
                          	this.errormessage = error.data.msg;
                          });
             		};
             	}
             	])
               .controller('SignupController',['UserService','$location',function(UserService,$location)
             	{
             		this.user = {
             			fullname:'',
             			email:'',
             			mobile:'',
             			password:''
             		};
             		this.signup = function(){
                          UserService.signup(this.user).then(function(success){
                                 $location.path('/homepage'); 
                                 $location.replace();
                          },function(error){
                          	this.errormessage = error.data.msg;
                          });
             		};
             	}
             	]);