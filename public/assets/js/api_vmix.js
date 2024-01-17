
//Api Vmix Command

function vMix_ActiveInput() {
    ApiVmixSend('ActiveInput', previewNumber);
}

function vMix_Fade() {
        ApiVmixSend('Fade', previewNumber);
}

function vMix_SetVolume(command, key) {
    // Récupérer l'élément <input> par son ID
    const volumeInput = document.getElementById(`volume-${key}`);
    ApiVmixSend(command, key, volumeInput.value, undefined);
}

function vMix_SetGain(key) {
    // Récupérer l'élément <input> par son ID
    const volumeInput = document.getElementById(`gainDb-${key}`);
    ApiVmixSend('SetGain', key, volumeInput.value, undefined);
}