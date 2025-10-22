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
            'inputs' => [
                'associations' => array([
                    'types' => [
                        [
                            'associationCategory' => 'HUBSPOT_DEFINED',
                            'associationTypeId' => 1
                        ]
                    ],
                    'to' => [
                        'id' => '50428608'
                    ]
                ]),
                'properties' => $data
            ]
        ];

        error_log(json_encode($this->config));
        error_log(json_encode($body));

        $response = HttpClient::post($url, $body, $headers);

        return $response;
    }
}