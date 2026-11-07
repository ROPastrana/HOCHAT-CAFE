<?php
// POST {}
declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

require_json_post();

if (!empty($_COOKIE[SESSION_NAME])) {
    start_session();
    $_SESSION = [];
    session_destroy();

    $cookie = session_get_cookie_params();
    setcookie(SESSION_NAME, '', [
        'expires' => time() - 3600,
        'path' => $cookie['path'],
        'secure' => $cookie['secure'],
        'httponly' => $cookie['httponly'],
        'samesite' => $cookie['samesite'],
    ]);
}

respond(200, ['ok' => true]);
