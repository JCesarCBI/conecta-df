var winParking = Ti.UI.currentWindow;

var winParkingMeter = Titanium.UI.createWindow({
	url: 'parkingMeter.js'
});

var labelTitle = Ti.UI.createLabel({
	text: 'Estacionamiento',
	height: 'auto',
	width: 'auto'
});

Ti.UI.currentWindow.addEventListener('swipe', function(e){
	if (e.direction == 'left') {
		Ti.UI.currentTab.close();
		Ti.UI.currentTab.open(winParkingMeter);
	};
});

winParking.add(labelTitle);