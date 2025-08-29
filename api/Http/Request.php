<?php

namespace Api\Http;

use Exception;

class Request {
    private $method;
    private $contentType;
    private $body;

    public function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->contentType = $_SERVER['CONTENT_TYPE'] ?? '';

        $rawBody = file_get_contents('php://input');
        $body = json_decode($rawBody, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON body');
        }

        $this->body = $body;
    }

    public function getMethod() {
        return $this->method;
    }

    public function getContentType() {
        return $this->contentType;
    }

    public function getBody() {
        return $this->body;
    }
}
