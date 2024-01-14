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

function chargerFichierXML() {


    var xhr = getHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                data = xhr.responseText;
                if (document.getElementById('vmix_connect').value === "N") {
                    console.log(data);
                    new_session(data);
                } else {
                    processVideoSources(data);
                    processAudioBuses(data);
                    processAudioSources(data);
                    processPageSources(data);
                }
            } else {
                AlertPopup(JSON.parse(xhr.responseText)['error'])
            }
        }
    }

    xhr.open('GET', "vmix.php?session_vmix=" + document.getElementById('vmix_connect').value, true) 
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send()
}

function new_session(data) {

    // Récupérer l'élément <select> par son ID
    var selectElement = document.getElementById('vmix_connect');
    var files = JSON.parse(data);

    const outputContainer = document.getElementById('InputSourcesContainer');
    // Supprimer les éléments existants dans le conteneur de sortie
    while (outputContainer.firstChild) {
        outputContainer.removeChild(outputContainer.firstChild);
    }
    // Ajouter les options au <select>
    // Ajouter les options au <select> uniquement si elles n'existent pas déjà
    for (var i = 0; i < files.length; i++) {
        var fileName = files[i];

        // Vérifier si l'option existe déjà
        if (!optionExists(fileName)) {
            console.log("new connection")
            var option = document.createElement('option');
            option.value = fileName;
            option.textContent = fileName;
            selectElement.appendChild(option);
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
// Charger le fichier XML et générer les éléments HTML au chargement de la page
window.onload = chargerFichierXML;
//setInterval(chargerFichierXML, 1000);