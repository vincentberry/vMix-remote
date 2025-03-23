function ConfirmApiVmixSend(message: string, command: string, input: string = "0", value: string = "0", duration: string = "0", selectedName: string = "0", selectedIndex: string = "0", Mix: string = "0"): void {
    let result = confirm(message);
    if (result === true) {
        ApiVmixSend(command, input, value, duration, selectedName, selectedIndex, Mix);
    }
}

function ApiVmixSend(command: string, input: string = "0", value: string = "0", duration: string = "0", selectedName: string = "0", selectedIndex: string = "0", Mix: string = "0"): void {
    // Construire la requête à envoyer à vMix
    const vmixConnectElement = document.getElementById('vmix_connect') as HTMLInputElement;

    if (vmixConnectElement) {
        let queryString: string = `session_vmix=${vmixConnectElement.value}&command=${encodeURIComponent(command)}`;

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
        if (Mix !== undefined) {
            queryString += `&Mix=${encodeURIComponent(Mix)}`;
        }

        const xhr = getHttpRequest();

        if (xhr) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        createNotification('success', 'Validation successful', JSON.parse(xhr.responseText)['Valid'] + queryString);
                    } else {
                        createNotification('error', 'Error', JSON.parse(xhr.responseText)['error']);
                    }
                }
            };

            xhr.open('GET', "/api/send_command?" + queryString, true);
            xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
            xhr.send();
        } else {
            console.error('Unable to create an XMLHttpRequest instance.');
        }
    } else {
        console.error("The element with the id 'vmix_connect' was not found.");
    }
}