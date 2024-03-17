const getHttpRequest_lobby = (): XMLHttpRequest | false => {
    let httpRequest: XMLHttpRequest | false = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
        }
    }

    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }

    return httpRequest;
};

let init_lobby = 1;
function chargerFichierXML_lobby() {

    const xhr = getHttpRequest_lobby();
    const vmixConnect = document.getElementById('vmix_connect') as HTMLInputElement;
    if (xhr) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = xhr.responseText;
                    if (vmixConnect!.value === "N") {
                        new_session_lobby(data);
                    } else {
                        window.location.href = '/?vmix_connect=' + vmixConnect!.value;
                    }
                } else {
                    if (JSON.parse(xhr.responseText)['error']) {
                        createNotification('error', 'Erreur', JSON.parse(xhr.responseText)['error']);
                    } else if (JSON.parse(xhr.responseText)['reset']) {
                        createNotification('warning', 'Attention', JSON.parse(xhr.responseText)['reset']);
                        vmixConnect!.value = "N";
                    }
                }
            }
        };

        xhr.open('GET', "api/connect?session_vmix=" + vmixConnect!.value, true);
        xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
        xhr.send();
    } else {
        console.error('Unable to create an XMLHttpRequest instance.');
    }
}

function new_session_lobby(data: string) {
    const selectElement = document.getElementById('vmix_connect');
    const files = JSON.parse(data);

    // Ajouter les options au <select>
    // Ajouter les options au <select> uniquement si elles n'existent pas déjà
    for (let i = 0; i < files.length; i++) {
        const fileId = files[i]['id'];

        // Vérifier si l'option existe déjà
        if (!optionExists(fileId)) {
            console.log("new connection");
            const option = document.createElement('option');
            option.value = fileId;
            option.textContent = files[i]['name'] + "_" + fileId;
            selectElement!.appendChild(option);
        }
    }

    // Fonction pour vérifier si une option existe déjà
    function optionExists(value: string) {
        const selectElement = document.getElementById('vmix_connect') as HTMLSelectElement | null;
        if (!selectElement) return false; // Vérifie que selectElement n'est pas null

        for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].value === value) {
                return true;
            }
        }
        return false;
    }
}

function get_vmix_connect_param_lobby() {
    const currentUrl = window.location.href;
    const paramName = 'vmix_connect';
    const regex = new RegExp(`[?&]${paramName}=([^&]*)`, 'i');
    const match = currentUrl.match(regex);

    if (match) {
        // La valeur du paramètre vmix_connect existe dans l'URL
        return decodeURIComponent(match[1]);
    } else {
        // Le paramètre vmix_connect n'existe pas dans l'URL
        return null;
    }
}

// Charger le fichier XML et générer les éléments HTML au chargement de la page
window.onload = chargerFichierXML_lobby;
setInterval(chargerFichierXML_lobby, 10000);
