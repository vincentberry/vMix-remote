<?php
$Dir_inc = '../../';
require_once $Dir_inc."config.php";
$db = App::getDatabase();

if (!empty($_GET["command"]) && !empty($_GET["session_vmix"])) {

    // Construire la commande en brut
    $session_vmix = $_GET["session_vmix"];
    $command = $_GET["command"];
    $input = !empty($_GET["input"]) ? $_GET["input"] : 0;
    $value = !empty($_GET["value"]) ? $_GET["value"] : 0;
    $duration = !empty($_GET["duration"]) ? $_GET["duration"] : 0;
    $selectedName = !empty($_GET["selectedName"]) ? $_GET["selectedName"] : 0;
    $selectedIndex = !empty($_GET["selectedIndex"]) ? $_GET["selectedIndex"] : 0;
    $Mix = !empty($_GET["Mix"]) ? $_GET["Mix"] : 0;
    
    $req = db_insert::new_command($session_vmix, $command, $input, $value, $duration, $selectedName, $selectedIndex, $Mix);
    echo json_encode(array("Valid" => "Command $req bien envoyée ! Elle va bientôt être exécutée !"));
    die();
}

http_response_code(403);
echo json_encode(array("error" => "valeur envoi non conforme !"));
die();
