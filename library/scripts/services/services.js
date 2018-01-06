var services = new function() {
	this.http = null;

	this.getBookRented = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://localhost:50371/Library/RecentBorrowedDocument',config)
			.then(function(response){
				if(callback) callback(response.data);
			}, function(error){
				if(callback) callback('[]');
			});
	}

	this.getBooks = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://localhost:50371/Library/List?type=' + args.type + '&sortDirection=' + args.sortDirection, config)
			.then(function(response){
				if(callback) callback(response.data);
			}, function(error){
				if(callback) callback('[]');
			});
	}
	this.getChanels = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://localhost:50371/Notification/AllChanels?subscribe=' + args.subscribe, config)
			.then(function(response){
				if(callback) callback(response.data);
			}, function(error){
				if(callback) callback('[]');
			});
	}
	this.getBorrowedBooks = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://localhost:50371/Library/BorrowingDocument', config)
			.then(function(response){
				if(callback) callback(response.data);
			}, function(error){
				if(callback) callback('[]');
			});
	}
	this.borrowDocument = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		var data = {};
		this.http.post('http://localhost:50371/Library/Borrow/' + args.id,data, config)
		.then(function(response){
				if(callback) callback(true);
			}, function(error){
				if(callback) callback(false);
			});
	}

	
	this.returnDocument = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		var data = {};
		this.http.post('http://localhost:50371/Library/Return/' + args.id,data, config)
		.then(function(response){
				if(callback) callback(true);
			}, function(error){
				if(callback) callback(false);
			});
	}
	this.subscribeChanel = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		var data = {};
		this.http.post('http://localhost:50371/Notification/SubscribeChanel/' + args.chanelName,data, config)
		.then(function(response){
				if(callback) callback(true);
			}, function(error){
				if(callback) callback(false);
			});
	}
	
	this.unsubscribeChanel = function(args, callback=false){
		if(callback) callback(false);
	}
	this.addBook = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.post('http://localhost:50371/Library/Add',args, config)
		.then(function(response){
				if (callback) callback(true)
			}, function(error){
				if (callback) callback(false)
			});
	}

	/******************************************************/
	/******************   Lấy thông tin sách   ****************/
	/*	Input
	args = {
		id: string		// id của sách
	}
	*/
	/*	Output
		Thành công
			callback({
				name: string,
				quantity: int,
				price: int,
				author: string,
				desciption: string,
				types: array,		// Mảng các id của type
				groups: array		// Mảng các id groups
			})

		Thất bại callback(false)
	*/
	/******************************************************/
	this.getBookInfo = function (args, callback=false){
		// methodGetBasic("", args, callback);
		if (callback) callback({
			name: "Sách hướng đối tượng",
			quantity: 100,
			price: 100000,
			author: "Nguyễn Văn Hiếu",
			description: "23 mẫu hướng đối tượng",
			types: [{id: 'TY_001', name: "Báo"},{id: 'TY_002', name: 'sách'}],
			groups: [{ id: "GR_002", name: "Vui nhôn" }, { id: "GR_003", name: "Hành động" }]
		});
	}

	/******************************************************/
	/******************   Sửa thông tin sách   ****************/
	/*	Input
	data = {
		name: string,
		quantity: int,
		price: int,
		author: string,
		desciption: string,
		types: array,		// Mảng các id của type
		groups: array		// Mảng các id groups
	}
	condition = {
		id: string			// Id sách
	}
	*/
	/*	Output
		Thành công
			callback(true)
		Thất bại
			callback(false)
	*/
	/******************************************************/
	this.editBook = function(condition, data, callback=false){
		// methodPutBasic("", condition, data, callback);
		console.log("Sửa sách");
		console.log(condition);
		console.log(data);
		if (callback) callback(true);
	}

	/******************************************************/
	/******************   Xóa thông tin sách   ****************/
	/*	Input
	condition = [{
		books_id: [string]			// Danh sách các id
	}]
	*/
	/*	Output
		Thành công
			callback(true)
		Thất bại
			callback(false)
	*/
	this.deleteBook = function(condition, callback=false){
		// methodPutBasic("", condition, callback)
		console.log("Xóa sách");
		console.log(condition);
		if (callback) callback(true);
	}

	// args = {q}	- q: chuỗi tìm kiếm theo tên đăng nhập
	// Trả về callback: [{ id, username, fullname, email }]
	this.getAllStudentInfos = function(args, callback=false){
		if (callback)
			callback([
				{
					id: "SV_01",
					username: "username_1",
					fullname: "Nguyễn Văn A",
					email: "a@gmail.com",
				},
				{
					id: "SV_02",
					username: "username_1",
					fullname: "Nguyễn Văn A",
					email: "a@gmail.com",
				},
				{
					id: "SV_03",
					username: "username_1",
					fullname: "Nguyễn Văn A",
					email: "a@gmail.com",
				},
				{
					id: "SV_04",
					username: "username_1",
					fullname: "Nguyễn Văn A",
					email: "a@gmail.com",
				},
				{
					id: "SV_05",
					username: "username_1",
					fullname: "Nguyễn Văn A",
					email: "a@gmail.com",
				}
			]);
	}

	// $args = {username}
	// Tên đăng nhập tồn tài callback(false);
	// Tên đăng nhập không tồn tài callback(true);
	this.verifyUserName = function ($args, callback){
		callback(true);
	}

	// $args = { fullname, mssv, username, password, birthDay(yyyy mm dd), school, address, email, description }
	// Thêm thành công callback(false);
	// Thêm thất bại callback(true);
	this.registerStudent = function ($args, callback){
		callback(true);
		console.log($args)
	}

	// $args = { id }
	// Xóa thành công callback(false);
	// Xóa thất bại callback(true);
	this.deleteStudent = function ($args, callback){
		callback(true);
	}

	// $args { id }
	// Thành công callback({fullname, mssv, username, birthDay(yyyy-mm-dd), school, address, email, description});
	// Thất bại callback(null);
	this.getStudentInfo = function($args, callback){
		callback({
			fullname: "Nguyễn Văn Huy",
			mssv: "1412209",
			username: "vanhuy",
			birthDay: '1996-04-17',
			school: "KHTN",
			address: "Q8",
			email: "a@gmail.com",
			description: "123"
		})
	}

	// Cập nhật tài khoản có id là $args.id
	// $args.hasUpdatePass: Có thay đổi pass không. Nếu có thì pass mới là $args.password
	// $args { id, fullname, mssv, birthDay(yyyy-mm-dd), hasUpdatePass, password, school, address, email, description }
	// Thành công callback(true)
	// Thất bại callback(false)
	this.updateStudent = function($args, callback){
		console.log($args);
		callback(true);
	}

	// Tất cả thông báo
	// Callback([ {id, Name, ChanelName, Description} ])
	this.getAllNotitications = function(callback){
		callback([
			{
				id: "NO_01",
				Name: "Thông báo 1",
				ChanelName: "Sách abc",
				Description: "Vừa nhập 100 sách abc"
			},
			{
				id: "NO_02",
				Name: "Thông báo 2",
				ChanelName: "Sách abc",
				Description: "Vừa nhập 100 sách abc"
			},
			{
				id: "NO_03",
				Name: "Thông báo 3",
				ChanelName: "Sách abc",
				Description: "Vừa nhập 100 sách abc"
			},
			{
				id: "NO_04",
				Name: "Thông báo 4",
				ChanelName: "Sách abc",
				Description: "Vừa nhập 100 sách abc"
			}
		])
	}

	// callback([string]) // list chanel name
	this.getAllChanels = function(callback){
		callback([
				"Abc",
				"Xyz"
			]);
	}

	// $args = { Name, Chanel, Description }
	// Thành công callback(true)
	// Thất bại callback(false)
	this.pushNotification = function($args, callback) {
		console.log($args);
		callback(true);
	}

	return this;
}