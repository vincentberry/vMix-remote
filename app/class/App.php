<?php
class App
{

    static $db = null;

    static function getDatabase()
    {
        if (!self::$db) {
            self::$db = new Database();
        }
        return self::$db;
    }

    static function redirect($page)
    {
        if (preg_match('/^http|HTTP+$/', $page)) {
            header("Location: $page");
            exit();
        }
        header("Location: ../$page");
        exit();
    }
}
