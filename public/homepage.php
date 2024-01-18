<?php
$Dir_inc = '../inc/';
require $Dir_inc.'header.php';
?>
<body>
    <section class="new_session">
        <img src="./assets/icon/VMIX REMOTE.svg" alt="">
        <h1>WELCOME TO REMOTE VMIX</h1>
        <select name="new_session" onclick="chargerFichierXML()" id="new_session">
            <option value="N">--Please choose the vmix--</option>
        </select>
        <button>DOWNLOAD SCRIPT FOR VMIX</button>
        <p>BY VINCENT BERRY</p>
    </section>
</body>

<!-- Script JavaScript pour récupérer le fichier XML et générer les éléments -->
<script>
    let activatedBuses = [];
    var commands;
    var id_input;
    var previewNumber;
    var activeNumber;
    var activeOverlay1;
    var activeOverlay2;
    var activeOverlay3;
    var activeOverlay4;

    document.getElementById("urlserverscriptmvix").textContent = window.location.href;

</script>
<script src="./assets/js/app.js"></script>
<script src="./assets/js/copy.js"></script>
<script src="./assets/js/processSettings.js"></script>
<script src="./assets/js/processAudioSources.js"></script>
<script src="./assets/js/processAudioBus.js"></script>
<script src="./assets/js/processVideoSources.js"></script>
<script src="./assets/js/processPageSources.js"></script>
<script src="./assets/js/api_vmix.js"></script>
<script src="./assets/js/submit_vmix.js"></script>
<?php
require $Dir_inc.'vmix_script.php';
require $Dir_inc.'footer.php';
?>