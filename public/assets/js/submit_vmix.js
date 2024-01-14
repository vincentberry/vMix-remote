function ApiVmixSend(req) {

        var xhr = getHttpRequest()
           
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                AlertPopup(JSON.parse(xhr.responseText)['Valid'])    
            } else {
                AlertPopup(JSON.parse(xhr.responseText)['error'])
            }
            }
        }

        xhr.open('GET', "api_command.php?session_vmix=" + document.getElementById('vmix_connect').value +"&"+ req, true) 
        xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
        xhr.send()
}

function AlertPopup(data) {
    console.log(data);
    window.alert(data);
}
 