function chargerFichierXML() {
    const urlAPI = 'http://192.168.0.40:85/test/api/' + document.getElementById('vmix_connect').value;
    fetch(urlAPI)
        .then(response => response.text())
        .then(data => {
            if (document.getElementById('vmix_connect').value === "0") {
                // Récupérer l'élément <select> par son ID
                var selectElement = document.getElementById('vmix_connect');
                var files = JSON.parse(data);

                const outputContainer = document.getElementById('InputSourcesContainer');
                // Supprimer les éléments existants dans le conteneur de sortie
                while (outputContainer.firstChild) {
                    outputContainer.removeChild(outputContainer.firstChild);
                }
                // Ajouter les options au <select>
                // Ajouter les options au <select> uniquement si elles n'existent pas déjà
                for (var i = 0; i < files.length; i++) {
                    var fileName = files[i];

                    // Vérifier si l'option existe déjà
                    if (!optionExists(fileName)) {
                        console.log("new connection")
                        var option = document.createElement('option');
                        option.value = fileName;
                        option.textContent = fileName;
                        selectElement.appendChild(option);
                    }
                }
                // Fonction pour vérifier si une option existe déjà
                function optionExists(value) {
                    for (var i = 0; i < selectElement.options.length; i++) {
                        if (selectElement.options[i].value === value) {
                            return true;
                        }
                    }
                    return false;
                }

            } else {
                processVideoSources(data);
                processAudioBuses(data);
                processAudioSources(data);
                processPageSources(data);
            }
        })
        .catch(error => console.error('Erreur de chargement du fichier XML:', error));
}


// Charger le fichier XML et générer les éléments HTML au chargement de la page
window.onload = chargerFichierXML;
// setInterval(chargerFichierXML, 1000);