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
try {
    const form_add_party_submit = document.querySelector('#form_add_party_submit');
    form_add_party_submit.addEventListener('click', function () {
        var arg = {};
        let values = [];
        const form_add_party_submit = document.querySelectorAll('.form_add_party .form_add_party_input');
        for (let i = 0; i < form_add_party_submit.length; i++) {
            values.push({
                    name: form_add_party_submit[i].value,
                }

            );
        }
        arg.values = values;
        console.log(arg);
        ipcRenderer.send("form_add_party_submit", arg);
    });
} catch (e) {
    console.log(e);
};


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
}());

window.onload = function () {
    ipcRenderer.send('asynchronous-message', 'ping');
    var wrapp = document.createElement('div');
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        for (let i = 0; i < arg.length; i++) {
            wrapp.innerHTML = wrapp.innerHTML + `
            <div> <span> rank </span> : <span class="_write" name="rank" id="${arg[i]._id}">${arg[i].rank} </span></div>
            <div> <span> surname </span> : <span class="_write" name="surname" id="${arg[i]._id}">${arg[i].surname} </span></div>
            <div> <span> name </span> : <span class="_write" name="name" id="${arg[i]._id}">${arg[i].name} </span></div>
            <div> <span> middleName </span> : <span class="_write" name="middleName" id="${arg[i]._id}">${arg[i].middleName} </span></div>
            <div> <span> dateOfBirth </span> : <span class="_write" name="dateOfBirth" id="${arg[i]._id}">${arg[i].dateOfBirth} </span></div>
            <div> <span> phoneNumbers </span> : <span class="_write" name="phoneNumbers" id="${arg[i]._id}">${arg[i].phoneNumbers} </span></div>
            <div> <span> milDocNum </span> : <span class="_write" name="milDocNum" id="${arg[i]._id}">${arg[i].milDocNum} </span></div>
            <div> <span> tokenNumber </span> : <span class="_write" name="tokenNumber" id="${arg[i]._id}">${arg[i].tokenNumber} </span></div>
            <hr>
            `;
        }
    });
    document.querySelector('body').appendChild(wrapp);
};