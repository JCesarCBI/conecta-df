var winLocation = Ti.UI.currentWindow;

var winParkingMeter = Ti.UI.createWindow({
	url: 'parkingMeter.js'
});

var labelTitle = Ti.UI.createLabel({
	text: 'Localización',
	height: 'auto',
	width: 'auto'
});

winLocation.addEventListener('swipe', function(e){
	if (e.direction == 'right') {
		Ti.UI.currentTab.close();
		Ti.UI.currentTab.open(winParkingMeter);
	};
});

winLocation.add(labelTitle);