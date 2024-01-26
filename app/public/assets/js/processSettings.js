function processSettings(xmlDoc) {

    previewNumber = parseInt(xmlDoc.querySelector('preview').textContent);
    activeNumber = parseInt(xmlDoc.querySelector('active').textContent);
    activeOverlay1 = parseInt(xmlDoc.querySelector('overlay[number="1"]').textContent);
    activeOverlay2 = parseInt(xmlDoc.querySelector('overlay[number="2"]').textContent);
    activeOverlay3 = parseInt(xmlDoc.querySelector('overlay[number="3"]').textContent);
    activeOverlay4 = parseInt(xmlDoc.querySelector('overlay[number="4"]').textContent);

    if (xmlDoc.querySelector('preset')) {
        var projetName = xmlDoc.querySelector('preset').textContent.split(/[\\/]/);
        projetName = projetName[projetName.length - 1].split('.')[0];
        document.getElementById('projetName').textContent = projetName;
    }

    updateCheckboxClass('streaming', JSON.parse(xmlDoc.querySelector('streaming').textContent.trim().toLowerCase()), xmlDoc);
    updateCheckboxClass('recording', JSON.parse(xmlDoc.querySelector('recording').textContent.trim().toLowerCase()), xmlDoc);
    updateCheckboxClass('external', JSON.parse(xmlDoc.querySelector('external').textContent.trim().toLowerCase()), xmlDoc);
    updateCheckboxClass('fullscreen', JSON.parse(xmlDoc.querySelector('fullscreen').textContent.trim().toLowerCase()), xmlDoc);
}

function updateCheckboxClass(checkboxId, className, xmlDoc) {

    if (className) {
        // La case à cocher est cochée, ajouter la classe
        document.getElementById(checkboxId).classList.add('true');

        // Parcourir chaque enregistrement et ajouter une div pour chaque fichier
        let filename1 = "";
        let filename2 = "";
        let filename3 = "";

        let recordings = xmlDoc.getElementsByTagName(checkboxId);

        if (checkboxId === 'streaming') {
            filename1 = recordings[0].getAttribute("channel1");
            filename2 = recordings[0].getAttribute("channel2");
            filename3 = recordings[0].getAttribute("channel3");
        }

        if (checkboxId === 'recording') {
            filename1 = recordings[0].getAttribute("filename1");
            filename2 = recordings[0].getAttribute("filename2");
            filename3 = recordings[0].getAttribute("filename3");
        }

        updateStatus(checkboxId, filename1, '1');
        updateStatus(checkboxId, filename2, '2');
        updateStatus(checkboxId, filename3, '3');

    } else {
        // La case à cocher n'est pas cochée, supprimer la classe
        document.getElementById(checkboxId).classList.remove('true');

        updateStatus(checkboxId, "", '1');
        updateStatus(checkboxId, "", '2');
        updateStatus(checkboxId, "", '3');

    }
}

function updateStatus(checkboxId, filename, index) {
    let elementId = 'statut_' + checkboxId + index;

    if (document.getElementById(elementId) !== null) {
        if (filename) {
            document.getElementById(elementId).classList.add('active');
        } else {
            document.getElementById(elementId).className = "";
        }
    }
}
