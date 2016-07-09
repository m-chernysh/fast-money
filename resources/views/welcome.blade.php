<!DOCTYPE html>
<html>
    <head>
        <title>Fast Money</title>
        <link rel="stylesheet" href="{{ elixir('css/app.css') }}">
        <script src="/js/require.js"></script>
        <script src="{{ elixir('js/app.js') }}"></script>
    </head>
    <body>

        <div class="container-fluid" ng-app="myApp" ng-controller="MyCtrl">
            <div class="row">

                <div class="col-sm-3 col-md-2 sidebar">
                    <div class="user" ng-repeat="item in data()">
                        <a href="#" ng-bind="item.name"></a> - <span ng-bind="item.balance"></span> $
                    </div>
                </div>

                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <h1 class="page-header">Fast Money</h1>
                    <pre ng-bind="data() | json"></pre>
                </div>

            </div>
        </div>

    </body>
</html>
