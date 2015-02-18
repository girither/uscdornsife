angular.module('foodpipeApp')
		        .controller('HomePageController',['UserService','socket',function(UserService,socket)
             {
                this.userservice = UserService;
                socket.on('messagetoyou',function(data){
                    console.log('obtained data for only me yaaay: ',data);
                });
             }])
            .controller('DashboardPageController',['UserService',function(UserService)
             {
                this.userservice = UserService;
             }])
            .controller('MenuUploadController',['UserService','MenuService','$modal','$rootScope','$scope',function(UserService,MenuService,$modal,$rootScope,$scope)
             {
                this.userservice = UserService;
                this.menuservice = MenuService;
                this.categoryname = '';
                $rootScope.$on('$routeChangeStart', function(event, newUrl, oldUrl) {
                    if ($scope.modalInstance) {
                           $scope.modalInstance.dismiss('cancel');
                   }
                }); 
                this.addcategory = function()
                {
                     this.menuservice.addcategory(this.categoryname);
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
                this.additemtocategory = function (index) {

                 $scope.modalInstance = $modal.open({
                 templateUrl: 'addNewItem.html',
                 controller: 'ModalInstanceCtrl',
                 resolve: {
                 indexval: function () {
                    return index;
                    }
                  }
                });

                $scope.modalInstance.result.then(function (item) {
                   this.menuservice.saveitemtocategory(item);
                }.bind(this));
            };
             }])
           .controller('ModalInstanceCtrl',function($scope, $modalInstance, indexval)
             {
                   
                   $scope.item = {
                      itemname:'',
                      itemprice:'',
                      index:indexval
                   };

                  $scope.ok = function () {
                      $modalInstance.close($scope.item);
                     
                  };
                  $scope.cancel = function () {
                      $modalInstance.dismiss('cancel');
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