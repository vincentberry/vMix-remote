let clickCount_closePageSettings: boolean = false;

// Fonction pour convertir le XML en HTML et l'ajouter à la page
function processPageSettings(xmlDoc: Document) {
    if (isVersionSupported("28")) {

        const SettingsContainer_content_general_GeneralContainer = document.getElementById('SettingsContainer_content_general_GeneralContainer');
        if (SettingsContainer_content_general_GeneralContainer) {
            updateValue(SettingsContainer_content_general_GeneralContainer, processPageSettings_updateSettings_Output(xmlDoc), "");

        }

        // Fonction pour mettre à jour une valeur si elle est différente et non vide
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

function closePageSettings() {
    // Get the parent div and hide it
    clickCount_closePageSettings = false;
    document.getElementById("SettingsContainer")!.classList.add("disabled");
}

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('SettingsContainer_Container');
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

function processPageSettings_updateSettings_Output(xmlDoc: Document): string {

    // Types pour les données des sorties
    type OutputType = "fullscreen" | "output";
    interface OutputConfig {
        type: OutputType;
        number: string;
        source: string;
        ndi: boolean;
        mix?: string;
        inputNumber?: string;
    }

    // Configuration par défaut
    const defaultOutputs: OutputConfig[] = [
        { type: "fullscreen", number: "1", source: "Output", ndi: false },
        { type: "fullscreen", number: "2", source: "Output", ndi: false },
        { type: "output", number: "1", source: "Output", ndi: false },
        { type: "output", number: "2", source: "Output", ndi: false },
        { type: "output", number: "3", source: "Output", ndi: false },
        { type: "output", number: "4", source: "Output", ndi: false },
    ];

    // Met à jour les valeurs par défaut avec celles du XML
    Array.from(xmlDoc.getElementsByTagName("output")).forEach(output => {
        const type = output.getAttribute("type") as OutputType;
        const number = output.getAttribute("number")!;
        const source = output.getAttribute("source") || "Output";
        const ndi = output.getAttribute("ndi") === "True";
        const mix = output.getAttribute("mix") || undefined;
        const inputNumber = output.getAttribute("inputNumber") || undefined;

        // Trouve et remplace les valeurs par défaut si elles existent dans le XML
        const defaultOutput = defaultOutputs.find(o => o.type === type && o.number === number);
        if (defaultOutput) {
            defaultOutput.source = source;
            defaultOutput.ndi = ndi;
            if (mix) defaultOutput.mix = mix;
            if (inputNumber) defaultOutput.inputNumber = inputNumber;
        }
    });

    // Génération des options pour le select
    function generateSelectOptions(): HTMLOptionElement[] {
        const options: HTMLOptionElement[] = [];

        // Options fixes
        ["Output", "Preview", "Multiview", "Multiview2"].forEach(text => {
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

        // Création du select de l'output avec les options
        htmlOutput += `<select id="SettingsContainer_${output.type}_${index}">`;

        // Génération des options
        const options = generateSelectOptions();
        options.forEach(option => {
            htmlOutput += `<option value="${option.value}">${option.textContent}</option>`;
        });

        // Définir la source sélectionnée en fonction des attributs source, mix, ou inputNumber
        if (output.source === "Mix" && output.mix) {
            htmlOutput += `<option value="Mix ${parseInt(output.mix) + 1}" selected>Mix ${parseInt(output.mix) + 1}</option>`;
        } else if (output.source === "Input" && output.inputNumber) {
            htmlOutput += `<option value="Input ${output.inputNumber}" selected>Input ${output.inputNumber}</option>`;
        } else {
            htmlOutput += `<option value="${output.source}" selected>${output.source}</option>`;
        }

        htmlOutput += '</select>';

        // Si l'attribut ndi est activé, ajouter le bouton NDI
        if (output.type === "output") {
            const ndiClass = output.ndi ? 'on' : 'off';
            htmlOutput += `<button class="NDI ${ndiClass}">NDI</button>`;
        }

        // Fermer la div de la liste
        htmlOutput += '</div>';
    });

    // Retourner le HTML généré
    return htmlOutput;
}

function changeMenuSettings(menuName: string) {
    // Liste des menus et de leurs correspondances avec les IDs des éléments HTML
    const menuMapping: { [key: string]: string } = {
        'general': 'general',
        'audio': 'audio',
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
//custom envoi vmix
