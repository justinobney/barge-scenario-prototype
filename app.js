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
        south__initClosed: true,
        togglerLength_open: 150,
        togglerLength_closed: 150,
        onload_end: function(){
            var minHeight = parseInt($('.ui-layout-center').height() * 0.95);
            $('#content .span4.ui-droppable').css('min-height', minHeight + 'px');
        }
    });

    myLayout.sizePane('east', 250);
    myLayout.sizePane('west', 350);
    myLayout.sizePane('south', 350);

    $(window).unload(function(){ layoutState.save('myLayout') });

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
        }


        $scope.$watch('layout', function () {
            $scope.saveVersion();
        }, true);

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
            localStorageService.add('layout', JSON.stringify($scope.layout));
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

        $scope.loadVersion();
    };

    scenarioController.$inject = ['$scope', 'localStorageService'];

    angular.module('draggableBoxes')
        .controller('ScenarioController', scenarioController);
})();
