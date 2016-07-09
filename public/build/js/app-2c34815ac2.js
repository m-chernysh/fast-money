angular.module('myApp',[])
    .controller('MyCtrl', function ($log, $scope, $http) {
        $scope.name = 'Superhero';

        $http.get('/data/users').then(function(response) {
            $log.log(response);
        });

    });


//# sourceMappingURL=app.js.map
