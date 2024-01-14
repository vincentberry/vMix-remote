
//Api Vmix Command
 function vMix_OverlayToggle(overlay, key) {
    // URL de votre endpoint de serveur
    const url = 'flyValue=OverlayInput' + overlay +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_PreviewInput(key) {
    // URL de votre endpoint de serveur
    const url = 'flyValue=PreviewInput' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_ActiveInput(key) {

    // URL de votre endpoint de serveur
    const url = 'flyValue=ActiveInput' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_Fade(key) {

    // URL de votre endpoint de serveur
    const url = 'flyValue=Fade' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=500' +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_SetVolume(key) {
    // Récupérer l'élément <input> par son ID
    const volumeInput = document.getElementById(`volume-${key}`);



    // URL de votre endpoint de serveur
    const url = 'flyValue=SetVolume' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=' + volumeInput.value +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_SetGain(key) {
    // Récupérer l'élément <input> par son ID
    const volumeInput = document.getElementById(`gainDb-${key}`);

    // URL de votre endpoint de serveur
    const url = 'flyValue=SetGain' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=' + volumeInput.value +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_Audio(key) {
    // Récupérer l'élément <input> par son ID

    // URL de votre endpoint de serveur
    const url = 'flyValue=Audio' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}

function MasterAudio(key) {
    const flyValue = "";
    console.log(key);
    // Récupérer l'élément <input> par son ID
    if($key = "master"){
        const flyValue = "MasterAudio";
    }else{
        const flyValue = key + "Audio";
    }
    // URL de votre endpoint de serveur
    const url = 'flyValue=' + flyValue +
        '&inputValue=0' +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}
function AudioBus(key, bus) {

    // URL de votre endpoint de serveur
    const url = 'AudioBus=' + bus +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}


function vMix_Solo(key) {
    // Récupérer l'élément <input> par son ID

    // URL de votre endpoint de serveur
    const url = 'flyValue=Solo' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}

