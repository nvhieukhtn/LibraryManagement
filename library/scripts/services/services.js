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
		this.http.put(url, {data: data, condition: condition}, { params: {data: data, condition: condition} })
		.then(function(response) {
			var data = JSON.parse(response.data);
			if (callback) callback(data);
		}, function(response) {
			if (callback) callback(false);
		});
	}

	/******************************************************/
	/*************   Phương thức delete cơ bản   *************/
	/*	Input
	url	: string		// Đường dẫn của API
	condition: object	// Điền kiện xóa thông tin
	/*	Output
		Thành công
			callback(data)
		Thất bại callback(fasle)
	*/
	/******************************************************/
	this.methodPutBasic = function(url, condition, callback=false){
		this.http.delete(url, { params: condition })
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
		// methodGetBasic("", args, callback);
		if (callback) callback([
				{
					id: "BO_001",
					bookName: "KTPM",
					renter: "Nguyễn Văn Huy",
					date: "20/12/2017"
				},
				{
					id: "BO_002",
					bookName: "LTHDT",
					renter: "Nguyễn Văn Hiếu",
					date: "20/12/2017"
				},
				{
					id: "BO_003",
					bookName: "KTPM",
					renter: "Nguyễn Văn Huy",
					date: "20/12/2017"
				},
				{
					id: "BO_004",
					bookName: "LTHDT",
					renter: "Nguyễn Văn Hiếu",
					date: "20/12/2017"
				},
				{
					id: "BO_005",
					bookName: "KTPM",
					renter: "Nguyễn Văn Huy",
					date: "20/12/2017"
				},
				{
					id: "BO_006",
					bookName: "KTPM",
					renter: "Nguyễn Văn Hiếu",
					date: "20/12/2017"
				}
			])
	}

	/******************************************************/
	/******************   Lấy danh sách sách   ****************/
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
	this.getBooks = function(args, callback=false){
		// methodGetBasic("", args, callback);
		if (callback) callback([
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_002",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_003",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_004",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "0"
				},
				{
					id: "BO_005",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "12"
				},
				{
					id: "BO_006",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_007",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_008",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_009",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_010",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				}
			])
	}

	/******************************************************/
	/******************   Lấy danh sách sách đã hết   ****************/
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
	this.getOutOfBooks = function(args, callback=false){
		// methodGetBasic("", args, callback);
		if (callback) callback([
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "0"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "12"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				}
			])
	}

	/******************************************************/
	/******************   Lấy danh sách sách còn trong kho   ****************/
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
	this.getBooksHasStock = function(args, callback=false){
		// methodGetBasic("", args, callback);
		if (callback) callback([
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "0"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "12"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "1"
				}
			])
	}

	/******************************************************/
	/******************   Lấy danh sách loại sách   ****************/
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
	this.getAllTypesBook = function(args, callback=false){
		// methodGetBasic("", args, callback);
		if (callback) callback([
				{
					id: "TY_001",
					name: "Báo"
				},
				{
					id: "TY_002",
					name: "Sách"
				},
				{
					id: "TY_003",
					name: "Tạp chí"
				}
			])
	}

	/******************************************************/
	/******************   Lấy danh sách nhóm sách   ****************/
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
	this.getAllGroupsBook = function(args, callback=false){
		// methodGetBasic("", args, callback);
		if (callback) callback([
				{
					id: "GR_001",
					name: "Khoa học"
				},
				{
					id: "GR_002",
					name: "Vui nhôn"
				},
				{
					id: "GR_003",
					name: "Hành động"
				}
			])
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
		// methodPostBasic("", args, callback);
		console.log("Thêm sách:");
		console.log(args);
		// methodGetBasic("", args, callback);
		if (callback) callback(true)
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