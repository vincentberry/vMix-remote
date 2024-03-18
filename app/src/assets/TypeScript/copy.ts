function copyToClipboard(name: string = 'file', type: string = 'text/plain') {
    const element = document.getElementById("VmixScript") as HTMLElement;
    const inputField: string | null = element.textContent;
    
    if (inputField) {
        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(new Blob([inputField], { type }));
        anchor.download = name;
        anchor.click();
    } else {
        console.error("The element with ID 'VmixScript' doesn't have any text content.");
    }

}