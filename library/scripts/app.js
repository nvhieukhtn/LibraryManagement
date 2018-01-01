(function(){

	var app = angular.module('app', []);

	app.controller('body', ['$scope', '$http', function($scope, $http){
		$scope.role = "admin"; // Admin || user
		$scope.template_part = "home.html"
		$scope.changeContent = function(template_part) {
			$scope.template_part = template_part;
		};
		$scope.activeSidebar = function(template_part) {
			if (Array.isArray(template_part))
				return (template_part.indexOf($scope.template_part) != -1) ? "active" : "";
			return ($scope.template_part == template_part) ? "active" : "";
		}
		services.http = $http;
	}]);

	app.controller('sidebar', ['$scope', '$http', function($scope, $http){
		
	}]);



})();