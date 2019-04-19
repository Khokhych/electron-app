const ipcRenderer = require('electron').ipcRenderer; 
 
// const btnclick = document.querySelector('.ww');
btnclick.addEventListener('click', function () {
    var arg ="secondparam";
    this.innerHTML = 'dddddddddddddddd';
    ipcRenderer.send("btnclick", arg); 
});