/**
 * @ngdoc function
 * @name dashboradApp.controller:dataViewCtrl
 * @description
 * # MainCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('DataViewCtrl', ['$scope', '$http', 'NavService', 'NgTableParams', 'myService', function ($scope, $http, NavService, NgTableParams, myService) {
    'use strict';
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Data View";
    NavService.init();
    myService.init();
    loadData();
    myService.pulling(loadData, $scope.page);

    var self = this;
    var dataset;

    function loadData(){
      myService.async('data/issues.json').then(function(response){
          dataset = response.data.issues;
          self.tableParams = new NgTableParams({}, {dataset: dataset});
      });
    }

  }]);
