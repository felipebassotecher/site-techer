<?php

namespace Api\Http;

class Response {
    public static function send($code, $response) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }
}
