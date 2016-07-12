'use strict';

/**
 * @ngdoc function
 * @name dashboradApp.controller:dataViewCtrl
 * @description
 * # MainCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('DataViewCtrl', ['$scope', '$http', 'NavService', 'NgTableParams', function ($scope, $http, NavService, NgTableParams) {
    NavService.init();
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Data View";

    var self = this;
    $http.get('data/issues.json').success(function(data){
      self.dataset = data.issues;
      self.tableParams = new NgTableParams({}, {
        dataset: self.dataset
      });
    });

  }]);
