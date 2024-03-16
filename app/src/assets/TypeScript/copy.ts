function copyToClipboard(name: string = 'file', type: string = 'text/plain') {
    const inputFieldElement = document.getElementById("VmixScript");
    if (!inputFieldElement) return;

    const inputField: string = inputFieldElement.textContent || '';
    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(new Blob([inputField], { type }));
    anchor.download = name;
    anchor.click();
}
