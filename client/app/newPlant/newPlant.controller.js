'use strict';

angular.module('trellisApp')
  .controller('NewplantCtrl', function ($scope, $state, plantService, userService) {
    var vm = this;
    $scope.newPlant = {
    	name: "",
    	email: "",
    	phone: [""],
    	age: "",
    	contactFrequency: "",
    	relationship: {
    		status: "",
    		partner: ""
    	},
    	hometown: "",
    	currentCity: "",
    	family: [{
			name: "",
			relation: ""
		}],
		education: [{
			level: "other",
			name: ""
		}],
		importantDates: [{
			eventName: "",
			date: "",
			description: ""
		}],
		employment: {
			employer: "",
			position: ""
		},
		interests: [{
			type: "",
			tags: [""]
		}],
		projects: [{
			type: "",
			name: "",
			description: "",
			link: ""
		}],
		otherFields: [{
			title: "",
			body: ""
		}],
		reminders: [],
		ownerId: Auth.getCurrentUser._id
    };

    $scope.edLevel = ['high school', 'undergradate', 'graduate', 'other'];
    //For education select boxes
    $scope.showBox = function(school){
      console.log(school, "Stufffffffff");
      if(school!==$scope.edLevel[0]&&school!==$scope.edLevel[1]&&school!==$scope.edLevel[2]&&school!==undefined){
        return true;
      } else {
        return false;
      }
    };

    $scope.newMaster = angular.copy($scope.newPlant);

    $scope.selectedIcon = "";
  	$scope.selectedIcons = [];
  	$scope.icons = [
  	    // {value: 'name', label: '<i class="fa fa-user"></i> Name'},
  	    {value: 'email', label: '<i class="fa fa-send"></i> Email'},
  	    {value: 'phone', label: '<i class="fa fa-phone"></i> Phone'},
  	    {value: 'age', label: '<i class="fa fa-birthday-cake"></i> Age'},
  	    {value: 'relationship', label: '<i class="fa fa-heart"></i> Relationship'},
  	    {value: 'family', label: '<i class="fa fa-sitemap"></i> Family'},
  	    {value: 'hometown', label: '<i class="fa fa-globe"></i> Hometown'},
  	    {value: 'currentCity', label: '<i class="fa fa-dot-circle-o"></i> Current City'},
  	    {value: 'employer', label: '<i class="fa fa-briefcase"></i> Employer'},
  	    {value: 'education', label: '<i class="fa fa-graduation-cap"></i> Education'},
  	    {value: 'projects', label: '<i class="fa fa-wrench"></i> Projects'},
  	    {value: 'interests', label: '<i class="fa fa-comments"></i> Interests'},
  	    {value: 'importantDates', label: '<i class="fa fa-calendar"></i> Important Dates'},
  	    {value: 'notes', label: '<i class="fa fa-pencil"></i> Notes'},
  	    {value: 'reminders', label: '<i class="fa fa-star"></i> Reminders'}
  	];

  	$scope.show = function(inputField) {
  		return $scope.selectedIcons.indexOf(inputField) > -1;
  	};



  	vm.typeObj = {
  		"family": {
  			name: "",
  			relation: ""
  		},
  		"education": {
  			level: "",
  			name: ""
  		},
  		"importantDates": {
  			eventName: "",
  			date: "",
  			description: ""
  		},
  		"interests": {
  			type: "",
  			tags: []
  		},
  		"projects": {
  			type: "",
  			name: "",
  			description: "",
  			link: ""
  		},
  		"otherFields": {
  			title: "",
  			body: ""
  		}
  	};

  	$scope.addField = function( key, index ) {
  		console.log(key, index)
  	    if( key == "tags" ){
  	    	$scope.newPlant.interests[index].tags.push("")
  	    }
  	    else if ( key == "reminders" ) {
  	    	$scope.newPlant.reminders.push("");
  	    }
  	    else {
  	    	$scope.newPlant[key].push(angular.copy(vm.typeObj[key]));
  	    }
  	};

  	$scope.deleteField = function( key, index ) {
  	  console.log($scope.newPlant[key]);
  	  if( key == "tags" ){
  	  	$scope.newPlant.interests[index].tags.splice($scope.newPlant.interests[index].tags.length-1, 1);
  	  }
  	  else {
  	  	$scope.newPlant[key].splice($scope.newPlant[key].length-1, 1);
  	  }
  	};

  	$scope.create = function (input) {
    	console.log($scope.newPlant);
    	if(input === 'save'){
	    	plantService.createPlant($scope.newPlant, function(created) {
	    		userService.addToPlants(created, function(){
	    			console.log("Added ID to User plants[]");
	    			$state.go('trellis.plants');
	    		});
	    		console.log("Here's your new plant: ");
	    		console.log(created);
	    	})
	    }
	    else if(input === 'cancel'){
	    	console.log("save @ reset, hit");
	    	$scope.saved = false;
	    	$scope.newPlant = angular.copy($scope.master);
	    	$state.go('trellis.plants');
	    }
    }
  });