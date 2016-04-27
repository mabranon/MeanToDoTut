var toDoController = angular.module('toDoController', []);

toDoController.controller('mainController', 
		function($scope, $http, ToDos){
	
	$scope.formData = {};
	
	// get all todos on page load
	ToDos.get()
		.then(function(res){
			$scope.todos = res.data;
			console.log(res.data);
		}, function(res){
			console.log('Error: ' + res.data);
		});
		
	// submission of add form via express api
	$scope.createToDo = function(){
		if(!angular.equals($scope.formData, {})){
			ToDos.create($scope.formData).then(function(res){
				$scope.formData = {};	// resets formData for new input
				$scope.todos = res.data;
				console.log(res.data);
			}, function(res){
				console.log('Error: ' + res.data);
			});
		}
	};
		
	$scope.finishToDo = function(id){
		ToDos.checkOff(id).then(function(res){
			$scope.todos = res.data;
		}, function(res){
			console.log('Error: ' + res.data);
		});	
	};
	
	
	$scope.deleteToDo = function(id){
		ToDos.delete(id).then(function(res){
			$scope.todos = res.data;
			console.log(res.data);
		}, function(res){
			console.log('Error: ' + res.data);
		});
	};
});
