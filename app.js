
"use strict";

var myLayout;


$(document).ready(function () {

    // first set a 'fixed height' on the container so it does not collapse...
    var $Container = $('#container');
    $Container.height($(window).height() - $Container.offset().top);

    // NOW create the layout
    myLayout = $('#container').layout({
        defaults: {
            fxName: "slide",
            fxSpeed: "slow",
            spacing_closed: 14,
            spacing_open: 14
        },
        north__spacing_open: 0,
        south__initClosed: true,
        togglerLength_open: 150,
        togglerLength_closed: 150
    });

    myLayout.sizePane('east', 250);
    myLayout.sizePane('west', 350);
    myLayout.sizePane('south', 350);

    var handleDragStart = function (evt) {
        evt.stopPropagation();

        var el = $(this);
        var objectType = el.data('object-type');
        $('body').addClass('dragging-' + objectType);
    };

    var handleDragStop = function (evt) {
        evt.stopPropagation();
        $('body').removeClass();
    };

    jQuery(document).on('dragstart', '.barge, .unit, .workspace-container', handleDragStart);

    jQuery(document).on('drop', handleDragStop);
});

angular.module('draggableBoxes', ['ngDragDrop', 'LocalStorageModule']);

angular.module('draggableBoxes').filter('thirds', function () {
    return function (items, position) {
        var filtered = [];
        angular.forEach(items, function (item, idx) {
            if (idx % 3 == position) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

(function () {
    var scenarioController = function ($scope, localStorageService) {
        var original = {
            dock: {
                workAreas: [{
                    "id": 3,
                    "title": "Compuamerica",
                    "units": [{
                        "boat": "Compuamerica",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 4,
                    "title": "iSkyvaco",
                    "units": [{
                        "boat": "iSkyvaco",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 5,
                    "title": "Teratopia",
                    "units": [{
                        "boat": "Teratopia",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 1,
                    "title": "iQualcar",
                    "units": [{
                        "boat": "iQualcar",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 2,
                    "title": "Fibrotouch",
                    "units": [{
                        "boat": "Fibrotouch",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }]
            },
            workSpace: {
                workAreas: [{
                    "id": 1,
                    "title": "iQualcar",
                    "units": [{
                        "boat": "iQualcar",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 2,
                    "title": "Fibrotouch",
                    "units": [{
                        "boat": "Fibrotouch",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 3,
                    "title": "Compuamerica",
                    "units": [{
                        "boat": "Compuamerica",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 4,
                    "title": "iSkyvaco",
                    "units": [{
                        "boat": "iSkyvaco",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 5,
                    "title": "Teratopia",
                    "units": [{
                        "boat": "Teratopia",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 1,
                    "title": "iQualcar",
                    "units": [{
                        "boat": "iQualcar",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }, {
                    "id": 2,
                    "title": "Fibrotouch",
                    "units": [{
                        "boat": "Fibrotouch",
                        "barges": [{
                            "name": "barge 1"
                        }, {
                            "name": "barge 2"
                        }]
                    }]
                }]
            },
            id: 1
        };

        if (localStorageService.get('layout')){
            $scope.layout = JSON.parse(localStorageService.get('layout'));
        } else {
            $scope.layout = original;
        }

        $scope.comments = [{
            id: 1,
            name: 'Aaron Landry',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
        }, {
            id: 2,
            name: 'Justin Obney',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
        }];

        $scope.saveVersion = function () {
            localStorageService.add('layout',JSON.stringify($scope.layout));
        };

        $scope.loadVersion = function(){
            $scope.layout = JSON.parse(localStorageService.get('layout'));
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

        $scope.syntaxHighlight = function (json) {
            if (!json)
                return '';
            json = JSON.stringify(json, null, 2);
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        };
    };

    scenarioController.$inject = ['$scope', 'localStorageService'];

    angular.module('draggableBoxes')
        .controller('ScenarioController', scenarioController);
})();
