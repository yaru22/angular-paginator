/* global angular */
'use strict';

angular.module('yaru22.paginator', [
]).directive('paginator', function() {
  // Helper function to create an array [start..end]
  function range(start, end) {
    var arr = [];
    for (var i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }

  return {
    restrict: 'A',
    transclude: true,
    templateUrl: 'angular-paginator.tmpl',
    scope: {
      paginator: '='
    },
    link: function($scope) {
      // Shorter name.
      var pg = $scope.paginator;

      // Whenever `paginator.items` is replaced by a new array, resets
      // the `currentPage` to 1.
      // It doesn't reset if the contents of `paginator.items` is changed.
      // e.g. `paginator.items.push(someObj)` won't reset `currentPage`
      $scope.$watch('paginator.items', function () {
        pg.currentPage = 1;
      });

      pg.getNumSkips = function () {
        return (pg.currentPage - 1) * pg.itemsPerPage;
      };

      $scope.getPaginatorRange = function () {
        var numItems = pg.items && pg.items.length || 0;
        var maxPageNum = Math.max(1, Math.ceil(numItems / pg.itemsPerPage));
        var currentPage = pg.currentPage;
        var maxNumLeftButtons = Math.floor((pg.maxNumButtons - 1) / 2);
        var maxNumRightButtons = Math.ceil((pg.maxNumButtons - 1) / 2);

        var leftEnd = Math.max(1, currentPage - maxNumLeftButtons);
        var rightEnd = Math.min(maxPageNum, currentPage + maxNumRightButtons);

        if (leftEnd === 1 && rightEnd === maxPageNum) {
          // Nothing to do
        }
        else {
          var numPageButtons = (rightEnd + 1) - leftEnd;
          if (numPageButtons < pg.maxNumButtons) {
            var numRemainingButtons = pg.maxNumButtons - numPageButtons;
            if (leftEnd === 1) {
              rightEnd = Math.min(maxPageNum, rightEnd + numRemainingButtons);
            }
            else if (rightEnd === maxPageNum) {
              leftEnd = Math.max(1, leftEnd - numRemainingButtons);
            }
          }
        }

        return range(leftEnd, rightEnd);
      };

      $scope.goToPage = function (page) {
        var numItems = pg.items && pg.items.length || 0;
        var maxPageNum = Math.max(1, Math.ceil(numItems / pg.itemsPerPage));
        page = Math.max(1, page);
        page = Math.min(maxPageNum, page);
        pg.currentPage = page;
        window.scrollTo(0, 0);
      };
    }
  };
});
