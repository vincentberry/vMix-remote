<?php
$Dir_inc = '../../';
require_once $Dir_inc."config.php";
$db = App::getDatabase();

if(!empty($_POST["connector"]) && !empty($_POST["xml"]) && !empty($_POST["session_delay"])){
    if($_POST["connector"] && $_POST["xml"]){

        // Récupérer les données de la requête POST
        $file = $Dir_inc."file/".$_POST["connector"].".xml";

        //Génére le XML à sauvegardé
        $xml = "<session_delay>". $_POST["session_delay"] ."</session_delay>". $_POST["xml"];

        // Sauvegarder le XML dans un fichier
        file_put_contents($file, $xml);

        $req = db_retrun::db_command_vmix($_POST["connector"]);
        $envoi_vmix = "";
        if($req){
            foreach ($req as $item) {
                // Accéder aux valeurs individuelles
                $command = $item["command"];
                $input = $item["input"];
                $value = $item["value"];
                $duration = $item["duration"];
                $selectedName = $item["selectedName"];
                $selectedIndex = $item["selectedIndex"];
                $Mix = $item["Mix"];

                // Build the XML command string
                $envoi_vmix .= '<command> ';
                $envoi_vmix .= '<functionType>' . $command . '</functionType>';
                $envoi_vmix .= '<inputParam>' . $input . '</inputParam>';
                $envoi_vmix .= '<durationParam>' . $duration . '</durationParam>';
                $envoi_vmix .= '<selectedNameParam>' . $selectedName . '</selectedNameParam>';
                $envoi_vmix .= '<selectedIndexParam>' . $selectedIndex . '</selectedIndexParam>';
                $envoi_vmix .= '<valueParam>' . $value . '</valueParam>';
                $envoi_vmix .= '<Mix>' . $Mix . '</Mix>';
                $envoi_vmix .= '</command>';

                db_insert::delete_vmix_command($item["id"]);
                
            }
        
            echo '<commands>' . $envoi_vmix . '</commands>';
            die();
        }
        echo "<message>No new order</message>";
        die();
    }
}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme !"));
die();
