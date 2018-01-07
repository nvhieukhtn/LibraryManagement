(function(){

	var app = angular.module('app', []);

	app.controller('body', ['$scope', '$http', function($scope, $http){
		
		$scope.role = "Admin"; // Admin || user
		$scope.template_part = "home.html";
		$scope.listNotifications = [];
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

		services.getAllNotitications(function(AllNotitications){
			$scope.listNotifications = AllNotitications;
		})
	}]);

	/****************************************************************************************************/
	/****************************************   SIDEBAR  ************************************************/
	/****************************************************************************************************/
	app.controller('sidebar', ['$scope', '$http', function($scope, $http){
		$scope.role = sessionStorage.Role;
	}]);
	app.controller('home', ['$scope', function($scope){
		$scope.rentedBooksInfo = [];
		$scope.role = sessionStorage.Role;
		services.getBookRented({
		},function(data){
			$scope.rentedBooksInfo = data;
		});
	}]);
	
	app.controller('all-books', ['$scope', function($scope){
		$scope.role = sessionStorage.Role;
		$scope.allBooks = [];
		$scope.sortDirection = 'ASC';
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
		
		$scope.changeSort = function(){
			if($scope.sortDirection == 'ASC') $scope.sortDirection = 'DESC';
			else if ($scope.sortDirection == 'DESC') $scope.sortDirection = 'ASC';
			$scope.load();
		}
		$scope.load = function () {
			services.getBooks({
					type: $scope.filterActive,
					sortDirection: $scope.sortDirection
				}, function(data){
					$scope.allBooks = data;
				});
		}
		$scope.load();
	}])
	
	app.controller('all-chanels', ['$scope', function($scope){
		$scope.role = sessionStorage.Role;
		$scope.listChanels = [];
		$scope.currentTab = 'All';
		
		$scope.Subscribe = function(chanelName){
			services.subscribeChanel({
				chanelName: chanelName
			}, function(success){
				if(success){
					bootbox.alert("Theo dõi thành công");
					$scope.load();
				}
				else bootbox.alert("Theo dõi thất bại");
			});
		}

		$scope.Unsubscribe = function(chanelName){
			services.unsubscribeChanel({
				chanelName: chanelName
			}, function(success){
				if(success){
					bootbox.alert("Bỏ theo dõi thành công");
					$scope.load();
				}
				else bootbox.alert("Bỏ theo dõi thất bại");
			});
		}
		$scope.changeTab = function(tabName){
			$scope.currentTab = tabName;
			$scope.load();
		}
		$scope.load = function () {
			services.getChanels({
				subscribe: $scope.currentTab != 'All'
			}, function(data){
				$scope.listChanels = data;
			});
		}
		$scope.load();
	}])

	
	app.controller('borrowed-books', ['$scope', function($scope){
		$scope.allBooks = [];
		$scope.role = sessionStorage.Role;
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

	app.controller('all-students', ['$scope', function($scope){
		$scope.studentInfos = [];
		$scope.q = "";
		var load = function(){
			services.getAllStudentInfos({			
			}, function(result){
				$scope.studentInfos = result;
			});
		}
		
		$scope.upgradeVIP = function(id){
			services.upgradeVIP({
				Id: id
			}, function(success){
				if (success){
					bootbox.alert("Thành công");
					load();
				}
				else
					bootbox.alert("Thất bại");
			});
		}
		$scope.downgradeVIP = function(id){
			services.downgradeVIP({
				Id: id
			}, function(success){
				if (success){
					bootbox.alert("Thành công");
					load();
				}
				else
					bootbox.alert("Thất bại");
				
			});
		}
		load();
	}]);


	app.controller('all-notifications', ['$scope', function($scope){
		$scope.Detail = function(index){
			var detail = "";
			detail += "<b>Tên thông báo: </b>" + $scope.listNotifications[index].Title + "<br>";
			detail += "<b>Chanel: </b>" + $scope.listNotifications[index].Chanel + "<br>";
			detail += "<b>Mô tả: </b>" + $scope.listNotifications[index].Content + "<br>";
			bootbox.alert(detail);
		}
	}]);

	app.controller('push-notification', ['$scope', function($scope){
		$scope.Name = "";
		$scope.ListChanels = [];
		$scope.Description = "";
		services.getAllChanels(function(allChanels){
			$scope.ListChanels = allChanels;
			$scope.Chanel = (allChanels.length > 0) ? allChanels[0] : "";
		})
		function verifyNotificationInfo(callback){
			if ($scope.Name == ""){
				bootbox.alert("Vui lòng nhập tên thông báo");
				return callback(false);
			}
			if ($scope.Chanel == ""){
				bootbox.alert("Vui lòng chọn Chanel");
				return callback(false);
			}
			if ($scope.Description == ""){
				bootbox.alert("Vui lòng nhập mô tả");
				return callback(false);
			}
			return callback(true);
		}
		$scope.pushNotification = function(){
			verifyNotificationInfo(function(success){
				if (success)
					services.pushNotification({
						Name: $scope.Name,
						Chanel: $scope.Chanel,
						Description: $scope.Description
					}, function(success){
						if (success)
							bootbox.alert("Thêm thông báo thành công");
						else
							bootbox.alert("Thêm thông báo thất bại");
					})
			})
		}
	}]);

	app.controller('sign-in', ['$scope', function($scope){
		$scope.username = "";
		$scope.password = "";
		$scope.message = "";
		function verifySignIn(callback){
			if($scope.username == ""){
				$scope.message = "Vui lòng nhập tên đăng nhập";
				return callback(false);
			}
			if($scope.password == ""){
				$scope.message = "Vui lòng nhập mật khẩu";
				return callback(false);
			}
			$scope.message = "";
			return callback(true);
		}
		$scope.signIn = function(){
			verifySignIn (function(success){
				if (!success) return ;
				services.signIn({
					username: $scope.username,
					password: $scope.password
				}, function(data){
					if (!data)
						$scope.message = "Tên đăng nhập hoặc mật khẩu không đúng"
					else {
						sessionStorage.Session = data;
						services.getRole({},
						function(data){
							if(!data)
								data = 'User';
							sessionStorage.Role = data;
							redirect("index.html");
						});	
						
					}
				});
			})
		}
		function redirect(path){
			window.location.href = path;
		}
	}])

})();