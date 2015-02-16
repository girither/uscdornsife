angular.module('foodpipeApp')
			.factory('UserService',['$http','$window','$location','$q',function($http,$window,$location,$q){
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
                  },
                  function(error){
                       isLoggedin = false;
                       return $q.reject(error);
                  });
                },
                logout:function(){
                   isLoggedin = false;
                   delete $window.sessionStorage.token;
                   $location.path('/signin');
                },
            };
            }])
          .factory('MenuService',['$http',function($http){
            groups =[];
            return {
                getgroups:function()
                {
                  return groups;
                },
                savemenu:function()
                {
                  return $http.post('http://localhost:3000/checkTokenExpiry').then(function(response){
                       //Assign the menu to groups
                  });
                },
                addcategory:function(categoryname)
                {
                     groups.push({title:categoryname,items:[]});
                },
                saveitemtocategory : function(item)
                {
                    groups[item.index].items.push({"item-name":item.itemname,"item-price":item.itemprice});
                },
                deletecategory:function(index)
                {
                    groups.splice(index, 1);
                },
                deleteitem :function(parentindex,index)
                {
                    groups[parentindex].items.splice(index, 1);  
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