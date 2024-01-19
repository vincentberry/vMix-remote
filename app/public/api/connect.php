<?php
$Dir_inc = '../../';
require_once $Dir_inc."config.php";

if (!empty($_GET["session_vmix"])) {
    $session_vmix = $_GET['session_vmix'];

    // Obtenir le timestamp actuel
    $timestamp_actuel = time();

    if ($session_vmix && $session_vmix <> "N") {

        $file = $Dir_inc."file/" . $session_vmix . ".xml";

        $timestamp_derniere_modif = filemtime($file);

        if ($timestamp_actuel - $timestamp_derniere_modif > 130){
            http_response_code(201);
            echo json_encode(array("reset" => "Le vmix n'a rien envoyé depuis plus de 130s"));
            die();
        }
        if (file_exists($file)){
            echo '<root>'.file_get_contents($file).'</root>';
            die();
        }

    } else {
        // Spécifiez le chemin du dossier
        $directoryPath = $Dir_inc.'file/';
    
        // Initialiser un tableau pour stocker les informations des fichiers
        $fileInfoArray = [];
    
        // Filtrer les fichiers pour exclure les entrées "." et ".."
        $filteredFiles = array_filter(scandir($directoryPath), function ($file) use ($Dir_inc, &$fileInfoArray)  {
            // Vérifier si le fichier existe
            $dir_file = $Dir_inc.'file/'.$file;
            if (file_exists($dir_file) && $file !== '.' && $file !== '..') {
                // Obtenir le timestamp de la dernière modification du fichier
                $timestamp_derniere_modif = filemtime($dir_file);
    
                // Vérifier si le fichier a été modifié il y a plus de 5 minutes
                if (time() - $timestamp_derniere_modif > 300) { // 300 secondes = 5 minutes
                    // Supprimer le fichier
                    unlink($dir_file);
                    return "";
                }
    
                // Charger le fichier XML
                $xml = file_get_contents($dir_file);
                $xml = simplexml_load_string('<root>' . (string)$xml . '</root>');

                // Récupérer le contenu du nœud <preset>
                $nomFichierSansChemin = preg_replace('#.*\\\#', '', (string)$xml->vmix->preset);
                $nomFichierSansExtension = pathinfo($nomFichierSansChemin, PATHINFO_FILENAME);
                
                // Extraire le nom du fichier du chemin complet
                $nomFichier = pathinfo($file, PATHINFO_FILENAME);
    
                // Stocker les informations dans le tableau
                $fileInfoArray[] = [
                    'id' => $nomFichier,
                    'name' => $nomFichierSansExtension,
                ];
            }
            return $file !== '.' && $file !== '..';
        });

        // Renvoyer le résultat au format JSON
        echo json_encode($fileInfoArray);
        die();
    }

}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme session_vmix !"));
die();