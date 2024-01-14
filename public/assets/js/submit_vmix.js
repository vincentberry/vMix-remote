function ApiVmixSend(req) {

    req = 'http://192.168.0.40:85/test/command?' + req
    // Effectuer la requête GET
    fetch(req)
        .then(response => {
            if (!response.ok) {
                throw new Error(`La requête a échoué avec le code ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Traitez la réponse du serveur si nécessaire
            console.log('Réponse du serveur :', data);
            AlertPopup(data)
        })
        .catch(error => {
            // Gérez les erreurs ici
            console.error('Erreur lors de l\'envoi de la requête au serveur :', error.message);
        });
}

function AlertPopup(data) {
    window.alert('Commande envoyée avec succès ! Interface ce mettra à jours dans 10s Max !');
}
 