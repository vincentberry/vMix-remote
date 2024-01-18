<?php

class db_insert{

    public static function new_command($session_vmix, $command, $input, $value, $duration){

        App::getDatabase()->query('INSERT command SET date_time = NOW(), session_vmix = ?, command = ?, input = ?, value = ?, duration = ?', [
            $session_vmix,
            $command, 
            $input, 
            $value, 
            $duration,
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

    public static function delete_vmix_command($id){

        App::getDatabase()->query('DELETE FROM command where id = ?', [
            $id
            ]
        );
        return true;

    }
    
}