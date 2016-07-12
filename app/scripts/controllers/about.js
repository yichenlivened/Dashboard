'use strict';

/**
 * @ngdoc function
 * @name dashboradApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('AboutCtrl', ['$scope', 'NavService', function ($scope, NavService) {
    NavService.init();
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "About";

  }]);
