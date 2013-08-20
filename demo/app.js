/* globals _, angular */
'use strict';

var app = angular.module('ngApp', [
  'yaru22.paginator'
]);

app.controller('demoController', function($scope) {
  $scope.changeItems = function () {
    $scope.pg.items = _.range(1, $scope.numItems + 1);
  };

  $scope.pg = {
    itemsPerPage: 10,
    maxNumButtons: 7,
    currentPage: 1
  };
});

// TODO: Move to its own module.
app.filter('skip', function () {
  return function (arr, count) {
    if (!_.isArray(arr)) {
      return arr;
    }
    return arr.slice(count);
  };
});
