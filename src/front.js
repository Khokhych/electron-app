const ipcRenderer = require('electron').ipcRenderer; 
 
const formAddSubmit = document.querySelector('#form_add_submit');
formAddSubmit.addEventListener('click', function () {
    var arg = {};
    arg.name1 = document.querySelector('input[name="name1"]').value;
    arg.name2 = document.querySelector('input[name="name2"]').value;
    arg.name3 = document.querySelector('input[name="name3"]').value;
    ipcRenderer.send("formAddSubmit", arg); 
});

