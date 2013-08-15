var winSearch = Ti.UI.currentWindow;

var url = "http://148.206.41.113/apparking.php?action=getParking";
var gps = [];
var json, coordinate, i, row;

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
   
    var xhr = Ti.Network.createHTTPClient({
    	onload: function(){
    		json = JSON.parse(this.responseText);
    		var longitud = json.length;
    		for(i=0; i<json.length; i++){
    			coordinate = json[i];
    			var annotation = Ti.Map.createAnnotation({
    				latitude: coordinate.latitud,
    				longitude: coordinate.longitud,
    				animate: true,
    				image: 'images/pin1.png',
    				// pincolor: Ti.Map.ANNOTATION_GREEN 
    			});
    			gps.push(annotation);
    		}
    		var parkinGPS = Titanium.Map.createView({
    			mapType: Titanium.Map.STANDARD_TYPE,
    			region: {latitude: latitude, longitude: longitude, latitudeDelta:0.01, longitudeDelta:0.01},
    			animate:true,
    			regionFit:true,
    			userLocation:true,
    			annotations: gps
    			});
    		winSearch.add(parkinGPS);
		},
		onerror: function(e){
			Ti.API.debug("STATUS: " + this.status);
			Ti.API.debug("TEXT: " + this.responseText);
			Ti.API.debug("ERROR" + e.error);
		},
		timeout:3000
	});
    
    xhr.open("GET", url);
	xhr.send();
	
});