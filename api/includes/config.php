<?php
// Defaults match a fresh XAMPP install. On a live host, put the real values
// in config.local.php (copy config.local.example.php). Git ignores that file,
// so the database password never reaches GitHub.
if (is_file(__DIR__ . '/config.local.php')) {
    require __DIR__ . '/config.local.php';
}

defined('DB_HOST') || define('DB_HOST', getenv('HOCHAT_DB_HOST') ?: '127.0.0.1');
defined('DB_NAME') || define('DB_NAME', getenv('HOCHAT_DB_NAME') ?: 'hochat_cafe');
defined('DB_USER') || define('DB_USER', getenv('HOCHAT_DB_USER') ?: 'root');
defined('DB_PASS') || define('DB_PASS', getenv('HOCHAT_DB_PASS') ?: '');

define('SESSION_NAME', 'HOCHATSESSID');
define('SESSION_LIFETIME', 60 * 60 * 24 * 7); // Stay logged in for 7 days

define('PASSWORD_MIN_LENGTH', 8);
define('PASSWORD_MAX_BYTES', 72); // bcrypt ignores anything past 72 bytes

define('LOGIN_WINDOW_MINUTES', 15);
define('LOGIN_MAX_FAILS_PER_ACCOUNT', 5); // Per email from one IP address
define('LOGIN_MAX_FAILS_PER_IP', 30);     // Across all emails from one IP address
