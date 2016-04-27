angular.module('toDoService', [])
	.factory('ToDos', function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(toDoData) {
				return $http.post('/api/todos', toDoData);
			},
			delete : function(id){
				return $http.delete('/api/todos' + id);
			},
			checkOff : function(id){
				return $http.post('/api/checkTodo' + id);
			}
		}
	});
