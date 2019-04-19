const { app, BrowserWindow } = require('electron');
const path = require('path');
const Store = require('./store.js');
require('./personal.js');
var Datastore = require('nedb');

let mainWindow;

const {ipcMain} = require('electron'); 
const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
});


ipcMain.on("btnclick",function (event, arg) {
  mainWindow.webContents.openDevTools()

});
app.on('ready', function() {
    let { width, height } = store.get('windowBounds');
  mainWindow = new BrowserWindow({ width, height });
  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    store.set('windowBounds', { width, height });
  });
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));
});