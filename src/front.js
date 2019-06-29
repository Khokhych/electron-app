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

let form_add_party_add_input = document.querySelector('.form_add_party .add_input');
var addNewInput = function () {
    let a = `
        <div style="background:red" class="section_wrap own_name">
            <input class="form_add_party_input" type="text" name="name">
            <span class="add_input childs"> + </span>
            <div class="add_input next"> + </div>
        </div>
    `;
    if (this.classList.contains('childs')) {
        this.parentElement.insertAdjacentHTML("beforeend", a);
    }
};
form_add_party_add_input.addEventListener('click', addNewInput);

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