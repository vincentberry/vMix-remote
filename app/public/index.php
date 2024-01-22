<?php
$Dir_inc = '../inc/';
require $Dir_inc.'header.php';
require $Dir_inc.'vmix_script.php';
?>
<body>
    <nav id="nav" class="">
        <div>
            <div class="left">
                <img class="script_down" onclick="copyToClipboard('VmixScript')" src="./assets/icon/VMIX REMOTE.svg"
                    alt="" srcset="">
                <div class="list">
                    <select name="vmix_connect" onmouseover="new_session_send()" onclick="chargerFichierXML()" id="vmix_connect">
                        <option value="N">--Please choose the vmix--</option>
                    </select>
                </div>
                <div id="fast" class="off" onclick="Session_delay()"></div>
            </div>
            <h1 id="projetName"></h1>
            <div class="right">
                <div class="statut_vmix_contener">
                    <div id="streaming"
                        onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the streaming?','StartStopStreaming')"
                        class="statut_vmix">
                        <h1>Streaming</h1>
                        <div class="activeContainer">
                            <div id="statut_streaming1" class=""></div>
                            <div id="statut_streaming2" class=""></div>
                            <div id="statut_streaming3" class=""></div>
                        </div>
                    </div>
                    <div id="recording"
                        onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the recording?','StartStopRecording')"
                        class="statut_vmix">
                        <h1>Recording</h1>
                        <div class="activeContainer">
                            <div id="statut_recording1" class=""></div>
                            <div id="statut_recording2" class=""></div>
                        </div>
                    </div>
                    <div id="external"
                        onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the external?','StartStopExternal')"
                        class="statut_vmix">
                        <h1>external</h1>
                        <div class="activeContainer">
                        </div>
                    </div>
                    <div id="fullscreen"
                        onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the fullscreen?','Fullscreen')"
                        class="statut_vmix">
                        <h1>fullscreen</h1>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!-- <div class="loader" id = loader></div> -->
    <main  id="main" class="connect">
        <div class="tooltip" id="tooltip-volume">dddd</div>
        <section class="center">
            <div class="ContainerCommandSelector">
                <div>
                    <label for="commandSelector">Select a Command:</label>
                    <select id="commandSelector" onchange="updateCommandDetails()">
                    </select>
                </div>
                <div id="commandDetails"></div>
                <button onclick="sendCommand()">Send Command</button>
            </div>
        </section>
        <button onclick="ApiVmixSend('Cut', previewNumber)">CUT</button>
        <button onclick="ApiVmixSend('Fade', previewNumber)">FACE</button>
        <button onclick="ApiVmixSend('Stinger1', previewNumber)">STINGER 1</button>
        <button onclick="ApiVmixSend('Merge', previewNumber)">MERGE</button>
        <section class="VmixContainer">
            <div id="videoSourcesContainer"></div>
            <div>
                <div id="audioBusesContainer"></div>
                <div id="audioSourcesContainer"></div>
            </div>
        </section>
        <div  id="inputsContainer" class="inputContainer none">
            <div class="Container">
                <div class="header">
                    <h1 id="inputContainer_header"> </h1>
                    <span class="closeButton" onclick="closePageInput(this)">✖</span>
                </div>
                <div class="body">
                    <div id="inputContainer_nav" class="nav">
                        <button id="inputContainer_nav_general" class="active" onclick="changeMenu('general')">General</button>
                        <button id="inputContainer_nav_list" onclick="changeMenu('list')">List</button>
                        <button id="inputContainer_nav_color_correction" onclick="changeMenu('color_correction')">Color Correction</button>
                        <button id="inputContainer_nav_layers" onclick="changeMenu('layers')">Layers</button>
                    </div>
                    <div class="content">
                        <div id="inputContainer_content_general" class="general">
                            <div class="head">
                                <h1 for="inputContainer_InputType"> </h1>
                                <button disabled>CHANGE</button>
                            </div>
                            <div class="GeneralContainer">
                                <div>
                                    <label for="inputContainer_InputName">Name</label>
                                    <input id="inputContainer_InputName" mouseup="ApiVmixSend('Loop','')" type="text">
                                </div>
                                <div>
                                    <label for="inputContainer_InputId">Id</label>
                                    <input id="inputContainer_InputId" type="text" disabled>
                                </div>
                                <div>
                                    <label for="inputContainer_InputLoop">Loop</label>
                                    <input id="inputContainer_InputLoop" type="checkbox">
                                </div>
                            </div>
                        </div>
                        <div id="inputContainer_content_list" style="display:none;" class="list">
                            <div class="head">
                                <button disabled>Add</button>
                                <button disabled>Edit</button>
                                <button disabled>Remove</button>
                                <button disabled>Shuffle</button>
                            </div>
                            <div class="GeneralContainer">
                                <ul id="inputContainer_content_list_ul">
                                </ul>
                            </div>
                        </div>
                        <div id="inputContainer_content_color_correction" style="display:none;" class="list"></div>
                        <div id="inputContainer_content_layers" style="display:none;" class="list"></div>
                    </div>
                </div>
            </div>
        </div> 

    </main>
</body>

<script>

  </script>

<!-- Script JavaScript pour récupérer le fichier XML et générer les éléments -->
<script src="./assets/js/app.js"></script>
<script src="./assets/js/copy.js"></script>
<script src="./assets/js/processSettings.js"></script>
<script src="./assets/js/processAudioSources.js"></script>
<script src="./assets/js/processAudioBus.js"></script>
<script src="./assets/js/processVideoSources.js"></script>
<script src="./assets/js/processPageSources.js"></script>
<script src="./assets/js/api_vmix.js"></script>
<script src="./assets/js/submit_vmix.js"></script>
<script>
    let activatedBuses = [];
    var commands;
    var id_input;
    var previewNumber;
    var inputSelect;
    var activeNumber;
    var activeOverlay1;
    var activeOverlay2;
    var activeOverlay3;
    var activeOverlay4;

    document.getElementById("urlserverscriptmvix").textContent = window.location.origin;
    const vmix_connect_param = get_vmix_connect_param();
    if (vmix_connect_param === null){
        window.location.href = '/lobby';
    }

</script>
<?php
require $Dir_inc.'footer.php';
?>