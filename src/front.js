const ipcRenderer = require('electron').ipcRenderer;
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
myConsole.log(1);

const formAddSubmit = document.querySelector('#form_add_submit');
formAddSubmit.addEventListener('click', function () {
    var arg = {};
    arg.rank = document.querySelector('.form_add_user select[name="rank"]').value;
    arg.surname = document.querySelector('.form_add_user input[name="surname"]').value;
    arg.name = document.querySelector('.form_add_user input[name="name"]').value;
    arg.middleName = document.querySelector('.form_add_user input[name="middleName"]').value;
    arg.dateOfBirth = document.querySelector('.form_add_user input[name="dateOfBirth"]').value;
    arg.phoneNumbers = document.querySelector('.form_add_user input[name="phoneNumbers"]').value;
    arg.milDocNum = document.querySelector('.form_add_user input[name="milDocNum"]').value;
    arg.tokenNumber = document.querySelector('.form_add_user input[name="tokenNumber"]').value;
    ipcRenderer.send("formAddSubmit", arg);
});

let form_add_party_add_input = document.querySelector('.form_add_party_add_input');
let cloneInputAddPatry = document.querySelector('.form_add_party input[name="name"]');
let adenCloneInputAddPatry = 1;


form_add_party_add_input.addEventListener('click', function () {
    myConsole.log(this);
    let clone = cloneInputAddPatry.cloneNode();
    clone.setAttribute("name", `name_${adenCloneInputAddPatry}`);
    clone.setAttribute("id", `name_${adenCloneInputAddPatry}`);
    document.querySelector('.form_add_party').insertBefore(clone, form_add_party_add_input);
    adenCloneInputAddPatry += 1;
});

window.onload = function () {
    ipcRenderer.send('asynchronous-message', 'ping');
    var wrapp = document.createElement('div');
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        for (let i = 0; i < arg.length; i++) {
            wrapp.innerHTML = wrapp.innerHTML + `
            <div> rank : ${arg[i].rank} </div>
            <div> surname : ${arg[i].surname} </div>
            <div> name : ${arg[i].name} </div>
            <div> middleName : ${arg[i].middleName} </div>
            <div> dateOfBirth : ${arg[i].dateOfBirth} </div>
            <div> phoneNumbers : ${arg[i].phoneNumbers} </div>
            <div> milDocNum : ${arg[i].milDocNum} </div>
            <div> tokenNumber : ${arg[i].tokenNumber} </div>
            <hr>
            `;
        }
    });
    document.querySelector('body').appendChild(wrapp);
};