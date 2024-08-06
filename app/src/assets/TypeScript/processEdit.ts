function closeEdit() {
    // Obtenir le div parent et le masquer
    const editContainer = document.getElementById("EditContainer");
    if (editContainer !== null) {
        editContainer.classList.add("disabled");
    } else {
        console.error("EditContainer not found.");
    }
}

function OpenEdit(HTML: string) {
    const ancienConteneur = document.getElementById("EditContainerContainer");
    if (ancienConteneur !== null) {
        ancienConteneur.remove();
    }

    // Create a new div element
    const nouveauDiv = document.createElement('div');
    nouveauDiv.className = "Container";
    nouveauDiv.id = "EditContainerContainer";
    nouveauDiv.innerHTML = `<span class="closeButton" onclick="closeEdit()">✖</span> <div class="body">${HTML}</div>`;

    // Append the new div to the EditContainer
    const editContainer = document.getElementById("EditContainer");
    if (editContainer !== null) {
        editContainer.appendChild(nouveauDiv);
        editContainer.classList.remove("disabled");
    } else {
        console.error("EditContainer not found.");
    }
}

function processPageSources_list_addItem() {
    // Créer un nouvel élément div à partir de la chaîne de caractères
    const nouveauDiv = `<h1>Ajouter un nom de fichier à la liste</h1>
                <div>
                    <label>chemin absolu</label>
                    <input type="text" id="processPageSources_list_addItem_patch" value="">
                </div>
                <button onclick="ApiVmixSend('ListAdd','${inputSelect}',document.getElementById('processPageSources_list_addItem_patch').value); closeEdit()" class="valid">Valider</button>
                <button onclick="closeEdit()" class="cancel">Annuler</button>`;
    OpenEdit(nouveauDiv);
}

function processPageSources_gt_countdown_settings(name: string, index: string) {
    // Créer un nouvel élément div à partir de la chaîne de caractères
    const nouveauDiv = `<h1>Paramètres de compte à rebours</h1>
                <div>
                    <label>Durée</label>
                    <input type="text" id="countdown_SetCountdown" placeholder="00:00:00" pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$">
                    <button onclick="validateCountdown('SetCountdown','${name}', '${index}')">valider</button>
                </div>
                <div>
                    <label>Heure actuelle</label>
                    <input type="text" id="countdown_ChangeCountdown" placeholder="00:00:00" pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$">
                    <button onclick="validateCountdown('ChangeCountdown','${name}', '${index}')">valider</button>
                </div>
                <button onclick="closeEdit()" class="cancel">Annuler</button>`;
    OpenEdit(nouveauDiv);
}

function validateCountdown(command: string, name: string, index: string) {
    const inputElement = document.getElementById('countdown_'+ command) as HTMLElement;
    const pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    // Vérifier si la valeur d'entrée correspond au modèle
    if (pattern.test((inputElement as HTMLInputElement).value)) {
        // Effectuer l'action souhaitée (par exemple, déclencher ApiVmixSend)
        ApiVmixSend(command, inputSelect || "", (inputElement as HTMLInputElement).value, '', name, index);
    } else {
        // Avertir l'utilisateur ou gérer l'entrée invalide d'une autre manière
        alert("Entrée invalide. Veuillez saisir un format d'heure valide (HH:mm:ss).");
    }
}

function processPageSources_remove() {
    // Créer un nouvel élément div à partir de la chaîne de caractères
    const nouveauDiv = `<h1>Supprimer l'entrée</h1>
                <button onclick="ApiVmixSend('RemoveInput','${inputSelect}'); closeEdit()" class="valid">Valider</button>
                <button onclick="closeEdit()" class="cancel">Annuler</button>`;
    OpenEdit(nouveauDiv);
}