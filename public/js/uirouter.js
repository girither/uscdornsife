  angular.module('foodpipeApp',['ui.router','ui.bootstrap','cfp.loadingBar', 'ngAnimate','ngResource'])
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
    .state('signin', {
      url: "/signin",
      templateUrl: "views/userlogin.html",
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
    })
    .state('main', {
      url: "/",
      templateUrl: "views/main.html",
      controller: 'AppController',
      controllerAs: 'appCtrl'
    })
    .state('homepage', {
      url: "/homepage",
      templateUrl: "views/homepage.html",
      controller: 'HomePageController',
      controllerAs:  'hmepgectrl',
      resolve:{
        auth:['$q','$location','UserService','NotificationService','$state',function($q,$location,UserService,NotificationService,$state){
          return UserService.checkexpiry().then(function(success){},function(error){
           $location.path('/signin');
           $location.replace();
         });
        }]}
      })
    .state('homepage.homedelivery', {
      url: "/homedelivery",
      templateUrl: "views/homedelivery.html",
      controller: 'HomePageController',
      controllerAs:  'hmepgectrl',
      resolve:{
        auth:['$q','$location','UserService','NotificationService',function($q,$location,UserService,NotificationService){
          return UserService.checkexpiry().then(function(success){NotificationService.fetchnotification();},function(error){
           $location.path('/signin');
           $location.replace();
         });
        }]}
      })
     .state('homepage.tableorder', {
      url: "/tableorder",
      templateUrl: "views/tableorder.html",
      controller: 'HomePageController',
      controllerAs:  'hmepgectrl',
      resolve:{
        auth:['$q','$location','UserService','NotificationService',function($q,$location,UserService,NotificationService){
          return UserService.checkexpiry().then(function(success){NotificationService.fetchnotification();},function(error){
           $location.path('/signin');
           $location.replace();
         });
        }]}
      })
    .state('homepage.takeaway', {
      url: "/takeaway",
      templateUrl: "views/takeaway.html",
      controller: 'HomePageController',
      controllerAs: 'hmepgectrl',
      resolve:{
        auth:['$q','$location','UserService','NotificationService',function($q,$location,UserService,NotificationService){
          return UserService.checkexpiry().then(function(success){NotificationService.fetchnotification();},function(error){
           $location.path('/signin');
           $location.replace();
         });
        }]}
      })
    .state('homepage.dashboard', {
      url :"/dashboard",
      templateUrl: "views/dashboard.html",
      controller: 'DashboardPageController',
      controllerAs: 'dashboardpgectrl',
      resolve:{
        auth:['$q','$location','UserService',function($q,$location,UserService){
          return UserService.checkexpiry().then(function(success){},function(error)
          {
           $location.path('/signin');
           $location.replace();
         });
        }]}
      })
    .state("homepage.menusupload.addNewItem", {
      url: "/addNewItem:indexval",
      onEnter: ['$stateParams', '$state', '$modal', '$resource','MenuService', function($stateParams, $state, $modal, $resource,MenuService) {
        $modal.open({
          templateUrl: 'views/additem.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
          indexval: function () {
            var index = $stateParams.indexval;
            return index;
          }
        }
      }).result.then(function(item) {
        MenuService.saveitemtocategory(item);
      });
    }]
  })
    .state('homepage.menusupload', {
     url :"/menusupload",
     templateUrl: "views/menusupload.html",
     controller: 'MenuUploadController',
     controllerAs: 'menusuploadpgectrl',
     resolve:{
      auth:['$q','$location','UserService','MenuService',function($q,$location,UserService,MenuService){
        return UserService.checkexpiry().then(function(success){ MenuService.fetchgroups();},function(error)
        {
         $location.path('/signin');
         $location.replace();
       });
      }]}
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "views/usersignup.html",
      controller: 'SignupController',
      controllerAs: 'signupctrl'
    });
      }]);