# Dashborad
A real-time corporate dashboard application using Angular MVC framework. :sunglasses:

- **Responsiveness:** App is equally functional on mobile and desktop.

- **Framework Implementation:** App makes use of a Front-End Framework (Angular) and properly separates data from the user interface.

- **Data Formats:** Each dashboard uses external data files (data not stored directly within the application, json and csv).

- **Near Real Time Updates:** dashboard components update their displays in “near” real-time without requiring a refresh of the application.

- **App Delivery:** App includes a build process (Grunt). Assets are minimized and concatenated as appropriate.

## Build & development
Run `grunt` for building and `grunt serve` for preview.
Running `grunt serve:dist` will test app in production mode.
Change the .csv and .json files in app/data can see the Real-Time Updates features. 

## Library
[leaflet-directive](http://tombatossals.github.io/angular-leaflet-directive/#!/)

[Angular-nvD3](http://krispo.github.io/angular-nvd3/#/)

[ng-table](http://ng-table.com/#/)

## Reference
[10+ Solutions for Responsive Data Tables](http://exisweb.net/responsive-table-plugins-and-patterns)

[Simple Long Polling Example with JavaScript and jQuery @Techoctave](https://techoctave.com/c7/posts/60-simple-long-polling-example-with-javascript-and-jquery)

[JavaScript Polling @Davidwalsh](https://davidwalsh.name/javascript-polling)

[JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)

[Processing $http response in service](http://stackoverflow.com/questions/12505760/processing-http-response-in-service)

['this' vs $scope in AngularJS controllers](http://stackoverflow.com/questions/11605917/this-vs-scope-in-angularjs-controllers)

## Further development
Plan to add HTML5 WebSockets to make truly responsive web dashboard.
