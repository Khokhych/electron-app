const ipcRenderer = require('electron').ipcRenderer;
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
myConsole.log(1);

const formAddSubmit = document.querySelector('#form_add_submit');
formAddSubmit.addEventListener('click', function () {
    var arg = {};
    // arg.position = document.querySelector('input[name="position"]').value;
    arg.rank = document.querySelector('input[name="rank"]').value;
    arg.surname = document.querySelector('input[name="surname"]').value;
    arg.name = document.querySelector('input[name="name"]').value;
    arg.middleName = document.querySelector('input[name="middleName"]').value;
    arg.dateOfBirth = document.querySelector('input[name="dateOfBirth"]').value;
    arg.phoneNumbers = document.querySelector('input[name="phoneNumbers"]').value;
    arg.milDocNum = document.querySelector('input[name="milDocNum"]').value;
    arg.tokenNumber = document.querySelector('input[name="tokenNumber"]').value;
    arg.location = document.querySelector('input[name="location"]').value;
    ipcRenderer.send("formAddSubmit", arg);
});

window.onload = function () {
    ipcRenderer.send('asynchronous-message', 'ping');
    var wrapp = document.createElement('div');
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        for (let i = 0; i < arg.length; i++) {
            wrapp.innerHTML = wrapp.innerHTML + `
            <div> ${arg[i].rank} </div>
            <div> ${arg[i].surname} </div>
            <div> ${arg[i].name} </div>
            <div> ${arg[i].middleName} </div>
            <div> ${arg[i].dateOfBirth} </div>
            <div> ${arg[i].phoneNumbers} </div>
            <div> ${arg[i].milDocNum} </div>
            <div> ${arg[i].tokenNumber} </div>
            <hr>
            `;
        }

    });
    document.querySelector('body').appendChild(wrapp);
};