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
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        if ($method === 'POST') {
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
        }

        $requestHeaders = array_merge($headers, array(
            'Content-Type: application/json',
            'Accept: application/json'
        ));

        curl_setopt($curl, CURLOPT_HTTPHEADER, $requestHeaders);

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            throw new Exception('Error sending HTTP request: ' . curl_error($curl));
        }

        curl_close($curl);

        return json_decode($response, true);
    }
}
