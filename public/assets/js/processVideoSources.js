// Fonction pour convertir le XML en HTML et l'ajouter à la page
function processVideoSources(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const inputs = xmlDoc.querySelectorAll('input');

    const outputContainer = document.getElementById('InputSourcesContainer');
    const previewNumber = parseInt(xmlDoc.querySelector('preview').textContent);
    const activeNumber = parseInt(xmlDoc.querySelector('active').textContent);
    document.getElementById('projetName').textContent = xmlDoc.querySelector('preset').textContent;

    updateCheckboxClass('streaming', JSON.parse(xmlDoc.querySelector('streaming').textContent.trim().toLowerCase()));
    updateCheckboxClass('recording', JSON.parse(xmlDoc.querySelector('recording').textContent.trim().toLowerCase()));
    updateCheckboxClass('external', JSON.parse(xmlDoc.querySelector('external').textContent.trim().toLowerCase()));
    updateCheckboxClass('fullscreen', JSON.parse(xmlDoc.querySelector('fullscreen').textContent.trim().toLowerCase()));


    PreviewInterfaceWeb = previewNumber;
    // Supprimer les éléments existants dans le conteneur de sortie
    while (outputContainer.firstChild) {
        outputContainer.removeChild(outputContainer.firstChild);
    }
    const overlays = xmlDoc.querySelectorAll('overlay');
    overlays.forEach(overlay => {
        const overlayNumber1 = parseInt(overlay.getAttribute('number'));

    });

    inputs.forEach(input => {
        const key = input.getAttribute('key');
        const number = input.getAttribute('number');
        const type = input.getAttribute('type');
        const title = input.getAttribute('title');

        const inputDiv = document.createElement('div');
        inputDiv.className = 'input_video';
        inputDiv.id = key;

        const videoDiv = document.createElement('div');
        videoDiv.className = 'video';

        // Ajouter la classe "preview" si le nombre correspond à previewNumber
        if (parseInt(number) === previewNumber) {
            videoDiv.classList.add('preview');
        }
        // Ajouter la classe "program" si le nombre correspond à previewNumber
        if (parseInt(number) === activeNumber) {
            videoDiv.classList.add('program');
        }
        const types = "camera";
        videoDiv.name = "input_" + number;
        videoDiv.innerHTML = `
                <h2>${number}</h2>
                <div class="type">
                    <img src="./assets/icon/${types}.svg" alt="${type}">
                    <h1>${title}</h1>
                </div>
            `;

        // Ajouter l'événement onclick
        videoDiv.onclick = function () {
            vMix_PreviewInput(key)
        };

        const overlayDiv = document.createElement('div');
        overlayDiv.className = 'overlay';

        overlays.forEach(overlay => {
            const overlayNumber = parseInt(overlay.getAttribute('number'));
            const overlayContent = overlay.textContent.trim(); // Contenu de la balise overlay

            if (overlayNumber < 5) {
                varClass = "";
                if (overlayContent === number) {
                    varClass = 'program';

                }
                if (overlay.getAttribute('preview') === 'True' && overlayContent === number) {
                    varClass = 'preview';

                }
                // Ajouter la classe "preview" aux boutons correspondant à previewNumber
                overlayDiv.innerHTML += `
                            <button
                            class="${varClass} a${overlayNumber}" style="grid-area: grid_${overlayNumber};"
                            id="overlay_${overlayNumber}_id_${key}" 
                            onclick="vMix_OverlayToggle(${overlayNumber},${number})
                            ">${overlayNumber}
                            </button>`;
            }

        });
       
        overlayDiv.innerHTML += `<button onclick="OpenPageInput('inputContainer_${ input.getAttribute('key')}')" class="menu grid_menu"></button>`;

        inputDiv.appendChild(videoDiv);
        inputDiv.appendChild(overlayDiv);

        outputContainer.appendChild(inputDiv);
    });
}

