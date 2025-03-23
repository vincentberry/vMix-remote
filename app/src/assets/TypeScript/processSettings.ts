/**
 * Processes an XML document to extract and apply configuration settings.
 *
 * This function parses numerical values for preview, active, and overlay elements,
 * updates the project name based on a preset element, and extracts version information
 * to update the global version state and hide unsupported features. It also updates
 * the state of checkbox UI elements for streaming, recording, external, and fullscreen
 * features based on their boolean values specified in the XML.
 *
 * @param xmlDoc - The XML document containing configuration settings.
 */
function processSettings(xmlDoc: Document): void {
    previewNumber = parseInt(xmlDoc.querySelector('preview')?.textContent || "");
    activeNumber = parseInt(xmlDoc.querySelector('active')?.textContent || "");
    activeOverlay1 = parseInt(xmlDoc.querySelector('overlay[number="1"]')?.textContent || "");
    activeOverlay2 = parseInt(xmlDoc.querySelector('overlay[number="2"]')?.textContent || "");
    activeOverlay3 = parseInt(xmlDoc.querySelector('overlay[number="3"]')?.textContent || "");
    activeOverlay4 = parseInt(xmlDoc.querySelector('overlay[number="4"]')?.textContent || "");
    const presetElement = xmlDoc.querySelector('preset');
    if (presetElement) {
        const presetElement_textContent = presetElement.textContent
        if (presetElement_textContent) {
            const projectName = presetElement_textContent.split(/[\\/]/);
            const projectNameText = projectName[projectName.length - 1].split('.')[0];
            const projectNameElement = document.getElementById('projetName');
            if (projectNameElement) {
                projectNameElement.textContent = projectNameText;
            }
        }
    }
    const versionElement = xmlDoc.querySelector("version");
    if (versionElement) {
        const versionText = versionElement.textContent || "" ;
        vMixVersion = versionText.split(".")[0];
        hideUnsupportedFeatures();
    }

    updateCheckboxClass('streaming', JSON.parse(xmlDoc.querySelector('streaming')?.textContent?.trim().toLowerCase() || "false"), xmlDoc);
    updateCheckboxClass('recording', JSON.parse(xmlDoc.querySelector('recording')?.textContent?.trim().toLowerCase() || "false"), xmlDoc);
    updateCheckboxClass('external', JSON.parse(xmlDoc.querySelector('external')?.textContent?.trim().toLowerCase() || "false"), xmlDoc);
    updateCheckboxClass('fullscreen', JSON.parse(xmlDoc.querySelector('fullscreen')?.textContent?.trim().toLowerCase() || "false"), xmlDoc);    
}

/**
 * Updates the visual state of a checkbox element and synchronizes its status based on associated XML data.
 *
 * When activated (indicated by a true flag and a provided XML document), the function adds the 'true' class to the checkbox element. 
 * It then retrieves channel or filename attributes from the XML—using "channel1" to "channel5" for a checkbox with the ID 'streaming' 
 * and "filename1" to "filename5" for a checkbox with the ID 'recording'—and updates the status for channels 1 through 5 via a call 
 * to `updateStatus`. When deactivated, the function removes the 'true' class and clears the status for all five channels.
 *
 * @param checkboxId - The ID of the checkbox element in the DOM.
 * @param className - A boolean flag indicating whether the checkbox should be marked as active.
 * @param xmlDoc - An optional XML document containing attributes for channel or filename updates.
 */
function updateCheckboxClass(checkboxId: string, className: boolean, xmlDoc: Document | null = null): void {

    if (className && xmlDoc) {
        // La case à cocher est cochée, ajouter la classe
        const checkboxElement = document.getElementById(checkboxId);
        if (checkboxElement) {
            checkboxElement.classList.add('true');

            let filename1 = "";
            let filename2 = "";
            let filename3 = "";
            let filename4 = "";
            let filename5 = "";

            const recordings = xmlDoc.getElementsByTagName(checkboxId);

            if (checkboxId === 'streaming') {
                filename1 = recordings[0].getAttribute("channel1") || "";
                filename2 = recordings[0].getAttribute("channel2") || "";
                filename3 = recordings[0].getAttribute("channel3") || "";
                filename4 = recordings[0].getAttribute("channel4") || "";
                filename5 = recordings[0].getAttribute("channel5") || "";
            }

            if (checkboxId === 'recording') {
                filename1 = recordings[0].getAttribute("filename1") || "";
                filename2 = recordings[0].getAttribute("filename2") || "";
                filename3 = recordings[0].getAttribute("filename3") || "";
                filename4 = recordings[0].getAttribute("filename4") || "";
                filename5 = recordings[0].getAttribute("filename5") || "";
            }

            updateStatus(checkboxId, filename1, '1');
            updateStatus(checkboxId, filename2, '2');
            updateStatus(checkboxId, filename3, '3');
            updateStatus(checkboxId, filename4, '4');
            updateStatus(checkboxId, filename5, '5');
        }

    } else {
        // La case à cocher n'est pas cochée, supprimer la classe
        const checkboxElement = document.getElementById(checkboxId);
        if (checkboxElement) {
            checkboxElement.classList.remove('true');

            updateStatus(checkboxId, "", '1');
            updateStatus(checkboxId, "", '2');
            updateStatus(checkboxId, "", '3');
            updateStatus(checkboxId, "", '4');
            updateStatus(checkboxId, "", '5');
        }
    }
}

function updateStatus(checkboxId: string, filename: string, index: string): void {
    const elementId = 'statut_' + checkboxId + index;
    const statusElement = document.getElementById(elementId);
    if (statusElement) {
        if (filename) {
            statusElement.classList.add('active');
        } else {
            statusElement.className = "";
        }
    }
}