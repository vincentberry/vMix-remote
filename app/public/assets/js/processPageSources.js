// Fonction pour convertir le XML en HTML et l'ajouter à la page
function processPageSources(xmlDoc) {
    if (inputSelect) {
        const input = xmlDoc.querySelector(`input[key="${inputSelect}"]`);

        // Obtenir les attributs de l'élément <input>
        const key = input.getAttribute('key');
        const number = input.getAttribute('number');
        const type = input.getAttribute('type');
        const title = input.getAttribute('title');
        const shortTitle = input.getAttribute('shortTitle');
        const state = input.getAttribute('state');
        const position = input.getAttribute('position');
        const duration = input.getAttribute('duration');
        const loop = input.getAttribute('loop')
        const muted = input.getAttribute('muted');
        const volume = input.getAttribute('volume');
        const balance = input.getAttribute('balance');
        const solo = input.getAttribute('solo');
        const soloPFL = input.getAttribute('soloPFL');
        const audiobusses = input.getAttribute('audiobusses');
        const meterF1 = input.getAttribute('meterF1');
        const meterF2 = input.getAttribute('meterF2');
        const gainDb = input.getAttribute('gainDb');
        const selectedIndex = input.getAttribute('selectedIndex');

        // Obtenir le texte de l'élément <input>
        const inputText = input.textContent.trim();

        // Obtenir l'élément <list> et son contenu
        if (input.querySelector('list')) {
            const listElement = input.querySelector('list');
            const listItems = Array.from(listElement.querySelectorAll('item')).map(item => ({
                selected: item.getAttribute('selected') === 'true',
                value: item.textContent.trim(),
                enabled: (item.getAttribute('enabled') !== null && item.getAttribute('enabled') !== '') ? item.getAttribute('enabled') : 'checked'
            }));
            const inputContainer_content_list_ul = document.getElementById('inputContainer_content_list_ul');
            updateValue(inputContainer_content_list_ul, processPageSources_updateList(listItems), "");
        } else {
            document.getElementById('inputContainer_nav_list').style.display = "none"
        }

        // Supposons également que vous avez déjà obtenu la référence aux éléments HTML du formulaire
        const inputContainer_InputId = document.getElementById('inputContainer_InputId');
        const inputContainer_InputType = document.querySelector('h1[for="inputContainer_InputType"]');
        const inputContainer_InputName = document.getElementById('inputContainer_InputName');
        const inputContainer_InputLoop = document.getElementById('inputContainer_InputLoop');

        // Fonction pour mettre à jour une valeur si elle est différente et non vide
        function updateValue(element, attribute, defaultValue) {
            const attributeValue = attribute.trim();
            const currentValue = element.value || element.title || element.innerHTML || element.checked.toString();

            if (attributeValue !== "" && attributeValue !== currentValue) {
                element.value = element.title = element.innerHTML = attributeValue;
                if (element.type === 'checkbox') {
                    element.checked = (defaultValue.toLowerCase() === 'true');
                }
            } else if (attributeValue === "" && defaultValue !== undefined) {
                // Mettre la valeur par défaut si l'attribut est vide
                element.value = element.title = element.innerHTML = defaultValue;
                if (element.type === 'checkbox') {
                    element.checked = (defaultValue.toLowerCase() === 'true');
                }
            }
        }

        // Utilisation de la fonction pour mettre à jour les éléments
        updateValue(inputContainer_InputId, key);
        updateValue(inputContainer_InputType, type);
        updateValue(inputContainer_InputName, shortTitle, "");
        updateValue(inputContainer_InputLoop, loop, "Off");


        document.getElementById("inputContainer_header").innerHTML = `Input ${number}: ${document.getElementById("inputContainer_InputName").value}`;
    }
};

function closePageInput(key) {
    // Get the parent div and hide it
    insputSelect = "";
    document.getElementById("inputsContainer").classList.add("none");
}

function OpenPageInput(key) {
    // Get the parent div and hide it
    inputSelect = key;
    document.getElementById("inputsContainer").classList.remove("none");

}

function processPageSources_updateList(listItems) {
    // Utiliser la méthode map pour créer un tableau de chaînes HTML
    const htmlListItems = listItems.map((item) => `
        <li class="${item.selected ? 'select' : ''}">
            <input type="checkbox" ${item.enabled}>
            <label>${item.value} ${item.enabled}</label>
        </li>
    `);

    // Joindre les chaînes HTML pour obtenir une seule chaîne
    const htmlString = htmlListItems.join('');

    return htmlString;
}

function changeMenu(menuName) {
    // Liste des menus et de leurs correspondances avec les IDs des éléments HTML
    const menuMapping = {
        'general': 'general',
        'list': 'list',
        'color_correction': 'color_correction',
        'layers': 'layers'
    };

    // Réinitialiser toutes les classes à une chaîne vide
    for (const id in menuMapping) {
        document.getElementById('inputContainer_nav_' + menuMapping[id]).className = '';
        document.getElementById('inputContainer_content_' + menuMapping[id]).style.display = "none";
    }

    // Définir la classe "active" sur l'élément correspondant au menu sélectionné
    document.getElementById('inputContainer_nav_' + menuMapping[menuName]).className = 'active';
    document.getElementById('inputContainer_content_' + menuMapping[menuName]).style.display = "";

}