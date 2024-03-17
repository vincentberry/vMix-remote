function copyToClipboard(name: string = 'file', type: string = 'text/plain') {
    const inputField = document.getElementById("VmixScript").textContent;
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(new Blob([inputField], { type }));
    anchor.download = name;
    anchor.click();
}