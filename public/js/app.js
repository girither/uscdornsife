angular.module('foodpipeApp')
			.factory('UserService',['$http','$window',function($http,$window){
				this.isLoggedin = false;
                this.login = function(user){
                   return $http.post('api/login',user);
                }.then(function(response)
                {
                	this.isLoggedin = true;
                	$window.sessionStorage.token = response.token;
                });
                this.checkexpiry = function(){
                	if($window.sessionStorage.token)
                	{
                		this.isLoggedin = true;
                	} 
                };
            }]);
angular.module('foodpipeApp',[])
             .controller('MainController',['UserService','$location',function(UserService,$location)
             {
                this.userservice = UserService;
                userservice.checkexpiry();
             }])
             .controller('LoginController',['UserService',function(UserService)
             	{
             		this.user = {
             			username:'',
             			password:''
             		};
             		this.login = function(){
                          UserService.login(this.user).then(function(success){
                                 $location.path('/homepage'); 
                          },function(error){
                          	this.errormessage = error.data.msg;
                          });
             		};
             	}
             	]);