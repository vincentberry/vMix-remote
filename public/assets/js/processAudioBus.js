
// Fonction pour traiter les bus audio
function processAudioBuses(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const audioBuses = xmlDoc.querySelectorAll('audio > *');

    // Récupérer le conteneur pour les bus audio
    const container = document.getElementById('audioBusesContainer');

    // Parcourir tous les bus audio
    audioBuses.forEach(audioBus => {
        // Récupérer le nom du bus audio
        const busName = audioBus.tagName;
        // Vérifier si un bus audio avec le même nom existe déjà dans le conteneur
        const existingAudioBus = document.querySelector(`.audio-bus[data-name="${busName}"]`);

        // Si le bus audio existe déjà, le mettre à jour
        if (existingAudioBus) {
            // Mettre à jour les informations nécessaires
            existingAudioBus.innerHTML = getAudioBusHTML(audioBus);
        } else {
            // Créer une nouvelle div pour le bus audio
            const newDivElement = document.createElement('div');
            newDivElement.className = 'audio-bus';
            newDivElement.setAttribute('data-name', busName);
            if (busName === "master") {
                activatedBuses.push(busName);
            } else {
                activatedBuses.push(busName.charAt(busName.length - 1));
            }


            // Remplir la div avec les informations
            newDivElement.innerHTML = getAudioBusHTML(audioBus);

            // Ajouter la nouvelle div au conteneur
            container.appendChild(newDivElement);
        }
    });

    // Supprimer les bus audio qui n'existent plus
    const existingAudioBuses = document.querySelectorAll('.audio-bus');
    existingAudioBuses.forEach(existingAudioBus => {
        const busName = existingAudioBus.getAttribute('data-name');
        const matchingAudioBus = xmlDoc.querySelector(`audio > ${busName}`);
        if (!matchingAudioBus) {
            existingAudioBus.remove();
        }
    });
}

// Fonction pour obtenir le HTML d'un bus audio à partir de l'élément XML
function getAudioBusHTML(audioBus) {
    // Adapté à votre structure XML réelle
    // Vous devrez extraire les attributs et valeurs selon votre structure exacte
    const busName = audioBus.tagName;
    const volume = parseFloat(audioBus.getAttribute('volume'));
    const muted = audioBus.getAttribute('muted') === 'True';
    const meterF1 = parseFloat(audioBus.getAttribute('meterF1'));
    const meterF2 = parseFloat(audioBus.getAttribute('meterF2'));
    const sendToMaster = audioBus.getAttribute('sendToMaster') === 'True';
    const audioBussesHTML = `<p class="bus ${busName} ${sendToMaster}">M</p>`;
    return `
                <h2>${busName}</h2>
                <div class="master">
                    <div class="button">
                        <p class="muted ${muted}" onclick="MasterAudio('${busName}')"></p>
                        ${audioBussesHTML}
                    </div>
                    <div class="range">
                        <input type="range" id="volume-${busName}" value="${volume}" min="0" max="100" step="1" onclick="vMix_SetBusVolume('${busName}')">
                        <label for="volume-${busName}">${Math.floor(volume)}%</label>
                    </div>
                </div>
            `;
}
