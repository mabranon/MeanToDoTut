angular.module('toDoService', [])
	.factory('ToDos', function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(toDoData) {
				return $http.post('/api/todos', toDoData);
			},
			delete : function(){
				return $http.delete('/api/todos');
			},
			checkOff : function(id){
				return $http.post('/api/checkTodo' + id);
			},
			markUrgent : function(id){
				return $http.post('/api/markUrgentTodo' + id);
			}
		}
	});
