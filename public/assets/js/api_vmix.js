
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

function  vMix_MasterAudio(key) {

    // URL de votre endpoint de serveur
    const url = 'flyValue=' + key + "Audio" +
        '&inputValue=0' +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_BusXSendToMaster(key) {

    // URL de votre endpoint de serveur
    const url = 'flyValue=BusXSendToMaster' +
        '&inputValue=0' +
        '&durationValue='+ key +
        '&mixValue=0';

    ApiVmixSend(url)
}

function vMix_AudioBus(key) {
    // Récupérer l'élément <input> par son ID
    const volumeInput = document.getElementById(`volume-${key}`);
    console.log(volumeInput);
    // URL de votre endpoint de serveur
    const url = 'flyValue=Set'+key+'Volume ' +
        '&inputValue=0' +
        '&durationValue=' + volumeInput.value +
        '&mixValue=0';

    ApiVmixSend(url)
}


function vMix_Solo(key) {

    // URL de votre endpoint de serveur
    const url = 'flyValue=Solo' +
        '&inputValue=' + encodeURIComponent(key) +
        '&durationValue=0' +
        '&mixValue=0';

    ApiVmixSend(url)
}

