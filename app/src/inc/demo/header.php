<!DOCTYPE html>
<html lang="En">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="./assets/img/favicon.png">
    <!--
        <script src="../js/notifications.js" type="text/javascript"></script>
        FONTS
    // <link rel="stylesheet" href="../css/fonts/Roboto-Regular.ttf">-->

    <!--meta SEO-->
    <meta name="description" content="Take full control of the vMix software remotely without the need to open ports on your network using our web application.">
    <meta name="author" content="Vincent Berry">
    <meta name="keyword" content="">

    <title>REMOTE VMIX</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="./assets/style/index.css" />

</head>
<div class="info" id="Build_info_div" style="position: fixed; bottom: 0px; width: 100%; z-index: 111; opacity: 0.9;transition: opacity 0.5s ease; pointer-events: none; ">
    <h2>This is a demonstration version. Not for production use.</h2>
</div>
<script>
function showOverlay() {
    const overlay = document.getElementById('Build_info_div');
        overlay.style.opacity = '0.9'
    setTimeout(function() {
        overlay.style.opacity = '0'
    }, 10000); // 10 secondes
}

// Appeler la fonction pour afficher l'overlay toutes les 1 minute
setInterval(showOverlay, 30000); // 30 secondes
</script>