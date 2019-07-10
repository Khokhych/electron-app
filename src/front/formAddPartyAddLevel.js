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