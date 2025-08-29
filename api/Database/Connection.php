<?php

namespace Api\Database;

use Exception;

class Connection {

    /**
     * @method getDb() Realiza a conexão com o serviço de banco de dados
     * @return object Objeto PDO contendo os parâmetros da conexão
     */
    public static function getDb() {

        try {

            $file = 'config/database.ini';
            $ini = parse_ini_file($file, true);

            if (!$ini) {
                throw new Exception('Failed to parse INI file');
            }

			$db_settings = $ini['database'];

            $config = "mysql:host={$db_settings['host']};dbname={$db_settings['database']}";
            $config.= (isset($db_settings['collation'])) ? ";charset={$db_settings['collation']}" : '';

            $conn = new \PDO(
                $config,
                $db_settings['username'], $db_settings['password']
            );

            return $conn;

        } catch (\PDOException $e) {

            error_log('Error on database connection: ' . $e->getMessage());
            return null;
        }

    }
}
