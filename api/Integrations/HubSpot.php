<?php

namespace Api\Integrations;

require_once '../Http/HttpClient.php';

use Api\Http\HttpClient;

class HubSpot {

    private $config;

    public function __construct() {
        $this->config = parse_ini_file('Config/integration.ini', true)['hubspot'];
    }

    public function createLead($data) {
        // Prepare the request to HubSpot API
        $url = $this->config['api_url'] . '/crm/v3/objects/leads';

        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->config['access_token']
        ];

        $body = [
            'associations' => array([
                'types' => [
                    [
                        'associationCategory' => '',
                        'associationTypeId' => 0
                    ]
                ],
                'to' => [
                    'id' => 'string'
                ]
            ]),
            'properties' => $data
        ];

        $response = HttpClient::post($url, $body, $headers);

        return $response;
    }
}