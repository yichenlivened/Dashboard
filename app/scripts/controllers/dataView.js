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
    NavService.init();
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Data View";

    var self = this;
    var dataset;

    function loadData(){
      myService.async('data/issues.json').then(function(response){
        console.log(response.data.issues);
        dataset = response.data.issues;
        self.tableParams = new NgTableParams({}, {dataset: dataset});
      });
    }

    loadData();

    setInterval(function(){
      loadData();
    }, 3000);

  }]);
