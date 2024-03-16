
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

function processPageSources_gt_countdown_settings(name, index) {
    // Créez un nouvel élément div à partir de la chaîne de caractères
    nouveauDiv = `<h1>Counrdown Settings</h1>
                <div>
                    <label>Duration</label>
                    <input type="text" id="countdown_SetCountdown" placeholder="00:00:00" pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$">
                    <button onclick="validateCountdown('SetCountdown','${name}', '${index}')">valid</button>
                </div>
                <div>
                    <label>Current Time</label>
                    <input type="text" id="countdown_ChangeCountdown" placeholder="00:00:00" pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$">
                    <button onclick="validateCountdown('ChangeCountdown','${name}', '${index}')">valid</button>
                </div>
                <button onclick="closeEdit()" class="cancel">Cancel </button>`;
    OpenEdit(nouveauDiv);
}

function validateCountdown(command ,name, index) {
    var inputElement = document.getElementById('countdown_'+ command);
    var pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    // Check if the input value matches the pattern
    if (pattern.test(inputElement.value)) {
        // Perform the desired action (e.g., trigger ApiVmixSend)
        ApiVmixSend(command, inputSelect, inputElement.value, '', name, index);
    } else {
        // Alert the user or handle the invalid input in some way
        alert("Invalid input. Please enter a valid time format (HH:mm:ss).");
    }
}

function processPageSources_remove() {
    // Créez un nouvel élément div à partir de la chaîne de caractères
    nouveauDiv = `<h1>REMOVE INPUT</h1>
                <button onclick="ApiVmixSend('RemoveInput','${inputSelect}'); closeEdit()" class="valid">Valid</button>
                <button onclick="closeEdit()" class="cancel">Cancel </button>`;
    OpenEdit(nouveauDiv);
}
