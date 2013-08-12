//Establece el color de fondo de la vista
Titanium.UI.setBackgroundColor('#FFF');

// Crea un grupo de pestañas
var tabGroup = Titanium.UI.createTabGroup();


//Primera ventana y pestaña
var winSearch = Titanium.UI.createWindow({
	url: 'search.js'
});
var tabSearch = Titanium.UI.createTab({
	title: 'Buscar',
	window: winSearch
});

//Segunda ventana y pestaña
var winTools = Titanium.UI.createWindow({
	url: 'tools.js'
});
var tabTools = Titanium.UI.createTab({
	title: 'Herramientas',
	window:winTools
});

//Tercera ventana y pestaña
var winConfigurations = Titanium.UI.createWindow({
	url: 'configurations.js'
});
var tabConfigurations = Titanium.UI.createTab({
	title: 'Configuraciones',
	window:winConfigurations
});

//Agregar pestañas al grupo
tabGroup.addTab(tabSearch);
tabGroup.addTab(tabTools);
tabGroup.addTab(tabConfigurations);

// open tab group
tabGroup.open();
