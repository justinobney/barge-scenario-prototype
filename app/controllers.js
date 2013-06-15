
(function () {
    var scenarioController = function ($scope, localStorageService, socket, zohoService) {
        var original = {
            "dock": {
                "workAreas": [
                    {
                        "id": 4,
                        "title": "Not Working",
                        "units": [{
                            "boat": "Fred",
                            "barges": []
                        }]
                    }, {
                        "id": 2,
                        "title": "New Construction",
                        "units": [{
                            "boat": "Charlotte",
                            "barges": []
                        }, {
                            "boat": "Dudley",
                            "barges": []
                        }]
                    }, {
                        "id": 2,
                        "title": "Unavailable Storage Barges",
                        "units": [{
                            "boat": "Megan",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }]
                        }]
                    }, {
                        "id": 1,
                        "title": "Chevron",
                        "units": [{
                            "boat": "Cathy",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }]
                        }]
                    }, {
                        "id": 3,
                        "title": "Plains",
                        "units": [{
                            "boat": "Albert",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }]
                        }]
                    }
                ]
            },
            "workSpace": {
                "workArea1": [
                    {
                        "id": 5,
                        "title": "Valero",
                        "units": [{
                            "boat": "Austin",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }]
                        }]
                    }, {
                        "id": 3,
                        "title": "Spot",
                        "units": [{
                            "boat": "Ryan",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }]
                        }]
                    }
                ],
                "workArea2": [
                    {
                        "id": 2,
                        "title": "Saltwater",
                        "units": [{
                            "boat": "Geneveve",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }, {
                                "name": "barge 2"
                            }]
                        }]
                    }, {
                        "id": 4,
                        "title": "Citco",
                        "units": [{
                            "boat": "Marry",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }, {
                                "name": "barge 2"
                            }, {
                                "name": "barge 1"
                            }]
                        }]
                    }, {
                        "id": 5,
                        "title": "Nigeria",
                        "units": [{
                            "boat": "Emily",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }, {
                                "name": "barge 3"
                            }]
                        }]
                    }
                ],
                "workArea3": [
                    {
                        "id": 1,
                        "title": "Shell",
                        "units": [{
                            "boat": "Francis",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }, {
                                "name": "barge 2"
                            }, {
                                "name": "barge 1"
                            }, {
                                "name": "barge 4"
                            }, {
                                "name": "barge 1"
                            }]
                        }]
                    }, {
                        "id": 1,
                        "title": "Working Storage Barges",
                        "units": [{
                            "boat": "Jane P",
                            "barges": [{
                                "name": "barge 1"
                            }, {
                                "name": "barge 2"
                            }]
                        }]
                    }
                ]
            },
            "id": 1
        };

        $scope.comments = [{
            id: 1,
            name: 'Aaron Landry',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
        }, {
            id: 2,
            name: 'Justin Obney',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
        }];

        $scope.inControl = false;

        $scope.takeControl = function(){
            $scope.inControl = true;
            $('.ui-draggable').draggable('enable');
            socket.emit('take-control', {});
        }

        $scope.saveVersion = function () {
            localStorageService.add('layout', JSON.stringify($scope.layout));

            if (! $scope.inControl)
                return;

            socket.emit('data', JSON.stringify(angular.copy($scope.layout)));
        };

        $scope.loadVersion = function () {
            if (localStorageService.get('layout')) {
                $scope.layout = JSON.parse(localStorageService.get('layout'));
            } else {
                $scope.layout = original;
            }
            $scope.layout = JSON.parse(localStorageService.get('layout'));
        };

        $scope.resetVersion = function () {
            $scope.layout = original;
        };

        $scope.addComment = function () {
            if ($scope.commentBox) {
                var newId = _.max($scope.comments, function (comment) {
                    return comment.id;
                }) + 1;
                var comment = {
                    id: newId,
                    name: 'Bob',
                    comment: $scope.commentBox
                };

                $scope.comments.push(comment);
                $scope.commentBox = '';
            } else {
                alert("No comment! That's kinda silly..");
            }
        };

        $scope.$watch('layout', function () {
            $scope.saveVersion();
        }, true);

        // Socket.io stuff here...

        socket.on('control-taken', function () {
            $scope.inControl = false;
            $('.ui-draggable').draggable('disable');
        });

        socket.on('data-update', function(data){
            if ($scope.inControl)
                return;

            $scope.layout = angular.copy(angular.fromJson(data));

        });
        // End Socket.io

        $scope.loadVersion();
    };

    scenarioController.$inject = ['$scope', 'localStorageService', 'socket'];

    angular.module('draggableBoxes')
        .controller('ScenarioController', scenarioController);
})();
