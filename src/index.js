const {
  app,
  BrowserWindow
} = require('electron');
const path = require('path');
const Store = require('./store.js');
require('./personal.js');
const {
  ipcMain
} = require('electron');


var Datastore = require('nedb');
var usersDB = new Datastore({
  filename: 'DB_users'
});

usersDB.loadDatabase();
ipcMain.on("formAddSubmit", function (event, arg) {
  usersDB.insert({
    rank: arg.rank,
    surname: arg.surname,
    name: arg.name,
    middleName: arg.middleName,
    dateOfBirth: arg.dateOfBirth,
    phoneNumbers: arg.phoneNumbers,
    milDocNum: arg.milDocNum,
    tokenNumber: arg.tokenNumber,
  });
});

var data = 0;

ipcMain.on('asynchronous-message', (event, arg) => {
  usersDB.find({}, function (err, docs) {
    data = docs;
    event.sender.send('asynchronous-reply', data);
  });

});

let mainWindow;

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: {
      width: 800,
      height: 600
    }
  }
});



app.on('ready', function () {
  let {
    width,
    height
  } = store.get('windowBounds');
  mainWindow = new BrowserWindow({
    width,
    height
  });
  mainWindow.on('resize', () => {
    let {
      width,
      height
    } = mainWindow.getBounds();
    store.set('windowBounds', {
      width,
      height
    });
  });
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

});