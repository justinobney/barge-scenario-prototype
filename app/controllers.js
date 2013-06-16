
(function () {
    var scenarioController = function ($scope, localStorageService, socket, zohoService, $q) {
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
            $scope.inControl = window.inControl = true;
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
                $scope.resetVersion();
            }
            $scope.layout = JSON.parse(localStorageService.get('layout'));
        };

        $scope.resetVersion = function () {
            $scope.layout.workSpace.workArea1 = [];
            $scope.layout.workSpace.workArea2 = [];
            $scope.layout.workSpace.workArea3 = [];
            $scope.layout.dock.workAreas = [];

            var req1 = zohoService.getVessels().then(function(data){
                $scope.layout.boats = data;
            });

            var req2 = zohoService.getBarges().then(function(data){
                $scope.layout.barges = data;
            });

            $q.all([req1, req2]).then(function(){
                zohoService.getWorkspaces().then(function(data){
                    var randWorkspace = [
                        $scope.layout.workSpace.workArea1,
                        $scope.layout.workSpace.workArea2,
                        $scope.layout.workSpace.workArea3,
                        $scope.layout.dock.workAreas
                    ];

                    _.each(data, function(ws){
                        for (var i = 0; i <3; i++) {
                            var numOfBarges = _.random(7);
                            var barges = [];

                            for (var j = numOfBarges; j >= 0; j--) {
                                var bargeIdx = _.random($scope.layout.barges.length);
                                var barge = $scope.layout.barges.splice(bargeIdx, 1);
                                ws.units[i].barges.push(barge[0]);
                            }

                            var boatIdx = _.random($scope.layout.boats.length);
                            var boat = $scope.layout.boats.splice(boatIdx, 1);

                            ws.units[i].boat = boat[0];
                        };

                        var wsIdx = _.random(3);
                        randWorkspace[wsIdx].push(ws);
                    }) ;
                });
            })
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
            $scope.inControl = window.inControl = false;
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

    scenarioController.$inject = ['$scope', 'localStorageService', 'socket','zohoService', '$q'];

    angular.module('draggableBoxes')
        .controller('ScenarioController', scenarioController);
})();
