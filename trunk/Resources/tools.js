var winTools = Ti.UI.currentWindow;

//Variables globales
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.distanceFilter = 10;
var scoreParking = 0;
var currentLatitude;
var currentLongitude;

//Funcion que devuleve la latitud y longitud actual del GPS
function getLocation () {
  Ti.Geolocation.getCurrentPosition(function(e){
      if (e.error) {
          alert('HFL cannot get your current location');
        return;
      };
       currentLatitude = e.coords.latitude;
       currentLongitude = e.coords.longitude;
      //currentLatitude = 19.320327;
      //currentLongitude = -99.109882;
  });
};

winTools.backgroundColor = '#E6E6E6';

var viewParking = Ti.UI.createView({
	backgroundColor: '#E6E6E6',
	bottom: 30,
	visible: true
});
var viewParkingMeter = Ti.UI.createView({
	backgroundColor: '#A9A9F5', 
	bottom: 30,
	visible: false
});
var viewLocation = Ti.UI.createView({
	backgroundColor: '#A9F5A9', 
	bottom: 30,
	visible: false
});

var lblViewParking = Ti.UI.createLabel({
	text: 'Estacionamiento',
	height: 'auto',
	width: '33%',
	textAlign: 'center',
	bottom:2,
	left:0,
	backgroundColor: 'blue'
});

var lblViewParkingMeter = Ti.UI.createLabel({
	text: 'Parquímetro',
	height: 'auto',
	width: '33%',
	textAlign: 'center',
	backgroundColor: 'white',
	bottom:2
});

var lblViewLocation = Ti.UI.createLabel({
	text: 'Localizar',
	height: 'auto',
	width: '33%',
	textAlign: 'center',
	bottom:2,
	backgroundColor: 'white',
	right: 0
});

lblViewParking.addEventListener('click', function(){
	viewParking.visible = true;
	viewParkingMeter.visible = false;
	viewLocation.visible = false;
	lblViewParking.backgroundColor = '#E6E6E6';
	lblViewParkingMeter.backgroundColor = '#A9A9F5';
	lblViewLocation.backgroundColor = '#A9F5A9';
	winTools.backgroundColor = '#E6E6E6';
});
lblViewParkingMeter.addEventListener('click', function(){
	viewParking.visible = false;
	viewParkingMeter.visible = true;
	viewLocation.visible = false;
	lblViewParking.backgroundColor = '#E6E6E6';
	lblViewParkingMeter.backgroundColor = '#A9A9F5';
	lblViewLocation.backgroundColor = '#A9F5A9';
	winTools.backgroundColor = '#A9A9F5';
});
lblViewLocation.addEventListener('click', function(){
	viewParking.visible = false;
	viewParkingMeter.visible = false;
	viewLocation.visible = true;
	lblViewParking.backgroundColor = '#E6E6E6';
	lblViewParkingMeter.backgroundColor = '#A9A9F5';
	lblViewLocation.backgroundColor = '#A9F5A9';
	winTools.backgroundColor = '#A9F5A9';
	getLoadViewLocation();
});

//********** Inicia viewParking**********
var imgMarkLocation = Ti.UI.createImageView({
    image: 'images/addLocation.png',
    top: 5,
    left: 5
});

var lblTrace = Ti.UI.createLabel({
    text:'Touch el pin para marcar\ntu posición actual',
    textAlign: 'center',
    font: {fontSize:20, fontFamily: 'Arial'},
    top: 5,
    height: 'auto',
    width: 'auto',
    color: 'blue'
});

imgMarkLocation.addEventListener('click', function(){
    if (imgMarkLocation.image = 'images/addLocation.png') {
        imgMarkLocation.image = 'images/addedLocation.png';
        lblTrace.text = 'Tu posición ha sido marcada';
        lblTrace.color = 'red';
        getLocation();
    };
});

var txtHour = Ti.UI.createTextField({
    borderColor: 'black',
    borderRadius: 5,
    top:80,
    hintText:'$ primera hora',
    textAlign: 'center',
    width: '50%',
    height: 'auto',
    keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
});

txtHour.addEventListener('change', function(){
    txtFraction.enabled = true;
});

var txtFraction = Ti.UI.createTextField({
    borderColor: 'black',
    borderRadius: 5,
    top:160,
    hintText:'$ por fracción',
    textAlign: 'center',
    width: '50%',
    height: 'auto',
    keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
    enabled:false
});

txtFraction.addEventListener('change', function(){
    swtStart.enabled=true;
});

winTools.addEventListener('click', function(e){
    txtHour.blur();
    txtFraction.blur();
    txaComment.blur();
});

//Switch para iniciar y detener cronometro
var swtStart = Ti.UI.createSwitch({
    top:160,
    right: 10,
    width: 'auto',
    height: 'auto',
    value: false,
    enabled: false
});

//Etiqueta para desplejar Horas
var lblHours = Ti.UI.createLabel({
    text: '00'      
});

//Etiqueta para desplejar Minutos
var lblMinutes = Ti.UI.createLabel({
    text: '00'      
});

//Etiqueta para desplejar Segundos
var lblSeconds = Ti.UI.createLabel({
    text: '00'
});

//Etiqueta para desplejar cronometro
var lblChronometer = Ti.UI.createLabel({
    font: {fontSize:52, fontFamily: 'DB LCD Temp'},
    color: 'black',
    textAlign: 'center',
    top: 240,
    text: lblHours.text + ':' + lblMinutes.text + ':' + lblSeconds.text
})

//EventListener para iniciar y detener el cronometro
var bandera;
swtStart.addEventListener('change', function(e){
    bandera =e.value;
    if(bandera==1){  
        crono();
    };
    if (bandera==0){
        detener();
    };
});

var cronometro;

function detener(){
    clearInterval(cronometro);
    hrs = contador_h;
    min = contador_m;
    if(hrs==0 && min!=0){
        lblMonto.text = "$ " + txtHour.value + ".00";
    };
    if(hrs>0){
        min=(hrs-1)*60+contador_m;
        frac=(min-(min%15))/15;
        lblMonto.text = "$ " + (parseInt(txtHour.value)+parseInt((txtFraction.value*frac))) + ".00";
    };
    imgStarOne.visible = true;
    imgStarTwo.visible = true;
    imgStarThree.visible = true;
    imgStarFour.visible = true;
    imgStarFive.visible = true;
    lblRate.visible = true;
    txaComment.visible = true;
    imgSendRate.visible = true;
};

function crono(){
	lblHours.value = 00;
	lblMinutes.value = 00;
	lblSeconds.value = 00;
    contador_s =0;
    contador_m =0;
    contador_h =0;
    cronometro = setInterval(
        function(){
            if(contador_s==60) {
                contador_s=0;
                contador_m++;
                lblMinutes.text = contador_m;
                if(contador_m==60) {
                    contador_m=0;
                    contador_h++;
                    lblHours.text = contador_h;
                }
            }
        lblSeconds.text = contador_s;
        lblChronometer.text = lblHours.text + ':' + lblMinutes.text + ':' + lblSeconds.text;
        contador_s++;
        }
    ,1);
};

var lblMonto = Ti.UI.createLabel({
    font: {fontSize:32, fontFamily:'American Typewriter'},
    text: '$ 0.00',
    textAlign: 'right',
    top: 300,
    right: 5,
    color: 'black',
    width: 'auto',
    height: 'auto',
});

var lblRate = Ti.UI.createLabel({
    font: {fontSize:18, fontFamily:'American Typewriter'},
    text: '¿Desea calificar el servicio del estacionamiento?',
    textAlign: 'center',
    top: 350,
    width: 'auto',
    height: 'auto',
    visible: false
});

var imgStarOne = Ti.UI.createImageView({
    image: 'images/star_off.png',
    top: 380,
    left: 0,
    visible: false
});
var imgStarTwo = Ti.UI.createImageView({
    image: 'images/star_off.png',
    top: 380,
    left: 49,
    visible: false
});
var imgStarThree = Ti.UI.createImageView({
    image: 'images/star_off.png',
    top: 380,
    left: 97,
    visible: false
});
var imgStarFour = Ti.UI.createImageView({
    image: 'images/star_off.png',
    top: 380,
    left: 145,
    visible: false
});
var imgStarFive = Ti.UI.createImageView({
    image: 'images/star_off.png',
    top: 380,
    left: 193,
    visible: false
});

imgStarOne.addEventListener('click', function(){
    imgStarOne.image = 'images/star.png'
    imgStarTwo.image = 'images/star_off.png'
    imgStarThree.image = 'images/star_off.png'
    imgStarFour.image = 'images/star_off.png'
    imgStarFive.image = 'images/star_off.png'
    scoreParking = 2
});

imgStarTwo.addEventListener('click', function(){
    imgStarOne.image = 'images/star.png'
    imgStarTwo.image = 'images/star.png'
    imgStarThree.image = 'images/star_off.png'
    imgStarFour.image = 'images/star_off.png'
    imgStarFive.image = 'images/star_off.png'
    scoreParking = 4
});

imgStarThree.addEventListener('click', function(){
    imgStarOne.image = 'images/star.png'
    imgStarTwo.image = 'images/star.png'
    imgStarThree.image = 'images/star.png'
    imgStarFour.image = 'images/star_off.png'
    imgStarFive.image = 'images/star_off.png'
    scoreParking = 6
});

imgStarFour.addEventListener('click', function(){
    imgStarOne.image = 'images/star.png'
    imgStarTwo.image = 'images/star.png'
    imgStarThree.image = 'images/star.png'
    imgStarFour.image = 'images/star.png'
    imgStarFive.image = 'images/star_off.png'
    scoreParking = 8
});

imgStarFive.addEventListener('click', function(){
    imgStarOne.image = 'images/star.png'
    imgStarTwo.image = 'images/star.png'
    imgStarThree.image = 'images/star.png'
    imgStarFour.image = 'images/star.png'
    imgStarFive.image = 'images/star.png'
    scoreParking = 10
});

var txaComment = Ti.UI.createTextArea({
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  textAlign: 'center',
  hintText: 'Escribe aquí tu comentario',
  top: 450,
  width: '70%',
  height : 'auto',
  left: 5,
  visible: false
});

var imgSendRate = Ti.UI.createImageView({
    image: 'images/send.png',
    top: 450,
    right: 5,
    visible: false
});

viewParking.add(imgMarkLocation);
viewParking.add(imgStarOne);
viewParking.add(imgStarTwo);
viewParking.add(imgStarThree);
viewParking.add(imgStarFour);
viewParking.add(imgStarFive);
viewParking.add(imgSendRate);
viewParking.add(txtHour);
viewParking.add(txtFraction);
viewParking.add(lblTrace);
viewParking.add(lblMonto);
viewParking.add(lblRate);
viewParking.add(lblChronometer);
viewParking.add(swtStart);
viewParking.add(txaComment);
//********** Termina viewParking**********


//********** Inicia viewParkingMeter**********
var imgMarkLocationPM = Ti.UI.createImageView({
    image: 'images/addLocation.png',
    top: 5,
    left: 5
});

var lblTracePM = Ti.UI.createLabel({
    text:'Touch el pin para marcar\ntu posición actual',
    textAlign: 'center',
    font: {fontSize:20, fontFamily: 'Arial'},
    top: 5,
    height: 'auto',
    width: 'auto',
    color: 'blue'
});

imgMarkLocationPM.addEventListener('click', function(){
    if (imgMarkLocationPM.image = 'images/addLocation.png') {
        imgMarkLocationPM.image = 'images/addedLocation.png';
        lblTracePM.text = 'Tu posición ha sido marcada';
        lblTracePM.color = 'red';
        getLocation;
    };
});

//Slider para seleccionar el mnto pagado en el parquimetro
var sldPayment = Ti.UI.createSlider({
	height: 'auto',
	width: '80%',
	top: 80,
	min: 0,
	max: 48
});

var lblAmount = Ti.UI.createLabel({
	text: '$ 0.00',
	height: 'auto',
	width: 'auto',
	top: 100,
	value:0
});

var valor;
sldPayment.addEventListener('change', function(e){
	valor=e.value;
	if(valor%2==0)
		lblAmount.text = '$ ' + valor + '.00';
	if(valor%2!=0){
		valor=valor-(valor%2)+2;
		lblAmount.text = '$ ' + valor + '.00';
	};
});

var swtStartPM = Ti.UI.createSwitch({
	top:160,
	value: false	
});


//Etiqueta para desplejar Horas
var lblHoursPM = Ti.UI.createLabel({
    text: '00'      
});

//Etiqueta para desplejar Minutos
var lblMinutesPM = Ti.UI.createLabel({
    text: '00'      
});

//Etiqueta para desplejar Segundos
var lblSecondsPM = Ti.UI.createLabel({
    text: '00'
});

//Etiqueta para desplejar cronometro
var lblCountdown = Ti.UI.createLabel({
    font: {fontSize:40, fontFamily: 'DB LCD Temp'},
    textAlign: 'center',
    top: 200,
    text: lblHoursPM.text + ':' + lblMinutesPM.text + ':' + lblSecondsPM.text
});

//EventListener para iniciar y detener el cronometro
var banderaPM;
swtStartPM.addEventListener('change', function(e){
	banderaPM = e.value;
	if(banderaPM == 1){	
		cronoPM();
	};
	if (banderaPM == 0){
		detenerPM();
	};
});

var countdown;

function detenerPM (){
	clearInterval(countdown);
};

function cronoPM (){
	cantidad=valor;
	tiempo=15;
	contador_s =0;
	minutosT= (cantidad*tiempo)/2;
	contador_m =0;
	contador_h=0;
	if (minutosT!=0) {
		countdown = setInterval(
			function(){
				if(contador_s==0) {
					contador_s=60; 
					minutosT--;
					contador_m =minutosT%60;
					contador_h= (minutosT-contador_m)/60;
					lblMinutesPM.text = contador_m;
					lblHoursPM.text = contador_h;
				}
				lblSecondsPM.text = contador_s;
				contador_s--;
				lblCountdown.text = lblHoursPM.text + ':' + lblMinutesPM.text + ':' + lblSecondsPM.text;
				if((contador_h==0)&&(contador_m==0)&&(contador_s==0)){
					clearInterval(countdown);
					lblSecondsPM.text = contador_s;
				}
				if((contador_h==0)&&(contador_m==5)&&(contador_s==0)){
					alert('Restan 5 minutos de estacionamiento')
				}
             },10);
	}
}; 

viewParkingMeter.add(imgMarkLocationPM);
viewParkingMeter.add(lblTracePM);
viewParkingMeter.add(sldPayment);
viewParkingMeter.add(lblCountdown);
viewParkingMeter.add(swtStartPM);
viewParkingMeter.add(lblAmount);
//********** Inicia viewParkingMeter**********

//********** Inicia viewLocation**********
function getLoadViewLocation () {
	Ti.Geolocation.getCurrentPosition(function(evt){
		if (evt.error){
			alert('HFL cannot get your current location');
			return;
		};
		
		var origin = String(evt.coords.latitude + ',' + evt.coords.longitude),
		travelMode = 'walking',
		destination = String(currentLatitude + ',' + currentLongitude),
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
			if (totalSteps==0 || totalSteps== null) {
				alert('Estoy en el mismo lugar');
			};
		
			for (var i=0; i < totalSteps; i++) {
				var startLocation = steps.item(i).getElementsByTagName("start_location");
				startLatitude = startLocation.item(0).getElementsByTagName("lat").item(0).text,
				startLongitude = startLocation.item(0).getElementsByTagName("lng").item(0).text;
			
				points.push({latitude:startLatitude, longitude:startLongitude});                
			};
		
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
				image: 'images/startAnnotation.png',
				latitude: points[0].latitude,
				longitude: points[0].longitude,
				title: 'Ubicación actual'}),
		
			endAnnotation = Ti.Map.createAnnotation({
				image: 'images/endAnnotation.png',
				latitude: points[points.length - 1].latitude,
				longitude: points[points.length - 1].longitude,
				title: 'Destino'
			});
		
			var mapView = Titanium.Map.createView({
				mapType: Titanium.Map.STANDARD_TYPE,
				region: {latitude: evt.coords.latitude, longitude: evt.coords.longitude, latitudeDelta:0.01, longitudeDelta:0.01},
				animate:true,
				regionFit:true,
				userLocation:false,
			});
		
			// Add elements
			mapView.addRoute(route);
			mapView.addAnnotation(startAnnotation);
			mapView.addAnnotation(endAnnotation);
			viewLocation.add(mapView);
			winTools.add(viewLocation);
		};
	
		xhr.open('get', url);
		xhr.send();
	});
}
//********** Termina viewLocation**********

winTools.add(viewParking);
winTools.add(viewParkingMeter);
winTools.add(lblViewParking);
winTools.add(lblViewParkingMeter);
winTools.add(lblViewLocation);