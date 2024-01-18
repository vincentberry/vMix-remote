<?php

spl_autoload_register('app_autoload');

function app_autoload($class){
    $dirs = array(
        '',
    );
    foreach( $dirs as $dir ) {
        if (file_exists("../class/".$dir.$class.'.php')) {
            require("../class/".$dir.$class.'.php');
        }
        if (file_exists("../../class/".$dir.$class.'.php')) {
            require("../../class/".$dir.$class.'.php');
            $nomDossier = '../../file';
            // Vérifier si le dossier n'existe pas
            if (!is_dir($nomDossier)) {
                // Créer le dossier
                mkdir($nomDossier);
            }
        }
    }
}

function isAjax(){
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}