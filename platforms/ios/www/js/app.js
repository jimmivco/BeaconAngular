
'use strict';

// Define application object and common functions.
var app = (function()
{

	// Application object.
	var app = {};

	angular.module('myApp', [
	  'ngRoute',
	  'myApp.menu',
	  'myApp.beaconFinder'
	]).
	config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	  // $locationProvider.hashPrefix('!');

	  $routeProvider.otherwise({redirectTo: '/menu'});
	}]);



	localStorage.clear();
	localStorage.setItem('beacons',JSON.stringify([]));
	// localStorage.setItem('nowPlaying','');
	//console.log('darks');


	// Application data.
	app.currentScreenId = null;
	app.beaconColorStyles = [
		'style-color-unknown style-color-unknown-text',        // BeaconColorUnknown
		'style-color-mint style-color-mint-text',              // BeaconColorMintCocktail
		'style-color-ice style-color-ice-text',                // BeaconColorIcyMarshmallow
		'style-color-blueberry-dark style-color-blueberry-dark-text', // BeaconColorBlueberryPie
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorSweetBeetroot
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorCandyFloss
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorLemonTart
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorVanillaJello
		'style-color-unknown style-color-unknown-text',        // TODO: BeaconColorLiquoriceSwirl
		'style-color-white style-color-white-text',            // BeaconColorWhite
		'style-color-transparent style-color-transparent-text' // BeaconColorTransparent
		];
	app.proximityNames = [
		'desconocido',
		'muy cerca',
		'cerca',
		'lejos'];

	// ------------- Private helper function ------------- //

	function onDeviceReady()
	{
		// TODO: Add functionality if needed.
		console.log('onDeviceReady')
	}

	// ------------- Application functions ------------- //

	app.formatDistance = function(meters)
	{
		if (!meters) { return 'desconocido'; }

		if (meters > 1)
		{
			return meters.toFixed(3) + ' m';
		}
		else
		{
			return (meters * 100).toFixed(3) + ' cm';
		}
	};

	app.formatProximity = function(proximity)
	{
		if (!proximity) { return 'desconocido'; }

		// Eliminate bad values (just in case).
		proximity = Math.max(0, proximity);
		proximity = Math.min(3, proximity);

		// Return name for proximity.
		return app.proximityNames[proximity];
	};

	app.beaconColorStyle = function(color)
	{
		if (!color)
		{
			color = 0;
		}

		// Eliminate bad values (just in case).
		color = Math.max(0, color);
		color = Math.min(5, color);

		// Return style class for color.
		return app.beaconColorStyles[color];
	};

	app.showScreen = function(screenId)
	{
		// Hide current screen if set.
		if (app.currentScreenId != null)
		{
			$('#' + app.currentScreenId).hide();
		}

		// Show new screen.
		app.currentScreenId = screenId;
		$('#' + app.currentScreenId).show();
		document.body.scrollTop = 0;
	};

	app.showHomeScreen = function()
	{
		app.showScreen('id-screen-home');
	};

	app.onNavigateBack = function()
	{
		history.back();
	};

	// ------------- Initialisation ------------- //

	document.addEventListener('deviceready', onDeviceReady, false);

	app.showHomeScreen();

	// ------------- Return application object ------------- //

	return app;

})();
