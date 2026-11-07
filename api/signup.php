<?php
// POST { firstName, lastName, email, contactNumber, password }
declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

$input = require_json_post();

$firstName = trim(text_field($input, 'firstName'));
$lastName = trim(text_field($input, 'lastName'));
$email = normalize_email(text_field($input, 'email'));
$contactNumber = preg_replace('/[\s-]/', '', text_field($input, 'contactNumber'));
$password = text_field($input, 'password');

if ($firstName === '' || $lastName === '' || $email === '' || $contactNumber === '' || $password === '') {
    respond_error(422, 'Please fill in all fields.');
}

if (mb_strlen($firstName) > 100 || mb_strlen($lastName) > 100) {
    respond_error(422, 'Names must be 100 characters or fewer.');
}

if (strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond_error(422, 'Please enter a valid email address.');
}

if (!preg_match('/^(?:09|\+639)\d{9}$/', $contactNumber)) {
    respond_error(422, 'Please enter a valid mobile number, like 09123456789.');
}
$contactNumber = preg_replace('/^\+63/', '0', $contactNumber);

if (mb_strlen($password) < PASSWORD_MIN_LENGTH) {
    respond_error(422, 'Password must be at least ' . PASSWORD_MIN_LENGTH . ' characters.');
}

if (strlen($password) > PASSWORD_MAX_BYTES || str_contains($password, "\0")) {
    respond_error(422, 'Password must be ' . PASSWORD_MAX_BYTES . ' characters or fewer.');
}

$statement = db()->prepare(
    'INSERT INTO users (first_name, last_name, email, contact_number, password_hash)
     VALUES (?, ?, ?, ?, ?)'
);

try {
    $statement->execute([
        $firstName,
        $lastName,
        $email,
        $contactNumber,
        password_hash($password, PASSWORD_DEFAULT),
    ]);
} catch (PDOException $error) {
    // 1062 = the unique email index rejected a duplicate
    if ((int) ($error->errorInfo[1] ?? 0) === 1062) {
        respond_error(409, 'This email is already registered.');
    }
    throw $error;
}

respond(201, ['ok' => true]);
