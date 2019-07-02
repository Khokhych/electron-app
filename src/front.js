const ipcRenderer = require('electron').ipcRenderer;
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
// myConsole.log(1);

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

(function () { // add new level and culculate
    let form_add_party_add_input = document.querySelector('.form_add_party .add_input');
    let addNewInput = function () {
        let _this = this;
        let countLevel = this.parentElement.firstElementChild.getAttribute("level");
        let previosItemLevel = false;
        try {
            previosItemLevel = this.parentElement.lastElementChild.firstElementChild.getAttribute("level");
            previosItemLevel = +previosItemLevel[previosItemLevel.length - 2];
        } catch (e) {}
        let newLevel = 0;
        previosItemLevel ? newLevel = countLevel + (1 + previosItemLevel) : newLevel = countLevel + 1;
        let wrap = document.createElement("div");
        wrap.classList.add("section_wrap")
        let content = `
        <input class="form_add_party_input" type="text" level="${newLevel}_" name="name">
        <span class="add_input"> + </span>
    `;
        wrap.innerHTML = content;
        _this.parentElement.append(wrap);
        let b = document.querySelectorAll('.form_add_party .add_input');
        for (let i = 0; i < b.length; i++) {
            b[i].addEventListener('click', addNewInput);
        }
    };
    form_add_party_add_input.addEventListener('click', addNewInput);

}())

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