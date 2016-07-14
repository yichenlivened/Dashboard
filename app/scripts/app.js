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
    dataDir: {
        "Key Metrics View" : "numberOfPayingCustomers, numberOfReportedIssues",
        "Geospatial View" : "employees",
        "Data View" : "issues"
    },
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
    pulling: function(loadData, view){
      myService.interval = setInterval(function(){
        $http.get('data/update.json').success(function(response){
          var dataFiles = myService.dataDir[view].split(",");
          dataFiles.forEach(function(dataFile){
            if(response[dataFile]){
              console.log(dataFile + " updated.");
              loadData();
            } else{
              console.log(dataFile + " no change.");
            }
          })
        }).error(function (error) {
          console.log(error);
          alert(error);
        });
      }, 10000);
    },
    init: function(){
      clearInterval(myService.interval);
    }
  };
  return myService;
});
