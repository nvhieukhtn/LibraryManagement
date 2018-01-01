(function(){

	var app = angular.module('app', []);
	app.controller('body', ['$scope', function($scope){
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
	}]);
	app.controller('sidebar', ['$scope', function($scope){
		$scope.name = "okok";
	}]);

})();