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