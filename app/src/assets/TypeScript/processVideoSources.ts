function processVideoSources(xmlDoc: Document): void {

    const videoSources = xmlDoc.querySelectorAll('input');
    const container = document.getElementById('videoSourcesContainer');

    // Parcourir toutes les sources video
    videoSources.forEach(videoSource => {
        // Récupérer la clé unique de la source video
        const key = videoSource.getAttribute('key');

        // Vérifier si une source video avec la même clé existe déjà dans le conteneur
        const existingAudioSource = document.querySelector(`.video-source[data-key="${key}"]`);

        // Si la source video existe déjà, la mettre à jour
        if (existingAudioSource) {
            // Mettre à jour les informations nécessaires
            const VideoSourceHTML = getVideoSourceHTML(videoSource);
            if (existingAudioSource.innerHTML != VideoSourceHTML) {
                existingAudioSource.innerHTML = VideoSourceHTML;
            }
        } else {
            // Créer une nouvelle div pour la source video
            const newDivElement = document.createElement('div');
            newDivElement.className = 'video-source';
            newDivElement.setAttribute('data-key', key);

            // Remplir la div avec les informations
            newDivElement.innerHTML = getVideoSourceHTML(videoSource);

            // Ajouter la nouvelle div au conteneur
            container.appendChild(newDivElement);
        }
    });
}

// Fonction pour obtenir le HTML d'une source audio à partir de l'élément XML
function getVideoSourceHTML(videoSource: Element): string {
    const key = videoSource.getAttribute('key');
    const title = videoSource.getAttribute('title');
    const number = videoSource.getAttribute('number');
    const type = videoSource.getAttribute('type');
    let tally = "";
    let tallyOverlay1: string;
    let tallyOverlay2: string;
    let tallyOverlay3: string;
    let tallyOverlay4: string;

    // Ajouter la classe "preview" si le nombre correspond à previewNumber
    if (parseInt(number) === previewNumber) {
        tally = "preview";
    }
    // Ajouter la classe "program" si le nombre correspond à previewNumber
    if (parseInt(number) === activeNumber) {
        tally = 'program';
    }
    // Ajouter la classe "preview" si le nombre correspond à previewNumber
    if (parseInt(number) === activeOverlay1) {
        tallyOverlay1 = "program";
    }
    // Ajouter la classe "program" si le nombre correspond à previewNumber
    if (parseInt(number) === activeOverlay2) {
        tallyOverlay2 = 'program';
    }
    // Ajouter la classe "preview" si le nombre correspond à previewNumber
    if (parseInt(number) === activeOverlay3) {
        tallyOverlay3 = "program";
    }
    // Ajouter la classe "program" si le nombre correspond à previewNumber
    if (parseInt(number) === activeOverlay4) {
        tallyOverlay4 = 'program';
    }

    return `
    <div class="video ${tally}" onclick="ApiVmixSend('PreviewInput','${key}')">
        <h2>${number}</h2>
        <div class="type">
            <img src="./assets/icon/${type}.svg" alt="${type}">
            <h1>${title}</h1>
        </div>
    </div>
    <div class="overlay">
        <button class="${tallyOverlay1}" onclick="ApiVmixSend('OverlayInput1','${key}')">1</button>
        <button class="${tallyOverlay2}" onclick="ApiVmixSend('OverlayInput2','${key}')">2</button>
        <button class="${tallyOverlay3}" onclick="ApiVmixSend('OverlayInput3','${key}')">3</button>
        <button class="${tallyOverlay4}" onclick="ApiVmixSend('OverlayInput4','${key}')">4</button>
        <button class="menu grid_menu" onclick="OpenPageInput('${key}')"></button>
    </div>
`;
}


