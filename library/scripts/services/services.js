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
			callback(data)	// data là danh sách các trừng được filter
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
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				},
				{
					id: "BO_001",
					name: "KTPM",
					author: "Nguyễn Văn Huy",
					quantity: "20/12/2017"
				}
			])
	}

	return this;
}