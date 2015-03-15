angular.module('foodpipeApp')
.controller('HomePageController',['UserService','$state','$scope',function(UserService,$state,$scope)
{
  this.userservice = UserService;
  $scope.$state = $state;
                //this.currentindex = 0;
              }])
.controller('HomeDeliveryController',['socket','$scope','NotificationService',function(socket,$scope,NotificationService)
{
  this.notificationservice = NotificationService;
  $scope.radioModel = "Pending";
  socket.on('messagetoyou',function(data){
    console.log('obtained data for only me yaaay: ',data);
  });
  this.pendingnotification = function()
  {
   this.notificationservice.fetchnotification(); 
 };
 this.acceptednotification = function()
 {
  this.notificationservice.acceptednotification();
};
this.rejectednotification = function()
{
 this.notificationservice.rejectednotification();
};
                //this.currentindex = 0;
              }])
.controller('TakeawayController',['socket','$scope','NotificationService',function(socket,$scope,NotificationService)
{
  this.notificationservice = NotificationService;
  $scope.radioModel = "Pending";
  socket.on('messagetoyou',function(data){
    console.log('obtained data for only me yaaay: ',data);
  });
  this.pendingnotification = function()
  {
   this.notificationservice.fetchnotification(); 
 };
 this.acceptednotification = function()
 {
  this.notificationservice.acceptednotification();
};
this.rejectednotification = function()
{
 this.notificationservice.rejectednotification();
};
                //this.currentindex = 0;
              }])
.controller('TableOrderController',['socket','$scope','NotificationService','$state',function(socket,$scope,NotificationService,$state)
{
  this.notificationservice = NotificationService;
  $scope.radioModel = "Pending";
  this.notificationservice.countacceptedorders();
  this.notificationservice.countrejectedorders(); 
  socket.on('placedOrder',function(data){
    console.log('obtained data for only me yaaay: ',data.payload);
    var payload = {};
    payload = data.payload;
    payload.OrderSummary = JSON.parse(payload.OrderSummary);
    payload.Orders = JSON.parse(payload.Orders);
    NotificationService.pushnotification(payload);
    $scope.$apply();
  });
  this.pendingnotification = function()
  {
   this.notificationservice.fetchnotification(); 
 };
 this.acceptednotification = function()
 {
  this.notificationservice.acceptednotification();
};
this.rejectednotification = function()
{
 this.notificationservice.rejectednotification();
};
                //this.currentindex = 0;
              }])
.controller('DashboardPageController',['UserService','$scope','$state',function(UserService,$scope,$state)
{
  this.userservice = UserService;
  $scope.$state = $state;
  $scope.chartObject = {
  "type": "PieChart",
  "displayed": true,
  "data": {
    "cols": [
      {
        "id": "month",
        "label": "Month",
        "type": "string",
        "p": {}
      },
      {
        "id": "laptop-id",
        "label": "Laptop",
        "type": "number",
        "p": {}
      },
      {
        "id": "desktop-id",
        "label": "Desktop",
        "type": "number",
        "p": {}
      },
      {
        "id": "server-id",
        "label": "Server",
        "type": "number",
        "p": {}
      },
      {
        "id": "cost-id",
        "label": "Shipping",
        "type": "number"
      }
    ],
    "rows": [
      {
        "c": [
          {
            "v": "January"
          },
          {
            "v": 19,
            "f": "42 items"
          },
          {
            "v": 12,
            "f": "Ony 12 items"
          },
          {
            "v": 7,
            "f": "7 servers"
          },
          {
            "v": 4
          }
        ]
      },
      {
        "c": [
          {
            "v": "February"
          },
          {
            "v": 13
          },
          {
            "v": 1,
            "f": "1 unit (Out of stock this month)"
          },
          {
            "v": 12
          },
          {
            "v": 2
          }
        ]
      },
      {
        "c": [
          {
            "v": "March"
          },
          {
            "v": 24
          },
          {
            "v": 5
          },
          {
            "v": 11
          },
          {
            "v": 6
          }
        ]
      }
    ]
  },
  "options": {
    "title": "Dishes sold per month",
    "isStacked": "true",
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Sales unit",
      "gridlines": {
        "count": 10
      }
    },
    "hAxis": {
      "title": "Date"
    }
  },
  "formatters": {}
};
$scope.chartObjectlinechart = {
  "type": "LineChart",
  "displayed": true,
  "data": {
    "cols": [
      {
        "id": "month",
        "label": "Month",
        "type": "string",
        "p": {}
      },
      {
        "id": "laptop-id",
        "label": "Laptop",
        "type": "number",
        "p": {}
      },
      {
        "id": "desktop-id",
        "label": "Desktop",
        "type": "number",
        "p": {}
      },
      {
        "id": "server-id",
        "label": "Server",
        "type": "number",
        "p": {}
      },
      {
        "id": "cost-id",
        "label": "Shipping",
        "type": "number"
      }
    ],
    "rows": [
      {
        "c": [
          {
            "v": "January"
          },
          {
            "v": 19,
            "f": "42 items"
          },
          {
            "v": 12,
            "f": "Ony 12 items"
          },
          {
            "v": 7,
            "f": "7 servers"
          },
          {
            "v": 4
          }
        ]
      },
      {
        "c": [
          {
            "v": "February"
          },
          {
            "v": 13
          },
          {
            "v": 1,
            "f": "1 unit (Out of stock this month)"
          },
          {
            "v": 12
          },
          {
            "v": 2
          }
        ]
      },
      {
        "c": [
          {
            "v": "March"
          },
          {
            "v": 24
          },
          {
            "v": 5
          },
          {
            "v": 11
          },
          {
            "v": 6
          }
        ]
      }
    ]
  },
  "options": {
    "title": "Dishes sold per month",
    "isStacked": "true",
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Sales unit",
      "gridlines": {
        "count": 10
      }
    },
    "hAxis": {
      "title": "Date"
    }
  },
  "formatters": {}
};
      }])
.controller('MenuUploadController',['MenuService','$modal','$scope',function(MenuService,$modal,$scope)
{
  this.menuservice = MenuService;
  this.categoryname = '';
  this.addcategory = function()
  {
   this.menuservice.addcategory(this.categoryname);
   this.categoryname = '';
 };
 this.deletecategory = function(index)
 {
  this.menuservice.deletecategory(index);
};
this.deleteitem = function(parentindex,index)
{
 this.menuservice.deleteitem(parentindex,index);
};
this.savemenu = function()
{
 this.menuservice.savemenu();
};
}])
.controller('ModalInstanceCtrl',function($scope, $modalInstance, indexval,$state,$rootScope)
{
 $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {

   $modalInstance.dismiss('cancel');

 });   
 $scope.item = {
  itemname:'',
  itemprice:'',
  index:indexval
};

$scope.ok = function () {
  $modalInstance.close($scope.item);
  $state.transitionTo('homepage.menusupload'); 
};
$scope.cancel = function () {
  $modalInstance.dismiss('cancel');
  $state.transitionTo('homepage.menusupload');
};

})
.controller('IndexController',['UserService','$scope','$state',function(UserService,$scope,$state)
{
  this.userservice = UserService;
  $scope.$state = $state;
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
.controller('LoginCtrl',['UserService','$location','$state',function(UserService,$location,$state)
{
 this.user = {
  email:'',
  password:''
};
this.login = function(){
  UserService.login(this.user).then(function(success){
   $state.transitionTo('homepage.tableorder');
   $location.replace();
 },function(error){
   this.errormessage = error.data;
 });
};
}
])
.controller('SignupController',['UserService','$location','$state',function(UserService,$location,$state)
{
 this.user = {
  fullname:'',
  email:'',
  mobile:'',
  password:''
};
this.signup = function(){
  UserService.signup(this.user).then(function(success){
   $state.transitionTo('homepage.tableorder');
   $location.replace();
 },function(error){
   this.errormessage = error.data;
 });
};
}
]);