var app = angular.module('flightSearch' ,[]);

app.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

app.controller("MainCtrl", ['$scope', '$http',
    function($scope, $http) {
        $scope.listOfFlights = [];
        $scope.fNumberError=false;
        $scope.dateError=false;
        $scope.searchForFlights = function(fNumber, origin, destination, date) {
            if(!fNumber && (!origin || !destination)) {
                $scope.fNumberError=true;
                $scope.dateError=false;
                $scope.listOfFlights = [];
                return;
            } else if(!date) {
                $scope.dateError=true;
                $scope.fNumberError=false;
                $scope.listOfFlights = [];
                return;
            }
            else {
                $scope.fNumberError=false;
                $scope.dateError=false;
                $scope.listOfFlights = [];
                $http({
                    url :'http://localhost:3000/api/flights/',
                    method: "GET",
                    params : { fNumber:fNumber, origin:origin, destination:destination, date:date}
                }).
                success(function(data) {
                    console.log("data", data);
                $scope.listOfFlights = data;
             });
            }
        };
}]);

