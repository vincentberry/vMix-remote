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
                } else {
                    window.location.href = '/?vmix_connect=' + document.getElementById('vmix_connect').value;
                }
            } else {
                if (JSON.parse(xhr.responseText)['error']) {
                    AlertPopup(JSON.parse(xhr.responseText)['error'])
                } else if (JSON.parse(xhr.responseText)['reset']) {
                    AlertPopup(JSON.parse(xhr.responseText)['reset'])
                    document.getElementById('vmix_connect').value = "N"
                }

            }
        }
        
    }

    xhr.open('GET', "api/connect?session_vmix=" + document.getElementById('vmix_connect').value, true)
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send()
}

function new_session(data) {

    // Récupérer l'élément <select> par son ID
    var selectElement = document.getElementById('vmix_connect');
    var files = JSON.parse(data);

    // Ajouter les options au <select>
    // Ajouter les options au <select> uniquement si elles n'existent pas déjà
    for (var i = 0; i < files.length; i++) {
        var fileId = files[i]['id'];

        // Vérifier si l'option existe déjà
        if (!optionExists(fileId)) {
            console.log("new connection")
            var option = document.createElement('option');
            option.value = fileId;
            option.textContent = files[i]['name'] + "_" + fileId;
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


// Charger le fichier XML et générer les éléments HTML au chargement de la page
window.onload = chargerFichierXML;
setInterval(chargerFichierXML, 1000);