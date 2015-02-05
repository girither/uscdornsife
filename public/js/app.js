angular.module('foodpipeApp')
			.factory('UserService',['$http','$window','$location',function($http,$window,$location){
				isLoggedin = false;
                return {
                LoggedIn: function() {
                     return isLoggedin;
                },    
                login :function(user){
                   return $http.post('http://localhost:3000/login',user).then(function(response)
                {
                    isLoggedin = true;
                    $window.sessionStorage.token = response.data.token;
                    return response;
                });
                },
                signup:function(user){
                	return $http.post('http://localhost:3000/signup',user).then(function(response)
                    {
                        isLoggedin = true;
                        $window.sessionStorage.token = response.data.token;
                        return response;
                    });
                },
                checkexpiry:function(){
                  return $http.post('http://localhost:3000/checkTokenExpiry').then(function(response){
                       isLoggedin = true;
                       return response;
                  });
                },
                logout:function(){
                   isLoggedin = false;
                   delete $window.sessionStorage.token;
                   $location.path('/signin');
                },
            };
            }])
          .factory('authInterceptor', ['$window',function($window) {  
              var sessionInjector = {
              request: function(config) {
              if ($window.sessionStorage.token) {
                  config.headers['X-Auth'] = $window.sessionStorage.token;
              }
              return config;
              }
            };
            return sessionInjector;
          }])
          .config(['$httpProvider', function($httpProvider) {  
            $httpProvider.interceptors.push('authInterceptor');
          }]);