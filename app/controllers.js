
(function () {
    var scenarioController = function ($scope, localStorageService, socket, zohoService) {
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

            zohoService.getWorkspaces().then(function(data){
                $scope.layout.dock.workAreas = data;
            });

            zohoService.getVessels().then(function(data){
                $scope.layout.boats = data;
            });

            zohoService.getBarges().then(function(data){
                $scope.layout.barges = data;
            });
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

    scenarioController.$inject = ['$scope', 'localStorageService', 'socket','zohoService'];

    angular.module('draggableBoxes')
        .controller('ScenarioController', scenarioController);
})();
