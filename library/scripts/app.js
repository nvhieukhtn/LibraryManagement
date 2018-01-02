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
		$scope.checkAll = false;

		var filterActive = 'all';
		var quantity = 10;
		var offset = 0;

		$scope.activeFilter = function(name){
			return (name == filterActive) ? "active" : "";
		}

		$scope.filter = function(name){
			filterActive = name;
			$scope.allBooks = [];
			$scope.viewMore();
		}

		$scope.viewMore = function () {
			if (filterActive == "all"){
				services.getBooks({
					quantity: quantity,		// Số lượng sách hiển thị (default: 10)
					offset: offset,			// Số lượng sách bỏ qua (default: 0)
					selects: [ 'id', 'name', 'author', 'quantity' ]
				}, function(data){
					for (var i = data.length - 1; i >= 0; i--) {
						data[i]['checked'] = false;
					}
					$scope.hasViewMore = data.length >= quantity;
					$scope.allBooks = $scope.allBooks.concat(data);
					offset += data.length;
				});
			} else if (filterActive == "out"){
				services.getOutOfBooks({
					quantity: quantity,		// Số lượng sách hiển thị (default: 10)
					offset: offset,			// Số lượng sách bỏ qua (default: 0)
					selects: [ 'id', 'name', 'author', 'quantity' ]
				}, function(data){
					for (var i = data.length - 1; i >= 0; i--) {
						data[i]['checked'] = false;
					}
					$scope.hasViewMore = data.length >= quantity;
					$scope.allBooks = $scope.allBooks.concat(data);
					offset += data.length;
				});
			} else if (filterActive == "in") {
				services.getBooksHasStock({
					quantity: quantity,		// Số lượng sách hiển thị (default: 10)
					offset: offset,			// Số lượng sách bỏ qua (default: 0)
					selects: [ 'id', 'name', 'author', 'quantity' ]
				}, function(data){
					for (var i = data.length - 1; i >= 0; i--) {
						data[i]['checked'] = false;
					}
					$scope.hasViewMore = data.length >= quantity;
					$scope.allBooks = $scope.allBooks.concat(data);
					offset += data.length;
				});
			}
		}
		$scope.viewMore();

		$scope.checkAllBooks = function(){
			for (var i = $scope.allBooks.length - 1; i >= 0; i--) {
				$scope.allBooks[i]['checked'] = $scope.checkAll;
			}
		}
	}])

	app.controller('add-book', ['$scope', function($scope){
		$scope.name = "";
		$scope.quantity = 0;
		$scope.price = 0;
		$scope.author = "";
		$scope.desciption = "";
		$scope.typesOption = [];
		$scope.types = [];
		$scope.groupsOption = [];
		$scope.groups = [];

		// Load Type
		services.getAllTypesBook({
			quantity: -1,		// Số lượng sách hiển thị (default: 10)
			offset: 0,			// Số lượng sách bỏ qua (default: 0)
			selects: [ 'id' ]
		}, function(data){
			$scope.typesOption = data;
			addMoreType();
		});

		$scope.showAllType = function (){
			console.log($scope.types);
		}

		$scope.add_DelMoreType = function(index){
			if (index >= $scope.types.length-1)
				addMoreType();
			else deleteType(index);
		}

		function deleteType(index) {
			$scope.types.splice(index, 1);
		}

		function addMoreType() {
			$scope.types.push({id: $scope.typesOption[0]['id']});
		}

		$scope.typeAddMoreClass = function(index){
			return (index >= $scope.types.length-1) ? "add-more" : 'remove-me';
		}
		$scope.typeAddMoreIcon = function(index) {
			return (index >= $scope.types.length-1) ? "+" : '-';
		}

		// Load Group
		services.getAllGroupsBook({
			quantity: -1,		// Số lượng sách hiển thị (default: 10)
			offset: 0,			// Số lượng sách bỏ qua (default: 0)
			selects: [ 'id' ]
		}, function(data){
			$scope.groupsOption = data;
			addMoreGroup();
		});

		$scope.showAllGroup = function (){
			console.log($scope.groups);
		}

		$scope.add_DelMoreGroup = function(index){
			if (index >= $scope.groups.length-1)
				addMoreGroup();
			else deleteGroup(index);
		}

		function deleteGroup(index) {
			$scope.groups.splice(index, 1);
		}

		function addMoreGroup() {
			$scope.groups.push({id: $scope.groupsOption[0]['id']});
		}

		$scope.groupAddMoreClass = function(index){
			return (index >= $scope.groups.length-1) ? "add-more" : 'remove-me';
		}
		$scope.groupAddMoreIcon = function(index) {
			return (index >= $scope.groups.length-1) ? "+" : '-';
		}

		$scope.addBook = function(){
			var mess = verify();
			if ( mess != "") {
				bootbox.alert(mess);
				return ;
			}
			var types = [];
			for (var i = $scope.types.length - 1; i >= 0; i--) {
				types.push($scope.types[i]['id']);
			}
			var groups = [];
			for (var i = $scope.groups.length - 1; i >= 0; i--) {
				groups.push($scope.groups[i]['id']);
			}
			services.addBook({
				name: $scope.name,
				quantity: $scope.quantity,
				price: $scope.price,
				author: $scope.author,
				desciption: $scope.desciption,
				types: types,
				groups: groups
			}, function(success){
				if (success)
					bootbox.alert("Thêm sách thành công");
				else bootbox.alert("Đã gặp sự cố khi thêm sách");
			})
		}
		function verify(){
			var result = "";
			if ($scope.name == "")
				result += "Vui lòng nhập tên sách<br>";
			if ($scope.quantity == "")
				result += "Vui lòng nhập số lượng<br>";
			if ($scope.price == "")
				result += "Vui lòng nhập giá<br>";
			if ($scope.author == "")
				result += "Vui lòng nhập tác giả<br>";
			return result;
		}

	}])

})();