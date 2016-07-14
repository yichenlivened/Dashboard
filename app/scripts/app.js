'use strict';

/**
 * @ngdoc overview
 * @name dashboradApp
 * @description
 * # dashboradApp
 *
 * Main module of the application.
 */
angular
  .module('dashboradApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'leaflet-directive',
    'nvd3',
    'ngTable',
    'btford.socket-io'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/GeospatialView', {
        templateUrl: 'views/geospatialView.html',
        controller: 'GeospatialViewCtrl',
        controllerAs: 'geospatialView'
      })
      .when('/keyMetrics', {
        templateUrl: 'views/keyMetrics.html',
        controller: 'KeyMetricsCtrl',
        controllerAs: 'keyMetrics'
      })
      .when('/dataView', {
        templateUrl: 'views/dataView.html',
        controller: 'DataViewCtrl',
        controllerAs: 'dataView'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/GeospatialView'
      });
  })

.factory('NavService', ["$location", function ($location) {
  return {
    init: function () {
      $(".navBtn").removeClass("active");
      $("#" + $location.path().slice(1)).addClass('active');
    },
    toggleNav: function(){
      return function(){
        $("#wrapper").toggleClass("toggled");
      };
    }
  };
}])

.factory('myService',function($http){
  var myService = {
    interval: setInterval(function(){},10000),
    async: function(url){
      var promise = $http.get(url).success(function (response) {
          return response.data;
        }).error(function (error) {
          console.log(error);
          alert(error);
        });
       return promise;
    },
    pulling: function(loadData){
      myService.interval = setInterval(function(){
          loadData();
      }, 3000);
    },
    init: function(){
      clearInterval(myService.interval);
    }
  };
  return myService;
});
