function ConfirmApiVmixSend(message, command, input = 0, value = 0, duration = 0, selectedName = 0, selectedIndex = 0) {
    let result = confirm(message);
    if (result == true) {
        ApiVmixSend(command, input, value, duration, selectedName, selectedIndex)
    }
}

function ApiVmixSend(command, input = 0, value = 0, duration = 0, selectedName = 0, selectedIndex = 0) {

    // Construire la requête à envoyer à vMix
    let queryString = `session_vmix=${document.getElementById('vmix_connect').value}&command=${encodeURIComponent(command)}`;

    // Ajouter les paramètres d'entrée, valeur et durée s'ils sont fournis
    if (input !== undefined) {
        queryString += `&input=${encodeURIComponent(input)}`;
    }

    if (value !== undefined) {
        queryString += `&value=${encodeURIComponent(value)}`;
    }

    if (duration !== undefined) {
        queryString += `&duration=${encodeURIComponent(duration)}`;
    }

    if (selectedName !== undefined) {
        queryString += `&selectedName=${encodeURIComponent(selectedName)}`;
    }

    if (selectedIndex !== undefined) {
        queryString += `&selectedIndex=${encodeURIComponent(selectedIndex)}`;
    }
    
    var xhr = getHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                createNotification('success', 'Validation réussie', JSON.parse(xhr.responseText)['Valid'] + queryString);
            } else {               
                createNotification('error', 'Erreur', JSON.parse(xhr.responseText)['error']);
            }
        }
    }

    xhr.open('GET', "/api/send_command?" + queryString, true)
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send()
}
