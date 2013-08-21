var winLocation = Ti.UI.currentWindow;

//Dummy de Latitud y Longitud
var currentLatitude = 19.424445;
var currentLongitude = -99.168511;

Ti.Geolocation.getCurrentPosition(function(evt) {
	var origin = String(evt.coords.latitude + ',' + evt.coords.longitude),
	travelMode = 'walking',
	destination = String(currentLatitude + ',' + currentLongitude ),
	url = "http://maps.google.com/maps/api/directions/xml?mode="
	+ travelMode + "&origin="
	+ origin + "&destination="
	+ destination +"&sensor=false";

xhr = Titanium.Network.createHTTPClient();

Ti.API.info('>>> go get data for Rgeocode! ...URL: ' + url);

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
	};
	
	// Get last point and add it to the array, as we are only parsing <start_location>
	var finalLocation = steps.item(totalSteps - 1).getElementsByTagName("end_location"),
	finalLatitude = finalLocation.item(0).getElementsByTagName("lat").item(0).text,
	finalLongitude = finalLocation.item(0).getElementsByTagName("lng").item(0).text;
	
	points.push({latitude:finalLatitude, longitude:finalLongitude});
	
	// Create route and annotations
	var route = {
		name:"bonVoyage",
		points:points,
		color:"blue",
		width:3
		},
	startAnnotation = Ti.Map.createAnnotation({
		pincolor: Ti.Map.ANNOTATION_RED,
		latitude: points[0].latitude,
		longitude: points[0].longitude,
		title: 'Posición actual'}),
	endAnnotation = Ti.Map.createAnnotation({
		pincolor: Ti.Map.ANNOTATION_RED,
		latitude: points[points.length - 1].latitude,
		longitude: points[points.length - 1].longitude,
		title: 'Destino'
	});
	
	var mapLocation = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: {latitude: evt.coords.latitude, longitude: evt.coords.longitude, latitudeDelta:0.01, longitudeDelta:0.01},
		animate:true,
		regionFit:true,
		userLocation:true,
	});
	
	// Add elements
	mapLocation.addRoute(route);
	mapLocation.addAnnotation(startAnnotation);
	mapLocation.addAnnotation(endAnnotation);
	winLocation.add(mapLocation);
	};
	xhr.open('GET',url);
	xhr.send();
});
