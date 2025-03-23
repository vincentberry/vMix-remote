<?php
define('PROJECT_ROOT', '/var/www/html');
spl_autoload_register('app_autoload');

/**
 * Autoloads a class file and ensures the necessary directories exist.
 *
 * This function constructs the path to a class file using the PROJECT_ROOT constant and the provided class name.
 * If the file exists in the "/class" directory, it is included and the checkAndCreateDirs function is called
 * to verify that the "/file" and "/db" directories under PROJECT_ROOT exist, creating them if necessary.
 *
 * @param string $class The name of the class to load.
 */
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

/**
 * Ensures each directory in the provided list exists.
 *
 * Iterates over the array of directory paths and creates any directory that does not already exist.
 *
 * @param string[] $dirs An array of directory paths.
 */
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