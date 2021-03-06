/**
 * @author King David Lawrence
 * @since 10/10/17
 */
angular.module("Date", ["DateUtils"])
    .directive("ojDate", ["dateUtils", function(dateUtils){
        return{
            scope: {
                itemDate: '='
            }
            , restrict: 'E'
            , replace: true
            , link: function(scope, elem){
                var theDate = dateUtils.parseDate(scope.itemDate);

                elem.html('<span class="date">' + theDate + '</span>');

                scope.$watch(function(){return dateUtils.parseDate(scope.itemDate)}, function(value){
                    elem.html('<span class="date">' + value + '</span>');
                });
            }
        }
    }]);