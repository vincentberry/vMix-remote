<?php

$nomDossier = '../file';
// Vérifier si le dossier n'existe pas
if (!is_dir($nomDossier)) {
    // Créer le dossier
    mkdir($nomDossier);
}

spl_autoload_register('app_autoload');

function app_autoload($class){
    require "../class/$class.php";
}

function isAjax(){
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}