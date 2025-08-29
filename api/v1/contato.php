<?php

namespace Api\V1;

require_once '../Http/Request.php';
require_once '../Http/Response.php';
require_once '../Integrations/HubSpot.php';
require_once '../Validators/ContatoValidator.php';

use Api\Http\Request;
use Api\Http\Response;
use Api\Integrations\HubSpot;
use Api\Validators\ContatoValidator;

$request = new Request();

// Checking if the HTTP method is POST
$isPostRequest = $request->getMethod() === 'POST';

// Checking if the request content type is application/json
$isApplicationJson = strpos($request->getContentType(), 'application/json') !== false;

if (!$isPostRequest) {
    Response::send(405, [
        'success' => false,
        'error' => 'Method Not Allowed. Only POST requests are allowed.'
    ]);
}

if (!$isApplicationJson) {
    Response::send(415, [
        'success' => false,
        'error' => 'Unsupported Media Type. Only application/json is supported.'
    ]);
}

$body = $request->getBody();

$invalidFields = ContatoValidator::validate($body);

if (!empty($invalidFields)) {
    Response::send(400, [
        'success' => false,
        'error' => 'Validation failed. Invalid fields: ' . implode(', ', $invalidFields)
    ]);
}

$name = $body['name'] ?? null;
$email = $body['email'] ?? null;
$phone = $body['phone'] ?? null;
$company = $body['company'] ?? null;
$message = $body['message'] ?? null;

$hubSpotClient = new HubSpot();

$res = $hubSpotClient->createLead([
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'company' => $company,
    'message' => $message
]);

error_log('HTTP Response =>' . json_encode($res));

Response::send(200, [
    'success' => true,
    'response' => $res
]);
