'use strict';

var myLayout;


$(document).ready(function(){

	// first set a 'fixed height' on the container so it does not collapse...
	var $Container = $('#container')
	$Container.height( $(window).height() - $Container.offset().top );

	// NOW create the layout
	myLayout = $('#container').layout({
		defaults: {
			   fxName:               "slide"
			,  fxSpeed:               "slow"
			,  spacing_closed:        14
			,  spacing_open:        14
		},
		north__spacing_open: 0
	});

	myLayout.sizePane('east', 250);
	myLayout.sizePane('west', 350);

	$('.workspace-container').each(function(i,e){
		if(i % 3 == 0){
			$(e).addClass('new-row')
		}
	})
});

angular.module('draggableBoxes', ['ngDragDrop']);

angular.module('draggableBoxes').filter('thirds', function() {
  return function(items, position) {
  	var filtered = [];
    angular.forEach(items, function(item, idx) {
      if(idx % 3 == position) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});

(function(){
	var scenarioController = function($scope, $log){
		$scope.layout = {
			dock: {
				workAreas: [
			        {
			            "id": 3,
			            "title": "Compuamerica",
			            "units": [
			                {
			                    "boat": "Compuamerica",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 4,
			            "title": "iSkyvaco",
			            "units": [
			                {
			                    "boat": "iSkyvaco",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 5,
			            "title": "Teratopia",
			            "units": [
			                {
			                    "boat": "Teratopia",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 1,
			            "title": "iQualcar",
			            "units": [
			                {
			                    "boat": "iQualcar",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 2,
			            "title": "Fibrotouch",
			            "units": [
			                {
			                    "boat": "Fibrotouch",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        }
				]
			},
			workSpace: {
				workAreas: [
					{
			            "id": 1,
			            "title": "iQualcar",
			            "units": [
			                {
			                    "boat": "iQualcar",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 2,
			            "title": "Fibrotouch",
			            "units": [
			                {
			                    "boat": "Fibrotouch",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 3,
			            "title": "Compuamerica",
			            "units": [
			                {
			                    "boat": "Compuamerica",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 4,
			            "title": "iSkyvaco",
			            "units": [
			                {
			                    "boat": "iSkyvaco",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 5,
			            "title": "Teratopia",
			            "units": [
			                {
			                    "boat": "Teratopia",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 1,
			            "title": "iQualcar",
			            "units": [
			                {
			                    "boat": "iQualcar",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        },
			        {
			            "id": 2,
			            "title": "Fibrotouch",
			            "units": [
			                {
			                    "boat": "Fibrotouch",
			                    "barges": [
			                        {
			                            "name": "barge 1"
			                        },
			                        {
			                            "name": "barge 2"
			                        }
			                    ]
			                }
			            ]
			        }
				]
			}
		};

		$scope.comments = [
			{ id: 1, name: 'Aaron Landry', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' },
			{ id: 2, name: 'Justin Obney', comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo' }
		];

		$scope.addComment = function(){
			if ($scope.commentBox) {
				var newId = _.max($scope.comments, function(comment){ return comment.id; }) + 1;
				var comment = {id: newId, name: 'Bob', comment: $scope.commentBox };
				$scope.comments.push(comment);
				$scope.commentBox = '';
			} else {
				alert("No comment! That's kinda silly..");
			}
		}
	};

	scenarioController.$inject = ['$scope', '$log'];

	angular.module('draggableBoxes')
		.controller('ScenarioController', scenarioController);
})();