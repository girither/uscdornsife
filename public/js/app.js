angular.module('foodpipeApp')
			.factory('UserService',['$http','$window','$location','$q','socket',function($http,$window,$location,$q,socket){
				var isLoggedin = false;
                return {
                LoggedIn: function() {
                     return isLoggedin;
                },    
                login :function(user){
                   return $http.post('http://localhost:3000/login',user).then(function(response)
                {
                    isLoggedin = true;
                    $window.sessionStorage.token = response.data.token;
                    $window.merchantdata = response.data.data;
                    socket.emit('connectingWithMerchantNumber',{
                       merchantNumber:$window.merchantdata
                      }
                    );
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
          .factory('socket',function($rootScope){
                var socket = io.connect('http://localhost:3000');
                return{
                    getsocket:function()
                    {
                      return socket;
                    },
                    on:function(eventName,data){
                        socket.on(eventName,data);
                    },
                    emit:function(eventName,data){
                        socket.emit(eventName,data);
                    }
                };

            })
          .factory('MenuService',['$http','$activityIndicator',function($http,$activityIndicator){
            groups =[];
            return {
                getgroups:function()
                {
                    return groups;
                },
                fetchgroups:function(){
                  return $http.post('http://localhost:3000/getMenu').then(function(response){
                       if (response.data){
                        groups = response.data;
                       }
                       else {
                        groups =[];
                       }
                        return response;
                  }, function(error){
                       return $q.reject(error);
                  });
                },
                savemenu:function()
                {
                  $activityIndicator.startAnimating();
                  return $http.post('http://localhost:3000/uploadMenu',{menu:groups}).then(function(response){
                      $activityIndicator.stopAnimating(1000);
                  },function(error){
                       $activityIndicator.stopAnimating();
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