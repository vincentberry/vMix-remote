// Fonction pour traiter les bus audio
function processAudioBuses(xmlDoc: Document) {
    const audioBuses = xmlDoc.querySelectorAll('audio > *');
    const container = document.getElementById('audioBusesContainer') as HTMLElement;

    // Parcourir tous les bus audio
    audioBuses.forEach(audioBus => {
        // Récupérer le nom du bus audio
        const busName = audioBus.tagName;
        // Vérifier si un bus audio avec le même nom existe déjà dans le conteneur
        const existingAudioBus = document.querySelector(`.audio-bus[data-name="${busName}"]`);

        // Si le bus audio existe déjà, le mettre à jour
        if (existingAudioBus) {
            // Mettre à jour les informations nécessaires
            const AudioBusHTML = getAudioBusHTML(audioBus);
            if (existingAudioBus.innerHTML !== AudioBusHTML) {
                existingAudioBus.innerHTML = AudioBusHTML;
            }
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
function getAudioBusHTML(audioBus: Element) {

    const meterF1String: string = audioBus.getAttribute('meterF1')|| "0";
    const meterF2String = audioBus.getAttribute('meterF2')|| "0";
    const volumeString = audioBus.getAttribute('volume')|| "0";
    // Vous devrez extraire les attributs et valeurs selon votre structure exacte
    const busName = audioBus.tagName;
    const volume = Math.pow(parseFloat(volumeString) * 1000000, 0.25);
    const volumeDB = 20 * Math.log10(Math.min(100, Math.max(0, parseFloat(volumeString))) / 100);
    const muted = audioBus.getAttribute('muted') === 'True';
    const meterF1 = parseFloat(meterF1String);
    const meterF2 = parseFloat(meterF2String);
    const sendToMaster = audioBus.getAttribute('sendToMaster') === 'True';
    let busCommand = `'BusXAudio',undefined,'${busName.charAt(busName.length - 1)}'`
    if (busName.toLowerCase() === "master") {
        busCommand = `'masterAudio'`
    }
    const audioBussesHTML = `<p class="bus ${busName} ${sendToMaster}" onclick="ApiVmixSend('BusXSendToMaster',undefined,'${busName.charAt(busName.length - 1)}')">M</p>`;
    return `
                <h2>${busName}</h2>
                <div class="master">
                    <div class="button">
                        <p class="muted ${muted}" onclick="ApiVmixSend(${busCommand})"></p>
                        ${audioBussesHTML}
                    </div>
                    <div class="containerRange">
                        <div class="range">
                            <label>volume</label>
                            <input type="range" id="volume-${busName}" value="${volume}" min="0" max="100" step="1" onclick="ApiVmixSend('Set${busName}Volume','${busName}',this.value)" onmouseover="showVolume('volume-${busName}')" onmouseout="hideTooltip('volume-${busName}')">
                            <div class="sliderticks">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
}

function showGainDb(sliderId: string) {
    var tooltip = document.getElementById('tooltip-volume') as HTMLElement;
    tooltip.classList.add('affiche');

    // Mettre à jour le tooltip lorsque le curseur se déplace
    document.addEventListener('mousemove', function (event) {
        var range = document.getElementById(sliderId) as HTMLInputElement;
        if (range) {
            var tooltipPosition = range.getBoundingClientRect();
            const volumeDB = parseFloat(range.value);
            tooltip.textContent = "+" + Math.floor(volumeDB) + " db";

            // Positionner l'info-bulle en fonction de la position de la souris
            var rect = range.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Positionner l'info-bulle
            tooltip.style.left = event.clientX + scrollLeft + 15 + 'px';
            tooltip.style.top = event.clientY + scrollTop - 10 + 'px'; // Ajuster la position verticale si nécessaire
        }
    });
}

function showVolume(sliderId: string) {
    var tooltip = document.getElementById('tooltip-volume') as HTMLElement;
    tooltip.classList.add('affiche');

    // Mettre à jour le tooltip lorsque le curseur se déplace
    document.addEventListener('mousemove', function (event) {
        var range = document.getElementById(sliderId) as HTMLInputElement;
        if (range) {
            var tooltipPosition = range.getBoundingClientRect();
            const volumeDB = 20 * Math.log10(Math.min(100, Math.max(0, parseFloat(range.value))) / 100);
            if (!isNaN(volumeDB)) {
                tooltip.textContent = Math.floor(volumeDB) + " db";
            } else {
                tooltip.textContent = "-∞ db";
            }

            // Positionner l'info-bulle en fonction de la position de la souris
            var rect = range.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Positionner l'info-bulle
            tooltip.style.left = event.clientX + scrollLeft + 15 + 'px';
            tooltip.style.top = event.clientY + scrollTop - 10 + 'px'; // Ajuster la position verticale si nécessaire
        }
    });
}

function hideTooltip(sliderId: string) {
    var tooltip = document.getElementById('tooltip-volume') as HTMLElement ;
    tooltip.classList.remove('affiche');

    // Arrêter de mettre à jour le tooltip lorsque le curseur ne survole pas le range
    document.removeEventListener('mousemove', function (event) {
        // Ne fait rien ici
    });
}