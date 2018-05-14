var todoApp = angular.module('todoApp', ['ui.router'])
    .controller('mainController',["$scope", "$http", "$stateParams","$state", "$window", function($scope, $http, $stateParams, $state, $window) {
    $scope.formData = {};
    //$scope.stateParams = $stateParams;
   // console.log("State Params", $scope.stateParams, $state);
    // when landing on the page, get all todos and show them
    $http.get('/api/todos/get_todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos/post_todo', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        var data = id;
        $window.location.reload();
        console.log("_id", data);
        $http.delete('/api/todos/delete_todo/'+ data)
            .success(function(data) {
                //$scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // update a todo
    $scope.updateTodo = function (id,name){
        var data = id;
        $scope.formData.name = name;
        $http.put('/api/todos/update_todo/' + data)
        .success(function(data){
            console.log(data)
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
}]);
