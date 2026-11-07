<?php
// GET: returns the logged-in customer, or null for a guest.
declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

// Guests have no cookie, so don't create a session for every visitor
if (empty($_COOKIE[SESSION_NAME])) {
    respond(200, ['ok' => true, 'user' => null]);
}

start_session();
$userId = $_SESSION['user_id'] ?? null;
session_write_close();

if ($userId === null) {
    respond(200, ['ok' => true, 'user' => null]);
}

$statement = db()->prepare('SELECT * FROM users WHERE id = ?');
$statement->execute([$userId]);
$user = $statement->fetch();

respond(200, ['ok' => true, 'user' => $user ? public_user($user) : null]);
