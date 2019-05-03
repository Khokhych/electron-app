const ipcRenderer = require('electron').ipcRenderer; 
 
const formAddSubmit = document.querySelector('#form_add_submit');
formAddSubmit.addEventListener('click', function () {
    var arg = {};
    arg.name1 = document.querySelector('input[name="name1"]').value;
    arg.name2 = document.querySelector('input[name="name2"]').value;
    arg.name3 = document.querySelector('input[name="name3"]').value;
    ipcRenderer.send("formAddSubmit", arg); 
});

window.onload = function() {
    ipcRenderer.send('asynchronous-message', 'ping');
    
    var wrapp = document.createElement('div');
    
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        wrapp.innerHTML = JSON.stringify(arg);
        
    });
    
    document.querySelector('body').appendChild(wrapp);
};







