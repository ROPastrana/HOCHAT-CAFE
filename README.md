# Hochat Café website

Plain HTML, CSS and JavaScript, with a PHP and MySQL backend for accounts.

## Run it locally

1. Open the XAMPP Control Panel and start **MySQL**.
2. Create the database (first time only):

   ```
   C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS hochat_cafe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; USE hochat_cafe; source database/schema.sql;"
   ```

3. Double-click `start-server.bat`.
4. Open <http://localhost:8000>.

Login won't work if you open the HTML files directly or use VS Code Live Server, because those can't run PHP.

## Accounts API

Each endpoint replies with JSON containing `ok`. Failed requests also include `error`.

| Endpoint | Method | Send | Returns |
| --- | --- | --- | --- |
| `api/signup.php` | POST | `firstName`, `lastName`, `email`, `contactNumber`, `password` | `ok` |
| `api/login.php` | POST | `email`, `password` | `user`, and starts a session |
| `api/logout.php` | POST | `{}` | `ok`, and ends the session |
| `api/me.php` | GET | nothing | `user`, or `null` for a guest |

POST requests must use `Content-Type: application/json`.

Database settings and login limits are in `api/includes/config.php`.

## Put it online

You need a host with PHP 8.1 or newer and MySQL or MariaDB. Vercel can't run this backend.

1. In the hosting panel, create a MySQL database and a user with a strong password.
2. Import `database/schema.sql` into that database with phpMyAdmin.
3. Upload the website files to the web folder: `htdocs` on InfinityFree, `public_html` on most other hosts. Leave out `database/`, `docs/`, `start-server.bat`, and this README.
4. In `api/includes/`, copy `config.local.example.php` to `config.local.php` and fill in the database details exactly as the hosting panel shows them. Never commit this file.
5. Turn on HTTPS in the hosting panel. The session cookie becomes `Secure` automatically.
6. Open the site, create an account, log out, and log back in.

The `.htaccess` file in `api/includes` blocks direct access on Apache and LiteSpeed hosts.
