<?php

class db_retrun{

    public static function db_command_vmix($session_vmix){
        $req = App::getDatabase()->query('SELECT * FROM command WHERE session_vmix = ? AND push_vmix = 0 ORDER BY date_time DESC', [$session_vmix])->fetchAll();
        return $req;
    }
}