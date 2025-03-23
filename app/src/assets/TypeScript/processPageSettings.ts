let clickCount_closePageSettings: boolean = false;

/**
 * Converts settings from an XML document to HTML and updates the settings container.
 *
 * This function checks whether the current version supports settings updates (version "28"). If supported, it retrieves the general settings container from the DOM and updates its content using HTML generated from the provided XML document. A nested helper function ensures that the container is only updated if the new value is non-empty and differs from the current content, applying a default value or checkbox state as needed. If the version is not supported, an error message is logged.
 *
 * @param xmlDoc - The XML document containing the settings configuration.
 */
function processPageSettings(xmlDoc: Document) {
    if (isVersionSupported("28")) {

        const SettingsContainer_content_general_GeneralContainer = document.getElementById('SettingsContainer_content_general_GeneralContainer');
        if (SettingsContainer_content_general_GeneralContainer) {
            updateValue(SettingsContainer_content_general_GeneralContainer, processPageSettings_updateSettings_Output(xmlDoc), "");

        }

        /**
         * Updates an element's content and value based on a new attribute string.
         *
         * The function trims the provided attribute and compares it to the element's current content, which may be its
         * value, innerHTML, or checked state for checkbox inputs. If the trimmed attribute is non-empty and different from
         * the current content, the function updates the element's value and innerHTML. For checkbox elements, it also sets
         * the checked state using the provided default value.
         *
         * If the attribute is empty and a default value is provided, the function applies the default as the element's content,
         * and for checkboxes, updates the checked state accordingly.
         *
         * @param element - The HTML element to update.
         * @param attribute - The new value to set, trimmed of whitespace.
         * @param defaultValue - An optional default value used when the attribute is empty.
         */
        function updateValue(element: HTMLElement, attribute: string, defaultValue: string | null = null) {
            const attributeValue = attribute.trim();
            if (element && ((element as HTMLInputElement).value || element.innerHTML || ((element as HTMLInputElement).checked !== undefined && (element as HTMLInputElement).checked.toString()))) {
                const currentValue = (element as HTMLInputElement).value || element.innerHTML || (element as HTMLInputElement).checked.toString();
                if (attributeValue !== "" && attributeValue !== currentValue) {
                    (element as HTMLInputElement).value = element.innerHTML = attributeValue;
                    if ((element as HTMLInputElement).type === 'checkbox' && defaultValue) {
                        (element as HTMLInputElement).checked = (defaultValue.toLowerCase() === 'true');
                    }
                } else if (attributeValue === "" && defaultValue !== undefined) {
                    // Mettre la valeur par défaut si l'attribut est vide
                    (element as HTMLInputElement).value = element.innerHTML ?? defaultValue;

                    if ((element as HTMLInputElement).type === 'checkbox') {
                        // Use nullish coalescing operator to provide a default value
                        const defaultChecked = defaultValue ? defaultValue.toLowerCase() === 'true' : false;
                        (element as HTMLInputElement).checked = defaultChecked;
                    }
                }
            }
        }
    } else {
        // Handle the case when inputSelect is falsy
        console.error("No inputSelect provided");
    }
}

/**
 * Closes the settings interface.
 *
 * Resets the internal flag for pending settings closure and hides the settings container by
 * adding the "disabled" class to the element with ID "SettingsContainer".
 */
function closePageSettings() {
    // Get the parent div and hide it
    clickCount_closePageSettings = false;
    document.getElementById("SettingsContainer")!.classList.add("disabled");
}

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('SettingsContainer_Container');
    /**
     * Handles document click events to conditionally close the settings page.
     *
     * If the click occurs outside the popup and the settings container is active (not disabled), this
     * handler resets the click count flag and, when the flag is set, invokes the function to close
     * the page settings.
     *
     * @param event - The mouse click event.
     */
    function closePageSettings_handleDocumentClick(event: MouseEvent) {
        // Vérifier si l'élément cliqué est en dehors de la popup
        if (!popup!.contains(event.target as Node) && !document.getElementById('SettingsContainer')!.classList.contains('disabled')) {
            if (clickCount_closePageSettings === true) {
                closePageSettings();
            }
            clickCount_closePageSettings = false;
        }
    }
    // Fermer la popup lors du clic à l'extérieur de la popup
    document.addEventListener('click', closePageSettings_handleDocumentClick);
});

/**
 * Opens the page settings interface.
 *
 * Resets the settings page close flag, retrieves the settings container element, and if both the global XML file and container are available, processes the XML data to update the settings and displays the settings interface by selecting the "general" menu and removing the "disabled" class. Logs an error to the console if the required elements are missing.
 */
function OpenPageSettings() {
    // Get the parent div and hide it
    clickCount_closePageSettings = false;
    const SettingsContainer = document.getElementById("SettingsContainer");
    if (XmlFile && SettingsContainer) {
        processPageSettings(XmlFile); // Vous devez définir XmlFile
        //processPageSources_updateInput_layers(XmlFile); // Vous devez définir XmlFile
        changeMenuSettings('general');
        SettingsContainer.classList.remove("disabled");
    } else {
        console.error(`Element with ID 'SettingsContainer' or 'XmlFile' not found.`);
    }

}

/**
 * Generates HTML for the output settings interface by merging default configurations with XML data.
 *
 * The function initializes a default set of output configurations and updates these settings using
 * attributes from the provided XML document. It then builds an HTML string that renders a control for
 * each output, including a label, a select element populated with fixed options (such as "Output", "Preview",
 * "MultiView", etc.), as well as dynamic "Mix" and "Input" options. For outputs of type "output", it additionally
 * renders NDI and SRT buttons with their respective states. The onchange event of each select element is set to
 * invoke a command-specific update function.
 *
 * @param xmlDoc - An XML document containing <output> elements that override the default output settings.
 * @returns A string of HTML that represents the updated output settings controls.
 */
function processPageSettings_updateSettings_Output(xmlDoc: Document): string {

    // Types pour les données des sorties
    type OutputType = "fullscreen" | "output";
    interface OutputConfig {
        type: OutputType;
        number: string;
        source: string;
        ndi: boolean;
        srt: boolean;
        mix?: string;
        inputNumber?: string;
    }

    // Configuration par défaut
    const defaultOutputs: OutputConfig[] = [
        { type: "fullscreen", number: "1", source: "Output", ndi: false, srt: false },
        { type: "fullscreen", number: "2", source: "Output", ndi: false, srt: false },
        { type: "output", number: "1", source: "Output", ndi: false, srt: false },
        { type: "output", number: "2", source: "Output", ndi: false, srt: false },
        { type: "output", number: "3", source: "Output", ndi: false, srt: false },
        { type: "output", number: "4", source: "Output", ndi: false, srt: false },
    ];

    // Met à jour les valeurs par défaut avec celles du XML
    Array.from(xmlDoc.getElementsByTagName("output")).forEach(output => {
        const type = output.getAttribute("type") as OutputType;
        const number = output.getAttribute("number")!;
        const source = output.getAttribute("source") || "Output";
        const ndi = output.getAttribute("ndi") === "True";
        const srt = output.getAttribute("srt") === "True";
        const mix = output.getAttribute("mix") || undefined;
        const inputNumber = output.getAttribute("inputNumber") || undefined;

        // Trouve et remplace les valeurs par défaut si elles existent dans le XML
        const defaultOutput = defaultOutputs.find(o => o.type === type && o.number === number);
        if (defaultOutput) {
            defaultOutput.source = source;
            defaultOutput.ndi = ndi;
            defaultOutput.srt = srt;
            if (mix) defaultOutput.mix = mix;
            if (inputNumber) defaultOutput.inputNumber = inputNumber;
        }
    });

    // Génération des options pour le select
    function generateSelectOptions(): HTMLOptionElement[] {
        const options: HTMLOptionElement[] = [];

        // Options fixes
        ["Output", "Preview", "MultiView", "MultiView2", "Replay"].forEach(text => {
            const option = document.createElement("option");
            option.value = text;
            option.textContent = text;
            options.push(option);
        });

        // Options Mix 1 à Mix 16
        for (let i = 1; i <= 16; i++) {
            const option = document.createElement("option");
            option.value = `Mix ${i}`;
            option.textContent = `Mix ${i}`;
            options.push(option);
        }

        // Options Input 1 à Input 300
        for (let i = 1; i <= 300; i++) {
            const option = document.createElement("option");
            option.value = `Input ${i}`;
            option.textContent = `Input ${i}`;
            options.push(option);
        }

        return options;
    }

    // Accumuler le HTML dans une chaîne de caractères
    let htmlOutput = '';

    defaultOutputs.forEach((output, index) => {
        // Création du conteneur de chaque liste d'output
        htmlOutput += '<div class="list">';

        // Création du label de l'output
        htmlOutput += `<div class="Output_number"><label>${output.type.charAt(0).toUpperCase() + output.type.slice(1)} ${output.number}</label></div>`;
        let command = 'SetOutput' + (index - 1);
        if (output.type === "fullscreen"){
            command = "SetOutputFullscreen" + (index + 1);
            if(index == 0){
                command = "SetOutputFullscreen";
            }
        }
        // Création du select de l'output avec les options
        htmlOutput += `<select id="SettingsContainer_${output.type}_${index}" onchange="processPageSettings_update_Output('${command}', this)">`;

        // Génération des options
        const options = generateSelectOptions();
        options.forEach(option => {
            // Vérifier si l'option correspond à la source sélectionnée
            let isSelected = false;
            if (
                (output.source === "Mix" && output.mix && option.value === `Mix ${parseInt(output.mix) + 1}`) ||
                (output.source === "Input" && output.inputNumber && option.value === `Input ${output.inputNumber}`) ||
                (option.value === output.source)
            ) {
                isSelected = true;
            }

            // Ajouter l'option avec l'attribut `selected` si nécessaire
            htmlOutput += `<option value="${option.value}"${isSelected ? ' selected' : ''}>${option.textContent}</option>`;
        });

        htmlOutput += '</select>';

        // Si l'attribut ndi est activé, ajouter le bouton NDI
        if (output.type === "output") {
            const ndiClass = output.ndi ? 'Stop' : 'Start';
            const srtClass = output.srt ? 'Stop' : 'Start';
            htmlOutput += `<button class="NDI ${ndiClass}">NDI</button>`;
            htmlOutput += `<button class="SRT ${srtClass}" onclick="ApiVmixSend('${srtClass}SRTOutput','${parseInt(output.number) - 1}')">SRT</button>`;
        }

        // Fermer la div de la liste
        htmlOutput += '</div>';
    });

    // Retourner le HTML généré
    return htmlOutput;
}

/**
 * Activates the specified settings menu while hiding all others.
 *
 * Iterates over a predefined mapping of menu identifiers to update the navigation and content elements by clearing
 * any active states and hiding their display. The menu corresponding to the provided key is then marked as active,
 * and its content is made visible.
 *
 * @param menuName - The key identifying the menu to activate.
 */
function changeMenuSettings(menuName: string) {
    // Liste des menus et de leurs correspondances avec les IDs des éléments HTML
    const menuMapping: { [key: string]: string } = {
        'general': 'general',
    };

    // Réinitialiser toutes les classes à une chaîne vide
    for (const id in menuMapping) {
        (document.getElementById('SettingsContainer_nav_' + menuMapping[id]) as HTMLElement).className = '';
        (document.getElementById('SettingsContainer_content_' + menuMapping[id]) as HTMLElement).style.display = "none";
    }

    // Définir la classe "active" sur l'élément correspondant au menu sélectionné
    (document.getElementById('SettingsContainer_nav_' + menuMapping[menuName]) as HTMLElement).className = 'active';
    (document.getElementById('SettingsContainer_content_' + menuMapping[menuName]) as HTMLElement).style.display = "";
}
/**
 * Sends a vMix command with updated output settings based on the selected option.
 *
 * This function extracts the output configuration from the provided HTML select element. It parses
 * the selected option to determine whether it represents a "Mix" or an "Input" configuration. For
 * a "Mix" option (e.g., "Mix 10"), it calculates the mix index by subtracting one from the provided
 * number. For an "Input" option (e.g., "Input 150"), it uses the number directly. The function then
 * sends the command and the extracted parameters to vMix via the ApiVmixSend function.
 *
 * @param command - The vMix command to be sent.
 * @param selectElement - The HTML select element containing the output configuration.
 */
function processPageSettings_update_Output(command: string,selectElement: HTMLSelectElement) {
    const selectedValue = selectElement.value as string;
    if (selectedValue) {
        let input = "0"; // Par défaut, aucun numéro
        let value = selectedValue; // Par défaut, valeur brute
        let Mix = "0";

        // Vérifier et extraire les détails de la sélection
        if (selectedValue.startsWith("Mix")) {
            // Exemple : "Mix 10" -> input = "10", value = "Mix"
            const parts = selectedValue.split(" ");
            Mix = (parseInt(parts[1], 10) - 1).toString() || "0";
            value = parts[0]; // "Mix"
        } else if (selectedValue.startsWith("Input")) {
            // Exemple : "Input 150" -> input = "150", value = "Input"
            const parts = selectedValue.split(" ");
            input = parts[1] || "0";
            value = parts[0]; // "Input"
        }
        ApiVmixSend(command,input,value,"","","",Mix)
    }
}
