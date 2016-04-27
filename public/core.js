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
	$http.get('/api/todos').then(function(res){
		$scope.todos = res.data;
		console.log(res.data);
	}, function(res){
		console.log('Error: ' + res.data);
	});
		
	// submission of add form via express api
	$scope.createToDo = function(){
		$http.post('/api/todos', $scope.formData).then(function(res){
			$scope.formData = {};	// resets formData for new input
			$scope.todos = res.data;
			console.log(res.data);
		}, function(res){
			console.log('Error: ' + res.data);
		});
	};
		
	$scope.deleteToDo = function(id){
		$http.delete('/api/todo' + id).then(function(res){
			$scope.todos = res.data;
			console.log(res.data);
		}, function(res){
			console.log('Error: ' + res.data);
		});
	};
	
	//TODO add importance fuction (star/change color)
	//TODO add fuctionality to change order
	//TODO add seperate clicks 
		//(checkbox just checks item, clicking 
		//item removes it from the list)
});
		
