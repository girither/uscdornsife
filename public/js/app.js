angular.module('foodpipeApp')
			.factory('UserService',['$http','$window',function($http,$window){
				isLoggedin = false;
                return {
                LoggedIn: function() {
                     return isLoggedin;
                },    
                login :function(user){
                    var req = {
                      method: 'POST',
                      url: 'http://localhost:3004/login',
                      headers: {
                         'Content-Type': 'application/json'
                      },
                      data: user,
                    };
                   return $http(req).then(function(response)
                {
                    isLoggedin = true;
                    $window.sessionStorage.token = response.token;
                    return response;
                });
                },
                signup:function(user){
                      var req = {
                      method: 'POST',
                      url: 'http://localhost:3004/signup',
                      headers: {
                         'Content-Type': 'application/json'
                      },
                      data: user,
                    };
                	return $http(req).then(function(response)
                    {
                        isLoggedin = true;
                        $window.sessionStorage.token = response.token;
                        return response;
                    });
                },
                checkexpiry:function(){
                	if($window.sessionStorage.token)
                	{
                		isLoggedin = true;
                        return isLoggedin;
                	} 
                    else 
                    {
                        isLoggedin = false;
                        return isLoggedin;
                    }
                }
            };
            }]);