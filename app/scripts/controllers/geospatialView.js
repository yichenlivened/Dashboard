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
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Geospatial View";
    NavService.init();
    myService.init();
    loadData();
    myService.pulling(loadData, $scope.page);

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

    function loadData(){
      myService.async('data/employees.json').then(function(response){
        console.log(response);
        $scope.employeesData = response.data.companies;
        $scope.markers = dataToMarkers($scope.employeesData);
      });
    }

  }]);
