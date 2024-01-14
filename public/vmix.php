<?php
require_once "../config.php";
$db = App::getDatabase();

if (!empty($_GET["session_vmix"])) {
    $session_vmix = $_GET['session_vmix'];
    // Construire la commande en brut

    if ($session_vmix && $session_vmix <> "N") {

        $file = "../file/" . $session_vmix . ".xml";
        if (file_exists($file)){
            echo file_get_contents($file);
            die();
        }

    } else {
        // Spécifiez le chemin du dossier
        $directoryPath = '../file/';

        // Utilisez scandir pour obtenir la liste des fichiers dans le dossier
        $files = scandir($directoryPath);

        // Filtrer les fichiers pour exclure les entrées "." et ".."
        $filteredFiles = array_filter($files, function ($file) {
            // Vérifier si le fichier existe
            if (file_exists( '../file/'.$file)) {
                // Obtenir le timestamp de la dernière modification du fichier
                $timestamp_derniere_modif = filemtime( '../file/'.$file);

                // Obtenir le timestamp actuel
                $timestamp_actuel = time();

                // Vérifier si le fichier a été modifié il y a plus de 5 minutes
                if ($timestamp_actuel - $timestamp_derniere_modif > 300) { // 300 secondes = 5 minutes
                    // Supprimer le fichier
                    unlink( '../file/'.$file);
                }
            }
            return $file !== '.' && $file !== '..';
        });

        // Supprimer l'extension des noms de fichier
        $fileNamesWithoutExtension = array_map(function ($file) {
            return pathinfo($file, PATHINFO_FILENAME);
        }, $filteredFiles);

        // Réindexer le tableau pour commencer à l'index 0
        $indexedFileNames = array_values($fileNamesWithoutExtension);

        echo json_encode($indexedFileNames);
        die();
    }

}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme session_vmix !"));
die();