'use strict';

/**
 * @ngdoc function
 * @name dashboradApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dashboradApp
 */
angular.module('dashboradApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

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

    $http.get('employees.json').success(function(data){
      $scope.markers = dataToMarkers(data.companies);
    });


    $scope.options = {
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
        dispatch: {
          stateChange: function(e){ console.log("stateChange"); },
          changeState: function(e){ console.log("changeState"); },
          tooltipShow: function(e){ console.log("tooltipShow"); },
          tooltipHide: function(e){ console.log("tooltipHide"); }
        },
        xAxis: {
          axisLabel: 'Months',
          tickFormat: function(){
            return 'Monday';
          }
        },
        yAxis: {
          axisLabel: 'Voltage (v)',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          },
          axisLabelDistance: -10
        },
        callback: function(chart){
          console.log("!!! lineChart callback !!!");
        }
      }
    };

    /*Random Data Generator */
    function sinAndCos() {
      var sin = [],sin2 = [],
        cos = [];

      //Data is represented as an array of {x,y} pairs.
      for (var i = 0; i < 100; i++) {
        sin.push({x: i, y: Math.sin(i/10)});
        sin2.push({x: i, y: i % 10 === 5 ? null : Math.sin(i/10) *0.25 + 0.5});
        cos.push({x: i, y: 0.5 * Math.cos(i/10+ 2) + Math.random() / 10});
      }

      //Line chart data should be sent as an array of series objects.
      return [
        {
          values: [
            {"series":0, "x":0, "y":20},{"series":0, "x":1, "y":26},{"series":0, "x":2, "y":32},{"series":0, "x":3, "y":30},
          ],
          key: 'Number of paying customers',
          color: '#7777ff',
          area: true      //area - set to true if you want this line to turn into a filled area chart.
        }
      ];
    }

    function CSVToArray(strData){
      var arrData = [];
      var tmp;
      var arrMatches = strData.match(/[^\r\n]+/g);
      var parametersName = arrMatches.shift().split(',');

      arrMatches.forEach(function(match){
        match = match.split(',');
        tmp = {};
        match.forEach(function(item,index){
          tmp[parametersName[index]] = parseInt(item);
        });
        arrData.push(tmp);
      });

      // Return the parsed data.
      return arrData;
    }

    $http.get('numberOfPayingCustomers.csv').success(function(data){
      $scope.data = [{
        values: CSVToArray(data),
        key: 'Number of paying customers',
        color: '#7777ff',
        area: true      //area - set to true if you want this line to turn into a filled area chart.
      }];
      console.log($scope.data);
      console.log(sinAndCos());
    });

  }]);
