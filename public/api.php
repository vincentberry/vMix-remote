<?php
require_once "../config.php";
$db = App::getDatabase();


if($_POST["connector"] && $_POST["xml"]){

    // Récupérer les données de la requête POST
    $file = "../file/".$_POST["connector"].".xml";
    // Sauvegarder le XML dans un fichier
    file_put_contents($file, $_POST["xml"]);

    // Construire la commande en brut
    $flyValue = "ActiveInput";
    $inputValue = "2";
    $durationValue = "500";
    $mixValue = "0";
    $file = "../file/command.json";

    $req = db_retrun::db_command_vmix($_POST["connector"]);
    $envoi_vmix = "";
    if($req){
        foreach ($req as $item) {
            // Accéder aux valeurs individuelles
            db_insert::delete_vmix_command($item->id);
            $envoi_vmix = $envoi_vmix . "$item->command, $item->input, $item->value, $item->duration!";
            
        }
    
        echo $envoi_vmix;
        die();
    }
    echo "Pas de nouvelle command";
    die();


}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme !"));
die();
