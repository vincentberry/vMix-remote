function ConfirmApiVmixSend(
    message: string,
    command: string,
    input: number = 0,
    value: number = 0,
    duration: number = 0,
    selectedName: string | number = 0,
    selectedIndex: number = 0
) {
    let result: boolean = confirm(message);
    if (result == true) {
        ApiVmixSend(command, input, value, duration, selectedName, selectedIndex);
    }
}

function ApiVmixSend(
    command: string,
    input: number = 0,
    value: number = 0,
    duration: number = 0,
    selectedName: string | number = 0,
    selectedIndex: number = 0
) {
    // Construire la requête à envoyer à vMix
    let vmixConnectElement = document.getElementById('vmix_connect') as HTMLInputElement;
    if (vmixConnectElement) {
        let vmixConnectValue = vmixConnectElement.value;
        let queryString: string = `session_vmix=${vmixConnectValue}&command=${encodeURIComponent(command)}`;
        // Utilisez queryString comme vous le souhaitez




        // Ajouter les paramètres d'entrée, valeur et durée s'ils sont fournis
        if (input !== undefined) {
            queryString += `&input=${encodeURIComponent(input.toString())}`;
        }

        if (value !== undefined) {
            queryString += `&value=${encodeURIComponent(value.toString())}`;
        }

        if (duration !== undefined) {
            queryString += `&duration=${encodeURIComponent(duration.toString())}`;
        }

        if (selectedName !== undefined) {
            queryString += `&selectedName=${encodeURIComponent(selectedName.toString())}`;
        }

        if (selectedIndex !== undefined) {
            queryString += `&selectedIndex=${encodeURIComponent(selectedIndex.toString())}`;
        }

        let xhr: XMLHttpRequest | null = getHttpRequest();
        if (!xhr) return;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    createNotification('success', 'Validation réussie', JSON.parse(xhr.responseText)['Valid'] + queryString);
                } else {
                    createNotification('error', 'Erreur', JSON.parse(xhr.responseText)['error']);
                }
            }
        };

        xhr.open('GET', "/api/send_command?" + queryString, true);
        xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
        xhr.send();
    } else {
        console.log("Null vmixConnectElement")
    }
}