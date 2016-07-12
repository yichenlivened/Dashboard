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
    'ngTable'
  ])
  .config(function ($routeProvider, $locationProvider) {
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


    // use the HTML5 History API
    $locationProvider.html5Mode(true);
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
}
}]);
