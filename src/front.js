const ipcRenderer = require('electron').ipcRenderer;

const formAddSubmit = document.querySelector('#form_add_submit');
formAddSubmit.addEventListener('click', function () {
    var arg = {};
    arg.position = document.querySelector('input[name="position"]').value;
    arg.rank = document.querySelector('input[name="rank"]').value;
    arg.surname = document.querySelector('input[name="surname"]').value;
    arg.name = document.querySelector('input[name="name"]').value;
    arg.middleName = document.querySelector('input[name="middleName"]').value;
    arg.dateOfBirth = document.querySelector('input[name="dateOfBirth"]').value;
    arg.phoneNumbers = document.querySelector('input[name="phoneNumbers"]').value;
    arg.milDocNum = document.querySelector('input[name="milDocNum"]').value;
    arg.tokenNumber = document.querySelector('input[name="tokenNumber"]').value;
    arg.location = document.querySelector('input[name="location"]').value;
    arg.location = document.querySelector('input[name="foto"]').files[0].patch;
    ipcRenderer.send("formAddSubmit", arg);
});

window.onload = function () {
    ipcRenderer.send('asynchronous-message', 'ping');

    var wrapp = document.createElement('div');

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        wrapp.innerHTML = JSON.stringify(arg);

    });

    document.querySelector('body').appendChild(wrapp);
};