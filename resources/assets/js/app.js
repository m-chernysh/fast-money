angular.module('myApp',[])
    .controller('MyCtrl', function ($log, $scope, $http) {
        
        var data = null;

        $scope.source = null;
        $scope.destination = null;
        $scope.amount = 0;
        $scope._token = 0;

        $scope.data = function () {
            return data;
        };

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
                'amount' : $scope.amount,
                '_token' : $scope._token
            }).success(function(response, status) {
                if (!response.error) {
                    reload();
                }
            })
        };

        /**
         * Запрос на получение данных пользователей
         */
        function reload() {
            $http.get('/data/users').then(function(response) {
                data = response.data;

                for (idx in data) {
                    if ($scope.source && data[idx]['id'] == $scope.source.id) {
                        $scope.source = data[idx];
                    }
                    if ($scope.destination && data[idx]['id'] == $scope.destination.id) {
                        $scope.destination = data[idx];
                    }
                }

            });
        }

        reload();
    });

