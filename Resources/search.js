var viewSearch = Ti.UI.createView();

Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

Ti.Geolocation.getCurrentPosition(function(e){
	if (e.error)
	{
		alert('HFL cannot get your current location');
		return;
	}
	
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;  
    
    var stadiums = [
    	Ti.Map.createAnnotation({
    		latitude: 19.383391,
    		longitude: -99.178285,
    		title: 'Estadio Azul',
    		animate: true,
    		pincolor: Ti.Map.ANNOTATION_GREEN
    	}),
    	Ti.Map.createAnnotation({
    		latitude: 19.30283,
    		longitude: -99.150562,
    		title: 'Estadio Azteca',
    		animate: true,
    		pincolor: Ti.Map.ANNOTATION_GREEN
    	}),
    	Ti.Map.createAnnotation({
    		latitude: 19.331843,
    		longitude: -99.192199,
    		title: 'Estadio CU',
    		animate: true,
    		pincolor: Ti.Map.ANNOTATION_GREEN
    	}),
    ];
    
    var mapview = Titanium.Map.createView({
        mapType: Titanium.Map.STANDARD_TYPE,
        region: {latitude: latitude, longitude: longitude, latitudeDelta:0.01, longitudeDelta:0.01},
        animate:true,
        regionFit:true,
        userLocation:true,
        annotations: stadiums
    });
    
    viewSearch.add(mapview);
    Ti.UI.currentWindow.add(viewSearch);
});
