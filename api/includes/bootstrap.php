<?php
// Shared by every API endpoint: JSON responses, the database connection,
// and session setup.
declare(strict_types=1);

require __DIR__ . '/config.php';

// Errors go to the log. Visitors never see file paths or SQL.
ini_set('display_errors', '0');

set_exception_handler(function (Throwable $error): void {
    error_log((string) $error);
    if ($error instanceof PDOException) {
        respond_error(503, 'The service is unavailable right now. Please try again shortly.');
    }
    respond_error(500, 'Something went wrong. Please try again.');
});

function respond(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function respond_error(int $status, string $message): never
{
    respond($status, ['ok' => false, 'error' => $message]);
}

// Accepts only a JSON POST. Another website can't send one of these without
// the browser asking this server for permission first, and it never gets
// that permission, so forged cross-site requests stop here.
function require_json_post(): array
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        header('Allow: POST');
        respond_error(405, 'This address only accepts POST requests.');
    }

    $contentType = strtolower($_SERVER['CONTENT_TYPE'] ?? '');
    if (!str_starts_with($contentType, 'application/json')) {
        respond_error(415, 'Requests must be sent as JSON.');
    }

    $input = json_decode(file_get_contents('php://input') ?: '', true);
    return is_array($input) ? $input : [];
}

// Reads a text value. Anything that isn't a string counts as empty.
function text_field(array $input, string $key): string
{
    $value = $input[$key] ?? '';
    return is_string($value) ? $value : '';
}

function normalize_email(string $email): string
{
    return mb_strtolower(trim($email));
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
    }
    return $pdo;
}

function start_session(): void
{
    ini_set('session.use_strict_mode', '1');
    ini_set('session.gc_maxlifetime', (string) SESSION_LIFETIME);
    session_name(SESSION_NAME);
    session_set_cookie_params([
        'lifetime' => SESSION_LIFETIME,
        'path' => '/',
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

// The fields the website may see. The password hash never leaves the server.
function public_user(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'firstName' => $row['first_name'],
        'lastName' => $row['last_name'],
        'email' => $row['email'],
        'contactNumber' => $row['contact_number'],
    ];
}
