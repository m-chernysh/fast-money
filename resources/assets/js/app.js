angular.module('myApp',[])
    .controller('MyCtrl', function ($log, $scope, $http) {
        
        var data = null;

        $scope.data = function () {
            return data;
        };

        $http.get('/data/users').then(function(response) {
            data = response.data;
        });

    });

