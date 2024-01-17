<?php
require_once "../config.php";
$db = App::getDatabase();

if (!empty($_GET["command"]) && !empty($_GET["session_vmix"])) {

    // Construire la commande en brut
    $session_vmix = $_GET["session_vmix"];
    $command = $_GET["command"];
    $input =  $_GET["input"];
    $value = $_GET["value"];
    $duration = $_GET["duration"];

    $req = db_insert::new_command($session_vmix, $command, $input, $value, $duration);
    echo json_encode(array("Valid" => "Command $req bien envoyée ! Elle va bientôt être exécutée !"));
    die();
}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme !"));
die();
