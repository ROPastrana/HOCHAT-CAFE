<?php
// POST { email, password }
declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

// Checked when the email has no account, so a wrong email takes as long as a
// wrong password and response times can't reveal who has signed up.
const DUMMY_HASH = '$2y$10$mxajHtWldfevt3VVS4PmsuvQQyrsH6kmovXd940mNJwv9RrnJahiW';

$input = require_json_post();

$email = normalize_email(text_field($input, 'email'));
$password = text_field($input, 'password');
$ip = $_SERVER['REMOTE_ADDR'] ?? '';

if ($email === '' || $password === '') {
    respond_error(422, 'Please enter your email and password.');
}

$pdo = db();
$window = (int) LOGIN_WINDOW_MINUTES;

$pdo->exec("DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL $window MINUTE");

$statement = $pdo->prepare(
    'SELECT COUNT(*) AS from_ip, COALESCE(SUM(email = ?), 0) AS for_account
     FROM login_attempts
     WHERE ip = ?'
);
$statement->execute([$email, $ip]);
$fails = $statement->fetch();

if ((int) $fails['for_account'] >= LOGIN_MAX_FAILS_PER_ACCOUNT || (int) $fails['from_ip'] >= LOGIN_MAX_FAILS_PER_IP) {
    header('Retry-After: ' . ($window * 60));
    respond_error(429, "Too many failed attempts. Please try again in $window minutes.");
}

$statement = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$statement->execute([$email]);
$user = $statement->fetch();

$passwordMatches = password_verify($password, $user ? $user['password_hash'] : DUMMY_HASH);

if (!$user || !$passwordMatches) {
    $pdo->prepare('INSERT INTO login_attempts (email, ip) VALUES (?, ?)')->execute([$email, $ip]);
    respond_error(401, 'Incorrect email or password.');
}

$pdo->prepare('DELETE FROM login_attempts WHERE email = ? AND ip = ?')->execute([$email, $ip]);

// Keeps stored hashes up to date if PHP's default gets stronger
if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
    $pdo->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
        ->execute([password_hash($password, PASSWORD_DEFAULT), $user['id']]);
}

start_session();
session_regenerate_id(true); // A session ID planted before login stops working
$_SESSION['user_id'] = (int) $user['id'];

respond(200, ['ok' => true, 'user' => public_user($user)]);
