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

	return this;
}