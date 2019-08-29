;
(function () {
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
}());
;
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
;
(function () {
	try {
		const form_add_party_submit = document.querySelector('#form_add_party_submit');
		form_add_party_submit.addEventListener('click', function () {
			var arg = {};
			let values = [];
			const form_add_party_submit = document.querySelectorAll('.form_add_party .form_add_party_input');
			for (let i = 0; i < form_add_party_submit.length; i++) {
				values.push({
						name: form_add_party_submit[i].value,
						level: form_add_party_submit[i].getAttribute('level'),
					}

				);
			}
			arg.values = values;
			ipcRenderer.send("form_add_party_submit", arg);
		});
	} catch (e) {};
}());
const ipcRenderer = require('electron').ipcRenderer;
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
// myConsole.log(1);
const path = require('path');
;
(function () { // render database
	window.onload = function () {
		ipcRenderer.send('asynchronous-message', 'ping');
		var wrapp = document.createElement('div');
		ipcRenderer.on('asynchronous-reply', (event, arg) => {
			for (let i = 0; i < arg.length; i++) {
				wrapp.innerHTML = wrapp.innerHTML + `
                <div> <span> rank </span> : <div><span class="_write" name="rank" id="${arg[i]._id}">${arg[i].rank} </span></div></div>
                <div> <span> surname </span> : <div><span class="_write" name="surname" id="${arg[i]._id}">${arg[i].surname} </span></div></div>
                <div> <span> name </span> : <div><span class="_write" name="name" id="${arg[i]._id}">${arg[i].name} </span></div></div>
                <div> <span> middleName </span> : <div><span class="_write" name="middleName" id="${arg[i]._id}">${arg[i].middleName} </span></div></div>
                <div> <span> dateOfBirth </span> : <div><span class="_write" name="dateOfBirth" id="${arg[i]._id}">${arg[i].dateOfBirth} </span></div></div>
                <div> <span> phoneNumbers </span> : <div><span class="_write" name="phoneNumbers" id="${arg[i]._id}">${arg[i].phoneNumbers} </span></div></div>
                <div> <span> milDocNum </span> : <div><span class="_write" name="milDocNum" id="${arg[i]._id}">${arg[i].milDocNum} </span></div></div>
                <div> <span> tokenNumber </span> : <div><span class="_write" name="tokenNumber" id="${arg[i]._id}">${arg[i].tokenNumber} </span></div></div>
                <hr>
                `;
			}
		});
		document.querySelector('body').appendChild(wrapp);
	};
}());

;
(function () {
	let option = document.querySelector('#position');
	option.addEventListener('click', function () {
		console.log('click');
		ipcRenderer.send('clickOptionPosition', '1');
	})
}());

(function () {
	ipcRenderer.on('clickOptionPosition2', (event, arg) => {
		console.log("arg", arg);


		let wrap = document.createElement("div")
		for (let i = 0; i < arg.length; i++) {

			let unitWrap = document.createElement("div")
			unitWrap.setAttribute("_id", `${arg[i]._id}`);

			let units = arg[i].unit;

			for (let i = 0; i < units.length; i++) {

				let unit = document.createElement("div");
				unit.setAttribute("level", units[i].level);
				unit.innerHTML = units[i].name;

				unitWrap.appendChild(unit);
			}
			wrap.appendChild(unitWrap);
		};
		console.log("wrap", wrap);

		document.querySelector('.form_add_user').append(wrap);
	});
}());