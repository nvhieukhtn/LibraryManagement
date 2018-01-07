var services = new function() {
	this.http = null;

	this.getBookRented = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://api.library.local/Library/RecentBorrowedDocument',config)
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
		this.http.get('http://api.library.local/Library/List?type=' + args.type + '&sortDirection=' + args.sortDirection, config)
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
		this.http.get('http://api.library.local/Notification/AllChanels?subscribe=' + args.subscribe, config)
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
		this.http.get('http://api.library.local/Library/BorrowingDocument', config)
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
		this.http.post('http://api.library.local/Library/Borrow/' + args.id,data, config)
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
		this.http.post('http://api.library.local/Library/Return/' + args.id,data, config)
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
		this.http.post('http://api.library.local/Notification/SubscribeChanel/' + args.chanelName,data, config)
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
		this.http.post('http://api.library.local/Library/Add',args, config)
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

	
	this.getAllStudentInfos = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://api.library.local/Authentication/List', config)
			.then(function(response){
				if(callback) callback(response.data);
			}, function(error){
				if(callback) callback('[]');
			});
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

	// Tất cả thông báo
	// Callback([ {id, Name, ChanelName, Description} ])
	this.getAllNotitications = function(callback){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://api.library.local/Notification/PullNotification', config)
			.then(function(response){
				callback(response.data);
			},function(error){
				callback([]);
			});
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

	// $args = { username, password }
	// callback({success: true, ...})
	this.signIn = function (args, callback){
		var data = {
			Username: args.username,
			Password: args.password
		}
		this.http.post('http://api.library.local/Authentication/Login', data)
			.then(function(response){
				if(callback) callback(response.data);
			},function(error){
				if(callback) callback('');
			});
	}
	this.getRole = function(args, callback){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://api.library.local/Authentication/Role', config)
			.then(function(response){
				if(callback) callback(response.data);
			}, function(error){
				if(callback) callback('');
			});
	}
	
	this.upgradeVIP = function(args, callback){
		var data = {
			Id: args.Id
		}
		this.http.post('http://api.library.local/Authentication/UpgradeVIP', data)
			.then(function(response){
				callback(true);
			}, function(error){
				callback(false);
			});
	}
	
	this.downgradeVIP = function(args, callback){
		var data = {
			Id: args.Id
		}
		this.http.post('http://api.library.local/Authentication/Downgrade', data)
			.then(function(response){
				callback(true);
			}, function(error){
				callback(false);
			});
	}

	return this;
}