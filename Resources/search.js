var winSearch = Ti.UI.currentWindow;

var urlParking = "http://148.206.41.113/apparking.php?action=getParking";
var gpsParking = [];
var jsonParking, coordinateParking, iParking, rowParking;

var urlParkingMeter = "http://148.206.41.113/apparking.php?action=getParkingMeter";
var gpsParkingMeter = [];

Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.distanceFilter = 10;

Ti.Geolocation.getCurrentPosition(function(e)
{
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
    
    var parkingGPS = Titanium.Map.createView({
    	mapType: Titanium.Map.STANDARD_TYPE,
    	region: {latitude: latitude, longitude: longitude, latitudeDelta:0.01, longitudeDelta:0.01},
    	animate:true,
    	regionFit:true,
    	userLocation:true,
    });
   
    var xhrParking = Ti.Network.createHTTPClient({
    	onload: function(){
    		var json = JSON.parse(this.responseText);
    		var longitud = json.length;
    		for(var i=0; i<json.length; i++){
    			var coordinate = json[i];
    			var annotation = Ti.Map.createAnnotation({
    				latitude: coordinate.latitud,
    				longitude: coordinate.longitud,
    				animate: true,
    				title: coordinate.nombreEstac,
    				subtitle: 'Calificación: ' + coordinate.promedio + " | " + 'Capacidad: ' + coordinate.totalEspacios,
    				image: 'images/pinParking.png'
    			});
    			gpsParking.push(annotation);
    		};
    		parkingGPS.addAnnotations(gpsParking);
		},
		onerror: function(e){
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR" + e.error);
		},
		timeout:3000
	});
	
	var xhrParkingMeter = Ti.Network.createHTTPClient({
    	onload: function(){
    		var json = JSON.parse(this.responseText);
    		var longitud = json.length;
    		for(var i=0; i<json.length; i++){
    			var coordinate = json[i];
    			var annotation = Ti.Map.createAnnotation({
    				latitude: coordinate.latitud,
    				longitude: coordinate.longitud,
    				animate: true,
    				title: 'Paquímetro',
    				image: 'images/pinParkingMeter.png'
    			});
    			gpsParkingMeter.push(annotation);
    		};
    		parkingGPS.addAnnotations(gpsParkingMeter);
		},
		onerror: function(e){
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR" + e.error);
		},
		timeout:3000
	});
    
    xhrParking.open("GET", urlParking);
	xhrParking.send();
	
	xhrParkingMeter.open("GET", urlParkingMeter);
	xhrParkingMeter.send();
	
	winSearch.add(parkingGPS);
	
});