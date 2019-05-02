const { app, BrowserWindow } = require('electron');
const path = require('path');
const Store = require('./store.js');
require('./personal.js');
const {ipcMain} = require('electron'); 


var Datastore = require('nedb');
var db = new Datastore({filename : 'users'});
db.loadDatabase();

ipcMain.on("formAddSubmit",function (event, arg) {
  db.insert({
    name1: arg.name1,
    name2: arg.name2,
    name3: arg.name3
  });
});

db.find({year: 1946}, function (err, docs) {
	// console.log(docs);
});


let mainWindow;

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
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