var ibmExercise = angular.module('ibmExercise', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.weatherData = {};

    $scope.getWeatherData = function() {
        var q = $scope.formData.city;
        var zip = $scope.formData.zip;
        var units = $scope.formData.units;
        var url = "/weather?q="+q+"&zip="+zip+"&units="+units;
        if(q || zip) {
            $http.get(url)
                .success(function(data) {
                    //$scope.formData = {};
                    $scope.weatherData = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }
}

