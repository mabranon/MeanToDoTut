//============
// Module
//============
var tutToDo = angular.module('tutToDo', []);

//==============
// Controller
//==============
tutToDo.controller("toDoController", function($scope, $http){
	
	$scope.formData = {};
	
	// get all todos on page load
	$http.get('/api/todos')
	.then(function(data){
		$scope.todos = data;
		console.log(data);
	}, function(data){
		console.log('Error: ' + data);
	});
		
	// submission of add form via express api
	$scope.createToDo = function(){
		$http.post('/api/todos', $scope.formData)
		.then(function(data){
			$scope.formData = {};	// resets formData for new input
			$scope.todos = data;
			console.log(data);
		}, function(data){
			console.log('Error: ' + data);
		});
	};
		
	$scope.deleteToDo = function(id){
		$http.delete('/api/todos' + id)
		.then(function(data){
			$scope.todos = data;
			console.log(data);
		}, function(data){
			console.log('Error: ' + data);
		});
	};
}
		
