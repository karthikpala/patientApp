app.controller('MainController', [
'$scope','$filter', '$http',
function($scope, $filter, $http){
	var newdate;
    var imageEncoded;
	$scope.init = function(){
		newdate = new Date();
        if($scope.patient != undefined && $scope.patient.imageProof != undefined){
            imageEncoded = $scope.patient.imageProof;
        }
		$scope.patient ={};
         if(imageEncoded != undefined){
            $scope.patient.imageProof = imageEncoded;
        }
		$scope.today();
		newdate.setYear(newdate.getYear() - 100);
		$scope.dateOptions = {
			    formatYear: 'yy',
			    maxDate: new Date(2020, 5, 22),
			    minDate: newdate,
			    startingDay: 1
		};
		$scope.showErrorMessages = false;
		$scope.patient.gender = "male";
		$scope.careSpecs =['Diabetics', 'Cardiac', 'General physician', 'Gynaecology'];
		$scope.patient.careSpec = $scope.careSpecs[0];
	};
	$scope.resetForm = function() {
		$scope.showErrorMessages = false;
		$scope.init();
		$scope.today();
	};
	$scope.phoneNumberPattern = function() {
	    var regexp1 = /^(\d)(?!\1+$)\d*$/;
	    var regexp2 = /^((?!(1234567890|0123456789)).)*$/;
	    return {
	        test: function(value) {
	            return regexp1.test(value) && regexp2.test(value) ;
	        }
	    };
	};
	$scope.submitForm = function(isValid) {
			$scope.showErrorMessages = true;
		    // check to make sure the form is completely valid
			$scope.patient.age = $filter('ageFilter')($scope.patient.dob);
		    if (isValid && $scope.patient.age >1) {
		    	
		    	$http({
		    		  method: 'POST',
		    		  url: '/enter-pdetails',
		    		  data : $scope.patient
		    		}).then(function successCallback(response) {
		    		    alert("Submitted Successfully");
		    		    $scope.init();
		    		  }, function errorCallback(response) {
		    		    alert("An error has occured");
		    		  });
		    }else{
		    	alert("Please enter all mandatory parameters");
		    }
	 };
	$scope.today = function() {
	    $scope.patient.dob = new Date();
	};
	  $scope.clear = function() {
	    $scope.patient.dob = null;
	  };
	  $scope.datePopup = {
		opened: false
	  };
	  $scope.openDatePick = function() {
	    $scope.datePopup.opened = true;
	  };
	  $scope.format = 'dd/MM/yyyy';
	  
}]).filter('ageFilter', function () {
    function calculateAge (birthday) { // birthday is a date
        var date = new Date(birthday);
        var ageDifMs = Date.now() - date.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return function (birthdate) {
        return calculateAge(birthdate);
    };
});