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
		services.http = $http;
	}]);

	/****************************************************************************************************/
	/****************************************   SIDEBAR  ************************************************/
	/****************************************************************************************************/
	app.controller('sidebar', ['$scope', '$http', function($scope, $http){
		
	}]);


	/****************************************************************************************************/
	/*****************************************   HOME  **************************************************/
	/****************************************************************************************************/
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


	/****************************************************************************************************/
	/****************************************   ALL BOOK  ***********************************************/
	/****************************************************************************************************/
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

		$scope.deleteBook = function(index){
			// bootbox.confirm("Bạn có chắc muốn xóa không?", function(isDelete){
			// 	if (isDelete) {
			// 		services.deleteBook({
			// 			id: $scope.allBooks[index].id
			// 		},function(success){
			// 			if (success){
			// 				$scope.allBooks.splice(index, 1);
			// 				console.log($scope.allBooks)
			// 				bootbox.alert("Xóa thành công.");
			// 			} else {
			// 				bootbox.alert("Xóa không thành công.");
			// 			}
			// 		});
			// 	}
			// });
			var isDelete = confirm("Bạn có chắc muốn xóa không?");
			if (isDelete) {
				services.deleteBook({
					id: $scope.allBooks[index].id
				},function(success){
					if (success){
						$scope.allBooks.splice(index, 1);
						console.log($scope.allBooks)
						bootbox.alert("Xóa thành công.");
					} else {
						bootbox.alert("Xóa không thành công.");
					}
				});
			}
		}
	}])


	/****************************************************************************************************/
	/**************************************   ADD + EDIT BOOK  ******************************************/
	/****************************************************************************************************/
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
		$scope.typesOption = [];
		$scope.types = [];
		$scope.groupsOption = [];
		$scope.groups = [];

		loadInfoBook();

		// Load Type
		services.getAllTypesBook({
			quantity: -1,		// Số lượng sách hiển thị (default: 10)
			offset: 0,			// Số lượng sách bỏ qua (default: 0)
			selects: [ 'id' ]
		}, function(data){
			$scope.typesOption = data;
			if (!bookID)
				addMoreType();
		});

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
							bookInfo.types[i] = { id: bookInfo.types[i].id}
						}
						$scope.types = bookInfo.types;
						for (var i = bookInfo.groups.length - 1; i >= 0; i--) {
							bookInfo.groups[i] = { id: bookInfo.groups[i].id}
						}
						$scope.groups = bookInfo.groups;
					} else {
						bootbox.alert("Lỗi load dữ liệu...");
					}
				});
			}
		}

		// Load Type
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
			if (!bookID)
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
			if (!bookID){
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


	/****************************************************************************************************/
	/****************************************   VIEW BOOK  **********************************************/
	/****************************************************************************************************/
	app.controller('view-book', ['$scope', function($scope){
		var bookID = ($scope.data) ? $scope.data.bookID : false;
		$scope.bookID = bookID;
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
					$scope.types = "";
					for (var i = bookInfo.types.length - 1; i >= 1; i--) {
						$scope.types += bookInfo.types[i].name + ", ";
					}
					if ($scope.types != "")
						$scope.types += bookInfo.types[0].name;
					$scope.groups = "";
					for (var i = bookInfo.groups.length - 1; i >= 1; i--) {
						$scope.groups += bookInfo.groups[i].name + ", ";
					}
					if ($scope.groups != "")
						$scope.groups += bookInfo.groups[0].name;
				} else {
					bootbox.alert("Lỗi load dữ liệu...");
				}
			});
		} else {
			bootbox.alert("Không load được thông tin sách");
		}
	}]);

	

})();