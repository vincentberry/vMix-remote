// Charger le fichier JSON
fetch('api.json')
    .then(response => response.json())
    .then(data => {
        commands = data; // Assigner les données à la variable commands
        // Générer les options du menu déroulant
        const commandSelector = document.getElementById('commandSelector');
        commands.forEach(command => {
            const option = document.createElement('option');
            option.value = command.name;
            option.text = command.name;
            if (option.hasSelectedName !== 1) {
                commandSelector.appendChild(option);
            }
        });

        // Mise à jour des détails lors de la première sélection
        updateCommandDetails();
    })
    .catch(error => console.error('Error loading JSON:', error));

// Mettre à jour les détails de la commande lorsqu'une nouvelle commande est sélectionnée
function updateCommandDetails() {
    const commandSelector = document.getElementById('commandSelector');
    const selectedCommandName = commandSelector.value;
    const commandDetailsContainer = document.getElementById('commandDetails');
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
            <input type="text" id="valueInput" placeholder="Enter duration">
        `;
    }else{
        commandDetailsContainer.innerHTML += `
        <input type="text" style="display: none;" id="durationInput" placeholder="Enter duration">
    `;
    }

    commandDetailsContainer.innerHTML += `<p>Notes: ${selectedCommand.notes}</p>`;
}

// Fonction pour envoyer la commande
function sendCommand() {
    const commandSelector = document.getElementById('commandSelector').value;
    const inputSelector = document.getElementById('inputSelector').value;
    const valueInput = document.getElementById('valueInput').value;
    const durationInput = document.getElementById('durationInput').value;
    ApiVmixSend(commandSelector,inputSelector,valueInput,durationInput)
}
