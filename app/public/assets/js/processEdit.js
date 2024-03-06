
function closeEdit() {
    // Get the parent div and hide it
    document.getElementById("EditContainer").classList.add("disabled");
}

function OpenEdit(HTML) {
    const ancienConteneur = document.getElementById("EditContainerContainer");
    if (ancienConteneur) {
        ancienConteneur.remove();
    }

    // Créez un nouvel élément div
    const nouveauDiv = document.createElement('div');
    nouveauDiv.className = "Container";
    nouveauDiv.id = "EditContainerContainer";
    nouveauDiv.innerHTML = `<span class="closeButton" onclick="closeEdit()">✖</span> <div class="body">${HTML}</div>`;

    document.getElementById("EditContainer").appendChild(nouveauDiv);
    document.getElementById("EditContainer").classList.remove("disabled");
}

function processPageSources_list_addItem() {
    // Créez un nouvel élément div à partir de la chaîne de caractères
    nouveauDiv = `<h1>Add Filename to List</h1>
                <div>
                    <label>absolute path</label>
                    <input type="text" id="processPageSources_list_addItem_patch" value="">
                </div>
                <button onclick="ApiVmixSend('ListAdd','${inputSelect}',document.getElementById('processPageSources_list_addItem_patch').value); closeEdit()" class="valid">Valid</button>
                <button onclick="closeEdit()" class="cancel">Cancel </button>`;
    OpenEdit(nouveauDiv);
}

function processPageSources_remove() {
    // Créez un nouvel élément div à partir de la chaîne de caractères
    nouveauDiv = `<h1>REMOVE INPUT</h1>
                <button onclick="ApiVmixSend('RemoveInput','${inputSelect}'); closeEdit()" class="valid">Valid</button>
                <button onclick="closeEdit()" class="cancel">Cancel </button>`;
    OpenEdit(nouveauDiv);
}
