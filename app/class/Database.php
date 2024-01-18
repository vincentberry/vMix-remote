<?php
class Database{

    private $pdo;

    public function __construct(){
        $this->pdo = new PDO('sqlite:'.dirname(__FILE__).'/database.sqlite');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $this->pdo->query("CREATE TABLE IF NOT EXISTS `command` (
                            `id` INTEGER PRIMARY KEY,
                            `session_vmix` INTEGER NOT NULL,
                            `date_time` TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                            `command` TEXT NOT NULL,
                            `input` TEXT DEFAULT '0',
                            `duration` TEXT DEFAULT '0',
                            `value` TEXT DEFAULT '0',
                            `push_vmix` INTEGER NOT NULL DEFAULT 0);"                                          
        );
    }


    /**
     * @param $query
     * @param bool|array $params
     * @return PDOStatement
     */
    public function query($query, $params = false){
        if($params){
            $req = $this->pdo->prepare($query);
            $req->execute($params);
        }else{
            $req = $this->pdo->query($query);
        }
        return $req;
    }

    public function lastInsertId(){
        return $this->pdo->lastInsertId();
    }
 

}