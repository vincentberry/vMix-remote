<?php
$Dir_inc = '../../';
require_once $Dir_inc."config.php";
$db = App::getDatabase();

if(!empty($_POST["connector"]) && !empty($_POST["xml"])){
    if($_POST["connector"] && $_POST["xml"]){

        // Récupérer les données de la requête POST
        $file = $Dir_inc."file/".$_POST["connector"].".xml";
        // Sauvegarder le XML dans un fichier
        file_put_contents($file, $_POST["xml"]);

        $req = db_retrun::db_command_vmix($_POST["connector"]);
        $envoi_vmix = "";
        if($req){
            foreach ($req as $item) {
                // Accéder aux valeurs individuelles
                $command = $item["command"];
                $input = $item["input"];
                $value = $item["value"];
                $duration = $item["duration"];
                // Accéder aux valeurs individuelles
                $envoi_vmix = $envoi_vmix . "$command, $input, $value, $duration!";
                db_insert::delete_vmix_command($item["id"]);
                
            }
        
            echo $envoi_vmix;
            die();
        }
        echo "Pas de nouvelle command";
        die();
    }
}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme !"));
die();
