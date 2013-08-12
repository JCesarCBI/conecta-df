var viewConfigurations = Ti.UI.createView();

var labelTitle = Ti.UI.createLabel({
	text: 'Configuraciones',
	height: 'auto',
	width: 'auto'
});

viewConfigurations.add(labelTitle);

Ti.UI.currentWindow.add(viewConfigurations);