var viewTools = Ti.UI.createView();

var labelTitle = Ti.UI.createLabel({
	text: 'Herramientas',
	height: 'auto',
	width: 'auto'
});

viewTools.add(labelTitle);

Ti.UI.currentWindow.add(viewTools);