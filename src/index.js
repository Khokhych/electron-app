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



// var DB_positions = new Datastore({
//   filename: 'DB_positions'
// });
// DB_positions.loadDatabase();



var DB_users = new Datastore({
  filename: 'DB_users'
});

DB_users.loadDatabase();
ipcMain.on("formAddSubmit", function (event, arg) {
  DB_users.insert({
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

ipcMain.on("form_add_party_submit", function (event, arg) {
  DB_users.insert({
    position: "1",
    unit: arg.values,
  });
});





;
(function () {
  var data = 0;
  ipcMain.on('asynchronous-message', (event, arg) => {
    DB_users.find({}, function (err, docs) {
      data = docs;
      event.sender.send('asynchronous-reply', data);
    });
  });
}());

;
(function () {
  var data = 0;
  ipcMain.on('clickOptionPosition', (event, arg) => {
    DB_users.find({
      "position": "1"
    }, function (err, docs) {
      data = docs;
      console.log(data);
      event.sender.send('clickOptionPosition2', data);

    });
  });
}());


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


DB_users.findOne({
  _id: 'z4ClzRNQblWb0NoI'
}, function (err, doc) {
  if (!err) {
    console.log(doc);
  }
});