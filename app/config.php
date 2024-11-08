<?php
define('PROJECT_ROOT', '/var/www/html');
spl_autoload_register('app_autoload');

function app_autoload($class){
    $paths = [
        PROJECT_ROOT  . "/class/$class.php",
    ];
    
    foreach ($paths as $path) {
        if (file_exists($path)) {
            require $path;
            checkAndCreateDirs([PROJECT_ROOT  . '/file', PROJECT_ROOT  . '/db']);
            break;
        }
    }
}

function checkAndCreateDirs(array $dirs) {
    foreach ($dirs as $dir) {
        if (!is_dir($dir)) {
            mkdir($dir);
        }
    }
}

function isAjax(){
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}