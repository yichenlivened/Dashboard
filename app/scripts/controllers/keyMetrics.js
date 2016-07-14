/**
 * @ngdoc function
 * @name dashboradApp.controller:keyMetricsCtrl
 * @description
 * # keyMetricsCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('KeyMetricsCtrl', ['$scope', '$http', 'NavService', 'myService', function ($scope, $http, NavService, myService) {
    'use strict';
    $scope.toggleNav = NavService.toggleNav();
    $scope.page = "Key Metrics View";

    NavService.init();
    myService.init();
    loadData();
    myService.pulling(loadData, $scope.page);

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

    function loadData(){
      myService.async('data/numberOfReportedIssues.csv').then(function(response){
        $scope.dataBarReportedIssues = [{
          values: CSVToArray(response.data),
          key: 'Reported Issues',
          color: '#7777ff',
          area: true      //area - set to true if you want this line to turn into a filled area chart.
        }];
      });
      myService.async('data/numberOfPayingCustomers.csv').then(function(response){
        $scope.dataLinePayingCustomers = [{
          values: CSVToArray(response.data),
          key: 'Paying customers',
          color: '#7777ff',
          area: true      //area - set to true if you want this line to turn into a filled area chart.
        }];
      });
    }

  }]);
