  angular.module('foodpipeApp')
  .factory('UserService',['$http','$window','$location','$q','socket',function($http,$window,$location,$q,socket){
    var isLoggedin = false;
    return {
      LoggedIn: function() {
       return isLoggedin;
     },
     getuserdetails:function(){
      if( $window.merchantdata){
        return  $window.merchantdata;
      }
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
  .factory('NotificationService',['$http','$location','cfpLoadingBar','$window','$q',function($http,$location,cfpLoadingBar,$window,$q){
    var
    notifications = [],
    orderdetail = [],
    pendingnotifications =[],
    acceptednotifications =[],
    rejectednotifications =[],
    customerdetails ={},
    orderiddetails ={}.
    indexofNotification;
    return {
     getnotification:function()
     {
      return notifications;
    },
    pushnotification:function(payload)
    {
     notifications.unshift(payload);
   }, 
   getorderdetail:function(){
    return orderdetail;
  },
  getcustomerdetails:function(){
    return customerdetails;
  },
  getnotificationcount:function(){
    if(pendingnotifications)
     return pendingnotifications.length;
   else
    return 0;
},
getacceptednotificationcount:function(){
 if(acceptednotifications)
     return acceptednotifications.length;
   else
    return 0;
},
getrejectednotificationcount:function(){
   if(rejectednotifications)
     return rejectednotifications.length;
   else
    return 0;
},
acceptorder:function(){
  cfpLoadingBar.start();
  var data = {};
  data.suborderid = orderiddetails.suborderid;
  data.orderid = orderiddetails.orderid;
  data.customerNumber = customerdetails.customerNumber;
  data.status = 'accept';
  return $http.post('http://localhost:3000/acceptOrRejectSubOrder',data).then(function(response){
    cfpLoadingBar.complete();
    var dummydata = {};
    notifications.splice(indexofNotification, 1); 
    acceptednotifications.push(dummydata);
     if(notifications.length  > 0){
          //after we accept or reject suborders reset the orders and contact views
    orderdetail = notifications[indexofNotification].Orders[0].items;
    customerdetails = notifications[indexofNotification].CustomerDetails;
    orderiddetails = notifications[indexofNotification].orderDetails;
  }
  else {
    orderdetail = {};
    customerdetails = {};
    orderiddetails = {};

  }
          return response;
        }, function(error){
          cfpLoadingBar.complete();
          return $q.reject(error);
        });
},
rejectorder:function(){
  cfpLoadingBar.start();
  var data = {};
  data.suborderid = orderiddetails.suborderid;
  data.orderid = orderiddetails.orderid;
  data.customerNumber = customerdetails.customerNumber;
  data.status = 'reject';
  return $http.post('http://localhost:3000/acceptOrRejectSubOrder',data).then(function(response){
    cfpLoadingBar.complete();
    var dummydata = {};
    notifications.splice(indexofNotification, 1); 
    rejectednotifications.push(dummydata);
    if(notifications.length  > 0){
          //after we accept or reject suborders reset the orders and contact views
          orderdetail = notifications[indexofNotification].Orders[0].items;
          customerdetails = notifications[indexofNotification].CustomerDetails;
          orderiddetails = notifications[indexofNotification].orderDetails;
        }
      else {
    orderdetail = {};
    customerdetails = {};
    orderiddetails = {};

  }
          return response;
        }, function(error){
          cfpLoadingBar.complete();
          return $q.reject(error);
        });
},
acceptednotification:function()
{
  cfpLoadingBar.start();
  var data = {};
  data.status = 'accept';
  return $http.post('http://localhost:3000/getPendingOrdersForToday',data).then(function(response){
    cfpLoadingBar.complete();
    if (response.data.payload){
      acceptednotifications = response.data.payload;
      indexofNotification = 0;
      notifications = acceptednotifications;
      orderdetail = notifications[0].Orders[0].items;
      customerdetails = notifications[0].CustomerDetails;
      orderiddetails = notifications[0].orderDetails;
    }
    else {
     notifications =[];
     orderdetail = {};
     customerdetails = {};
   }
   return response;
 }, function(error){
  cfpLoadingBar.complete();
  return $q.reject(error);
});
},
rejectednotification:function()
{
 cfpLoadingBar.start();
 var data = {};
 data.status = 'reject';
 return $http.post('http://localhost:3000/getPendingOrdersForToday',data).then(function(response){
  cfpLoadingBar.complete();
  if (response.data.payload){
    rejectednotifications = response.data.payload;
    indexofNotification = 0;
    notifications = rejectednotifications;
    orderdetail = notifications[0].Orders[0].items;
    customerdetails = notifications[0].CustomerDetails;
    orderiddetails = notifications[0].orderDetails;
  }
  else {
    notifications =[];
    orderdetail = {};
    customerdetails = {};
  }
  return response;
}, function(error){
  cfpLoadingBar.complete();
  return $q.reject(error);
});
},
filterorderdetails:function(index){
  orderdetail = notifications[index].Orders[0].items;
  customerdetails = notifications[index].CustomerDetails;
  orderiddetails = notifications[index].orderDetails;
  indexofNotification = index;
},
countacceptedorders:function(){
  var data = {};
  data.status = 'accept';
  return $http.post('http://localhost:3000/getPendingOrdersForToday',data).then(function(response){
    acceptednotifications = response.data.payload; 
    return response;
  },function(error){
    return $q.reject(error);
  });
},
countrejectedorders:function(){
  var data = {};
  data.status = 'reject';
  return $http.post('http://localhost:3000/getPendingOrdersForToday',data).then(function(response){
    rejectednotifications = response.data.payload; 
  },function(error){
    return $q.reject(error);
  });
},
fetchnotification:function(){
 cfpLoadingBar.start();
 var data = {};
 data.status = 'pending';
 return $http.post('http://localhost:3000/getPendingOrdersForToday',data).then(function(response){
   cfpLoadingBar.complete();
   if (response.data.payload){
    pendingnotifications= response.data.payload;
    notifications = pendingnotifications;
    indexofNotification = 0;
    orderdetail = notifications[0].Orders[0].items;
    customerdetails = notifications[0].CustomerDetails;
    orderiddetails = notifications[0].orderDetails;
  }
  else {
    notifications =[];
     orderdetail = {};
    customerdetails = {};
  }
  return response;
}, function(error){
  cfpLoadingBar.complete();
  return $q.reject(error);
});
}
};
}]) 
  .factory('MenuService',['$http','cfpLoadingBar',function($http,cfpLoadingBar){
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
        cfpLoadingBar.start();
        return $http.post('http://localhost:3000/uploadMenu',{menu:groups}).then(function(response){
          cfpLoadingBar.complete();
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