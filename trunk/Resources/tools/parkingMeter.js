var winParkingMeter = Ti.UI.currentWindow;

var winParking = Ti.UI.createWindow({
	url: 'parking.js'
});

var winLocation = Ti.UI.createWindow({
	url: 'location.js'
})

var labelTitle = Ti.UI.createLabel({
	text: 'Parquímetro',
	height: 'auto',
	width: 'auto'
});

winParkingMeter.addEventListener('swipe', function(e){
	if (e.direction == 'left') {
		Ti.UI.currentTab.close();
		Ti.UI.currentTab.open(winLocation);
	} else if(e.direction == 'right'){
		Ti.UI.currentTab.close();
		Ti.UI.currentTab.open(winParking);
	};
});

winParkingMeter.add(labelTitle);