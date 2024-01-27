<?php
$Dir_inc = '../inc/';
require $Dir_inc . 'header.php';
require $Dir_inc . 'vmix_script.php';
?>

<body>
    <nav id="nav" class="">
        <div>
            <div class="left">
                <img class="script_down" onclick="copyToClipboard('VmixScript')" src="./assets/icon/VMIX REMOTE.svg" alt="" srcset="">
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
                    <div id="streaming" onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the streaming?','StartStopStreaming')" class="statut_vmix">
                        <h1>Streaming</h1>
                        <div class="activeContainer">
                            <div id="statut_streaming1" class=""></div>
                            <div id="statut_streaming2" class=""></div>
                            <div id="statut_streaming3" class=""></div>
                        </div>
                    </div>
                    <div id="recording" onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the recording?','StartStopRecording')" class="statut_vmix">
                        <h1>Recording</h1>
                        <div class="activeContainer">
                            <div id="statut_recording1" class=""></div>
                            <div id="statut_recording2" class=""></div>
                        </div>
                    </div>
                    <div id="external" onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the external?','StartStopExternal')" class="statut_vmix">
                        <h1>external</h1>
                        <div class="activeContainer">
                        </div>
                    </div>
                    <div id="fullscreen" onclick="ConfirmApiVmixSend('Are you sure you want to Start/Stop the fullscreen?','Fullscreen')" class="statut_vmix">
                        <h1>fullscreen</h1>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!-- <div class="loader" id = loader></div> -->
    <main id="main" class="connect">
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
        <div id="inputsContainer" class="inputContainer disabled">
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
                        <div id="inputContainer_content_list" class="list" style="display:none;">
                            <div class="head">
                                <button onclick="processPageSources_list_addItem()"> Add</button>
                                <button id="inputContainer_listShuffle">Shuffle</button>
                            </div>
                            <div class="GeneralContainer">
                                <ul id="inputContainer_content_list_ul">
                                </ul>
                            </div>
                        </div>
                        <div id="inputContainer_content_color_correction" style="display:none;" class="list"></div>
                        <div id="inputContainer_content_layers" class="layers" style="display:none;" class="list">
                            <div class="left">
                                <div class="list">
                                    <div class="layer_number">
                                        <label>1</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '1,'+ this.value)" id="inputContainer_content_list_0">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                    <button class="on">ON</button>
                                    <button class="off">OFF</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>2</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '2,'+ this.value)" id="inputContainer_content_list_1">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>3</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '3,'+ this.value)" id="inputContainer_content_list_2">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>4</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '4,'+ this.value)" id="inputContainer_content_list_3">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>5</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '5,'+ this.value)" id="inputContainer_content_list_4">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>6</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '6,'+ this.value)" id="inputContainer_content_list_5">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>7</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '7,'+ this.value)" id="inputContainer_content_list_6">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>8</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer',inputSelect, '8,'+ this.value)" id="inputContainer_content_list_7">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>9</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '9,'+ this.value)" id="inputContainer_content_list_8">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                                <div class="list">
                                    <div class="layer_number">
                                        <label>10</label>
                                    </div>
                                    <select onchange="ApiVmixSend('SetLayer', inputSelect, '10,'+ this.value)" id="inputContainer_content_list_9">
                                        <option value="">None</option>
                                    </select>
                                    <button>EDIT</button>
                                </div>
                            </div>
                            <div class="rigth">
                                <h1>LE NOM DE L'INPUT SELECTION</h1>
                                <button>90 DEGRES</button>
                                <div class="mode">
                                    <div class="mode_header">
                                        <h3>MOVE</h3>
                                        <button>RESET</button>
                                    </div>
                                    <div class="mode_content">
                                        <div>
                                            <div class="label_content">
                                                <label>X</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>Y</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>Width</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>Height</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                    </div>

                                </div>
                                <div class="mode">
                                    <div class="mode_header">
                                        <h3>CROP</h3>
                                        <button>RESET</button>
                                    </div>
                                    <div class="mode_content">
                                        <div>
                                            <div class="label_content">
                                                <label>X1</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>Y1</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>X1</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>Y2</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                    </div>

                                </div>
                                <div class="mode">
                                    <div class="mode_header">
                                        <h3>BORDER</h3>
                                        <button>RESET</button>
                                    </div>
                                    <div class="mode_content">
                                        <div>
                                            <div class="label_content">
                                                <label>On/Off</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>Thickness</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                        <div>
                                            <div class="label_content">
                                                <label>Radius</label>
                                            </div>
                                            <input type="text">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="EditContainer" class="EditContainer disabled">
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
<script src="./assets/js/processEdit.js"></script>
<script src="./assets/js/api_vmix.js"></script>
<script src="./assets/js/submit_vmix.js"></script>
<script>
    let activatedBuses = [];
    var commands;
    var inputArray = [];
    var previewNumber;
    var inputSelect;
    var activeNumber;
    var activeOverlay1;
    var activeOverlay2;
    var activeOverlay3;
    var activeOverlay4;
    var XmlFile;

    document.getElementById("urlserverscriptmvix").textContent = window.location.origin;
    const vmix_connect_param = get_vmix_connect_param();
    if (vmix_connect_param === null) {
        window.location.href = '/lobby';
    }
</script>
<?php
require $Dir_inc . 'footer.php';
?>