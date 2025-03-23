<?php

class db_insert{

    /**
     * Inserts a new command record into the command table.
     *
     * This method creates a new command using the current timestamp along with the provided session,
     * command details, and mix information. It returns the identifier of the newly inserted record.
     *
     * @param mixed $session_vmix Session identifier for the command.
     * @param mixed $command Command type or identifier.
     * @param mixed $input Additional input data for the command.
     * @param mixed $value Value associated with the command.
     * @param mixed $duration Duration or timing detail for the command.
     * @param mixed $selectedName Name selected for the command.
     * @param mixed $selectedIndex Index corresponding to the selection.
     * @param mixed $Mix Supplementary mix-related parameter.
     *
     * @return mixed Identifier of the inserted command record.
     */
    public static function new_command($session_vmix, $command, $input, $value, $duration, $selectedName, $selectedIndex, $Mix){

        App::getDatabase()->query('INSERT INTO command(date_time, session_vmix, command, input, value, duration, selectedName, selectedIndex, Mix) VALUES(CURRENT_TIMESTAMP, ?, ?,?,?,?,?,?,?)', [
            $session_vmix,
            $command, 
            $input, 
            $value, 
            $duration,
            $selectedName, 
            $selectedIndex,
            $Mix
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