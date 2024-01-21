// Fonction pour convertir le XML en HTML et l'ajouter à la page
function processPageSources(xmlDoc) {

    const inputs = xmlDoc.querySelectorAll('input');
    const container = document.getElementById("inputsContainer");

    // Loop through each input and create a corresponding div
    inputs.forEach(input => {
        const inputContent = input.innerHTML;

        const key = input.getAttribute('key');
        const title = input.getAttribute('title');
        const number = input.getAttribute('number');
        const type = input.getAttribute('type');
        const loop = input.getAttribute('loop');

        const div = document.createElement("div");
        div.id = "inputContainer_"+key;
        div.className = "inputContainer none";
        div.innerHTML = `
            <div class="Container">
                <div class="header">
                    <h1>Input ${number}: ${title}</h1>
                    <span class="closeButton" onclick="closePageInput(this)">✖</span>
                </div>
                <div class="body">
                    <div class="nav">
                        <button>General</button>
                        <button>List</button>
                        <button>Color Correction</button>
                        <button>Layers</button>
                    </div>
                    <div class="content">
                        <div class="general">
                            <div class="head">
                                <h1 for="inputContainer_InputType">${type}</h1>
                                <button disabled>CHANGE</button>
                            </div>
                            <div class="GeneralContainer">
                                <div>
                                    <label for="inputContainer_InputName">Name</label>
                                    <input id="inputContainer_InputName" type="text" value="${title}">
                                </div>
                                <div>
                                    <label for="inputContainer_InputId">Id</label>
                                    <input id="inputContainer_InputId" type="text" value="${key}">
                                </div>
                                <div>
                                    <label for="inputContainer_InputLoop">Loop</label>
                                    <input id="inputContainer_InputLoop" type="checkbox" value="${loop}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
        `;
        container.appendChild(div);
    });
};

function closePageInput(button) {
    // Get the parent div and hide it
    const inputContainer = button.parentNode.parentNode.parentNode;
    inputContainer.classList.add("none");
}

function OpenPageInput(button) {
    // Get the parent div and hide it
    document.getElementById(button).classList.remove("none")
}