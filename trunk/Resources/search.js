var viewSearch = Ti.UI.createView();

var labelTitle = Ti.UI.createLabel({
	text: 'Buscar',
	height: 'auto',
	width: 'auto'
});

viewSearch.add(labelTitle);

Ti.UI.currentWindow.add(viewSearch);
