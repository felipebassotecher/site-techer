<?php

namespace Api\Validators;

class ContatoValidator {
    public static function validate($data) {
        $errors = [];

        if (empty($data['name'])) {
            $errors[] = 'Name is required';
        }

        if (empty($data['email'])) {
            $errors[] = 'Email is required';
        }

        // if (empty($data['phone'])) {
        //     $errors[] = 'Phone is required';
        // }

        // if (empty($data['company'])) {
        //     $errors[] = 'Company is required';
        // }

        // if (empty($data['message'])) {
        //     $errors[] = 'Message is required';
        // }

        return $errors;
    }
}
