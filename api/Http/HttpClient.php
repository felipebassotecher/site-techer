<?php

namespace Api\Http;

use Exception;

abstract class HttpClient {
    public static function get($url) {
        return self::sendRequest($url, 'GET');
    }

    public static function post($url, $data, $headers = []) {
        return self::sendRequest($url, 'POST', json_encode($data), $headers);
    }

    private static function sendRequest($url, $method, $body = null, $headers = []) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        }

        $requestHeaders = array_merge($headers, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);

        curl_setopt($ch, CURLOPT_HTTPHEADER, $requestHeaders);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            throw new Exception('Error sending HTTP request: ' . curl_error($ch));
        }

        curl_close($ch);

        return json_decode($response, true);
    }
}
