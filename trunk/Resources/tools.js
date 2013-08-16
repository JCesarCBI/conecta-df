var winTools = Ti.UI.currentWindow;

winTools.backgroundColor = 'blue';

var viewA = Ti.UI.createView({
	backgroundColor: 'blue',
	bottom: 30,
	visible: true
});
var viewB = Ti.UI.createView({
	backgroundColor: 'red', 
	bottom: 30,
	visible: false
});
var viewC = Ti.UI.createView({
	backgroundColor: 'yellow', 
	bottom: 30,
	visible: false
});

var lblViewA = Ti.UI.createLabel({
	text: 'Parking',
	height: 'auto',
	width: '33%',
	textAlign: 'center',
	bottom:2,
	left:0,
	backgroundColor: 'blue'
});

var lblViewB = Ti.UI.createLabel({
	text: 'Parking Meter',
	height: 'auto',
	width: '33%',
	textAlign: 'center',
	backgroundColor: 'white',
	bottom:2
});

var lblViewC = Ti.UI.createLabel({
	text: 'Location',
	height: 'auto',
	width: '33%',
	textAlign: 'center',
	bottom:2,
	backgroundColor: 'white',
	right: 0
});

lblViewA.addEventListener('click', function(){
	viewA.visible = true;
	viewB.visible = false;
	viewC.visible = false;
	lblViewA.backgroundColor = 'blue';
	lblViewB.backgroundColor = 'white';
	lblViewC.backgroundColor = 'white';
	winTools.backgroundColor = 'blue';
});
lblViewB.addEventListener('click', function(){
	viewA.visible = false;
	viewB.visible = true;
	viewC.visible = false;
	lblViewA.backgroundColor = 'white';
	lblViewB.backgroundColor = 'red';
	lblViewC.backgroundColor = 'white';
	winTools.backgroundColor = 'red';
});
lblViewC.addEventListener('click', function(){
	viewA.visible = false;
	viewB.visible = false;
	viewC.visible = true;
	lblViewA.backgroundColor = 'white';
	lblViewB.backgroundColor = 'white';
	lblViewC.backgroundColor = 'yellow';
	winTools.backgroundColor = 'yellow';
});

winTools.add(viewA);
winTools.add(viewB);
winTools.add(viewC);
winTools.add(lblViewA);
winTools.add(lblViewB);
winTools.add(lblViewC);