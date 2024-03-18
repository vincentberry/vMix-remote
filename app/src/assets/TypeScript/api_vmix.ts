let commands: any[]; // Type any utilisé temporairement, vous devriez définir un type spécifique pour vos données

// Charger le fichier JSON
fetch('api_vmix.json')
    .then(response => response.json())
    .then((data: any[]) => {
        commands = data; // Assigner les données à la variable commands
        // Générer les options du menu déroulant
        const commandSelector = document.getElementById('commandSelector') as HTMLSelectElement;
        commands.forEach(command => {
            const option = document.createElement('option');
            option.value = command.name;
            option.text = command.name;
            if (!option.selected) {
                commandSelector.appendChild(option);
            }
        });

        // Mise à jour des détails lors de la première sélection
        updateCommandDetails();
    })
    .catch(error => console.error('Error loading JSON:', error));

// Mettre à jour les détails de la commande lorsqu'une nouvelle commande est sélectionnée
function updateCommandDetails() {
    const commandSelector = document.getElementById('commandSelector') as HTMLSelectElement;
    const selectedCommandName = commandSelector.value;
    const commandDetailsContainer = document.getElementById('commandDetails') as HTMLElement;
    commandDetailsContainer.innerHTML = "";
    // Trouver la commande sélectionnée dans le JSON
    const selectedCommand = commands.find(command => command.name === selectedCommandName);

    if (selectedCommand.hasInput) {
        commandDetailsContainer.innerHTML += `
            <label for="inputSelector">Input:</label>
            <input type="text" id="inputSelector" placeholder="Enter Input">     
        `;
    }else{
        commandDetailsContainer.innerHTML += `
        <input type="text"  style="display: none;" id="inputSelector" placeholder="Enter Input">
    `;
    }

    if (selectedCommand.hasValue) {
        commandDetailsContainer.innerHTML += `
            <label for="valueInput">Value:</label>
            <input type="text" id="valueInput" placeholder="Enter value">
        `;
    }else{
        commandDetailsContainer.innerHTML += `
        <input type="text"  style="display: none;" id="valueInput" placeholder="Enter value">
    `;
    }

    if (selectedCommand.hasDuration) {
        commandDetailsContainer.innerHTML += `
            <label for="durationInput">Duration:</label>
            <input type="text" id="durationInput" placeholder="Enter duration">
        `;
    }else{
        commandDetailsContainer.innerHTML += `
        <input type="text" style="display: none;" id="durationInput" placeholder="Enter duration">
    `;
    }

    if (selectedCommand.hasSelectedName) {
        commandDetailsContainer.innerHTML += `
            <label for="valueSelectedName">SelectedName :</label>
            <input type="text" id="valueSelectedName" placeholder="test.text">
        `;
    }else{
        commandDetailsContainer.innerHTML += `
        <input type="text" style="display: none;" id="valueSelectedName" placeholder="test.text">
    `;
    }

    commandDetailsContainer.innerHTML += `<p>Notes: ${selectedCommand.notes}</p>`;
}

// Fonction pour envoyer la commande
function sendCommand() {
    const commandSelector = (document.getElementById('commandSelector') as HTMLSelectElement).value;
    const inputSelector = (document.getElementById('inputSelector') as HTMLInputElement).value;
    const valueInput = (document.getElementById('valueInput') as HTMLInputElement).value;
    const durationInput = (document.getElementById('durationInput') as HTMLInputElement).value;
    const valueSelectedName = (document.getElementById('valueSelectedName') as HTMLInputElement).value;
    // Appeler la fonction d'envoi de l'API vMix avec les paramètres appropriés
    ApiVmixSend(commandSelector, inputSelector, valueInput, durationInput, valueSelectedName);
}