angular.module('foodpipeApp')
		        .controller('HomePageController',['UserService',function(UserService)
             {
                this.userservice = UserService;
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
            .controller('TableOrderController',['socket','$scope','NotificationService',function(socket,$scope,NotificationService)
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
            .controller('DashboardPageController',['UserService','$scope','$state',function(UserService,$scope,$state)
             {
                this.userservice = UserService;
                $scope.$state = $state;
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