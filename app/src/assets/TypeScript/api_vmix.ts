let commands: any[]; // Type any utilisé temporairement, vous devriez définir un type spécifique pour vos données

// Charger le fichier JSON
fetch('api_vmix.json')
    .then(response => response.json())
    .then((data: any[]) => {
        commands = data; // Assigner les données à la variable commands
        // Générer les options du menu déroulant
        const commandSelector = document.getElementById('commandSelector') as HTMLSelectElement;
        const CustomTransition1 = document.getElementById('CustomTransition') as HTMLSelectElement;
       // const Transition: string
        commands.forEach(command => {
            const option = document.createElement('option');
            option.value = command.name;
            option.text = command.name;
            option.setAttribute('data-min-version', command.version);
            if (!option.selected) {
                commandSelector.appendChild(option);
                if(command.group === 'transition' && command.hasValue === 0 && command.hasMix ==="Optional"){
                    CustomTransition1.appendChild(option);
                }
            }
        });

        // Mise à jour des détails lors de la première sélection
        updateCommandDetails();
    })
    .catch(error => console.error('Error loading JSON:', error));

/**
 * Updates the command details panel in the UI based on the properties of the selected command.
 *
 * This function retrieves the current command selection from the "commandSelector" dropdown, finds the corresponding command from the global commands array, and dynamically updates the "commandDetails" container. It conditionally renders input fields for Input, Value, Duration, Selected Name, and Mix based on the command's configuration, and appends any associated notes.
 */
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
    
    if (selectedCommand.hasMix) {
        commandDetailsContainer.innerHTML += `
            <label for="valueMix">Mix :</label>
            <input type="number" id="valueMix" placeholder="Enter Mix">
        `;
    }else{
        commandDetailsContainer.innerHTML += `
        <input type="number" style="display: none;" id="valueMix" placeholder="Enter Mix">
    `;
    }

    commandDetailsContainer.innerHTML += `<p>Notes: ${selectedCommand.notes}</p>`;
}

/**
 * Filters command options based on the minimum version required.
 *
 * This function iterates over the options in both the "commandSelector" and "CustomTransition" select elements. For each option, it checks the "data-min-version" attribute and uses the `isVersionSupported` function to determine if the option is valid for the current version. Unsupported options are hidden, while valid options are displayed. Finally, the filtered options from "CustomTransition" are assigned to the global `Alltransition` variable.
 */
function filterCommandDetailsByVersion() {
    const selectElement = document.getElementById("commandSelector") as HTMLSelectElement;
    const options = selectElement.options; // Récupère toutes les options

    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const minVersion = option.getAttribute("data-min-version");
        
        if (minVersion && !isVersionSupported(minVersion)) {
            option.style.display = "none"; // Masquer l'option
        } else {
            option.style.display = ""; // Afficher l'option (par sécurité)
        }
    }
    const CustomTransition1 = document.getElementById('CustomTransition') as HTMLSelectElement;
    const optionsTransition = CustomTransition1.options; // Récupère toutes les options
    
    for (let i = 0; i < optionsTransition.length; i++) {
        const option = optionsTransition[i];
        const minVersion = option.getAttribute("data-min-version");
        
        if (minVersion && !isVersionSupported(minVersion)) {
            option.style.display = "none"; // Masquer l'option
        } else {
            option.style.display = ""; // Afficher l'option (par sécurité)
        }
    }
    Alltransition = CustomTransition1.options;
}

/**
 * Sends a command to the vMix API using values from UI input elements.
 *
 * This function gathers the command and its parameters from specific HTML elements, including the command identifier, input values, duration, and selected name.
 * If a mix value is provided, it converts the input to an integer, decrements it by one, and defaults to "0" when the field is empty or invalid.
 * The processed values are then passed to {@link ApiVmixSend} to execute the command.
 */
function sendCommand() {
    const commandSelector = (document.getElementById('commandSelector') as HTMLSelectElement).value;
    const inputSelector = (document.getElementById('inputSelector') as HTMLInputElement).value;
    const valueInput = (document.getElementById('valueInput') as HTMLInputElement).value;
    const durationInput = (document.getElementById('durationInput') as HTMLInputElement).value;
    const valueSelectedName = (document.getElementById('valueSelectedName') as HTMLInputElement).value;
    // Gestion du Mix : Soustraire 1 si une valeur valide est entrée
    const valueMixElement = document.getElementById('valueMix') as HTMLInputElement;
    const valueMix = valueMixElement && valueMixElement.value !== "" 
        ? (parseInt(valueMixElement.value, 10) - 1).toString() // Soustraire 1
        : "0"; // Valeur par défaut si le champ est vide ou non valide

    // Appeler la fonction d'envoi de l'API vMix avec les paramètres appropriés
    ApiVmixSend(commandSelector, inputSelector, valueInput, durationInput, valueSelectedName,"", valueMix);
}