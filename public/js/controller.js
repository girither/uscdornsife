angular.module('foodpipeApp')
		        .controller('HomePageController',['UserService',function(UserService)
             {
                this.userservice = UserService;
             }])
            .controller('DashboardPageController',['UserService',function(UserService)
             {
                this.userservice = UserService;
             }])
            .controller('MenuUploadController',['UserService','$modal',function(UserService,$modal)
             {
                this.userservice = UserService;
                this.groups = [];
                this.categoryname = '';
                this.addcategory = function()
                {
                     this.groups.push({title:this.categoryname,items:[]});
                };
                this.saveitemtocategory = function(item)
                {
                    this.groups[item.index].items.push({"item-name":item.itemname,"item-price":item.itemprice});
                };
                this.deletecategory = function(index)
                {
                    this.groups.splice(index, 1);
                };
                this.deleteitem = function(parentindex,index)
                {
                    this.groups[parentindex].items.splice(index, 1);  
                };
                this.additemtocategory = function (index) {

                 var modalInstance = $modal.open({
                 templateUrl: 'addNewItem.html',
                 controller: 'ModalInstanceCtrl',
                 windowClass: "modal fade in",
                 resolve: {
                 indexval: function () {
                    return index;
                    }
                  }
                });

                modalInstance.result.then(function (item) {
                   this.saveitemtocategory(item);
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