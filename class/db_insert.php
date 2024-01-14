<?php

class db_insert{

    public static function new_command($session_vmix, $type, $input, $duration, $value){

        App::getDatabase()->query('INSERT command SET date_time = NOW(), session_vmix = ?, type = ?, input = ?, duration = ?, value = ?', [
            $session_vmix,
            $type, 
            $input, 
            $duration, 
            $value,
            ]
        );
        return App::getDatabase()->lastInsertId();

    }

    public static function push_vmix_command($id){

        App::getDatabase()->query('UPDATE command SET push_vmix = 1 where id = ?', [
            $id
            ]
        );
        return true;

    }
    
}