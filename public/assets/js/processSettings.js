var previewNumber;
var activeNumber;
var activeOverlay1;
var activeOverlay2;
var activeOverlay3;
var activeOverlay4;

function processSettings(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    previewNumber = parseInt(xmlDoc.querySelector('preview').textContent);
    activeNumber = parseInt(xmlDoc.querySelector('active').textContent);
    activeOverlay1 = parseInt(xmlDoc.querySelector('overlay[number="1"]').textContent);
    activeOverlay2 = parseInt(xmlDoc.querySelector('overlay[number="2"]').textContent);
    activeOverlay3 = parseInt(xmlDoc.querySelector('overlay[number="3"]').textContent);
    activeOverlay4 = parseInt(xmlDoc.querySelector('overlay[number="4"]').textContent);
    
    var projetName =  xmlDoc.querySelector('preset').textContent.split(/[\\/]/);
    projetName = projetName[projetName.length - 1].split('.')[0];
    document.getElementById('projetName').textContent = projetName ;

    updateCheckboxClass('streaming', JSON.parse(xmlDoc.querySelector('streaming').textContent.trim().toLowerCase()));
    updateCheckboxClass('recording', JSON.parse(xmlDoc.querySelector('recording').textContent.trim().toLowerCase()));
    updateCheckboxClass('external', JSON.parse(xmlDoc.querySelector('external').textContent.trim().toLowerCase()));
    updateCheckboxClass('fullscreen', JSON.parse(xmlDoc.querySelector('fullscreen').textContent.trim().toLowerCase()));

}