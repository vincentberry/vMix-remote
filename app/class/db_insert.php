<?php

class db_insert{

    public static function new_command($session_vmix, $command, $input, $value, $duration, $selectedName, $selectedIndex){

        App::getDatabase()->query('INSERT INTO command(date_time, session_vmix, command, input, value, duration, selectedName, selectedIndex) VALUES(CURRENT_TIMESTAMP, ?, ?,?,?,?,?,?)', [
            $session_vmix,
            $command, 
            $input, 
            $value, 
            $duration,
            $selectedName, 
            $selectedIndex,
            ]
        );
        return App::getDatabase()->lastInsertId();

    }

    public static function push_vmix_command($id){

        App::getDatabase()->query('UPDATE command SET push_vmix = 1 WHERE id = ?', [
            $id
            ]
        );
        return true;

    }

    public static function delete_vmix_command($id){

        App::getDatabase()->query('DELETE FROM command WHERE id = ?', [
            $id
            ]
        );
        return true;

    }
    
}