(function(){

	var app = angular.module('app', []);

	app.controller('body', ['$scope', '$http', function($scope, $http){
		$scope.role = "admin"; // Admin || user
		$scope.template_part = "home.html"
		$scope.changeContent = function(template_part) {
			$scope.template_part = template_part;
		};
		$scope.activeSidebar = function(template_part) {
			if (Array.isArray(template_part))
				return (template_part.indexOf($scope.template_part) != -1) ? "active" : "";
			return ($scope.template_part == template_part) ? "active" : "";
		}
		services.http = $http;
	}]);

	app.controller('sidebar', ['$scope', '$http', function($scope, $http){
		
	}]);

	app.controller('home', ['$scope', function($scope){
		$scope.rentedBooksInfo = [];
		services.getBookRented({
			quantity: 10,		// Số lượng sách hiển thị (default: 10)
			offset: 0,			// Số lượng sách bỏ qua (default: 0)
			selects: [ 'id', 'bookName', 'renter', 'date' ]
		},function(data){
			$scope.rentedBooksInfo = data;
		});
	}]);

	app.controller('all-books', ['$scope', function($scope){
		$scope.allBooks = [];
		$scope.hasViewMore = true;
		var quantity = 10;
		var offset = 0;
		services.getBooks({
			quantity: quantity,		// Số lượng sách hiển thị (default: 10)
			offset: offset,			// Số lượng sách bỏ qua (default: 0)
			selects: [ 'id', 'name', 'author', 'quantity' ]
		}, function(data){
			$scope.hasViewMore = data.length >= quantity;
			$scope.allBooks = data;
			offset += data.length;
		});

		$scope.viewMore = function () {
			services.getBooks({
				quantity: quantity,		// Số lượng sách hiển thị (default: 10)
				offset: offset,			// Số lượng sách bỏ qua (default: 0)
				selects: [ 'id', 'name', 'author', 'quantity' ]
			}, function(data){
				$scope.hasViewMore = data.length >= quantity;
				$scope.allBooks = $scope.allBooks.concat(data);
				offset += data.length;
			});
		}
	}])

})();