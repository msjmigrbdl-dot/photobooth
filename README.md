# Photo Booth Member (PWA)

Aplikasi photo booth Indogrosir Bandar Lampung yang bisa di-install di HP.
Tampilan dihosting di GitHub Pages; data disimpan ke Google Drive & Sheet
lewat Web App Google Apps Script.

## Isi repo

| File | Fungsi |
| --- | --- |
| `index.html` | Aplikasi (tampilan + logika) |
| `config.js` | URL Web App Apps Script (wajib diisi sekali) |
| `manifest.webmanifest` | Nama, ikon, warna aplikasi saat di-install |
| `sw.js` | Service worker agar bisa di-install |
| `icons/` | Ikon aplikasi |

## Mengubah tampilan

Edit `index.html`, lalu naikkan `VERSI` di `sw.js` (misalnya `photobooth-v2`)
agar HP mengambil versi baru. Tutup lalu buka ulang aplikasi di HP.

Aplikasi ini tanpa PIN: siapa pun yang tahu link GitHub Pages bisa memakainya.
Jangan sebar link di luar tim operator.
