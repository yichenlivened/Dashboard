'use strict';

/**
 * @ngdoc function
 * @name dashboradApp.controller:dataViewCtrl
 * @description
 * # MainCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('DataViewCtrl', ['$scope', '$http', 'NavService', function ($scope, $http, NavService) {
    NavService.init();
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Data View";

  }]);
