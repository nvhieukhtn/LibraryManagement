(function(){

	var app = angular.module('app', []);

	app.controller('body', ['$scope', '$http', function($scope, $http){
		$scope.role = "admin"; // Admin || user
		$scope.template_part = "home.html"
		$scope.changeContent = function(template_part, data=false) {
			$scope.template_part = template_part;
			$scope.data = data;
		};
		$scope.activeSidebar = function(template_part) {
			if (Array.isArray(template_part))
				return (template_part.indexOf($scope.template_part) != -1) ? "active" : "";
			return ($scope.template_part == template_part) ? "active" : "";
		}
		sessionStorage.Session = 'e3907d15-0d1e-45e3-906f-0cf0c141abe5';
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


		$scope.filterActive = 'All';
		$scope.activeFilter = function(name){
			return (name == $scope.filterActive) ? "active" : "";
		}
		
		$scope.Borrow = function(id){
			services.borrowDocument({
				id: id
			}, function(success){
				if (success)
						bootbox.alert("Mượn thành công");
					else bootbox.alert("Mượn thất bại");
				$scope.load();
			});
		}

		$scope.filter = function(name){
			$scope.filterActive = name;
			$scope.allBooks = [];
			$scope.load();
		}

		$scope.load = function () {
			services.getBooks({
					type: $scope.filterActive
				}, function(data){
					$scope.allBooks = data;
				});
		}
		$scope.load();
	}])

	
	app.controller('borrowed-books', ['$scope', function($scope){
		$scope.allBooks = [];

		
		$scope.Return = function(id){
			services.returnDocument({
				id: id
			}, function(success){
				if (success)
						bootbox.alert("Trả tài liệu thành công");
					else bootbox.alert("Trả tài liệu thất bại");
				$scope.load();
			});
		}

		$scope.load = function () {
			services.getBorrowedBooks({
				}, function(data){
					$scope.allBooks = data;
				});
		}
		$scope.load();
	}])
	app.controller('add-book', ['$scope', function($scope){
		var bookID = ($scope.data) ? $scope.data.bookID : false;
		$scope = setScopeInfoForAddEditBook($scope, bookID);
	}]);

	app.controller('edit-book', ['$scope', function($scope){
		var bookID = ($scope.data) ? $scope.data.bookID : false;
		$scope = setScopeInfoForAddEditBook($scope, bookID);
	}]);

	function setScopeInfoForAddEditBook($scope, bookID) {
		$scope.name = "";
		$scope.quantity = 0;
		$scope.price = 0;
		$scope.author = "";
		$scope.description = "";
		$scope.types = [
				{
					id: "Disk",
					name: "Đĩa"
				},
				{
					id: "Book",
					name: "Sách"
				}
			];

		loadInfoBook();


		function loadInfoBook(){
			if (bookID){
				services.getBookInfo({
					id: bookID
				},function(bookInfo){
					if (bookInfo){
						$scope.name = bookInfo.name;
						$scope.quantity = bookInfo.quantity;
						$scope.price = bookInfo.price;
						$scope.author = bookInfo.author;
						$scope.description = bookInfo.description;
						for (var i = bookInfo.types.length - 1; i >= 0; i--) {
							bookInfo.types[i] = { id: bookInfo.types[i]}
						}
						$scope.types = bookInfo.types;
						for (var i = bookInfo.groups.length - 1; i >= 0; i--) {
							bookInfo.groups[i] = { id: bookInfo.groups[i]}
						}
						$scope.groups = bookInfo.groups;
					} else {
						bootbox.alert("Lỗi load dữ liệu...");
					}
				});
			}
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

		$scope.add_DelMoreGroup = function(index){
			if (index >= $scope.groups.length-1)
				addMoreGroup();
			else deleteGroup(index);
		}


		$scope.addBook = function(){
			var mess = verify();
			if ( mess != "") {
				bootbox.alert(mess);
				return ;
			}
			if (!bookID){
				services.addBook({
					Name: $scope.name,
					Quantity: $scope.quantity,
					Price: $scope.price,
					Author: $scope.author,
					Description: $scope.description,
					Type: $scope.type,
					Group: $scope.type
				}, function(success){
					if (success)
						bootbox.alert("Thêm sách thành công");
					else bootbox.alert("Đã gặp sự cố khi thêm sách");
				})
			} else {
				services.editBook({
					id: bookID
				},{
					name: $scope.name,
					quantity: $scope.quantity,
					price: $scope.price,
					author: $scope.author,
					desciption: $scope.desciption,
					types: types,
					groups: groups
				}, function(success){
					if (success)
						bootbox.alert("Sửa sách thành công");
					else bootbox.alert("Đã gặp sự cố khi sửa sách");
				})
			}
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

		return $scope;
	}

})();