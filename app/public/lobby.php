<?php
$Dir_inc = '../inc/';
require $Dir_inc . 'header.php';
require $Dir_inc . 'vmix_script.php';
?>

<body>
    <section class="new_session">
        <img src="./assets/icon/VMIX REMOTE.svg" alt="">
        <h1>WELCOME TO REMOTE VMIX</h1>
        <div class="list">
            <select name="vmix_connect" onclick="chargerFichierXML()" id="vmix_connect">
                <option value="N">--Please choose the vmix--</option>
            </select>
        </div>
        <button onclick="copyToClipboard('VmixScript')">DOWNLOAD SCRIPT FOR VMIX</button>
        <p>BY VINCENT BERRY</p>
        <a href="https://github.com/vincentberry/vmix-remote" target="_blank">
            <img class="github" src="./assets/icon/GitHub.svg" alt="github">
        </a>
    </section>

</body>

<!-- Script JavaScript pour récupérer le fichier XML et générer les éléments -->
<script src="./assets/js/lobby.js"></script>
<script src="./assets/js/copy.js"></script>
<script>
    document.getElementById("urlserverscriptmvix").textContent = window.location.origin;
    const vmix_connect_param = get_vmix_connect_param();
    if (vmix_connect_param) {
        window.location.href = '/?vmix_connect=' + vmix_connect_param;
    }
</script>
<?php
require $Dir_inc . 'footer.php';
?>