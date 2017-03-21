app.controller('DetailsController', [
'$scope','$filter', '$http',
function($scope, $filter, $http){
	$scope.init = function() {
		$scope.rowCollection =[];
		getPatientDetails();
	};
	function getPatientDetails() {
		$http({
  		  method: 'GET',
  		  url: '/get-pdetails',
  		}).then(function successCallback(response) {
  			
  			$scope.rowCollection = response.data;
  		  }, function errorCallback(err) {
  		    // called asynchronously if an error occurs
  		    // or server returns response with an error status.
  		  });
	}
}]).directive("regExInput", function(){
    "use strict";
    return {
        restrict: "A",
        require: "?regEx",
        scope: {},
        replace: false,
        link: function(scope, element, attrs, ctrl){
          element.bind('keypress', function (event) {
            var regex = new RegExp(attrs.regEx);
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
               event.preventDefault();
               return false;
            }
          });
        }
    };
}).controller('NavController', [
'$scope','$rootScope',
function($scope, $rootScope){	
	$scope.changeActiveclass = function(val) {
		if(val =='home'){
			$scope.activeClass ='home';
		}else if(val=='register'){
			$scope.activeClass ='register';
		}
	}
}]).directive('appFilereader', function($q) {
    var slice = Array.prototype.slice;

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$render = function() {};

                element.bind('change', function(e) {
                    var element = e.target;

                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function(values) {
                            if (element.multiple) ngModel.$setViewValue(values);
                            else ngModel.$setViewValue(values.length ? values[0] : null);
                        });

                    function readFile(file) {
                        var deferred = $q.defer();

                        var reader = new FileReader();
                        reader.onload = function(e) {
                            deferred.resolve(e.target.result);
                        };
                        reader.onerror = function(e) {
                            deferred.reject(e);
                        };
                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                }); //change

            } //link
    }; //return
});