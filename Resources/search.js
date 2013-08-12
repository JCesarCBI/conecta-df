var viewSearch = Ti.UI.createView();

Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

Ti.Geolocation.getCurrentPosition(function(e){
	if (e.error)
	{
		alert('HFL cannot get your current location');
		return;
	}
	
	var request = Titanium.Network.createHTTPClient();
	var url = "http://148.206.41.113/apparking.php?action=getParking"; 
	request.open("GET",url);
	request.onload = function (){
		
		var json = JSON.parse(this.responseText);
		var dataArray = [];
		var pos;
		var annotationArray = [];
		
		for (pos=0; pos < json.length; pos++) {
		  var annotation = Ti.Map.createAnnotation({
		  	latitude: obj.latitud,
		  	longitude: obj.longitud,
		  	animate: true,
		  	pincolor: Ti.Map.ANNOTATION_GREEN,
		  	title: 'Estacionamiento'
		  });
		  
		  annotationArray.push(annotation);
		};
		
		var longitude = e.coords.longitude;
	    var latitude = e.coords.latitude;
	    var altitude = e.coords.altitude;
	    var heading = e.coords.heading;
	    var accuracy = e.coords.accuracy;
	    var speed = e.coords.speed;
	    var timestamp = e.coords.timestamp;
	    var altitudeAccuracy = e.coords.altitudeAccuracy;  
        
	    var mapview = Titanium.Map.createView({
	        mapType: Titanium.Map.STANDARD_TYPE,
	        region: {latitude: latitude, longitude: longitude, latitudeDelta:0.01, longitudeDelta:0.01},
	        animate:true,
	        regionFit:true,
	        userLocation:true,
	        annotations: annotationArray
	    });
	    
	    viewSearch.add(mapview);
	    Ti.UI.currentWindow.add(viewSearch);
	}    
});

