
var module = angular.module('myModule', []);


module.controller('myController', ['$scope', 'myServiceCopado', function($scope, myServiceCopado) {


    $scope.title = 'Hola Arquitectura web';


    $scope.onClick = function() {


        // $scope.total = $scope.qty * $scope.cost;

        myServiceCopado.deleteUser(1234);

    };


}]);


module.service('myServiceCopado', ['$http', function($http) {


    this.getUsers = function() {

        return $http.get('/api/v1/user')

    };

    this.deleteUser = function(idUser) {

        $http.delete('/user/' + idUser);
    };


}]);