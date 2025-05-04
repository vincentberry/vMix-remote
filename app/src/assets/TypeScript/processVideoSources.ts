// Fonction pour traiter les sources video
function processVideoSources(xmlDoc: Document): void {

    const videoSources = xmlDoc.querySelectorAll('input');
    let container: HTMLElement = document.getElementById('videoSourcesContainer') as HTMLElement;

    if (container) {
        // Parcourir toutes les sources video
        videoSources.forEach(videoSource => {
            // Récupérer la clé unique de la source video
            let key: string | null = videoSource.getAttribute('key');

            // Vérifier si une source video avec la même clé existe déjà dans le conteneur
            const existingVideoSource = document.querySelector(`.video-source[data-key="${key}"]`) as HTMLElement;;

            // Si la source video existe déjà, la mettre à jour
            if (existingVideoSource && key) {
                // Mettre à jour les informations nécessaires
                let VideoSourceHTML = getVideoSourceHTML(videoSource);
                const title = videoSource.getAttribute('title');
                if (videoSource.getAttribute('type') == "Mix" && title && isVersionSupported("27")) {
                    const match = title.match(/Mix(\d+)/);
                    if (match && match[1]) {
                        const mixNumber = match[1]; // Numéro trouvé après "Mix"
                        VideoSourceHTML += getVideoMixSourceHTML(xmlDoc, mixNumber, key);
                    } else {
                        VideoSourceHTML += `<div class="Mix-source"><p>The input title must include the name of the mix, such as 'Mix2' or 'Mix3' or ... .</p></div>`
                    }
                }

                if (existingVideoSource.innerHTML != VideoSourceHTML) {
                    existingVideoSource.innerHTML = VideoSourceHTML;
                }
            } else if (key) {
                // Créer une nouvelle div pour la source video
                const newDivElement = document.createElement('div');
                newDivElement.className = 'video-source ' +  (isVersionSupported("27") ? videoSource.getAttribute('type') : '');
                newDivElement.setAttribute('data-key', key);

                // Remplir la div avec les informations
                newDivElement.innerHTML = getVideoSourceHTML(videoSource);
                const title = videoSource.getAttribute('title');
                if (videoSource.getAttribute('type') == "Mix" && title && isVersionSupported("27")) {
                    const match = title.match(/Mix(\d+)/);
                    if (match && match[1]) {
                        const mixNumber = match[1]; // Numéro trouvé après "Mix"
                        if (match && match[1]) {
                            newDivElement.innerHTML += getVideoMixSourceHTML(xmlDoc, mixNumber, key);
                        } else {
                            newDivElement.innerHTML += `<div class="Mix-source"><p>The input title must include the name of the mix, such as 'Mix2' or 'Mix3' or ... .</p></div>`
                        }
                    }
                }
                // Ajouter la nouvelle div au conteneur
                container.appendChild(newDivElement);
            }
        });

        // Supprimer les sources audio qui n'existent plus
        const existingVideoSources = document.querySelectorAll('.video-source');
        existingVideoSources.forEach(existingVideoSource => {
            const key = existingVideoSource.getAttribute('data-key');
            const matchingVideoSource = xmlDoc.querySelector(`input[key="${key}"]`);
            if (!matchingVideoSource) {
                existingVideoSource.remove();
            }
        });
    }
}

/**
 * Generates the HTML markup for a video source element, including tally indicators, type icon, overlay controls, and a menu button.
 *
 * The returned HTML includes interactive elements for previewing the source, activating overlays, and opening a detailed input page. The type icon image falls back to a default icon if the specified type image fails to load.
 *
 * @param videoSource - The XML element representing the video source.
 * @returns An HTML string representing the video source with controls and status indicators.
 */
function getVideoSourceHTML(videoSource: Element): string {
    const key = videoSource.getAttribute('key');
    const title = videoSource.getAttribute('title');
    const number = videoSource.getAttribute('number');
    const type = videoSource.getAttribute('type');
    let tally: string = "";
    let tallyOverlay1: string = "";
    let tallyOverlay2: string = "";
    let tallyOverlay3: string = "";
    let tallyOverlay4: string = "";

    if (number) {
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
    }

    return `
    <div class="video ${tally}" onclick="ApiVmixSend('PreviewInput','${key}')">
        <h2>${number}</h2>
        <div class="type">
            <img src="./assets/icon/${type ? type.toLowerCase() : 'default'}.svg" onerror="this.onerror=null; this.src='./assets/icon/default.svg';" alt="${type}">
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
// Fonction pour obtenir le HTML d'une source audio à partir de l'élément XML
function getVideoMixSourceHTML(xmlDoc: Document, MixNumber: string, Inputkey: string): string {
    const inputSources = xmlDoc.querySelectorAll('input');
    const mixSources = xmlDoc.querySelector(`mix[number="${MixNumber}"]`);

    const newOptions: HTMLOptionElement[] = [];
    inputSources.forEach(inputSource => {
        const key = inputSource.getAttribute('key')!;
        const title = inputSource.getAttribute('number')! + ": " + inputSource.getAttribute('title')!;
        const option = document.createElement('option');
        if (key != Inputkey) {
            option.value = key;
            option.text = title;
            option.setAttribute('data-number', inputSource.getAttribute('number')!);
            newOptions.push(option);
        }
    });

    const mixPreview = mixSources?.querySelector('preview')?.textContent || "";
    const mixActive = mixSources?.querySelector('active')?.textContent || "";

    // Générer les options en tant que HTML Program
    const optionsHTMLProgram = newOptions.map(option => {
        const isSelectedForActive = option.getAttribute('data-number') === mixActive ? ' selected=""' : '';
        return `
            <option value="${option.value}"${isSelectedForActive}>${option.text}</option>`;
    }).join('');

    // Générer les options en tant que HTML Preview
    const optionsHTMLPreview = newOptions.map(option => {
        const isSelectedForPreview = option.getAttribute('data-number') === mixPreview ? ' selected=""' : '';
        return `
            <option value="${option.value}"${isSelectedForPreview}>${option.text}</option>`;
    }).join('');

    // Convertir HTMLOptionsCollection en une chaîne HTML
    let optionsHTML = "";
    if (Alltransition){
        for (let i = 0; i < Alltransition.length; i++) {
            const option = Alltransition[i];
            optionsHTML += `<option value="${option.value}">${option.textContent}</option>`;
        }
    }

    // Retourner le HTML complet
    return `
    <div class="Mix-source">
        <div class="program">
            <label>Program</label>
            <select onchange="ApiVmixSend('ActiveInput',this.value,'','','','','${(parseInt(MixNumber, 10) - 1).toString()}')">
                <option value="0">None</option>
                ${optionsHTMLProgram}
            </select>
        </div>
        <div class="preview">
            <label>Preview</label>
            <select onchange="ApiVmixSend('PreviewInput',this.value,'','','','','${(parseInt(MixNumber, 10) - 1).toString()}')">
                <option value="0">None</option>
                ${optionsHTMLPreview}
            </select>
        </div>
    </div>
    <div class="Mix-transition overlay">
        <button onclick="ApiVmixSend('Cut','','','','','','${(parseInt(MixNumber, 10) - 1).toString()}')">CUT</button>
        <div class="custom">
            <button class="transparent" onclick="ApiVmixSend(document.getElementById('mixSelectTransition${Inputkey}').value,'','','','','','${(parseInt(MixNumber, 10) - 1).toString()}')"></button>
            <select id="mixSelectTransition${Inputkey}">
                ${optionsHTML}
            </select>
        </div>
    </div>
    `;
}