angular.module('myApp',[])
    .controller('MyCtrl', function ($log, $scope, $http) {
        
        var data = null;

        $scope.source = null;
        $scope.destination = null;
        $scope.amount = 0;

        $scope.data = function () {
            return data;
        };

        /**
         * Запрос на получение данных пользователей
         */
        $http.get('/data/users').then(function(response) {
            data = response.data;
        });

        /**
         * Отправляем запрос на перевод денежных средств
         */
        $scope.send = function () {

            if ($scope.source == null || $scope.destination == null) {
                alert('Необходимо указать оба счета для проведения операции!');
                return;
            }

            if ($scope.source == $scope.destination) {
                alert('Необходимо указать разные счета для перевода!');
                return;
            }

            if ($scope.amount <= 0) {
                alert('Необходимо указать положительную сумму для перевода!');
                return;
            }

            $http.post("/remittance", {
                'source' : $scope.source,
                'destination' : $scope.destination,
                'amount' : $scope.amount
            }).success(function(response, status) {
                $log.log(response);
                $log.log(status);
            })
        }

    });


//# sourceMappingURL=app.js.map
