# Personalized Learning Content (XAMPP PHP)

This workspace contains a minimal PHP MVC scaffold compatible with XAMPP (Apache + MySQL).

## Requirements
- XAMPP (PHP 8+ recommended)
- MySQL (via XAMPP)

## Setup (XAMPP)
1. Start **Apache** and **MySQL** from XAMPP Control Panel.
2. Create database `plc`.
   - Open `http://localhost/phpmyadmin`
   - Create DB: `plc`
3. Import schema:
   - Import `database/schema.sql`
4. Put the project under XAMPP `htdocs`:
   - Option A: Copy this folder into `xampp/htdocs/plc`
   - Option B: Create a symlink (macOS):
     - `ln -s "/Users/ceydayildiz/Desktop/software engineer" "/Applications/XAMPP/htdocs/plc"`
5. Open in browser:
   - `http://localhost/plc/public`

## Notes
- Email verification and password reset are **demo mode**: the app shows verification/reset links as flash messages.
- Configure base URL in `config/app.php` if you deploy under a subpath.
