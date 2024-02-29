var inputContainer_InputName_No_Focus = true;
var inputContainer_LayersSelect_No_Focus = true;
var PageSources_LayersSelect = "0";

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

      
        // Obtenir l'élément GT <text> et son contenu
        if (input.querySelector('text') || input.querySelector('image')) {
            var allItems = [];
            if (input.querySelector('text')) {
                var TextItems = Array.from(input.querySelectorAll('text')).map(item => ({
                    index: item.getAttribute('index'),
                    name: item.getAttribute('name'),
                    type: "Text",
                    value: item.textContent.trim()
                }));
                allItems = allItems.concat(TextItems);
            }
            if (input.querySelector('image')) {
                var ImageItems = Array.from(input.querySelectorAll('image')).map(item => ({
                    index: item.getAttribute('index'),
                    name: item.getAttribute('name'),
                    type: "Image",
                    value: item.textContent.trim()
                }));
                allItems = allItems.concat(ImageItems);
            }
            const inputContainer_content_text_ul = document.getElementById('inputContainer_content_text_ul');
            updateValue(inputContainer_content_text_ul, processPageSources_updateText(allItems), "");
            document.getElementById('inputContainer_nav_text').style = ""
        } else {
            document.getElementById('inputContainer_nav_text').style.display = "none"
        }

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
            document.getElementById('inputContainer_nav_list').style = ""
        } else {
            document.getElementById('inputContainer_nav_list').style.display = "none"
        }

        processPageSources_updateLayers(input)
        processPageSources_updateInput_layers(xmlDoc);

        // Supposons également que vous avez déjà obtenu la référence aux éléments HTML du formulaire
        const inputContainer_InputId = document.getElementById('inputContainer_InputId');
        const inputContainer_InputType = document.querySelector('h1[for="inputContainer_InputType"]');
        const inputContainer_InputName = document.getElementById('inputContainer_InputName');
        const inputContainer_InputLoop = document.getElementById('inputContainer_InputLoop');

        // Fonction pour mettre à jour une valeur si elle est différente et non vide
        function updateValue(element, attribute, defaultValue) {
            const attributeValue = attribute.trim();
            const currentValue = element.value || element.innerHTML || element.checked.toString();

            if (attributeValue !== "" && attributeValue !== currentValue) {
                element.value = element.innerHTML = attributeValue;
                if (element.type === 'checkbox') {
                    element.checked = (defaultValue.toLowerCase() === 'true');
                }
            } else if (attributeValue === "" && defaultValue !== undefined) {
                // Mettre la valeur par défaut si l'attribut est vide
                element.value = element.innerHTML = defaultValue;
                if (element.type === 'checkbox') {
                    element.checked = (defaultValue.toLowerCase() === 'true');
                }
            }
        }

        // Utilisation de la fonction pour mettre à jour les éléments
        updateValue(inputContainer_InputId, key);
        updateValue(inputContainer_InputType, type);
        if (inputContainer_InputName_No_Focus) {
            updateValue(inputContainer_InputName, shortTitle, "");
        }
        updateValue(inputContainer_InputLoop, loop, "Off");

        inputContainer_header = `Input ${number}: ${document.getElementById("inputContainer_InputName").value}`;
        if (document.getElementById("inputContainer_header").innerHTML !== inputContainer_header) {
            document.getElementById("inputContainer_header").innerHTML = inputContainer_header;
        }

    }
};

function closePageInput(key) {
    // Get the parent div and hide it
    insputSelect = "";
    document.getElementById("inputsContainer").classList.add("disabled");
}

function OpenPageInput(key) {
    // Get the parent div and hide it
    inputSelect = key;
    processPageSources(XmlFile);
    processPageSources_updateInput_layers(XmlFile);
    changeMenu('general');
    document.getElementById("inputsContainer").classList.remove("disabled");

}

function processPageSources_updateList(listItems) {
    // Utiliser la méthode map pour créer un tableau de chaînes HTML
    const htmlListItems = listItems.map((item, index) => `
        <li class="${item.selected ? 'select' : ''}">
            <input disabled type="checkbox" ${item.enabled}>
            <label onclick="ApiVmixSend('SelectIndex','${inputSelect}','${index + 1}')">${item.value}</label>
            <a class="Button_remove" onclick="ConfirmApiVmixSend('Are you sure you want to delete the list element? ${item.value}','ListRemove','${inputSelect}','${index + 1}')"></a>
        </li>
    `);

    // Joindre les chaînes HTML pour obtenir une seule chaîne
    const htmlString = htmlListItems.join('');

    return htmlString;
}

function processPageSources_updateText(textItems) {
    // Utiliser la méthode map pour créer un tableau de chaînes HTML
    const htmlTextItems = textItems.map((item, index) => `
        <li>
            <h3>${item.name}</h3>
            <textarea id="gt_text_${item.index}" type="text" value="${item.value}" onblur="ApiVmixSend('Set${item.type}','${inputSelect}', this.value, null,'${item.name}')">${item.value}</textarea>
        </li>
    `);

    // Joindre les chaînes HTML pour obtenir une seule chaîne
    const htmlString = htmlTextItems.join('');

    return htmlString;
}

function processPageSources_updateLayers(inputSource) {
    for (let i = 0; i <= 9; i++) {
        if (inputSource) {
            const overlays = inputSource.querySelectorAll('overlay');
            overlays.forEach(overlay => {
                const overlayIndex = overlay.getAttribute('index');
                const overlayKey = overlay.getAttribute('key');
                document.getElementById('inputContainer_List_Layers_' + overlayIndex).value = overlayKey;
                document.getElementById('inputContainer_List_Layers_' + i).value = "";
                document.getElementById('inputContainer_Content_Layers_Select').textContent = "Layer " + (parseInt(PageSources_LayersSelect) + 1).toString();
                if (PageSources_LayersSelect === overlayIndex && inputContainer_LayersSelect_No_Focus) {
                    const positionElement = overlay.getElementsByTagName('position')[0];
                    if (positionElement) {
                        document.getElementById('inputContainer_Content_Layers_Select_move_X').value = positionElement.getAttribute('X');
                        document.getElementById('inputContainer_Content_Layers_Select_move_Y').value = positionElement.getAttribute('Y');
                        document.getElementById('inputContainer_Content_Layers_Select_move_Width').value = positionElement.getAttribute('width');
                        document.getElementById('inputContainer_Content_Layers_Select_move_Height').value = positionElement.getAttribute('height');
                    } else {
                        document.getElementById('inputContainer_Content_Layers_Select_move_X').value = "";
                        document.getElementById('inputContainer_Content_Layers_Select_move_Y').value = "";
                        document.getElementById('inputContainer_Content_Layers_Select_move_Width').value = "";
                        document.getElementById('inputContainer_Content_Layers_Select_move_Height').value = "";
                    }
                    const cropElement = overlay.getElementsByTagName('position')[0];
                    if (cropElement) {
                        document.getElementById('inputContainer_Content_Layers_Select_crop_X1').value = cropElement.getAttribute('X1');
                        document.getElementById('inputContainer_Content_Layers_Select_crop_Y1').value = cropElement.getAttribute('Y1');
                        document.getElementById('inputContainer_Content_Layers_Select_crop_X2').value = cropElement.getAttribute('X2');
                        document.getElementById('inputContainer_Content_Layers_Select_crop_Y2').value = cropElement.getAttribute('Y2');
                    } else {
                        document.getElementById('inputContainer_Content_Layers_Select_crop_X1').value = "";
                        document.getElementById('inputContainer_Content_Layers_Select_crop_Y1').value = "";
                        document.getElementById('inputContainer_Content_Layers_Select_crop_X2').value = "";
                        document.getElementById('inputContainer_Content_Layers_Select_crop_Y2').value = "";
                    }
                }
            });
        } else {
            document.getElementById('inputContainer_content_list_' + i).value = ""
        }
    };
}

function changeMenu(menuName) {
    // Liste des menus et de leurs correspondances avec les IDs des éléments HTML
    const menuMapping = {
        'general': 'general',
        'list': 'list',
        'color_correction': 'color_correction',
        'layers': 'layers',
        'text': 'text'
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

function processPageSources_updateInput_layers(xmlDoc) {

    const inputSources = xmlDoc.querySelectorAll('input');

    for (let i = 0; i <= 9; i++) {
        var selectElement = document.getElementById('inputContainer_List_Layers_' + i);

        if (selectElement) {
            inputSources.forEach(inputSource => {
                var key = inputSource.getAttribute('key');
                var title = inputSource.getAttribute('number') + " :" + inputSource.getAttribute('title');

                // Check if the option already exists
                var existingOption = selectElement.querySelector('option[value="' + key + '"]');

                if (existingOption) {
                    // If the option exists, update its text
                    if (existingOption.text !== title) {
                        existingOption.text = title;
                    }
                } else {
                    // If the option does not exist, add a new option
                    var option = document.createElement('option');
                    option.value = key;
                    option.text = title;
                    selectElement.add(option);
                }
            });

            var existingKeys = Array.from(inputSources).map(inputSource => inputSource.getAttribute('key'));
            Array.from(selectElement.options).forEach(option => {
                if (option.value !== '' && !existingKeys.includes(option.value)) {
                    selectElement.remove(option.index);
                }
            });
        }
    }
}

//custom envoi vmix

// inputContainer_InputName (Entrée)
document.getElementById('inputContainer_InputName').addEventListener('focus', function () {
    inputContainer_InputName_No_Focus = false;
});

// inputContainer_InputName (sortie)
document.getElementById('inputContainer_InputName').addEventListener('blur', function () {
    var inputValue = document.getElementById('inputContainer_InputName').value;
    ApiVmixSend('SetInputName', inputSelect, inputValue);
    inputContainer_InputName_No_Focus = true;
});

// inputContainer_InputLoop
document.getElementById('inputContainer_InputLoop').addEventListener('click', function () {
    if (document.getElementById('inputContainer_InputLoop').checked) {
        ApiVmixSend('LoopOn', inputSelect);
    } else {
        ApiVmixSend('LoopOff', inputSelect);
    }
});

// inputContainer_listShuffle
document.getElementById('inputContainer_listShuffle').addEventListener('click', function () {
    ApiVmixSend('ListShuffle', inputSelect);
});