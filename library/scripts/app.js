(function(){

	var app = angular.module('app', []);

	app.controller('body', ['$scope', '$http', function($scope, $http){
		$scope.role = "admin"; // Admin || user
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
		sessionStorage.Session = 'e3907d15-0d1e-45e3-906f-0cf0c141abe5';
		sessionStorage.Role = 'User';
		services.http = $http;

		services.getAllNotitications(function(AllNotitications){
			$scope.listNotifications = AllNotitications;
		})
	}]);

	/****************************************************************************************************/
	/****************************************   SIDEBAR  ************************************************/
	/****************************************************************************************************/
	app.controller('sidebar', ['$scope', '$http', function($scope, $http){
		
	}]);
	app.controller('home', ['$scope', function($scope){
		$scope.rentedBooksInfo = [];
		$scope.role = sessionStorage.Role;
		services.getBookRented({
			quantity: 10,		// Số lượng sách hiển thị (default: 10)
			offset: 0,			// Số lượng sách bỏ qua (default: 0)
			selects: [ 'id', 'bookName', 'renter', 'date' ]
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
		services.getAllStudentInfos({
			q: $scope.q
		}, function($result){
			$scope.studentInfos = $result;
		});

		$scope.deleteStudent = function (index){
			if(confirm("Bạn có chắc muốn xóa 1 sinh viên?"))
				services.deleteStudent({id:$scope.studentInfos[index].id}, function(success){
					if (success){
						bootbox.alert("Xóa thành công");
						$scope.studentInfos.splice(index, 1);
					} else {
						bootbox.alert("Xóa không thành công");
					}
				})
		}

	}]);

	app.controller('add-student', ['$scope', function($scope){
		$scope.fullname = "";
		$scope.mssv = "";
		$scope.username = "";
		$scope.password = "";
		$scope.password_confirm = "";
		$scope.birthDay = "";
		$scope.school = "";
		$scope.address = "";
		$scope.email = "";
		$scope.description = "";

		function verifyStudentInfo(callback){
			var mes = "";
			if ($scope.fullname == ""){
				bootbox.alert("Vui lòng nhập họ và tên");
				return callback(false);
			}
			if ($scope.mssv == ""){
				bootbox.alert("Vui lòng nhập MSSV <br>");
				return callback(false);
			}
			if ($scope.school == ""){
				bootbox.alert("Vui lòng nhập trường học <br>");
				return callback(false);
			}
			if ($scope.username == ""){
				bootbox.alert("Vui lòng nhập tên đăng nhập <br>");
				return callback(false);
			}
			if ($scope.password == ""){
				bootbox.alert("Vui lòng nhập mật khẩu <br>");
				return callback(false);
			}
			if ($scope.password_confirm == ""){
				bootbox.alert("Vui lòng nhập xác nhận mật khẩu <br>");
				return callback(false);
			}
			if ($scope.password != $scope.password_confirm || $scope.password.length < 8){
				bootbox.alert("Xác nhận mật khẩu không khớp hoặc quá ngắn");
				return callback(false);
			}

			services.verifyUserName({username: $scope.username}, function(success){
				if (!success) {
					bootbox.alert("Tên đăng nhập đã tồn tại");
					return callback(false);
				}
				return callback(true);
			});
		}
		$scope.addStudent = function (){
			verifyStudentInfo(function(success){
				if (success){
					services.registerStudent({
						fullname: $scope.fullname,
						mssv: $scope.mssv,
						username: $scope.username,
						password: $scope.password,
						birthDay: $scope.birthDay.getDate() +"-"+ ($scope.birthDay.getMonth()+1) +"-"+ ($scope.birthDay.getYear() + 1900),
						school: $scope.school,
						address: $scope.address,
						email: $scope.email,
						description: $scope.description
					}, function(success){
						if (success)
							bootbox.alert("Đã thêm thành công");
						else
							bootbox.alert("Thêm không thành công");
					});
				}
			})
		}
	}]);

	app.controller('edit-student', ['$scope', function($scope){
		var id = $scope.data.id;
		$scope.fullname = "";
		$scope.mssv = "";
		$scope.username = "";
		$scope.hasUpdatePass = false;
		$scope.password = "";
		$scope.password_confirm = "";
		$scope.birthDay = "";
		$scope.school = "";
		$scope.address = "";
		$scope.email = "";
		$scope.description = "";

		services.getStudentInfo({id:id}, function(studentInfo){
			if (studentInfo == null)
				return bootbox.alert("Không tìm thấy id sinh viên");
			$scope.fullname = studentInfo.fullname;
			$scope.mssv = studentInfo.mssv;
			$scope.username = studentInfo.username;
			$scope.birthDay = new Date(studentInfo.birthDay);
			$scope.school = studentInfo.school;
			$scope.address = studentInfo.address;
			$scope.email = studentInfo.email;
			$scope.description = studentInfo.description;
		});

		function verifyStudentInfo(callback){

			if ($scope.fullname == ""){
				bootbox.alert("Vui lòng nhập họ và tên");
				return callback(false);
			}
			if ($scope.mssv == ""){
				bootbox.alert("Vui lòng nhập MSSV <br>");
				return callback(false);
			}
			if ($scope.school == ""){
				bootbox.alert("Vui lòng nhập trường học <br>");
				return callback(false);
			}
			if ($scope.username == ""){
				bootbox.alert("Vui lòng nhập tên đăng nhập <br>");
				return callback(false);
			}
			if ($scope.hasUpdatePass){
				if ($scope.password == ""){
					bootbox.alert("Vui lòng nhập mật khẩu <br>");
					return callback(false);
				}
				if ($scope.password_confirm == ""){
					bootbox.alert("Vui lòng nhập xác nhận mật khẩu <br>");
					return callback(false);
				}
				if ($scope.password != $scope.password_confirm || $scope.password.length < 8){
					bootbox.alert("Xác nhận mật khẩu không khớp hoặc quá ngắn");
					return callback(false);
				}
			}
			return callback(true);

		}
		$scope.updateStudent = function (){
			verifyStudentInfo(function(success){
				if (success){
					services.updateStudent({
						id: id,
						fullname: $scope.fullname,
						mssv: $scope.mssv,
						hasUpdatePass: $scope.hasUpdatePass,
						password: $scope.password,
						birthDay: $scope.birthDay.getDate() +"-"+ ($scope.birthDay.getMonth()+1) +"-"+ ($scope.birthDay.getYear() + 1900),
						school: $scope.school,
						address: $scope.address,
						email: $scope.email,
						description: $scope.description
					}, function(success){
						if (success)
							bootbox.alert("Cập nhật thành công");
						else
							bootbox.alert("Cập nhật không thành công");
					});
				}
			})
		}
	}]);

	app.controller('all-notifications', ['$scope', function($scope){
		$scope.Detail = function(index){
			var detail = "";
			detail += "<b>Tên thông báo: </b>" + $scope.listNotifications[index].Name + "<br>";
			detail += "<b>Chanel: </b>" + $scope.listNotifications[index].ChanelName + "<br>";
			detail += "<b>Mô tả: </b>" + $scope.listNotifications[index].Description + "<br>";
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
					if (! data.success)
						$scope.message = "Tên đăng nhập hoặc mật khẩu không đúng"
					else redirect("index.html");
				});
			})
		}
		function redirect(path){
			window.location.href = path;
		}
	}])

})();