let vMixVersion: string
let activatedBuses: any[] = [];
let inputArray: any[] = [];
let previewNumber: number | undefined;
let inputSelect: string | null = null; // Définissez le type approprié pour inputSelect
let activeNumber: number | undefined;
let activeOverlay1: number | undefined;
let activeOverlay2: number | undefined;
let activeOverlay3: number | undefined;
let activeOverlay4: number | undefined;
let XmlFile: Document | undefined; // Définissez le type approprié pour XmlFile
let Alltransition: HTMLOptionsCollection
const getHttpRequest = (): XMLHttpRequest | false => {
    let httpRequest: XMLHttpRequest | false = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    }
    else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) { }
        }
    }

    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }

    return httpRequest;
};


let init = 1;
/**
 * Retrieves XML data from the vMix API and updates the application's session state and user interface.
 *
 * Sends an asynchronous HTTP GET request to the vMix API endpoint. When the request completes:
 * - If the response status is 200, either a new session is initiated (if the current connection mode is "N") or the returned XML is parsed to update settings, video sources, audio buses, audio sources, and page elements. It also updates session delay indicators and URL parameters, and filters commands based on the current vMix version.
 * - If the response status is 301, redirects the browser to the new URL provided in the response.
 * - For other statuses, displays error or warning notifications and may reset the session state.
 *
 * If an XMLHttpRequest instance cannot be created, an error is logged to the console.
 */
function chargerFichierXML() {

    const xhr = getHttpRequest();
    const vmixConnect = document.getElementById('vmix_connect') as HTMLInputElement | null;
    if (xhr) {
        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let data = xhr.responseText;
                    if (vmixConnect!.value === "N") {
                        new_session(data);
                        reset_session();
                        let vmix_connect_param = get_vmix_connect_param();
                        if (vmix_connect_param && init === 1) {
                            vmixConnect!.value = vmix_connect_param;
                            init = 0;
                        } else {
                            update_url("N");
                        }
                    } else {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(data, 'text/xml');
                        let vmixElement: Element | null = xmlDoc.querySelector('vmix');
                       

                        if (vmixElement) {
                            let vmixDocument: Document;
                            // Créer un nouveau document
                            vmixDocument = document.implementation.createDocument(null, null, null);

                            // Importer l'élément dans le document
                            vmixDocument.appendChild(vmixDocument.importNode(vmixElement, true));

                            processSettings(vmixDocument);
                            processVideoSources(vmixDocument);
                            processAudioBuses(vmixDocument);
                            processAudioSources(vmixDocument);
                            if(inputSelect){
                                processPageSources(vmixDocument);
                            }
                            const SettingsContainerSelect = document.getElementById('SettingsContainer');
                            if (SettingsContainerSelect && !SettingsContainerSelect.classList.contains('display:none')){
                                processPageSettings(vmixDocument);
                            }
                            XmlFile = vmixDocument;
                            
                        }
                        if (xmlDoc.querySelector('session_delay')!.textContent === "1000") {
                            document.getElementById('fast')!.className = "on";
                        } else {
                            document.getElementById('fast')!.className = "off";
                        }
                        update_url(vmixConnect!.value);
                        filterCommandDetailsByVersion();
                    }
                } else if (xhr.status === 301) {
                    window.location.href = JSON.parse(xhr.responseText)['redirect'];
                } else {
                    if (JSON.parse(xhr.responseText)['error']) {
                        createNotification('error', 'Erreur', JSON.parse(xhr.responseText)['error']);
                    } else if (JSON.parse(xhr.responseText)['reset']) {
                        createNotification('warning', 'Attention', JSON.parse(xhr.responseText)['reset']);
                        vmixConnect!.value = "N"
                        update_url("N");
                    }

                }
            }

        };
        xhr.open('GET', "/api/connect?session_vmix=" + vmixConnect!.value, true);
        xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
        xhr.send();
    } else {
        console.error('Unable to create an XMLHttpRequest instance.');
    }
}

function new_session_send() {
    const xhr = getHttpRequest();
    if (xhr) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    new_session(xhr.responseText);
                }
            }
        };

        xhr.open('GET', "/api/connect?session_vmix=N", true);
        xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
        xhr.send();
    } else {
        console.error('Unable to create an XMLHttpRequest instance.');
    }
}

function reset_session() {
    activatedBuses = [];
    inputArray = [];
    previewNumber = undefined;
    activeNumber = undefined;
    activeOverlay1 = undefined;
    activeOverlay2 = undefined;
    activeOverlay3 = undefined;
    activeOverlay4 = undefined;
    document.getElementById('projetName')!.textContent = "";
    updateCheckboxClass('streaming', false);
    updateCheckboxClass('recording', false);
    updateCheckboxClass('external', false);
    updateCheckboxClass('fullscreen', false);

    const videoSourcesContainer = document.getElementById('videoSourcesContainer');
    // Supprimer les éléments existants dans le conteneur de sortie
    while (videoSourcesContainer!.firstChild) {
        videoSourcesContainer!.removeChild(videoSourcesContainer!.firstChild);
    }
    const audioBusesContainer = document.getElementById('audioBusesContainer');
    // Supprimer les éléments existants dans le conteneur de sortie
    while (audioBusesContainer!.firstChild) {
        audioBusesContainer!.removeChild(audioBusesContainer!.firstChild);
    }
    const audioSourcesContainer = document.getElementById('audioSourcesContainer');
    // Supprimer les éléments existants dans le conteneur de sortie
    while (audioSourcesContainer!.firstChild) {
        audioSourcesContainer!.removeChild(audioSourcesContainer!.firstChild);
    }
}

function new_session(data: string) {

    // Récupérer l'élément <select> par son ID
    const selectElement = document.getElementById('vmix_connect') as HTMLSelectElement;
    const files = JSON.parse(data);

    // Stocker les identifiants des options actuelles
    const currentOptions = Array.from(selectElement.options).map(option => option.value);

    for (let i = 0; i < files.length; i++) {
        const fileId = files[i]['id'];

        // Vérifier si l'option existe déjà
        if (!optionExists(fileId)) {
            console.log("new connection: " + fileId);
            const option = document.createElement('option');
            option.value = fileId;
            option.textContent = files[i]['name'] + "_" + fileId;
            selectElement.appendChild(option);
        }
    }

    // Supprimer les options qui ne sont plus présentes
    for (let i = 0; i < currentOptions.length; i++) {
        if (!files.some((file: { id: string; }) => file.id === currentOptions[i]) && currentOptions[i] != "N") {
            // L'option n'est plus présente, la supprimer
            const optionToRemove = selectElement.querySelector(`[value="${currentOptions[i]}"]`) as HTMLOptionElement;
            if (optionToRemove) {
                const index = Array.from(selectElement.options).indexOf(optionToRemove);
                if (index !== -1) {
                    selectElement.remove(index);
                }
            }
        }
    }

    // Fonction pour vérifier si une option existe déjà
    function optionExists(value: string) {
        for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].value === value) {
                return true;
            }
        }
        return false;
    }

}

function update_url(paramValue: string) {
    let currentUrl = window.location.href;
    let paramName = 'vmix_connect';
    let regex = new RegExp(`([?&])${paramName}=.*?(&|$)`, 'i');
    let paramExists = currentUrl.match(regex);

    // Vérifiez si le paramètre existe et a une valeur différente
    if (paramExists) {
        let existingValue = currentUrl.match(regex)![0].split('=')[1];
        if (existingValue !== paramValue) {
            // Mettez à jour la valeur du paramètre existant
            let newUrl = currentUrl.replace(regex, `$1${paramName}=${paramValue}$2`);
            window.history.replaceState({}, '', newUrl);
        }
    } else {
        // Ajoutez le paramètre à l'URL s'il n'existe pas
        let separator = currentUrl.includes('?') ? '&' : '?';
        let newUrl = currentUrl + separator + `${paramName}=${paramValue}`;
        window.history.pushState({}, '', newUrl);
    }
}

function get_vmix_connect_param() {
    let currentUrl = window.location.href;
    let paramName = 'vmix_connect';
    let regex = new RegExp(`[?&]${paramName}=([^&]*)`, 'i');
    let match = currentUrl.match(regex);

    if (match) {
        // La valeur du paramètre vmix_connect existe dans l'URL
        return decodeURIComponent(match[1]);
    } else {
        // Le paramètre vmix_connect n'existe pas dans l'URL
        return null;
    }
}

/**
 * Prompts the user to confirm switching the session mode and sends the corresponding vMix command.
 *
 * Depending on whether the "fast" mode is active (determined by checking if the element with id "fast" has the class "on"), this function prompts the user to switch to slow mode with a longer processing delay (30000 ms) or to switch to fast mode with a shorter delay (1000 ms). The confirmation message advises waiting for the icon to turn red before proceeding.
 */
function Session_delay() {
    if (document.getElementById('fast')!.className == "on") {
        ConfirmApiVmixSend("Are you sure you want to switch to slow mode ? Please note that processing may take some time. Wait until the icon turns red to confirm that VMix has responded to your request before proceeding with the shipment.", "session_delay", "", "30000");
    } else {
        ConfirmApiVmixSend("Are you sure you want to switch to fast mode ? Please note that processing may take some time. Wait until the icon turns red to confirm that VMix has responded to your request before proceeding with the shipment.", "session_delay", "", "1000");
    }

}

/**
 * Determines if the current vMix version meets the required minimum.
 *
 * Compares the global vMixVersion with the provided required version by parsing both as numbers.
 *
 * @param requiredVersion - The minimum supported version as a string.
 * @returns True if the global vMixVersion is greater than or equal to the required version, false otherwise.
 */
function isVersionSupported(requiredVersion: string): boolean {
    return parseFloat(vMixVersion) >= parseFloat(requiredVersion);
}

/**
 * Hides HTML elements that require a minimum vMix version not met by the current version.
 *
 * This function searches for elements with a "data-min-version" attribute and, using
 * isVersionSupported(), determines if the current vMix version satisfies the requirement.
 * Unsupported elements are hidden by setting their display style to "none".
 */
function hideUnsupportedFeatures() {
    const elements = document.querySelectorAll('[data-min-version]');

    elements.forEach((element) => {
        const minVersion = element.getAttribute("data-min-version");
        if (minVersion && !isVersionSupported(minVersion)) {
            (element as HTMLElement).style.display = "none";
        }
    });
}

// Charger le fichier XML et générer les éléments HTML au chargement de la page
window.onload = chargerFichierXML;
setInterval(chargerFichierXML, 1000);
