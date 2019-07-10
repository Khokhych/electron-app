const ipcRenderer = require('electron').ipcRenderer;
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
// myConsole.log(1);
const path = require('path');