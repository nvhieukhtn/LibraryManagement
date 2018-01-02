var services = new function() {
	this.http = null;

	/******************************************************/
	/*************   Phương thức get cơ bản   *************/
	/*	Input
	url	: string		// Đường dẫn của API
	args : object		// Mảng các tham số

	Tại server $_GET['tham_so_của_args'], ...
	/*	Output
		Thành công
			callback(data)
		Thất bại callback(data) // data = flase
	*/
	/******************************************************/
	this.methodGetBasic = function(url, args, callback=false){
		this.http.get(url, { 'params': args})
		.then(function(response) {
			var data = JSON.parse(response.data);
			if (callback) callback(data);
		}, function(response) {
			if (callback) callback(false);
		});
	}

	/******************************************************/
	/*************   Phương thức post cơ bản   *************/
	/*	Input
	url	: string		// Đường dẫn của API
	args : object		// Mảng các tham số

	Tại server file_get_contents("php://input") để lấy chuỗi json các tham số
	/*	Output
		Thành công
			callback(data)
		Thất bại callback(data) // data = flase
	*/
	/******************************************************/
	this.methodPostBasic = function(url, args, callback=false){
		this.http.post(url, args, { params: args })
		.then(function(response) {
			var data = JSON.parse(response.data);
			if (callback) callback(data);
		}, function(response) {
			if (callback) callback(false);
		});
	}


	/******************************************************/
	/*************   Phương thức put cơ bản   *************/
	/*	Input
	url	: string		// Đường dẫn của API
	args : object		// Mảng các tham số
	condition: object	// Điền kiện sửa thông tin
	Tại server file_get_contents("php://input") để lấy chuỗi json các tham số
	/*	Output
		Thành công
			callback(data)
		Thất bại callback(fasle)
	*/
	/******************************************************/
	this.methodPutBasic = function(url, condition, data, callback=false){
		this.http.post(url, {data: data, condition: condition}, { params: {data: data, condition: condition} })
		.then(function(response) {
			var data = JSON.parse(response.data);
			if (callback) callback(data);
		}, function(response) {
			if (callback) callback(false);
		});
	}

	/******************************************************/
	/******************   Sách được thuê   ****************/
	/*	Input
	args = {
		quantity: number		// Số lượng sách hiển thị (default: 10) và -1 là tất cả
		offset: number			// Số lượng sách bỏ qua (default: 0)
		selects: array			// Các trường cần trả về (default: [])
	}
	Tại server $_GET['quantity'], ...
	*/
	/*	Output
		Thành công
			callback(data)	// data là danh sách các trừng được filter
		Thất bại callback(data) // data = flase
	*/
	/******************************************************/
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

	/******************************************************/
	/******************   Lấy danh sách sách   ****************/
	/*	Input
	args = {
		type: ['All', 'Available', 'OutOfStock']
	}
	Tại server $_GET['quantity'], ...
	*/
	/*	Output
		Thành công
			callback(data)	// data là danh sách các trừng được filter
		Thất bại callback(data) // data = flase
	*/
	/******************************************************/
	this.getBooks = function(args, callback=false){
		var config = {
			headers:{
				'Session' : sessionStorage.Session
			}
		};
		this.http.get('http://localhost:50371/Library/List?type=' + args.type, config)
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
	/******************************************************/
	/******************   Lấy danh sách nhóm sách   ****************/
	/*	Input
	args = {
		name: string,
		quantity: int,
		price: int,
		author: string,
		desciption: string,
		types: array,		// Mảng các id của type
		groups: array		// Mảng các id groups
	}
	Tại server $_GET['quantity'], ...
	*/
	/*	Output
		Thành công
			callback(data)	// data = true
		Thất bại callback(data) // data = flase
	*/
	/******************************************************/
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
			types: ['TY_001','TY_002'],
			groups: ['GR_003', 'GR_002']
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
		console.log(data);
		if (callback) callback(true);
	}

	return this;
}