/**
 * Prompts the user with a confirmation dialog and sends a VMIX command if confirmed.
 *
 * If the user agrees to the prompt, this function forwards the specified command along with optional parameters
 * to ApiVmixSend for execution.
 *
 * @param message - The text displayed in the confirmation dialog.
 * @param command - The VMIX command to execute upon confirmation.
 * @param input - Optional parameter representing the input value (default is "0").
 * @param value - Optional parameter representing an additional value for the command (default is "0").
 * @param duration - Optional parameter for specifying the duration related to the command (default is "0").
 * @param selectedName - Optional parameter for the associated name (default is "0").
 * @param selectedIndex - Optional parameter for the associated index (default is "0").
 * @param Mix - Optional parameter for including mix information (default is "0").
 */
function ConfirmApiVmixSend(message: string, command: string, input: string = "0", value: string = "0", duration: string = "0", selectedName: string = "0", selectedIndex: string = "0", Mix: string = "0"): void {
    let result = confirm(message);
    if (result === true) {
        ApiVmixSend(command, input, value, duration, selectedName, selectedIndex, Mix);
    }
}

/**
 * Sends a command to the vMix API using an HTTP GET request.
 *
 * This function retrieves the vMix session value from the HTML element with the ID "vmix_connect"
 * and builds a query string by encoding the provided command and optional parameters: input, value,
 * duration, selected name, selected index, and Mix. It then sends the request to the "/api/send_command"
 * endpoint. On a successful response, a success notification is displayed; on error, an error notification
 * is shown. If the "vmix_connect" element is not found or an XMLHttpRequest instance cannot be created,
 * an error is logged to the console.
 *
 * @param command - The vMix command to be executed.
 * @param input - Optional input parameter (default: "0").
 * @param value - Optional value parameter (default: "0").
 * @param duration - Optional duration parameter (default: "0").
 * @param selectedName - Optional selected name parameter (default: "0").
 * @param selectedIndex - Optional selected index parameter (default: "0").
 * @param Mix - Optional Mix parameter (default: "0").
 */
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