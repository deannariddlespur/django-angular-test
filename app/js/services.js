'use strict';

var services = angular.module('Services', ['ngResource']);

services.factory('Services',['$http', function ($http) {

	var url = 'http://45.55.147.3/football-api/';
	var obj = {};

	/******* Team Services ********/

	obj.getTeams = function() {
		return $http.get(url + 'teams/');
	};

	obj.getTeamDetail = function(teamUrl) {
		return $http.get(teamUrl);
	};

	obj.addTeam = function(data) {
		return $http.post(url + 'teams/', data);
	};

	obj.editTeam = function(data) {
		return $http.put(data.url, data);
	};

	obj.deleteTeam = function(teamUrl) {
		return $http.delete(teamUrl);
	};

	/******* Player Services ********/

	obj.getPlayers = function() {
		return $http.get(url + 'players/');
	};

	obj.getPlayerDetail = function(playerUrl) {
		return $http.get(playerUrl);
	};

	obj.addPlayer = function(data) {
		return $http.post(url + 'players/', data);
	};

	obj.editPlayer = function(data) {
		return $http.put(data.url, data);
	};

	obj.deletePlayer = function(playerUrl) {
		return $http.delete(playerUrl);
	};

	/******* Coach Services ********/

	obj.getCoaches = function() {
		return $http.get(url + 'coaches/');
	};

	obj.getCoachDetail = function(coachUrl) {
		return $http.get(coachUrl);
	};

	obj.addCoach = function(data) {
		return $http.post(url + 'coaches/', data);
	};

	obj.editCoach = function(data) {
		return $http.put(data.url, data);
	};

	obj.deleteCoach = function(coachUrl) {
		return $http.delete(coachUrl);
	};

  	return obj;
}]);
