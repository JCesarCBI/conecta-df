var winLocation = Ti.UI.currentWindow;

var winParkingMeter = Ti.UI.createWindow({
	url: 'parkingMeter.js'
});

winLocation.addEventListener('swipe', function(e){
	if (e.direction == 'right') {
		Ti.UI.currentTab.remove(winLocation);
		Ti.UI.currentTab.add(winParkingMeter);
		Ti.UI.currentTab.open(winParkingMeter);
	};
});

var latDestination = 19.32039;
var longDestination = -99.113398;
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.distanceFilter = 10;

Ti.Geolocation.getCurrentPosition(function(evt){
	
	if (evt.error)
	{
		alert('HFL cannot get your current location');
		return;
	}
	
	var origin = String(evt.coords.latitude + ',' + evt.coords.longitude),
	travelMode = 'walking',
	destination = String(latDestination + ',' + longDestination),
	url = "http://maps.google.com/maps/api/directions/xml?mode="
		+ travelMode + "&origin="
		+ origin + "&destination="
		+ destination +"&sensor=false";
	
	xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = function(e){
		var xml = this.responseXML,
		points = [],
		steps = xml.documentElement.getElementsByTagName("step"),
		totalSteps = steps.length;
		
		for (var i=0; i < totalSteps; i++) {
			var startLocation = steps.item(i).getElementsByTagName("start_location");
			startLatitude = startLocation.item(0).getElementsByTagName("lat").item(0).text,
			startLongitude = startLocation.item(0).getElementsByTagName("lng").item(0).text;
			
			points.push({latitude:startLatitude, longitude:startLongitude});                
		}
		
		// Obtiene el ultimo punto y lo añade al arreglo
		var finalLocation = steps.item(totalSteps - 1).getElementsByTagName("end_location"),
		finalLatitude = finalLocation.item(0).getElementsByTagName("lat").item(0).text,
		finalLongitude = finalLocation.item(0).getElementsByTagName("lng").item(0).text;
		
		points.push({latitude:finalLatitude, longitude:finalLongitude});
		
		// Crea la ruta y las anotaciones
		var route = {
			name: '¿Cómo llegar?',
			points: points,
			color: 'blue',
			width: 4
		}, 
		startAnnotation = Ti.Map.createAnnotation({
			image: '../images/startAnnotation.png',
			latitude: points[0].latitude,
			longitude: points[0].longitude,
			title: 'Ubicación actual'}),
		
		endAnnotation = Ti.Map.createAnnotation({
			image: '../images/endAnnotation.png',
			latitude: points[points.length - 1].latitude,
			longitude: points[points.length - 1].longitude,
			title: 'Destino'
		});
		
		var mapView = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude: evt.coords.latitude, longitude: evt.coords.longitude, latitudeDelta:0.01, longitudeDelta:0.01},
			animate:true,
			regionFit:true,
			userLocation:true,
		});
		
		// Add elements
		mapView.addRoute(route);
		mapView.addAnnotation(startAnnotation);
		mapView.addAnnotation(endAnnotation);
		winLocation.add(mapView);
	};
	
	xhr.open('get', url);
	xhr.send();
});