var getHttpRequest = function () {
    var httpRequest = false;

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

    return httpRequest
}
var init = 1;
function chargerFichierXML() {

    var xhr = getHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                data = xhr.responseText;
                if (document.getElementById('vmix_connect').value === "N") {
                    new_session(data);
                    reset_session();
                    let vmix_connect_param = get_vmix_connect_param();
                    if (vmix_connect_param && init === 1) {
                        document.getElementById('vmix_connect').value = vmix_connect_param;
                        init = 0;
                    } else {
                        update_url("N");
                    }
                } else {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data, 'text/xml');
                    let vmixElement = xmlDoc.querySelector('vmix')
                    processSettings(vmixElement);
                    processVideoSources(vmixElement);
                    processAudioBuses(vmixElement);
                    processAudioSources(vmixElement);
                    processPageSources(vmixElement);
                    update_url(document.getElementById('vmix_connect').value);
                    if (xmlDoc.querySelector('session_delay').textContent === "1000") {
                        document.getElementById('fast').className = "on";
                    } else {
                        document.getElementById('fast').className = "off";
                    }
                }
            } else if( xhr.status === 301) {
                window.location.href = JSON.parse(xhr.responseText)['redirect'];
            } else {
                if (JSON.parse(xhr.responseText)['error']) {
                    AlertPopup(JSON.parse(xhr.responseText)['error'])
                } else if (JSON.parse(xhr.responseText)['reset']) {
                    AlertPopup(JSON.parse(xhr.responseText)['reset'])
                    document.getElementById('vmix_connect').value = "N"
                    update_url("N");
                }

            }
        }

    }

    xhr.open('GET', "/api/connect?session_vmix=" + document.getElementById('vmix_connect').value, true)
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send()
}

function new_session_send() {

    var xhr = getHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                new_session(xhr.responseText);
            }
        }
    }

    xhr.open('GET', "/api/connect?session_vmix=N", true)
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send()
}

function reset_session() {
    activatedBuses = [];
    id_input = "";
    previewNumber = "";
    activeNumber = "";
    activeOverlay1 = "";
    activeOverlay2 = "";
    activeOverlay3 = "";
    activeOverlay4 = "";
    document.getElementById('projetName').textContent = "";
    updateCheckboxClass('streaming', false);
    updateCheckboxClass('recording', false);
    updateCheckboxClass('external', false);
    updateCheckboxClass('fullscreen', false);

    const videoSourcesContainer = document.getElementById('videoSourcesContainer');
    // Supprimer les éléments existants dans le conteneur de sortie
    while (videoSourcesContainer.firstChild) {
        videoSourcesContainer.removeChild(videoSourcesContainer.firstChild);
    }
    const audioBusesContainer = document.getElementById('audioBusesContainer');
    // Supprimer les éléments existants dans le conteneur de sortie
    while (audioBusesContainer.firstChild) {
        audioBusesContainer.removeChild(audioBusesContainer.firstChild);
    }
    const audioSourcesContainer = document.getElementById('audioSourcesContainer');
    // Supprimer les éléments existants dans le conteneur de sortie
    while (audioSourcesContainer.firstChild) {
        audioSourcesContainer.removeChild(audioSourcesContainer.firstChild);
    }
}

function new_session(data) {

    // Récupérer l'élément <select> par son ID
    var selectElement = document.getElementById('vmix_connect');
    var files = JSON.parse(data);

    // Stocker les identifiants des options actuelles
    var currentOptions = Array.from(selectElement.options).map(option => option.value);

    for (var i = 0; i < files.length; i++) {
        var fileId = files[i]['id'];

        // Vérifier si l'option existe déjà
        if (!optionExists(fileId)) {
            console.log("new connection: " + fileId)
            var option = document.createElement('option');
            option.value = fileId;
            option.textContent = files[i]['name'] + "_" + fileId;
            selectElement.appendChild(option);
        }
    }

    // Supprimer les options qui ne sont plus présentes
    for (var i = 0; i < currentOptions.length; i++) {
        if (!files.some(file => file.id === currentOptions[i]) && currentOptions[i] != "N") {
            // L'option n'est plus présente, la supprimer
            selectElement.remove(selectElement.querySelector(`[value="${currentOptions[i]}"]`));
        }
    }

    // Fonction pour vérifier si une option existe déjà
    function optionExists(value) {
        for (var i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].value === value) {
                return true;
            }
        }
        return false;
    }

}

function update_url(paramValue) {
    let currentUrl = window.location.href;
    let paramName = 'vmix_connect';
    let regex = new RegExp(`([?&])${paramName}=.*?(&|$)`, 'i');
    let paramExists = currentUrl.match(regex);

    // Vérifiez si le paramètre existe et a une valeur différente
    if (paramExists) {
        let existingValue = currentUrl.match(regex)[0].split('=')[1];
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

function Session_delay() {
    if (document.getElementById('fast').className == "on") {
        ConfirmApiVmixSend("Are you sure you want to switch to slow mode ? Please note that processing may take some time. Wait until the icon turns red to confirm that VMix has responded to your request before proceeding with the shipment.", "session_delay", 0, "30000");
    } else {
        ConfirmApiVmixSend("Are you sure you want to switch to fast mode ? Please note that processing may take some time. Wait until the icon turns red to confirm that VMix has responded to your request before proceeding with the shipment.", "session_delay", 0, "1000");
    }

}


// Charger le fichier XML et générer les éléments HTML au chargement de la page
window.onload = chargerFichierXML;
setInterval(chargerFichierXML, 1000);