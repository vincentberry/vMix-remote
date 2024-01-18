// Fonction pour convertir le XML en HTML et l'ajouter à la page
function processPageSources(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const inputs = xmlDoc.querySelectorAll('input');

    const container = document.getElementById("inputsContainer");

    // Loop through each input and create a corresponding div
    inputs.forEach(input => {
        var inputContent = input.innerHTML;

        const div = document.createElement("div");
        div.id = "inputContainer_"+input.getAttribute('key');
        div.className = "inputContainer none";
        div.innerHTML = `
            <div class="Container">
                <span class="closeButton" onclick="closePageInput(this)">✖</span>
                <div>${ inputContent}</div>
            </div>
      
        `;
        container.appendChild(div);
    });
};

function closePageInput(button) {
    // Get the parent div and hide it
    const inputContainer = button.parentNode.parentNode;
    inputContainer.classList.add("none");
}

function OpenPageInput(button) {
    // Get the parent div and hide it
    document.getElementById(button).classList.remove("none")
}