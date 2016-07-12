'use strict';

/**
 * @ngdoc function
 * @name dashboradApp.controller:keyMetricsCtrl
 * @description
 * # keyMetricsCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('KeyMetricsCtrl', ['$scope', '$http', 'NavService', function ($scope, $http, NavService) {

    NavService.init();
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Key Metrics View";

    $scope.optionsPayingCustomers = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Months',
          tickFormat: function(x){
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[x-1];
          }
        },
        yAxis: {
          axisLabel: 'Customers Number(k)',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };

    function CSVToArray(strData){
      var arrData = [];
      var tmp;
      var arrMatches = strData.match(/[^\r\n]+/g);
      var parametersName = arrMatches.shift().split(',');

      arrMatches.forEach(function(match){
        match = match.split(',');
        tmp = {
          series:0,
          x: parseInt(match[0]),
          y: parseInt(match[1])
        };
        arrData.push(tmp);
      });

      // Return the parsed data.
      return arrData;
    }

    $http.get('data/numberOfPayingCustomers.csv').success(function(data){
      $scope.dataLinePayingCustomers = [{
        values: CSVToArray(data),
        key: 'Paying customers',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }];
      console.log(data);
    });

    $scope.optionsReportedIssues = {
      chart: {
        type: 'historicalBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 40,
          left: 55
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Months',
          tickFormat: function(x){
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[x-1];
          }
        },
        yAxis: {
          axisLabel: 'Issues Number',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };

    $http.get('data/numberOfReportedIssues.csv').success(function(data){
      $scope.dataBarReportedIssues = [{
        values: CSVToArray(data),
        key: 'Reported Issues',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }];
      console.log($scope.data);
    });

  }]);