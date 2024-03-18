// Fonction pour traiter les sources audio
function processAudioSources(xmlDoc: Document): void {

    const audioSources = xmlDoc.querySelectorAll('input[muted]');
    let container: HTMLElement = document.getElementById('audioSourcesContainer') as HTMLElement;

    // Parcourir toutes les sources audio
    audioSources.forEach(audioSource => {
        // Récupérer la clé unique de la source audio
        const key: string | null = audioSource.getAttribute('key');

        // Vérifier si une source audio avec la même clé existe déjà dans le conteneur
        const existingAudioSource = document.querySelector(`.audio-source[data-key="${key}"]`) as HTMLElement;

        // Si la source audio existe déjà, la mettre à jour
        if (existingAudioSource) {
            // Mettre à jour les informations nécessaires
            const AudioSourceHTML = getAudioSourceHTML(audioSource);
            if (existingAudioSource.innerHTML != AudioSourceHTML) {
                existingAudioSource.innerHTML = AudioSourceHTML;
            }
        } else if(key){
            // Créer une nouvelle div pour la source audio
            const newDivElement = document.createElement('div');
            newDivElement.className = 'audio-source';
            newDivElement.setAttribute('data-key', key);

            // Remplir la div avec les informations
            newDivElement.innerHTML = getAudioSourceHTML(audioSource);

            // Ajouter la nouvelle div au conteneur
            container.appendChild(newDivElement);
        }
    });

    // Supprimer les sources audio qui n'existent plus
    const existingAudioSources = document.querySelectorAll('.audio-source');
    existingAudioSources.forEach(existingAudioSource => {
        const key = existingAudioSource.getAttribute('data-key');
        const matchingAudioSource = xmlDoc.querySelector(`input[key="${key}"]`);
        if (!matchingAudioSource) {
            existingAudioSource.remove();
        }
    });
}

// Fonction pour obtenir le HTML d'une source audio à partir de l'élément XML
function getAudioSourceHTML(audioSource: Element): string {
    const gainDbString = audioSource.getAttribute('gainDb')|| "0";
    const volumeString = audioSource.getAttribute('volume')|| "0";
    const key = audioSource.getAttribute('key');
    const title = audioSource.getAttribute('title');
    const muted = audioSource.getAttribute('muted') === 'True';
    const volume = Math.pow(parseFloat(volumeString) * 1000000, 0.25);
    const volumeDB = 20 * Math.log10(Math.min(100, Math.max(0, parseFloat(volumeString))) / 100);
    const gainDb = parseFloat(gainDbString);
    const solo = audioSource.getAttribute('solo') === 'True';
    const audiobusses = audioSource.getAttribute('audiobusses')|| "";

    const audioBussesHTML = activatedBuses.map((activatedBus, index) => {
        let active = 'false';

        for (let i = 0; i < audiobusses.length; i++) {
            if (audiobusses[i] === activatedBus || (audiobusses[i] === "M" && activatedBus === "master")) {
                active = 'true';
            }
        }

        if (activatedBus === "master") {
            return `<p class="bus ${active}" onclick="ApiVmixSend('AudioBus','${key}', 'M')">M</p>`;
        } else {
            return `<p class="bus ${active}" onclick="ApiVmixSend('AudioBus','${key}','${activatedBus}')">${activatedBus}</p>`;
        }
    }).join('');

    return `
                    <h2>${title}</h2>
                    <div class="master">
                        <div class="button">
                            <p class="muted ${muted}" onclick="ApiVmixSend('Audio', '${key}')"></p>
                            <p class="solo ${solo}" onclick="ApiVmixSend('Solo', '${key}')">S</p>
                            ${audioBussesHTML}
                        </div>
                        <div class="containerRange">
                            <div class="range">
                                <label>volume</label>
                                <input type="range" id="volume-${key}" value="${volume}" min="0" max="100" step="1" onclick="ApiVmixSend('SetVolume','${key}',this.value)" onmouseover="showVolume('volume-${key}')" onmouseout="hideTooltip('volume-${key}')">
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
                        <div class="containerRange">
                            <div class="range">
                                 <label>gain</label>
                                <input type="range" id="gainDb-${key}" value="${gainDb}" min="0" max="24" step="1" onclick="ApiVmixSend('SetGain','${key}',this.value)" onmouseover="showGainDb('gainDb-${key}')" onmouseout="hideTooltip('gainDb-${key}')">
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