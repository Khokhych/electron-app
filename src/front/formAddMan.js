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