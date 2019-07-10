;
(function () {
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