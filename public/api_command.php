<?php
require_once "../config.php";
$db = App::getDatabase();

if (!empty($_GET["flyValue"]) && !empty($_GET["session_vmix"])) {

    // Construire la commande en brut
    $session_vmix = $_GET["session_vmix"];
    $type = $_GET["flyValue"];
    $input =  $_GET["inputValue"];
    $duration = $_GET["durationValue"];
    $value = $_GET["mixValue"];

    $req = db_insert::new_command($session_vmix, $type, $input, $duration, $value);
    echo json_encode(array("Valid" => "Command $req bien envoyée ! Elle va bientôt être exécutée !"));
    die();
}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme !"));
die();
