function copyToClipboard(name = 'file', type = 'text/plain') {
    var inputField = document.getElementById("VmixScript").textContent;
    const anchor = document.createElement('a')
    anchor.href = window.URL.createObjectURL(new Blob([inputField], { type }))
    anchor.download = name
    anchor.click()
}