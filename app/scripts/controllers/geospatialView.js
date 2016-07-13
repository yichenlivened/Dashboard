/**
 * @ngdoc function
 * @name dashboradApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('GeospatialViewCtrl', ['$scope', '$http', 'NavService', 'myService', function ($scope, $http, NavService, myService) {
    'use strict';
    NavService.init();
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Geospatial View";
    $scope.employeesData = [];
    angular.extend($scope, {
      us: {
        lat: 41.850033,
        lng: -87.6500523,
        zoom: 4
      },
      markers: {},
      controls: {
        scale: false
      }
    });

    function dataToMarkers(points){
        return points.map(function(ap){
          return {
            lat: ap.lat,
            lng: ap.lng,
            message: 'Number of employees: ' +ap.number
          };
        });
    }

    function getData(){
      myService.async('data/employees.json').then(function(response){
        $scope.employeesData = response.data.companies;
        $scope.markers = dataToMarkers($scope.employeesData);
      });
    }

    setInterval(function(){
      getData();
    }, 10000);

    getData();
  }]);
