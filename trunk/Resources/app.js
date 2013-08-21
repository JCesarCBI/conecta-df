//Establece el color de fondo de la vista
Titanium.UI.setBackgroundColor('#FFF');

// Crea un grupo de pestañas
var tabGroup = Titanium.UI.createTabGroup();


//Primera ventana y pestaña
var winSearch = Titanium.UI.createWindow({
	url: 'search.js',
	navBarHidden: true
});
var tabSearch = Titanium.UI.createTab({
	title: 'Buscar',
	window: winSearch
});

//Segunda ventana y pestaña
var winTools = Titanium.UI.createWindow({
	url: 'tools.js',
	navBarHidden: true
});
var tabTools = Titanium.UI.createTab({
	title: 'Herramientas',
	window:winTools
});

//Tercera ventana y pestaña
var winLocation = Titanium.UI.createWindow({
	url: 'location.js',
	navBarHidden: true
});
var tabLocation = Titanium.UI.createTab({
	title: 'Localización',
	window:winLocation
});

//Cuarta ventana y pestaña
var winConfigurations = Titanium.UI.createWindow({
	url: 'configurations.js',
	navBarHidden: true
});
var tabConfigurations = Titanium.UI.createTab({
	title: 'Configuraciones',
	window:winConfigurations
});

//Agregar pestañas al grupo
tabGroup.addTab(tabSearch);
tabGroup.addTab(tabTools);
tabGroup.addTab(tabLocation);
tabGroup.addTab(tabConfigurations);

// open tab group
tabGroup.open();
