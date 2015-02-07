angular.module('foodpipeApp')
		        .controller('HomePageController',['UserService',function(UserService)
             {
                this.userservice = UserService;
             }])
            .controller('DashboardPageController',['UserService',function(UserService)
             {
                this.userservice = UserService;
             }])
            .controller('MenuUploadController',['UserService',function(UserService)
             {
                this.userservice = UserService;
             }])
		       .controller('AppController',['UserService','$location',function(UserService,$location)
             {
                this.userservice = UserService;
                UserService.checkexpiry().then(function(success){},function(error)
                      {
                           $location.path('/');
                           $location.replace();
                      });
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
                          	this.errormessage = error.data;
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
                          	this.errormessage = error.data;
                          });
             		};
             	}
             	]);