let inputContainer_InputName_No_Focus: boolean = true;
let inputContainer_LayersSelect_No_Focus: boolean = true;
let PageSources_LayersSelect: string = "0";
let PageSources_GtSelect: number = 0;
let clickCount_closePageInput: boolean = false;

// Fonction pour convertir le XML en HTML et l'ajouter à la page
function processPageSources(xmlDoc: Document) {
    
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
        const loop = input.getAttribute('loop');
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
            let allItems: { index: string, name: string, type: string, value: string }[] = [];
            if (input.querySelector('text')) {
                const TextItems = Array.from(input.querySelectorAll('text')).map(item => ({
                    index: item.getAttribute('index')!,
                    name: item.getAttribute('name')!,
                    type: "Text",
                    value: item.textContent!.trim()
                }));
                allItems = allItems.concat(TextItems);
            }
            if (input.querySelector('image')) {
                const ImageItems = Array.from(input.querySelectorAll('image')).map(item => ({
                    index: item.getAttribute('index')!,
                    name: item.getAttribute('name')!,
                    type: "Image",
                    value: item.textContent!.trim().replace(/^file:\/\/\//, '')
                }));
                allItems = allItems.concat(ImageItems);
            }
            if (input.querySelector('color')) {
                const ColorItems = Array.from(input.querySelectorAll('color')).map(item => ({
                    index: item.getAttribute('index')!,
                    name: item.getAttribute('name')!,
                    type: "Color",
                    value: item.textContent!.trim()
                }));
                allItems = allItems.concat(ColorItems);
            }
            const inputContainer_content_gt_nav = document.getElementById('inputContainer_content_gt_nav');
            updateValue(inputContainer_content_gt_nav, processPageSources_updateGT_nav(allItems), "");
            const inputContainer_content_gt_value = document.getElementById('inputContainer_content_gt_value');
            updateValue(inputContainer_content_gt_value, processPageSources_updateGT_text(allItems), "");
            document.getElementById('inputContainer_nav_gt')!.style.display = "";
        } else {
            document.getElementById('inputContainer_nav_gt')!.style.display = "none";
        }

        // Obtenir l'élément <list> et son contenu
        if (input.querySelector('list')) {
            const listElement = input.querySelector('list')!;
            const listItems = Array.from(listElement.querySelectorAll('item')).map(item => ({
                selected: item.getAttribute('selected') === 'true',
                value: item.textContent!.trim(),
                enabled: (item.getAttribute('enabled') !== null && item.getAttribute('enabled') !== '') ? item.getAttribute('enabled')! : 'checked'
            }));
            const inputContainer_content_list_ul = document.getElementById('inputContainer_content_list_ul');
            updateValue(inputContainer_content_list_ul!, processPageSources_updateList(listItems), "");
            document.getElementById('inputContainer_nav_list')!.style.display = "";
        } else {
            document.getElementById('inputContainer_nav_list')!.style.display = "none";
        }

        processPageSources_updateLayers(input);
        processPageSources_updateInput_layers(xmlDoc);

        // Supposons également que vous avez déjà obtenu la référence aux éléments HTML du formulaire
        const inputContainer_InputId = document.getElementById('inputContainer_InputId') as HTMLInputElement;
        const inputContainer_InputType = document.querySelector('h1[for="inputContainer_InputType"]') as HTMLInputElement;
        const inputContainer_InputName = document.getElementById('inputContainer_InputName') as HTMLInputElement;
        const inputContainer_InputLoop = document.getElementById('inputContainer_InputLoop') as HTMLInputElement;

        // Fonction pour mettre à jour une valeur si elle est différente et non vide
        function updateValue(element: HTMLElement, attribute: string, defaultValue: string | null = null) {
            const attributeValue = attribute.trim();
            if (element && ((element as HTMLInputElement).value || element.innerHTML || ( (element as HTMLInputElement).checked !== undefined &&  (element as HTMLInputElement).checked.toString()))) {  
                const currentValue = (element as HTMLInputElement).value || element.innerHTML || (element as HTMLInputElement).checked.toString();
                if (attributeValue !== "" && attributeValue !== currentValue) {
                    (element as HTMLInputElement).value = element.innerHTML = attributeValue;
                    if ((element as HTMLInputElement).type === 'checkbox') {
                        (element as HTMLInputElement).checked = (defaultValue.toLowerCase() === 'true');
                    }
                } else if (attributeValue === "" && defaultValue !== undefined) {
                    // Mettre la valeur par défaut si l'attribut est vide
                    (element as HTMLInputElement).value = element.innerHTML = defaultValue;
                    if ((element as HTMLInputElement).type === 'checkbox') {
                        (element as HTMLInputElement).checked = (defaultValue.toLowerCase() === 'true');
                    }
                }
            }
        }

        // Utilisation de la fonction pour mettre à jour les éléments
        updateValue(inputContainer_InputId, key);
        updateValue(inputContainer_InputType, type);
        if (inputContainer_InputName_No_Focus) {
            updateValue(inputContainer_InputName, shortTitle);
        }
        updateValue(inputContainer_InputLoop, loop, "Off");

        const inputContainer_header = `Input ${number}: ${inputContainer_InputName.value}`;
        if (document.getElementById("inputContainer_header")!.innerHTML !== inputContainer_header) {
            document.getElementById("inputContainer_header")!.innerHTML = inputContainer_header;
        }

    }
}

function closePageInput(key: string) {
    // Get the parent div and hide it
    inputSelect = "";
    PageSources_GtSelect = 0;
    clickCount_closePageInput = false;
    document.getElementById("inputsContainer")!.classList.add("disabled");
}

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('inputsContainer_Container');
    function closePageInput_handleDocumentClick(event: MouseEvent) {
        // Vérifier si l'élément cliqué est en dehors de la popup
        if (!popup!.contains(event.target as Node) && !document.getElementById('inputsContainer')!.classList.contains('disabled')) {
            if (clickCount_closePageInput === true){
                closePageInput("");
            }
            clickCount_closePageInput = false;
        }
    }
      // Fermer la popup lors du clic à l'extérieur de la popup
      document.addEventListener('click', closePageInput_handleDocumentClick);
});

function OpenPageInput(key: string) {
    // Get the parent div and hide it
    inputSelect = key;
    clickCount_closePageInput = false;
    processPageSources(XmlFile); // Vous devez définir XmlFile
    processPageSources_updateInput_layers(XmlFile); // Vous devez définir XmlFile
    changeMenu('general');
    document.getElementById("inputsContainer").classList.remove("disabled");
}

function processPageSources_updateList(listItems: { selected: boolean, value: string, enabled: string }[]) {
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

function processPageSources_updateGT_nav(textItems: { index: string, name: string, type: string, value: string }[]) {
    // Utiliser la méthode map pour créer un tableau de chaînes HTML
    const htmlTextItems = textItems.map((item, index) => `
        <li  id="gt_nav_${index}" class="gt_nav ${(PageSources_GtSelect).toString() === (index).toString()  ? 'active' : ''}" onclick="processPageSources_updateGT_nav_select(this, '${index}')">
            <h3>${item.name}</h3>
        </li>
    `);
    // Joindre les chaînes HTML pour obtenir une seule chaîne
    const htmlString = htmlTextItems.join('');

    return htmlString;
}

function processPageSources_updateGT_text(textItems: { index: string, name: string, type: string, value: string }[]){
    // Utiliser la méthode map pour créer un tableau de chaînes HTML
    const htmlTextItems = textItems.map((item, index) => `
        <div id="gt_text_${index}" class="gt_text ${(PageSources_GtSelect).toString() === (index).toString()  ? 'active' : ''}">
            <textarea type="text" value="${item.value}" onblur="ApiVmixSend('Set${item.type}','${inputSelect}', this.value, '','${item.name}', '${index}')">${item.value}</textarea>
            <div class="bottum">
            ${
                item.type === "Text" ?
                `
                <div class="color">
                    <h4>Color</h4>
                    <input class="input_color" placeholder="#xxxxxx" type="color" pattern="^#([A-Fa-f0-9]{6})$" onblur="ApiVmixSend('SetTextColour','${inputSelect}', this.value, '','${item.name}', '${index}')">
                    <h4>Ticker Speed</h4>
                    <input class="input_color" placeholder="0-100" type="number" pattern="^([0-9]{3})$" onblur="ApiVmixSend('SetTickerSpeed','${inputSelect}', this.value, '','${item.name}', '${index}')">
                </div>
                <div class="countdown">
                    <h4>Countdown</h4>
                    <button class="play" onclick="ApiVmixSend('StartCountdown','${inputSelect}','', '','${item.name}', '${index}')"></button>
                    <button class="pause" onclick="ApiVmixSend('PauseCountdown','${inputSelect}','', '','${item.name}', '${index}')"></button>
                    <button class="reset" onclick="ApiVmixSend('StopCountdown','${inputSelect}','', '','${item.name}', '${index}')"></button>
                    <button onclick="processPageSources_gt_countdown_settings('${item.name}', '${index}')">Settings</button>
                </div>
                `
                : ''
            }
        </div>
    </div>
    `);
    // Joindre les chaînes HTML pour obtenir une seule chaîne
    const htmlString = htmlTextItems.join('');
   
    return htmlString;
}

function processPageSources_updateGT_nav_select(element: HTMLElement, index: string) {
    PageSources_GtSelect = parseInt(index);
    document.getElementById("gt_nav_"+ index)!.classList.remove('active');
    
    // Retirer la classe "active" de tous les éléments <li>
    const allNavItems = document.querySelectorAll('.gt_nav');
    allNavItems.forEach(navItem => navItem.classList.remove('active'));

    // Ajouter la classe "active" à l'élément <li> cliqué
    element.classList.add('active');
    // Mettre à jour le textarea correspondant avec les données de l'item
    const allTextItems = document.querySelectorAll('.gt_text');
    allTextItems.forEach(navItem => navItem.classList.remove('active'));

    document.getElementById('gt_text_'+index)!.classList.add('active');
}

function processPageSources_updateLayers(inputSource: Element) {
    for (let i = 0; i <= 9; i++) {
        if (inputSource) {
            const overlays = inputSource.querySelectorAll('overlay');
            overlays.forEach(overlay => {
                const overlayIndex = overlay.getAttribute('index');
                const overlayKey = overlay.getAttribute('key');
                (document.getElementById('inputContainer_List_Layers_' + overlayIndex) as HTMLInputElement).value = overlayKey!;
                (document.getElementById('inputContainer_List_Layers_' + i) as HTMLInputElement).value = "";
                (document.getElementById('inputContainer_Content_Layers_Select') as HTMLInputElement).textContent = "Layer " + (parseInt(PageSources_LayersSelect) + 1).toString();
                if (PageSources_LayersSelect === overlayIndex && inputContainer_LayersSelect_No_Focus) {
                    const positionElement = overlay.getElementsByTagName('position')[0];
                    if (positionElement) {
                        (document.getElementById('inputContainer_Content_Layers_Select_move_X') as HTMLInputElement).value = positionElement.getAttribute('X')!;
                        (document.getElementById('inputContainer_Content_Layers_Select_move_Y') as HTMLInputElement).value = positionElement.getAttribute('Y')!;
                        (document.getElementById('inputContainer_Content_Layers_Select_move_Width') as HTMLInputElement).value = positionElement.getAttribute('width')!;
                        (document.getElementById('inputContainer_Content_Layers_Select_move_Height') as HTMLInputElement).value = positionElement.getAttribute('height')!;
                    } else {
                        (document.getElementById('inputContainer_Content_Layers_Select_move_X') as HTMLInputElement).value = "";
                        (document.getElementById('inputContainer_Content_Layers_Select_move_Y') as HTMLInputElement).value = "";
                        (document.getElementById('inputContainer_Content_Layers_Select_move_Width') as HTMLInputElement).value = "";
                        (document.getElementById('inputContainer_Content_Layers_Select_move_Height') as HTMLInputElement).value = "";
                    }
                    const cropElement = overlay.getElementsByTagName('position')[0];
                    if (cropElement) {
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_X1') as HTMLInputElement).value = cropElement.getAttribute('X1')!;
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_Y1') as HTMLInputElement).value = cropElement.getAttribute('Y1')!;
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_X2') as HTMLInputElement).value = cropElement.getAttribute('X2')!;
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_Y2') as HTMLInputElement).value = cropElement.getAttribute('Y2')!;
                    } else {
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_X1') as HTMLInputElement).value = "";
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_Y1') as HTMLInputElement).value = "";
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_X2') as HTMLInputElement).value = "";
                        (document.getElementById('inputContainer_Content_Layers_Select_crop_Y2') as HTMLInputElement).value = "";
                    }
                }
            });
        } else {
            (document.getElementById('inputContainer_content_list_' + i) as HTMLInputElement).value = ""
        }
    };
}

function changeMenu(menuName: string) {
    // Liste des menus et de leurs correspondances avec les IDs des éléments HTML
    const menuMapping: { [key: string]: string } = {
        'general': 'general',
        'list': 'list',
        'color_correction': 'color_correction',
        'layers': 'layers',
        'gt': 'gt'
    };

    // Réinitialiser toutes les classes à une chaîne vide
    for (const id in menuMapping) {
        (document.getElementById('inputContainer_nav_' + menuMapping[id]) as HTMLElement).className = '';
        (document.getElementById('inputContainer_content_' + menuMapping[id]) as HTMLElement).style.display = "none";
    }

    // Définir la classe "active" sur l'élément correspondant au menu sélectionné
    (document.getElementById('inputContainer_nav_' + menuMapping[menuName]) as HTMLElement).className = 'active';
    (document.getElementById('inputContainer_content_' + menuMapping[menuName]) as HTMLElement).style.display = "";
}

function processPageSources_updateInput_layers(xmlDoc: Document) {

    const inputSources = xmlDoc.querySelectorAll('input');

    for (let i = 0; i <= 9; i++) {
        const selectElement = document.getElementById('inputContainer_List_Layers_' + i) as HTMLSelectElement;

        if (selectElement) {
            inputSources.forEach(inputSource => {
                const key = inputSource.getAttribute('key')!;
                const title = inputSource.getAttribute('number')! + " :" + inputSource.getAttribute('title')!;

                // Check if the option already exists
                const existingOption = selectElement.querySelector('option[value="' + key + '"]');

                if (existingOption) {
                    // If the option exists, update its text
                    if (existingOption.textContent !== title) {
                        existingOption.textContent = title;
                    }
                } else {
                    // If the option does not exist, add a new option
                    const option = document.createElement('option');
                    option.value = key;
                    option.text = title;
                    selectElement.add(option);
                }
            });

            const existingKeys = Array.from(inputSources).map(inputSource => inputSource.getAttribute('key')!);
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
document.getElementById('inputContainer_InputName')?.addEventListener('focus', () => {
    inputContainer_InputName_No_Focus = false;
});

// inputContainer_InputName (Sortie)
document.getElementById('inputContainer_InputName')?.addEventListener('blur', () => {
    const inputValue = (document.getElementById('inputContainer_InputName') as HTMLInputElement)?.value;
    ApiVmixSend('SetInputName', inputSelect, inputValue);
    inputContainer_InputName_No_Focus = true;
});

// inputContainer_InputLoop
document.getElementById('inputContainer_InputLoop')?.addEventListener('click', () => {
    const inputLoopCheckbox = document.getElementById('inputContainer_InputLoop') as HTMLInputElement;
    if (inputLoopCheckbox.checked) {
        ApiVmixSend('LoopOn', inputSelect);
    } else {
        ApiVmixSend('LoopOff', inputSelect);
    }
});

// inputContainer_listShuffle
document.getElementById('inputContainer_listShuffle')?.addEventListener('click', () => {
    ApiVmixSend('ListShuffle', inputSelect);
});