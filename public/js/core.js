var app = angular.module('mytodoapp', ['ui.bootstrap']);

app.controller('mainController',function($scope, $modal, $http){
	//$scope.formData = {};
	$http.get('/api/todos').
		success(function(data){
			console.log(data);
			$scope.todos = data;

		}).error(function(data){
			console.log('Error => ' + data);
		});

	$scope.createTodo = function(){
		$http({
			method: 'POST',
			url: '/api/todos',
			data:{
				text : $scope.formData
			} 
		}).success(function(data){
			console.log(data);
			$scope.formData = '';
			$scope.todos = data;
		}).error(function(data){
			console.log('Error => ' + data);
		});
	}

	$scope.deleteTodo = function(id){
		if(confirm("Are you sure,you want to delete Todo Task?")){
			$http({
				method:'delete',
				url: '/api/todos/' + id
			}).success(function(data){
				console.log(data);
				$scope.formData = '';
				$scope.todos = data;
			}).error(function(data){
				console.log('Error => ' + data);
			});
		}
	}

	//$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (todoObject) {
		//alert(todoText);
	    var modalInstance = $modal.open({
		    animation: true,
		    templateUrl: 'myModalContent.html',
		    controller: 'ModalInstanceCtrl',
		    size:' ',
		    resolve: {
		        item: function () {
		        	return todoObject;
		        },
		        scope: function(){
		        	return $scope;
		        }
		    }
	    });
	    return false;
	}
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, item, scope, $http) {

	$scope.editFormData = item.text;
	$scope.editFormId = item._id;
	$scope.ok = function () {

		$http({
			method: 'POST',
			url: '/api/todos/edit',
			data:{
				text : $scope.editFormData,
				id : $scope.editFormId
			} 
		}).success(function(data){
			console.log(data);
			$scope.editFormData = '';
			$scope.editFormId = '';
			scope.todos = data;
		}).error(function(data){
			console.log('Error => ' + data);
		});

		$modalInstance.dismiss('cancel');
	};

	$scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	};
});