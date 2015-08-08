'use strict';

var angularDjangoControllers = angular.module('angularDjangoControllers', ['Services']);

angularDjangoControllers.controller('MainCtrl', ['$scope', '$rootScope', '$location', 'Services',
  function($scope, $rootScope, $location, Services) {

    $scope.coachCollapse = true;
    $scope.teamCollapse = true;
    $scope.playerCollapse = true;
    $rootScope.details = {};

    var token = 'MNyIpd4UYAhyvC7z08KVD6wUndLThQhT';

    Services.getTeams().then(function(data){
    	$scope.teams = data.data.results;
    });

    Services.getPlayers().then(function(data){
    	$scope.players = data.data.results;
    });

    Services.getCoaches().then(function(data){
    	$scope.coaches = data.data.results;
    });

    /************* COACHES ***************/

    $scope.addCoach = function(coach){
        coach.csrfmiddlewaretoken = token;
        
        Services.addCoach(coach).then(function(data){
            alert("Coach "+data.data.name+" successfully added!");
            $scope.coaches.push(data.data);
            $scope.coachCollapse = true;
            $scope.coach = {};

        });
    };

    $scope.coachDetail = function(url){
        Services.getCoachDetail(url).then(function(data){
            $rootScope.details.coach = data.data;
            $location.path('/details');
        });
    }

    $scope.deleteCoach = function(coach){
        Services.deleteCoach(coach.url).then(function(data){
            alert("Coach "+coach.name+" has been deleted!");
            $scope.coaches.splice( $scope.coaches.indexOf(coach),1);
        });
    }

    /************* PLAYERS *************/

    $scope.addPlayer = function(player){
        player.csrfmiddlewaretoken = token;

        Services.addPlayer(player).then(function(data){
            alert("Player "+data.data.name+" successfully added!");
            $scope.players.push(data.data);
            $scope.playerCollapse = true;
            $scope.player = {};
        });
    };

    $scope.playerDetail = function(url){
        Services.getPlayerDetail(url).then(function(data){
            $rootScope.details.player = data.data;

            Services.getTeamDetail(data.data.team).then(function(data){
                $rootScope.details.player.teamDetail = data.data;
                $location.path('/details');
            });
        });
    }

    $scope.deletePlayer = function(player){
        Services.deletePlayer(player.url).then(function(data){
            alert("Player "+player.name+" has been deleted!");
            $scope.players.splice( $scope.coaches.indexOf(player),1);
        });
    }

    /************* TEAMS *************/

    $scope.addTeam = function(team){
        team.csrfmiddlewaretoken = token;

        Services.addTeam(team).then(function(data){
            alert("Team "+data.data.name+" successfully added!");
            $scope.teams.push(data.data);
            $scope.teamCollapse = true;
            $scope.team = {};
        });
    };

    $scope.teamDetail = function(url){
        Services.getTeamDetail(url).then(function(data){
            $rootScope.details.team = data.data;

            Services.getCoachDetail(data.data.coach).then(function(data){
                $rootScope.details.team.coachDetail = data.data;
                $location.path('/details');
            });
        });
    }

    $scope.deleteTeam = function(team){
        Services.deleteTeam(team.url).then(function(data){
            alert("Team "+team.name+" has been deleted!");
            $scope.teams.splice( $scope.coaches.indexOf(team),1);
        });
    }

  }]);

angularDjangoControllers.controller('DetailsCtrl', ['$scope', '$rootScope', '$location', 'Services',
  function($scope, $rootScope, $location, Services) {
    if($rootScope.details){
        $scope.details = $rootScope.details;

        /******* Services *******/

        Services.getTeams().then(function(data){
            $scope.teams = data.data.results;
        });

        Services.getCoaches().then(function(data){
            $scope.coaches = data.data.results;
        });


        /****** Functions ******/

        $scope.updateCoach = function(coach){
            Services.editCoach(coach).then(function(data){
                alert("Coach updated!");
                $location.path('/');
            });
        }

        $scope.updateTeam = function(team){
            Services.editCoach(team).then(function(data){
                alert("Team updated!");
                $location.path('/');
            });
        }

        $scope.updatePlayer = function(player){
            Services.editCoach(player).then(function(data){
                alert("Player updated!");
                $location.path('/');
            });
        }
    }else{
        $location.path('/');
    }
  }]);