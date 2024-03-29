

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}

includeHTML();

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

const badgeContainer = document.querySelector(".container");
const badgeAddList = document.querySelectorAll(".badge-add");

badgeContainer.addEventListener("click", function (e) {
	if (e.target.classList.contains("close")) {
		e.target.parentNode.remove();
	} else if (e.target.parentNode.classList.contains("close")) {
		e.target.parentNode.parentNode.remove();
	}
});

badgeAddList.forEach((badgeAdd) => {
	badgeAdd.addEventListener("keypress", function (e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			const badge = document.createElement("span");
			badge.innerHTML = this.innerHTML;
			badge.classList.add("badge", "badge-default", "badge-closable");

			if (this.dataset.badgeClass) {
				badge.classList.add(this.dataset.badgeClass);
			}

			const close = document.createElement("span");
			close.classList.add("close");

			const icon = document.createElement("i");
			icon.classList.add("fa", "fa-times");

			close.appendChild(icon);
			badge.appendChild(close);

			this.parentNode.insertBefore(badge, this);
			this.innerHTML = "";
		}
	});
});
