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
    myService.pulling(loadData);

    var self = this;
    $scope.dataset = null;

    function loadData(){
      myService.async('data/issues.json').then(function(response){
        if(angular.toJson(response.data) === angular.toJson($scope.dataset) && $scope.dataset != null){
            console.log("no update");
        } else{
          $scope.dataset = response.data;
          self.tableParams = new NgTableParams({}, {dataset: $scope.dataset.issues});
        }
      });
    }

  }]);
