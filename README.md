# Seleksi Magang Backend Developer
Dokumentasi penggunan REST API dengan menggunakan AdonisJS versi 5 dan PostgreSQL.

## 🧭 Base URL
http://127.0.0.1:3333
---

## 📚 Endpoints

### ✅ Conversations

#### `GET /conversations`
Menampilkan seluruh data conversations beserta messages-nya.

#### `GET /conversations/:id_or_uuid`
Menampilkan seluruh data messages berdasarkan conversation id atau session id-nya.

#### `POST /conversations`
Buat data conversation baru. sessionId akan di-generate secara otomatis (uuid).

#### `PUT /conversations/:id`
Edit data conversation berdasarkan idnya.

**Body (JSON):**
```json
{
  "sessionId": "a212306a-2e4d-4e57-b095-d64ba6c6a51c",
  "lastMessageId": "12",
}
```
**Deskripsi**
| Nama               | Tipe   | Deskripsi                                                                 | Batasan                    |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `sessionId`         | uuid | Mengubah sessionId.                        | Optional, uuid 32-bit     |
| `lastMessageId` | integer | Mengubah pesan terakhir.     | Optional     |

#### `DELETE /conversations/:id`
Delete data conversation berdasarkan idnya.

### ✅ Messages
#### `GET /messages`
Menampilkan seluruh pesan (user dan bot).

#### `DELETE /messages/:id`
Menghapus pesan berdasarkan idnya.

### ✅ Questions
#### `POST /questions`
Membuat pertanyaan baru. Pertanyaan akan disimpan ke Messages, beserta dengan jawabannya.

**Body (JSON):**
```json
{
  "conversationId": "12",
  "senderType": "user",
  "message": "Apa saja layanan di jawa timur?",
  "additionalMessage": "berikan layanan kesehatan",
}
```
**Response (JSON):**
```json
{
    "answer": "Layanan kesehatan di Jawa Timur mencakup berbagai fasilitas dan aplikasi yang dirancang untuk meningkatkan akses dan kualitas layanan kesehatan bagi masyarakat. Salah satu inisiatif utama adalah aplikasi Sehat Indonesia-Ku (ASIK) Imunisasi, yang menyediakan platform digital untuk pendataan, pelaksanaan, dan monitoring program imunisasi. Aplikasi ini terintegrasi dengan sistem informasi kesehatan daerah dan database kependudukan, serta menyediakan fitur-fitur seperti personalized immunization calendar, real-time vaccine tracker, dan emergency alert system.\n\nSelain itu, RSUD Dr. Soetomo di Surabaya berfungsi sebagai rumah sakit rujukan nasional yang menawarkan berbagai layanan kesehatan, termasuk pendaftaran online dan telemedicine. \n\nUntuk informasi lebih lanjut, masyarakat dapat mengakses layanan melalui platform digital terintegrasi seperti Majadigi, yang menyediakan lebih dari 36 layanan publik unggulan."
}
```
**Deskripsi**
| Nama               | Tipe   | Deskripsi                                                                 | Batasan                    |
|--------------------|--------|---------------------------------------------------------------------------|----------------------------|
| `conversationId`         | integer | Acuan conversationId, jika tidak ada maka api akan generate conversation baru.                        | optional     |
| `senderType` | string | Tipe sender.     | wajib, user atau bot     |
| `message` | string | Pertanyaan yang akan diajukan.     | wajib, maksimal 1000 karakter, minimal 1 karakter     |
| `additionalMessage` | string | Konteks tambahan pada pertanyaan.     | optional, maksimal 2000 karakter     |

### ✅ Pivots
#### `GET /pivots`
Menampilkan data pivot (relasi antara message dan conversation).

#### `post /pivots`
Membuat relasi antara message dan conversations.

**Body (JSON):**
```json
{
  "conversationId": "12",
  "messageId": "9",
}
```
