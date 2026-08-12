# Software Design Document (SDD)
# NutriFlow — Progressive Web App
## Nutrition App, Specialist Practitioner Portal & Super Admin Control Center

| Item | Keterangan |
|---|---|
| **Nama Proyek** | NutriFlow PWA |
| **Jenis Dokumen** | Software Design Document (SDD) |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-08-12 |
| **Status** | Draft untuk Implementasi |
| **Acuan Utama** | SRS NutriFlow v1.0, Analisis Fitur Unggulan NutriFlow, Laporan Pengembangan Fitur |
| **Target Pembaca** | Tim Developer, AI Coding Agent, QA Engineer, DevOps, Product Owner, Security Reviewer |

## Daftar Isi
---

1. [Pendahuluan](#1-pendahuluan)
2. [Tujuan Desain Sistem](#2-tujuan-desain-sistem)
3. [Ringkasan Produk](#3-ringkasan-produk)
4. [Arsitektur Sistem](#4-arsitektur-sistem)
5. [Desain Portal dan Routing](#5-desain-portal-dan-routing)
6. [Desain Role-Based Access Control](#6-desain-role-based-access-control)
7. [Desain Modul Fungsional](#7-desain-modul-fungsional)
8. [Desain Data dan Database](#8-desain-data-dan-database)
9. [Desain API](#9-desain-api)
10. [Desain Autentikasi dan Session](#10-desain-autentikasi-dan-session)
11. [Desain Keamanan dan Compliance](#11-desain-keamanan-dan-compliance)
12. [Desain PWA](#12-desain-pwa)
13. [Desain Integrasi Eksternal](#13-desain-integrasi-eksternal)
14. [Desain UI/UX dan Komponen Frontend](#14-desain-uiux-dan-komponen-frontend)
15. [Desain Workflow Utama](#15-desain-workflow-utama)
16. [Desain Error Handling dan Logging](#16-desain-error-handling-dan-logging)
17. [Desain Audit Trail](#17-desain-audit-trail)
18. [Desain Notifikasi](#18-desain-notifikasi)
19. [Desain Offline, Queue, dan Sync](#19-desain-offline-queue-dan-sync)
20. [Desain Deployment dan Environment](#20-desain-deployment-dan-environment)
21. [Desain Testing](#21-desain-testing)
22. [Traceability Design terhadap SRS](#22-traceability-design-terhadap-srs)
23. [Risiko Teknis dan Mitigasi](#23-risiko-teknis-dan-mitigasi)
24. [Lampiran](#24-lampiran)

---

# 1. Pendahuluan

## 1.1 Tujuan Dokumen

Dokumen ini mendefinisikan desain perangkat lunak untuk pengembangan **NutriFlow**, sebuah **Progressive Web App** yang terdiri dari:

1. **Client Portal**
2. **Specialist Practitioner Portal**
3. **Super Admin Control Center**

Dokumen SDD ini digunakan sebagai panduan implementasi teknis oleh:

- Frontend developer
- Backend developer
- Full-stack developer
- AI coding agent
- QA engineer
- DevOps engineer
- Security reviewer
- Product owner

SDD ini tidak menggantikan SRS.  
SRS menjelaskan **apa yang harus dibuat**, sedangkan SDD ini menjelaskan **bagaimana sistem dirancang dan diimplementasikan**.

---

## 1.2 Ruang Lingkup Desain

Desain dalam dokumen ini mencakup:

- Arsitektur aplikasi PWA
- Struktur routing multi-portal
- Desain modul frontend dan backend
- Desain database
- Desain API
- Desain autentikasi dan otorisasi
- Desain keamanan data medis
- Desain AI food scanner
- Desain appointment
- Desain payment simulation dan integrasi payment gateway
- Desain offline mode dan background sync
- Desain audit log
- Desain notifikasi
- Desain deployment environment
- Desain testing dan traceability

---

## 1.3 Referensi Dokumen

Dokumen ini disusun berdasarkan:

| Dokumen | Fungsi |
|---|---|
| `SRS-NutriFlow.md` | Sumber kebutuhan fungsional dan non-fungsional |
| `Analisis Fitur Unggulan Nutriflow.md` | Sumber analisis fitur, gap, rekomendasi, dan risiko |
| `feature_development_report.md` | Sumber status pengembangan fitur dalam bahasa Inggris |
| `laporan_pengembangan_fitur.md` | Sumber status pengembangan fitur dalam bahasa Indonesia |

---

# 2. Tujuan Desain Sistem

NutriFlow dirancang sebagai sistem nutrisi digital hybrid yang menggabungkan fitur **nutrition tracking**, **practice management**, **AI food intelligence**, **appointment**, dan **commerce**.

Tujuan utama desain sistem adalah:

1. Menyediakan satu platform PWA yang dapat digunakan oleh client, specialist, admin staff, dan super admin.
2. Memastikan seluruh akses berbasis role dan aman.
3. Mendukung data sensitif seperti alergi, kondisi medis, medication, lab markers, dan riwayat kesehatan.
4. Mendukung penggunaan mobile-first dengan kemampuan PWA.
5. Memastikan sistem dapat dikembangkan bertahap dari prototype menuju production-ready.
6. Menyediakan desain modular agar fitur mudah dikembangkan, diuji, dan dipelihara.
7. Mencegah risiko prototype, khususnya:
   - akses admin publik,
   - payment simulation yang terlalu realistis,
   - kebocoran data medis,
   - tidak adanya audit trail,
   - tidak adanya validasi role di server.

---

# 3. Ringkasan Produk

## 3.1 Area Sistem

NutriFlow terdiri dari tiga area utama:

| Area | Route Utama | Pengguna | Fungsi Utama |
|---|---|---|---|
| Client Portal | `/app/**` atau `/` | Client / Pasien | Dashboard, food diary, AI scan, program, appointment, payment, review, chat |
| Specialist Portal | `/admin/**` | Specialist / Admin Staff | Client management, intake, meal builder, food library, appointment, scan review |
| Super Admin Control Center | `/control-center/**` | Super Admin | User allocation, platform management, audit log, system configuration |

---

## 3.2 Prinsip Desain

Sistem dirancang berdasarkan prinsip berikut:

1. **Security by Design**
   - Semua route sensitif wajib berada di belakang autentikasi.
   - Semua endpoint wajib melakukan role validation di server.
   - Data medis hanya dapat diakses oleh role yang berhak.

2. **Mobile-first PWA**
   - UI dirancang untuk penggunaan mobile terlebih dahulu.
   - Mendukung installable app, offline partial, dan background sync.

3. **Modular Architecture**
   - Setiap domain bisnis dipisahkan menjadi modul.
   - Modul dapat dikembangkan secara independen.

4. **Auditability**
   - Semua perubahan data medis, program, appointment, dan payment dicatat.

5. **Scalable Data Model**
   - Struktur database mendukung client-practitioner relationship, program dinamis, food diary, dan session history.

6. **Progressive Enhancement**
   - Fitur dasar harus tetap berjalan meskipun fitur AI, payment, atau push notification belum aktif.

---

# 4. Arsitektur Sistem

## 4.1 High-Level Architecture

Arsitektur NutriFlow menggunakan pola **client-server architecture** dengan frontend PWA dan backend API.

```text
+------------------------------------------------------+
|                    Client Devices                    |
|------------------------------------------------------|
| Browser / Mobile Browser / Installed PWA             |
+----------------------------+-------------------------+
                             |
                             | HTTPS
                             v
+------------------------------------------------------+
|                  Frontend PWA Layer                  |
|------------------------------------------------------|
| Client Portal | Specialist Portal | Control Center    |
| UI Components | State Management  | Service Worker    |
+----------------------------+-------------------------+
                             |
                             | REST / JSON API
                             v
+------------------------------------------------------+
|                   Backend API Layer                  |
|------------------------------------------------------|
| Auth Service       | User Service       | RBAC Service   |
| Client Service     | Program Service    | Diary Service  |
| AI Scan Service    | Appointment Service| Payment Service|
| Notification Svc   | Audit Service      | File Service   |
+----------------------------+-------------------------+
                             |
                             v
+------------------------------------------------------+
|                    Data Layer                        |
|------------------------------------------------------|
| Relational DB | Object Storage | Cache | Queue         |
+----------------------------+-------------------------+
                             |
                             v
+------------------------------------------------------+
|                External Integrations                 |
|------------------------------------------------------|
| Email | Push | Payment Gateway | AI Vision API       |
| Calendar | Telehealth | Analytics / Monitoring       |
+------------------------------------------------------+
```

---

## 4.2 Recommended Technology Stack

| Layer | Rekomendasi Teknologi | Catatan |
|---|---|---|
| Frontend | React / Next.js / Vite React | Cocok untuk PWA dan multi-portal |
| Styling | Tailwind CSS / CSS Modules | Mobile-first dan reusable design system |
| Backend | Node.js + Express / NestJS / Next.js API Routes | NestJS disarankan jika sistem besar |
| Database | PostgreSQL | Relasional, kuat untuk medical data dan audit |
| ORM | Prisma / Drizzle | Mempermudah migration dan type safety |
| Auth | Secure HTTP-only Cookie + JWT session token | Hindari localStorage untuk token sensitif |
| Object Storage | S3-compatible storage | Untuk foto makanan, avatar, file PDF |
| Queue | BullMQ / Cloud task queue | Untuk AI scan async, email, push notification |
| Cache | Redis | Untuk session cache, rate limit, queue |
| PWA | Web App Manifest + Service Worker | Offline partial dan installable app |
| Payment | Stripe / Xendit / Airwallex | Gunakan tokenization gateway |
| Email | SendGrid / Mailgun / AWS SES | Email verification, invitation, reminder |
| AI Scan | Vision model / external AI API | Food recognition dan nutrition estimation |
| Monitoring | Sentry + structured logs | Error tracking dan observability |

---

## 4.3 Deployment Architecture

```text
+------------------+       +------------------+
|   Demo Env       |       |   Staging Env    |
| Dummy Data Only  |       | Test Gateway     |
+------------------+       +------------------+

          +--------------------------+
          |     Production Env       |
          | Real Users, Real Payment |
          +--------------------------+
```

Setiap environment harus memiliki:

- database terpisah,
- secret key terpisah,
- storage bucket terpisah,
- konfigurasi payment terpisah,
- konfigurasi AI API terpisah,
- URL frontend/backend terpisah.

---

# 5. Desain Portal dan Routing

## 5.1 Struktur Route Utama

| Route | Portal | Akses |
|---|---|---|
| `/` | Public landing / client entry | Public |
| `/login` | Login | Public |
| `/register` | Register client | Public |
| `/verify-email` | Email verification | Public dengan token |
| `/forgot-password` | Forgot password | Public |
| `/reset-password` | Reset password | Public dengan token |
| `/app/dashboard` | Client dashboard | Client |
| `/app/food-diary` | Food diary | Client |
| `/app/scan` | AI food scanner | Client |
| `/app/programs` | Client program | Client |
| `/app/appointments` | Appointment client | Client |
| `/app/profile` | Client profile | Client |
| `/app/payments` | Payment and invoices | Client |
| `/app/messages` | Secure messaging | Client |
| `/admin/dashboard` | Practitioner dashboard | Specialist, Admin Staff |
| `/admin/clients` | Client management | Specialist, Admin Staff terbatas |
| `/admin/programs` | Program builder | Specialist |
| `/admin/meal-builder` | Weekly meal builder | Specialist |
| `/admin/food-library` | Food and recipe library | Specialist |
| `/admin/appointments` | Appointment management | Specialist, Admin Staff |
| `/admin/services` | Service management | Specialist |
| `/admin/scans` | AI scan review | Specialist |
| `/admin/messages` | Secure messaging | Specialist |
| `/admin/profile` | Specialist profile | Specialist |
| `/control-center/dashboard` | Super admin dashboard | Super Admin |
| `/control-center/users` | User management | Super Admin |
| `/control-center/allocation` | User allocation | Super Admin |
| `/control-center/audit-logs` | Audit log viewer | Super Admin |
| `/control-center/system-config` | System config | Super Admin |

---

## 5.2 Route Guard Design

Setiap route dibagi menjadi:

1. **PublicRoute**
2. **AuthenticatedRoute**
3. **RoleProtectedRoute**
4. **SensitiveDataRoute**

Contoh desain middleware:

```text
Request masuk
   |
   v
Cek session cookie
   |
   +-- Tidak valid --> Redirect /login
   |
   v
Cek role user
   |
   +-- Tidak sesuai --> Return 403 + audit log
   |
   v
Cek scope data
   |
   +-- Tidak berhak pada resource --> Return 404/403 + audit log
   |
   v
Lanjut ke handler
```

---

## 5.3 Aturan Proteksi Route

| Area | Aturan |
|---|---|
| `/admin/**` | Wajib authenticated dan role Specialist/Admin Staff/Super Admin |
| `/control-center/**` | Wajib authenticated dan role Super Admin |
| `/app/**` | Wajib authenticated dan role Client |
| Invitation preview | Tidak boleh menampilkan data medis |
| Payment route | Demo harus menampilkan disclaimer besar |
| Medical intake | Wajib permission sensitif |

---

# 6. Desain Role-Based Access Control

## 6.1 Role

| Role | Deskripsi |
|---|---|
| `CLIENT` | Pengguna akhir/pasien |
| `SPECIALIST` | Praktisi nutrisi |
| `ADMIN_STAFF` | Staff praktik dengan akses terbatas |
| `SUPER_ADMIN` | Pengelola platform |
| `SYSTEM` | Role internal untuk job otomatis |

---

## 6.2 Permission Matrix

| Resource | Client | Specialist | Admin Staff | Super Admin |
|---|---:|---:|---:|---:|
| Own Profile | CRUD | Read assigned | Limited | CRUD |
| Medical Intake | Own read/update terbatas | CRUD assigned | Limited/optional | CRUD |
| Food Diary | CRUD own | Read assigned | No / Limited | Read |
| Program | Read assigned | CRUD own programs | Limited | CRUD |
| Appointment | CRUD own | CRUD assigned | CRUD operational | CRUD |
| Payment | Read own | Read assigned | Limited | CRUD |
| Food Library | Read published | CRUD own/global scope | CRUD limited | CRUD |
| AI Scan | CRUD own | Review assigned | Limited | CRUD |
| Audit Log | No | Own activity limited | No | Full |
| User Allocation | No | No | No | Full |
| System Config | No | No | No | Full |

---

## 6.3 Resource Ownership Rules

Desain ownership wajib diterapkan pada backend.

Contoh:

- Client hanya dapat mengakses `client_id` miliknya.
- Specialist hanya dapat mengakses client yang terhubung melalui `client_specialist_assignments`.
- Admin Staff hanya dapat mengakses data sesuai permission yang diberikan oleh Specialist atau Super Admin.
- Super Admin dapat mengakses seluruh resource dengan audit log wajib.

---

# 7. Desain Modul Fungsional

## 7.1 Modul Authentication

### Tanggung Jawab

Modul ini menangani:

- registrasi,
- login,
- logout,
- email verification,
- forgot password,
- reset password,
- 2FA,
- consent tracking,
- session management.

### Komponen Backend

| Komponen | Fungsi |
|---|---|
| `AuthController` | Endpoint auth |
| `AuthService` | Business logic auth |
| `PasswordService` | Hashing dan password validation |
| `TokenService` | Generate token verification/reset |
| `SessionService` | Session lifecycle |
| `TwoFactorService` | TOTP/email OTP |
| `ConsentService` | Penyimpanan consent |

### Aturan Desain

- Password disimpan menggunakan hash kuat seperti Argon2id atau bcrypt.
- Token reset password harus:
  - random,
  - single-use,
  - expiry,
  - hashed di database.
- Email verification wajib sebelum akun aktif penuh.
- Specialist dan Super Admin wajib 2FA.
- Session disimpan sebagai secure cookie:
  - `httpOnly`
  - `secure`
  - `SameSite=Lax` atau `Strict`
  - expiry jelas

---

## 7.2 Modul Client Dashboard

### Tanggung Jawab

Dashboard client menampilkan ringkasan aktivitas dan progres nutrisi.

### Data yang Ditampilkan

- konsumsi kalori hari ini,
- target kalori,
- konsumsi protein,
- konsumsi karbohidrat,
- konsumsi lemak,
- appointment berikutnya,
- program aktif,
- progress mingguan/bulanan,
- grafik berat badan,
- grafik body fat,
- notifikasi terbaru.

### Desain Query

Dashboard sebaiknya menggunakan endpoint agregasi:

```text
GET /api/client/dashboard/summary
```

Response menggabungkan:

- `dailyNutritionSummary`
- `activeProgram`
- `nextAppointment`
- `weightTrend`
- `bodyFatTrend`
- `notifications`

Tujuannya mengurangi banyak request frontend.

---

## 7.3 Modul Food Diary

### Tanggung Jawab

Food Diary menangani pencatatan konsumsi makanan harian.

### Fitur Utama

- input makanan manual,
- input dari food library,
- input dari AI scan,
- edit entry,
- delete entry,
- summary kalori dan makro,
- riwayat kalender,
- estimasi mikronutrien jika tersedia.

### Meal Type

```text
BREAKFAST
LUNCH
DINNER
SNACK
OTHER
```

### Status Entry

```text
DRAFT
CONFIRMED
DELETED
```

### Desain Agregasi Nutrisi

Setiap perubahan diary entry harus memicu recalculation:

```text
Daily total calories = sum(entry.calories)
Daily protein = sum(entry.protein)
Daily carbs = sum(entry.carbs)
Daily fat = sum(entry.fat)
```

Data summary dapat dihitung secara:

1. real-time query, atau
2. materialized summary table `daily_nutrition_summaries`.

Untuk performa, disarankan menggunakan kombinasi:

- hitung real-time untuk MVP,
- simpan summary untuk production scale.

---

## 7.4 Modul AI Food Scanner

### Tanggung Jawab

Modul ini menangani upload gambar makanan, analisis AI, editing hasil, dan penyimpanan ke food diary.

### Arsitektur Proses

```text
Client upload image
   |
   v
Backend creates scan record
   |
   v
Image stored in object storage
   |
   v
AI scan job queued
   |
   v
AI Vision API processes image
   |
   v
Nutrition estimation generated
   |
   v
Result saved
   |
   v
Client receives result / notification
```

### Scan Status

```text
UPLOADED
QUEUED
PROCESSING
COMPLETED
FAILED
NEEDS_REVIEW
SAVED_TO_DIARY
```

### Data Hasil Scan

- detected food name,
- estimated portion,
- calories,
- protein,
- carbs,
- fat,
- micronutrients optional,
- confidence score,
- AI notes,
- matched food library item,
- suitability warning,
- allergen warning.

### Confidence Rule

| Confidence | Treatment |
|---|---|
| >= 85% | Tampilkan sebagai hasil utama |
| 60–84% | Tampilkan warning “Periksa kembali hasil scan” |
| < 60% | Tandai `NEEDS_REVIEW`, dorong edit manual atau specialist review |

### Specialist Review

Specialist dapat:

- melihat scan milik client assigned,
- memberi correction,
- mengirim hasil ke client,
- menambahkan ke meal plan,
- menyimpan sebagai item library bila relevan.

---

## 7.5 Modul Program Nutrisi

### Tanggung Jawab

Modul ini menangani pembuatan, publikasi, assignment, invitation, dan progress program.

### Struktur Program

```text
Program
 ├── Program Days
 │    ├── Meal Plans
 │    │    ├── Breakfast
 │    │    ├── Lunch
 │    │    ├── Dinner
 │    │    └── Snack
 │    └── Activity Checklist
 ├── Nutrition Targets
 ├── Assigned Clients
 └── Progress Records
```

### Program Status

```text
DRAFT
PUBLISHED
ARCHIVED
```

### Program Assignment Status

```text
INVITED
ACTIVE
PAUSED
COMPLETED
REVOKED
```

### Template Program

Template bawaan:

- Weight Loss
- Muscle Gain
- Maintenance
- Low Sodium
- Halal Diet
- Vegetarian
- Vegan
- Keto / Low Carb

### Progress Calculation

Progress program dihitung berdasarkan:

- meal checklist completion,
- activity checklist completion,
- diary compliance,
- AI scan suitability,
- specialist notes.

Contoh formula sederhana:

```text
program_progress =
  (meal_completion_score * 0.4) +
  (activity_completion_score * 0.2) +
  (nutrition_target_score * 0.3) +
  (specialist_review_score * 0.1)
```

Nilai dapat disimpan sebagai persentase.

---

## 7.6 Modul Program Invitation

### Tanggung Jawab

Menyediakan undangan program melalui email secara aman.

### Desain Token

Invitation link wajib menggunakan token acak.

```text
/program-invite/:token
```

Token tidak boleh berisi:

- client ID mentah,
- program ID mentah,
- email mentah,
- data medis,
- data sensitif.

### Token Rules

- Token random minimal 128-bit entropy.
- Token disimpan dalam bentuk hash di database.
- Token memiliki expiry.
- Token dapat di-revoke.
- Semua akses token dicatat.

### Preview Page

Sebelum login/registrasi, halaman preview hanya boleh menampilkan:

- nama program,
- nama specialist,
- deskripsi umum,
- CTA register/login.

Tidak boleh menampilkan:

- medical condition,
- allergies,
- medications,
- personal nutrition target,
- notes klinis,
- session summary.

---

## 7.7 Modul Appointment & Booking

### Tanggung Jawab

Modul appointment menangani booking, availability, reschedule, cancel, reminder, calendar sync, dan meeting link.

### Appointment Status

```text
PENDING
CONFIRMED
RESCHEDULED
CANCELLED
COMPLETED
NO_SHOW
```

### Appointment Type

```text
VIRTUAL
IN_PERSON
HYBRID
```

### Booking Flow

```text
Client pilih service
   |
   v
Client pilih specialist
   |
   v
Sistem ambil availability
   |
   v
Client pilih tanggal dan slot
   |
   v
Sistem lock slot sementara
   |
   v
Client konfirmasi / bayar jika perlu
   |
   v
Appointment dibuat
   |
   v
Reminder dijadwalkan
```

### Slot Locking

Untuk mencegah double booking:

- saat client memilih slot, sistem membuat temporary lock,
- lock berlaku misalnya 5–10 menit,
- jika checkout/konfirmasi tidak selesai, lock dilepas.

### Cut-off Rules

- Reschedule/cancel diperbolehkan maksimal H-24 jam.
- Specialist/Super Admin dapat override dengan audit log.
- Cancel mendadak dapat diberi status `LATE_CANCELLED`.

---

## 7.8 Modul Meal & Food Detail

### Tanggung Jawab

Menampilkan detail makanan dan kesesuaian terhadap profil client.

### Data Detail

- nama makanan,
- serving size,
- kalori,
- protein,
- karbohidrat,
- lemak,
- ingredients,
- steps jika resep,
- allergens,
- diet labels,
- micronutrients,
- catatan nutritionist,
- suitability score.

### Suitability Score

Suitability score dihitung berdasarkan:

- target kalori client,
- diet preference,
- allergen conflict,
- medical condition,
- sodium level,
- macro target,
- program aktif.

Contoh rule:

| Kondisi | Efek |
|---|---|
| Mengandung allergen client | Score 0 dan tampilkan critical warning |
| Sesuai diet label | Tambah score |
| Melebihi sodium untuk low sodium diet | Kurangi score besar |
| Protein sesuai target | Tambah score |
| Kalori terlalu tinggi | Kurangi score |

---

## 7.9 Modul Food / Recipe Library

### Tanggung Jawab

Mengelola database makanan dan resep.

### Jenis Item

```text
FOOD
RECIPE
INGREDIENT
MEAL_TEMPLATE
```

### Status Item

```text
DRAFT
PUBLISHED
ARCHIVED
```

### Scope Library

```text
GLOBAL
SPECIALIST_PRIVATE
CLIENT_SPECIFIC
```

### Fitur Library

- tambah makanan,
- tambah resep,
- upload image,
- ingredients,
- steps,
- tag diet,
- tag allergen,
- serving size,
- search,
- filter,
- clone recipe,
- archive,
- publish.

---

## 7.10 Modul Client Management & Medical Intake

### Tanggung Jawab

Modul ini digunakan specialist untuk mengelola profil client, intake medis, antropometri, lab markers, dan riwayat.

### Data Sensitif

Berikut data diklasifikasikan sensitif:

- allergies,
- medical conditions,
- medications,
- lab markers,
- emergency contact,
- informed consent,
- family disease history,
- diet history,
- specialist notes,
- session summary.

### Aturan Desain

- Setiap perubahan data medis wajib dicatat di audit log.
- Admin Staff hanya dapat mengakses subset data.
- Data sensitif tidak boleh tampil di halaman publik.
- Data sensitif tidak boleh muncul dalam metadata, preview link, atau error message.
- Query backend wajib memvalidasi assignment specialist-client.

---

## 7.11 Modul Session Summary

### Tanggung Jawab

Mencatat ringkasan sesi konsultasi antara specialist dan client.

### Data Session Summary

- tanggal sesi,
- berat badan,
- body fat,
- target kalori,
- target protein,
- anjuran makanan,
- catatan specialist,
- action plan,
- target mingguan,
- attachment,
- PDF export.

### AI Session Summary

Untuk fitur lanjutan, AI dapat membuat draft ringkasan dari catatan sesi.

Desain aman:

- AI output selalu berstatus draft.
- Specialist wajib review sebelum publish.
- Semua AI-generated text diberi label.
- Jangan kirim data medis ke provider AI tanpa dasar compliance dan consent.

---

## 7.12 Modul Services & Commerce

### Tanggung Jawab

Mengelola layanan konsultasi, harga, durasi, tipe, checkout, invoice, dan payment status.

### Service Type

```text
VIRTUAL_ONLY
IN_PERSON
VIRTUAL_OR_IN_PERSON
```

### Payment Status

```text
PENDING
PAID
FAILED
REFUNDED
CANCELLED
```

### Demo Payment Rules

Pada environment demo:

- tampilkan disclaimer besar:
  `SIMULASI PROTOTYPE — TIDAK ADA TRANSAKSI NYATA`
- tampilkan watermark pada modal,
- field kartu dummy disabled,
- tidak boleh ada network request saat input kartu,
- tidak boleh menyimpan data kartu,
- tidak boleh menggunakan logo/payment claim yang menyesatkan.

### Production Payment Rules

Pada production:

- gunakan payment gateway resmi,
- gunakan tokenization,
- server tidak menyimpan data kartu,
- server hanya menerima payment token/payment intent,
- webhook gateway memutakhirkan status pembayaran,
- invoice dibuat setelah pembayaran berhasil.

---

## 7.13 Modul Review Specialist

### Tanggung Jawab

Client dapat memberi review terhadap specialist setelah appointment selesai.

### Review Rules

- Hanya client dengan appointment `COMPLETED` yang boleh memberi review.
- Satu appointment hanya boleh menghasilkan satu review.
- Review dapat dimoderasi.
- Specialist tidak boleh mengubah isi review.
- Super Admin dapat hide review jika melanggar aturan.

### Review Data

- rating,
- comment,
- category ratings,
- appointment reference,
- moderation status.

### Moderation Status

```text
PENDING
APPROVED
REJECTED
HIDDEN
```

---

## 7.14 Modul Secure Messaging

### Tanggung Jawab

Menyediakan komunikasi aman antara client dan specialist.

### Desain Dasar

- Conversation hanya antara client dan assigned specialist.
- Message dapat berupa teks dan attachment.
- Semua akses conversation divalidasi berdasarkan assignment.
- Message medis dianggap data sensitif.
- Audit log dibuat untuk akses attachment sensitif.

### Message Status

```text
SENT
DELIVERED
READ
DELETED
```

---

## 7.15 Modul Notification

### Tanggung Jawab

Mengirim dan menampilkan notifikasi.

### Channel

- In-app notification
- Email
- Push notification
- Optional: WhatsApp/SMS untuk fase lanjutan

### Notification Type

```text
APPOINTMENT_REMINDER
PROGRAM_REMINDER
PAYMENT_REMINDER
NEW_MESSAGE
SCAN_COMPLETED
PROGRAM_INVITATION
SESSION_SUMMARY_PUBLISHED
REVIEW_REQUEST
SYSTEM_ALERT
```

---

## 7.16 Modul Super Admin Control Center

### Tanggung Jawab

Portal ini digunakan untuk mengelola platform secara keseluruhan.

### Fitur

- dashboard platform,
- user management,
- specialist management,
- client allocation,
- role management,
- audit log viewer,
- system configuration,
- feature flags,
- environment notices,
- moderation review,
- payment overview.

### User Allocation

Super Admin dapat:

- assign client ke specialist,
- reassign client,
- remove assignment,
- melihat workload specialist,
- mencatat alasan perubahan assignment.

Semua perubahan allocation wajib masuk audit log.

---

# 8. Desain Data dan Database

## 8.1 Database Design Overview

Database utama menggunakan relational database, disarankan PostgreSQL.

Domain utama:

1. Identity & Access
2. Client Health Data
3. Specialist Practice Data
4. Food & Nutrition
5. Program & Meal Plan
6. Diary & AI Scan
7. Appointment
8. Payment
9. Notification
10. Audit Log

---

## 8.2 Entity Relationship Overview

```text
User
 ├── ClientProfile
 ├── SpecialistProfile
 ├── AdminStaffProfile
 └── Sessions

ClientProfile
 ├── MedicalIntake
 ├── AnthropometricRecords
 ├── LabMarkers
 ├── FoodDiaryEntries
 ├── ProgramAssignments
 ├── Appointments
 ├── SessionSummaries
 └── Payments

SpecialistProfile
 ├── ClientAssignments
 ├── Programs
 ├── Services
 ├── Availability
 ├── FoodLibraryItems
 ├── Appointments
 └── SessionSummaries

Program
 ├── ProgramDays
 ├── ProgramMeals
 ├── ProgramActivities
 └── ProgramAssignments

FoodLibraryItem
 ├── NutritionFacts
 ├── Ingredients
 ├── Allergens
 └── DietTags

AiFoodScan
 ├── ScanResults
 ├── Review
 └── DiaryEntry optional

Appointment
 ├── Service
 ├── Payment optional
 └── MeetingLink optional
```

---

## 8.3 Core Tables

### 8.3.1 `users`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `full_name` | VARCHAR | NOT NULL |
| `email` | VARCHAR | UNIQUE, NOT NULL |
| `password_hash` | TEXT | NOT NULL |
| `role` | ENUM | CLIENT, SPECIALIST, ADMIN_STAFF, SUPER_ADMIN |
| `email_verified_at` | TIMESTAMP | NULLABLE |
| `two_factor_enabled` | BOOLEAN | DEFAULT FALSE |
| `status` | ENUM | ACTIVE, PENDING_VERIFICATION, SUSPENDED, DELETED |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.2 `client_profiles`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | FK users.id |
| `date_of_birth` | DATE | NULLABLE |
| `gender` | VARCHAR | NULLABLE |
| `height_cm` | DECIMAL | NULLABLE |
| `current_weight_kg` | DECIMAL | NULLABLE |
| `goal` | VARCHAR | NULLABLE |
| `dietary_preference` | VARCHAR | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.3 `specialist_profiles`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | FK users.id |
| `title` | VARCHAR | NULLABLE |
| `license_number` | VARCHAR | NULLABLE |
| `bio` | TEXT | NULLABLE |
| `specialization` | TEXT | NULLABLE |
| `verified_at` | TIMESTAMP | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.4 `client_specialist_assignments`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `client_id` | UUID | FK client_profiles.id |
| `specialist_id` | UUID | FK specialist_profiles.id |
| `assigned_by` | UUID | FK users.id |
| `status` | ENUM | ACTIVE, INACTIVE, TRANSFERRED |
| `reason` | TEXT | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |
| `ended_at` | TIMESTAMP | NULLABLE |

---

### 8.3.5 `medical_intakes`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `client_id` | UUID | FK client_profiles.id |
| `allergies` | JSONB | DEFAULT [] |
| `medical_conditions` | JSONB | DEFAULT [] |
| `medications` | JSONB | DEFAULT [] |
| `dietary_preferences` | JSONB | DEFAULT [] |
| `emergency_contact` | JSONB | NULLABLE |
| `family_history` | TEXT | NULLABLE |
| `diet_history` | TEXT | NULLABLE |
| `informed_consent_at` | TIMESTAMP | NULLABLE |
| `notes` | TEXT | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.6 `food_library_items`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `owner_specialist_id` | UUID | FK specialist_profiles.id, nullable |
| `scope` | ENUM | GLOBAL, SPECIALIST_PRIVATE, CLIENT_SPECIFIC |
| `type` | ENUM | FOOD, RECIPE, INGREDIENT, MEAL_TEMPLATE |
| `name` | VARCHAR | NOT NULL |
| `category` | VARCHAR | NULLABLE |
| `description` | TEXT | NULLABLE |
| `image_url` | TEXT | NULLABLE |
| `serving_size` | VARCHAR | NULLABLE |
| `calories` | DECIMAL | DEFAULT 0 |
| `protein_g` | DECIMAL | DEFAULT 0 |
| `carbs_g` | DECIMAL | DEFAULT 0 |
| `fat_g` | DECIMAL | DEFAULT 0 |
| `micronutrients` | JSONB | NULLABLE |
| `ingredients` | JSONB | NULLABLE |
| `steps` | JSONB | NULLABLE |
| `allergen_tags` | JSONB | DEFAULT [] |
| `diet_tags` | JSONB | DEFAULT [] |
| `status` | ENUM | DRAFT, PUBLISHED, ARCHIVED |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.7 `food_diary_entries`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `client_id` | UUID | FK client_profiles.id |
| `source` | ENUM | MANUAL, LIBRARY, AI_SCAN |
| `food_library_item_id` | UUID | FK nullable |
| `ai_scan_id` | UUID | FK nullable |
| `entry_date` | DATE | NOT NULL |
| `meal_type` | ENUM | BREAKFAST, LUNCH, DINNER, SNACK, OTHER |
| `food_name` | VARCHAR | NOT NULL |
| `serving_size` | VARCHAR | NULLABLE |
| `quantity` | DECIMAL | DEFAULT 1 |
| `calories` | DECIMAL | DEFAULT 0 |
| `protein_g` | DECIMAL | DEFAULT 0 |
| `carbs_g` | DECIMAL | DEFAULT 0 |
| `fat_g` | DECIMAL | DEFAULT 0 |
| `micronutrients` | JSONB | NULLABLE |
| `notes` | TEXT | NULLABLE |
| `status` | ENUM | DRAFT, CONFIRMED, DELETED |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.8 `ai_food_scans`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `client_id` | UUID | FK nullable |
| `specialist_id` | UUID | FK nullable |
| `image_url` | TEXT | NOT NULL |
| `status` | ENUM | UPLOADED, QUEUED, PROCESSING, COMPLETED, FAILED, NEEDS_REVIEW, SAVED_TO_DIARY |
| `detected_food_name` | VARCHAR | NULLABLE |
| `estimated_portion` | VARCHAR | NULLABLE |
| `calories` | DECIMAL | NULLABLE |
| `protein_g` | DECIMAL | NULLABLE |
| `carbs_g` | DECIMAL | NULLABLE |
| `fat_g` | DECIMAL | NULLABLE |
| `micronutrients` | JSONB | NULLABLE |
| `confidence_score` | DECIMAL | NULLABLE |
| `ai_raw_response` | JSONB | NULLABLE |
| `matched_food_item_id` | UUID | FK nullable |
| `reviewed_by` | UUID | FK users.id nullable |
| `review_notes` | TEXT | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.9 `programs`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `specialist_id` | UUID | FK specialist_profiles.id |
| `name` | VARCHAR | NOT NULL |
| `description` | TEXT | NULLABLE |
| `template_type` | VARCHAR | NULLABLE |
| `status` | ENUM | DRAFT, PUBLISHED, ARCHIVED |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.10 `program_days`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `program_id` | UUID | FK programs.id |
| `day_number` | INTEGER | NOT NULL |
| `target_calories` | DECIMAL | NULLABLE |
| `target_protein_g` | DECIMAL | NULLABLE |
| `target_carbs_g` | DECIMAL | NULLABLE |
| `target_fat_g` | DECIMAL | NULLABLE |
| `notes` | TEXT | NULLABLE |

---

### 8.3.11 `program_meals`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `program_day_id` | UUID | FK program_days.id |
| `meal_type` | ENUM | BREAKFAST, LUNCH, DINNER, SNACK, OTHER |
| `food_library_item_id` | UUID | FK nullable |
| `custom_name` | VARCHAR | NULLABLE |
| `instructions` | TEXT | NULLABLE |
| `sort_order` | INTEGER | DEFAULT 0 |

---

### 8.3.12 `program_assignments`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `program_id` | UUID | FK programs.id |
| `client_id` | UUID | FK client_profiles.id |
| `status` | ENUM | INVITED, ACTIVE, PAUSED, COMPLETED, REVOKED |
| `started_at` | TIMESTAMP | NULLABLE |
| `completed_at` | TIMESTAMP | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |

---

### 8.3.13 `appointments`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `client_id` | UUID | FK client_profiles.id |
| `specialist_id` | UUID | FK specialist_profiles.id |
| `service_id` | UUID | FK services.id |
| `start_time` | TIMESTAMP | NOT NULL |
| `end_time` | TIMESTAMP | NOT NULL |
| `timezone` | VARCHAR | DEFAULT Asia/Singapore or Asia/Jakarta |
| `type` | ENUM | VIRTUAL, IN_PERSON, HYBRID |
| `status` | ENUM | PENDING, CONFIRMED, RESCHEDULED, CANCELLED, COMPLETED, NO_SHOW |
| `meeting_link` | TEXT | NULLABLE |
| `location` | TEXT | NULLABLE |
| `cancel_reason` | TEXT | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.14 `services`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `specialist_id` | UUID | FK specialist_profiles.id |
| `title` | VARCHAR | NOT NULL |
| `description` | TEXT | NULLABLE |
| `duration_minutes` | INTEGER | NOT NULL |
| `price_amount` | DECIMAL | NOT NULL |
| `currency` | VARCHAR | DEFAULT SGD |
| `type` | ENUM | VIRTUAL_ONLY, IN_PERSON, VIRTUAL_OR_IN_PERSON |
| `status` | ENUM | ACTIVE, INACTIVE, ARCHIVED |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.15 `payments`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `client_id` | UUID | FK client_profiles.id |
| `appointment_id` | UUID | FK nullable |
| `service_id` | UUID | FK nullable |
| `amount` | DECIMAL | NOT NULL |
| `currency` | VARCHAR | NOT NULL |
| `status` | ENUM | PENDING, PAID, FAILED, REFUNDED, CANCELLED |
| `gateway_provider` | VARCHAR | NULLABLE |
| `gateway_reference` | VARCHAR | NULLABLE |
| `invoice_number` | VARCHAR | UNIQUE |
| `paid_at` | TIMESTAMP | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |
| `updated_at` | TIMESTAMP | NOT NULL |

---

### 8.3.16 `audit_logs`

| Field | Type | Constraint |
|---|---|---|
| `id` | UUID | PK |
| `actor_user_id` | UUID | FK users.id nullable |
| `actor_role` | VARCHAR | NOT NULL |
| `action` | VARCHAR | NOT NULL |
| `resource_type` | VARCHAR | NOT NULL |
| `resource_id` | UUID | NULLABLE |
| `before_data` | JSONB | NULLABLE |
| `after_data` | JSONB | NULLABLE |
| `ip_address` | VARCHAR | NULLABLE |
| `user_agent` | TEXT | NULLABLE |
| `created_at` | TIMESTAMP | NOT NULL |

---

# 9. Desain API

## 9.1 API Style

API menggunakan REST JSON.

Format URL:

```text
/api/{domain}/{resource}
```

Contoh:

```text
/api/auth/login
/api/client/dashboard/summary
/api/admin/clients
/api/control-center/users
```

---

## 9.2 Standard API Response

### Success

```json
{
  "success": true,
  "data": {},
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-08-12T07:23:00Z"
  }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to access this resource.",
    "details": {}
  },
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-08-12T07:23:00Z"
  }
}
```

---

## 9.3 Auth API

| Method | Endpoint | Access | Fungsi |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Registrasi client |
| POST | `/api/auth/login` | Public | Login |
| POST | `/api/auth/logout` | Authenticated | Logout |
| POST | `/api/auth/verify-email` | Public token | Verifikasi email |
| POST | `/api/auth/forgot-password` | Public | Request reset password |
| POST | `/api/auth/reset-password` | Public token | Reset password |
| POST | `/api/auth/2fa/setup` | Specialist/Super Admin | Setup 2FA |
| POST | `/api/auth/2fa/verify` | Specialist/Super Admin | Verifikasi 2FA |
| GET | `/api/auth/me` | Authenticated | Current user |

---

## 9.4 Client API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/client/dashboard/summary` | Ringkasan dashboard |
| GET | `/api/client/profile` | Profil client |
| PATCH | `/api/client/profile` | Update profil client |
| GET | `/api/client/programs` | Program aktif client |
| GET | `/api/client/appointments` | Appointment client |
| GET | `/api/client/payments` | Payment history |
| GET | `/api/client/session-summaries` | Riwayat session summary |

---

## 9.5 Food Diary API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/diary?date=YYYY-MM-DD` | Ambil diary per tanggal |
| POST | `/api/diary` | Tambah entry |
| PATCH | `/api/diary/{id}` | Edit entry |
| DELETE | `/api/diary/{id}` | Hapus entry |
| GET | `/api/diary/summary?date=YYYY-MM-DD` | Summary kalori/makro |
| GET | `/api/diary/history` | Riwayat kalender |

---

## 9.6 AI Scan API

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/scans` | Upload scan |
| GET | `/api/scans/{id}` | Detail scan |
| PATCH | `/api/scans/{id}` | Edit hasil scan |
| POST | `/api/scans/{id}/save-to-diary` | Simpan ke diary |
| POST | `/api/scans/{id}/send-to-specialist` | Kirim review |
| POST | `/api/admin/scans/{id}/review` | Specialist review |
| POST | `/api/admin/scans/{id}/send-to-client` | Kirim hasil ke client |
| POST | `/api/admin/scans/{id}/add-to-meal-plan` | Tambah ke meal plan |

---

## 9.7 Program API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/admin/programs` | List program |
| POST | `/api/admin/programs` | Buat program |
| GET | `/api/admin/programs/{id}` | Detail program |
| PATCH | `/api/admin/programs/{id}` | Update program |
| POST | `/api/admin/programs/{id}/publish` | Publish program |
| POST | `/api/admin/programs/{id}/assign` | Assign client |
| POST | `/api/admin/programs/{id}/invite` | Kirim invitation |
| POST | `/api/admin/program-invitations/{id}/revoke` | Revoke invitation |
| GET | `/api/program-invitations/{token}` | Preview invitation |
| POST | `/api/program-invitations/{token}/accept` | Accept invitation |

---

## 9.8 Appointment API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/appointments` | List appointment |
| POST | `/api/appointments` | Buat appointment |
| PATCH | `/api/appointments/{id}/reschedule` | Reschedule |
| PATCH | `/api/appointments/{id}/cancel` | Cancel |
| PATCH | `/api/admin/appointments/{id}/confirm` | Confirm |
| PATCH | `/api/admin/appointments/{id}/complete` | Complete |
| GET | `/api/specialists/{id}/availability` | Lihat availability |
| POST | `/api/admin/availability` | Set availability |
| POST | `/api/appointments/{id}/calendar-sync` | Calendar sync |

---

## 9.9 Payment API

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/payments/create-intent` | Buat payment intent |
| GET | `/api/payments/{id}` | Detail payment |
| GET | `/api/payments` | History payment |
| POST | `/api/payments/webhook/{provider}` | Webhook gateway |
| GET | `/api/invoices/{id}` | Detail invoice |
| GET | `/api/invoices/{id}/pdf` | Download PDF invoice |

---

## 9.10 Control Center API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/control-center/dashboard` | Dashboard super admin |
| GET | `/api/control-center/users` | List users |
| PATCH | `/api/control-center/users/{id}` | Update user |
| POST | `/api/control-center/users/{id}/suspend` | Suspend user |
| POST | `/api/control-center/allocation` | Assign client-specialist |
| PATCH | `/api/control-center/allocation/{id}` | Reassign / deactivate |
| GET | `/api/control-center/audit-logs` | List audit logs |
| GET | `/api/control-center/system-config` | System config |
| PATCH | `/api/control-center/system-config` | Update config |

---

# 10. Desain Autentikasi dan Session

## 10.1 Login Flow

```text
User submit email + password
   |
   v
Validate credentials
   |
   +-- invalid --> return 401
   |
   v
Check email verification
   |
   +-- not verified --> return EMAIL_NOT_VERIFIED
   |
   v
Check role requires 2FA
   |
   +-- yes --> issue temporary 2FA challenge
   |
   v
Create session
   |
   v
Set secure httpOnly cookie
   |
   v
Return user profile + redirect target
```

---

## 10.2 Redirect Berdasarkan Role

| Role | Redirect Setelah Login |
|---|---|
| CLIENT | `/app/dashboard` |
| SPECIALIST | `/admin/dashboard` |
| ADMIN_STAFF | `/admin/dashboard` |
| SUPER_ADMIN | `/control-center/dashboard` |

---

## 10.3 Session Security

- Cookie harus `httpOnly`.
- Cookie harus `Secure` pada HTTPS.
- Gunakan SameSite `Lax` minimal.
- Session memiliki expiry.
- Refresh token rotation jika menggunakan refresh token.
- Logout harus invalidate session di server.
- Suspended user tidak dapat menggunakan session lama.

---

# 11. Desain Keamanan dan Compliance

## 11.1 Security Controls

| Area | Kontrol |
|---|---|
| Authentication | Password hashing, email verification, 2FA |
| Authorization | RBAC + resource ownership |
| Transport | HTTPS wajib |
| Storage | Enkripsi data sensitif bila memungkinkan |
| Payment | Tokenization gateway, tidak simpan kartu |
| Medical Data | Access control ketat dan audit trail |
| File Upload | MIME validation, size limit, malware scanning optional |
| API | Rate limit, input validation, output sanitization |
| Audit | Semua perubahan data sensitif dicatat |

---

## 11.2 Data Classification

| Kategori | Contoh | Perlindungan |
|---|---|---|
| Public | Nama program umum, landing page | Normal |
| Internal | Program, service, library | Auth required |
| Personal | Nama, email, appointment | Auth + ownership |
| Sensitive Medical | Allergy, condition, medication, lab marker | Strict RBAC + audit |
| Financial | Payment status, invoice | Auth + ownership |
| Secret | API key, token | Secret manager |

---

## 11.3 Input Validation

Semua input harus divalidasi di backend.

Contoh:

- email format,
- password complexity,
- UUID format,
- enum value,
- file type,
- appointment date tidak di masa lalu,
- price tidak negatif,
- calories/macro tidak negatif,
- token invitation valid dan belum expired.

---

## 11.4 File Upload Security

Untuk upload foto makanan:

- maksimal ukuran file, misalnya 10 MB,
- hanya izinkan `image/jpeg`, `image/png`, `image/webp`,
- rename file menggunakan UUID,
- jangan gunakan nama file asli sebagai path,
- simpan di private bucket jika mengandung data pribadi,
- gunakan signed URL untuk akses.

---

## 11.5 Payment Security

Sistem tidak boleh:

- menyimpan nomor kartu,
- menyimpan CVV,
- mencatat data kartu di log,
- mengirim data kartu ke backend sendiri,
- memproses kartu tanpa gateway resmi.

Pada demo:

- field kartu harus disabled,
- tampilkan watermark,
- jangan lakukan network request saat input kartu.

---

# 12. Desain PWA

## 12.1 PWA Requirements

NutriFlow harus mendukung:

- installable PWA,
- responsive mobile-first,
- app manifest,
- service worker,
- offline fallback,
- caching asset statis,
- background sync untuk AI scan offline,
- push notification.

---

## 12.2 Web App Manifest

Contoh:

```json
{
  "name": "NutriFlow",
  "short_name": "NutriFlow",
  "start_url": "/app/dashboard",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#16a34a",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 12.3 Caching Strategy

| Resource | Strategy |
|---|---|
| Static assets | Cache first |
| App shell | Stale while revalidate |
| API auth | Network only |
| Medical data | Network only atau encrypted local cache |
| Food diary draft | IndexedDB |
| Offline scan images | IndexedDB / browser storage queue |
| Public library cache | Stale while revalidate |

---

## 12.4 Offline Rules

Saat offline:

- client dapat membuat draft diary entry,
- client dapat mengambil/upload foto untuk scan dan masuk queue,
- data sensitif tidak disimpan sembarangan,
- perubahan ditandai `pending_sync`,
- saat online, background sync mengirim data ke server.

---

# 13. Desain Integrasi Eksternal

## 13.1 Email Service

Digunakan untuk:

- email verification,
- forgot password,
- program invitation,
- appointment reminder,
- payment reminder,
- session summary notification.

Email harus menggunakan template dengan:

- subject jelas,
- CTA aman,
- token expiry,
- disclaimer bila demo.

---

## 13.2 AI Vision / Food Analysis

Input:

- image URL atau image binary,
- optional client target,
- optional diet restriction.

Output:

- food name,
- portion estimation,
- calories,
- protein,
- carbs,
- fat,
- confidence score,
- warnings,
- raw response.

Semua output AI harus dianggap estimasi, bukan diagnosis medis.

---

## 13.3 Calendar Integration

Fase awal:

- ICS file/feed.

Fase lanjutan:

- Google Calendar OAuth,
- Outlook OAuth,
- iCal sync.

Appointment update harus mengirim update calendar event.

---

## 13.4 Telehealth Integration

Fase awal:

- manual meeting link.

Fase lanjutan:

- auto-generate meeting link dari provider video.

---

## 13.5 Payment Gateway

Provider potensial:

- Stripe,
- Airwallex,
- Xendit.

Desain webhook:

```text
Gateway sends webhook
   |
   v
Verify signature
   |
   v
Find payment by gateway_reference
   |
   v
Update payment status
   |
   v
Create invoice if paid
   |
   v
Notify client and specialist
```

---

# 14. Desain UI/UX dan Komponen Frontend

## 14.1 Design System

Gunakan design system konsisten untuk:

- button,
- card,
- modal,
- table,
- form,
- input,
- date picker,
- chart,
- badge,
- alert,
- toast,
- skeleton loader,
- empty state,
- error state.

---

## 14.2 Layout Portal

### Client Portal

```text
Mobile:
Top App Bar
Content
Bottom Navigation

Desktop:
Sidebar
Top Bar
Content Area
```

### Specialist Portal

```text
Sidebar Navigation
Top Bar
Main Content
Right Drawer optional
```

### Control Center

```text
Admin Sidebar
System Header
Data Table / Dashboard Grid
Audit Filter Panel
```

---

## 14.3 Komponen Utama

| Component | Fungsi |
|---|---|
| `AuthForm` | Login/register/reset |
| `DashboardSummaryCard` | Ringkasan nutrisi |
| `NutritionProgressRing` | Progress kalori/makro |
| `FoodDiaryCalendar` | Riwayat diary |
| `MealEntryCard` | Entry makanan |
| `AiScanUploader` | Upload/camera image |
| `AiScanResultEditor` | Edit hasil scan |
| `ProgramBuilder` | Struktur program |
| `WeeklyMealBuilder` | Drag-and-drop meal plan |
| `AppointmentScheduler` | Pilih tanggal dan slot |
| `AvailabilityEditor` | Specialist availability |
| `MedicalIntakeForm` | Intake medis |
| `AuditLogTable` | Tabel audit |
| `PaymentSimulationModal` | Modal demo payment |
| `SecureMessageThread` | Chat secure |
| `NotificationBell` | Panel notifikasi |

---

## 14.4 UI State

Setiap halaman harus memiliki state:

- loading,
- success,
- empty,
- error,
- unauthorized,
- offline,
- pending sync.

Contoh empty state:

```text
Belum ada food diary untuk hari ini.
Tambahkan makanan pertama Anda atau gunakan AI Food Scanner.
```

---

# 15. Desain Workflow Utama

## 15.1 Registrasi Client

```text
Client buka register
   |
   v
Isi full name, email, password, consent
   |
   v
Backend validasi
   |
   v
Create user PENDING_VERIFICATION
   |
   v
Send verification email
   |
   v
Client klik verification link
   |
   v
Akun aktif
   |
   v
Health onboarding
   |
   v
Masuk dashboard
```

---

## 15.2 Specialist Membuat Program

```text
Specialist login + 2FA
   |
   v
Buka Program Builder
   |
   v
Isi nama dan deskripsi
   |
   v
Tambah hari program
   |
   v
Tambah meal plan dan target nutrisi
   |
   v
Assign client
   |
   v
Publish program
   |
   v
Kirim invitation email
```

---

## 15.3 Client Menggunakan AI Food Scanner

```text
Client buka AI Scan
   |
   v
Ambil/upload foto makanan
   |
   v
Sistem upload file
   |
   v
Scan status QUEUED
   |
   v
AI memproses
   |
   v
Hasil tampil dengan confidence score
   |
   v
Client edit jika perlu
   |
   v
Client save to diary
   |
   v
Dashboard ter-update
```

---

## 15.4 Appointment Booking

```text
Client pilih service
   |
   v
Pilih specialist
   |
   v
Lihat availability
   |
   v
Pilih slot
   |
   v
Sistem lock slot
   |
   v
Client confirm / payment
   |
   v
Appointment created
   |
   v
Email/push reminder scheduled
```

---

## 15.5 Payment Production

```text
Client checkout
   |
   v
Backend create payment intent
   |
   v
Gateway hosted/tokenized form
   |
   v
Client submit payment ke gateway
   |
   v
Gateway webhook ke backend
   |
   v
Backend update payment PAID/FAILED
   |
   v
Invoice generated
   |
   v
Notification sent
```

---

## 15.6 Super Admin Assign Client

```text
Super Admin buka allocation
   |
   v
Pilih client
   |
   v
Pilih specialist
   |
   v
Isi reason
   |
   v
Create assignment
   |
   v
Audit log created
   |
   v
Specialist menerima notifikasi
```

---

# 16. Desain Error Handling dan Logging

## 16.1 Error Code Standard

| Code | HTTP | Arti |
|---|---:|---|
| `VALIDATION_ERROR` | 400 | Input tidak valid |
| `UNAUTHENTICATED` | 401 | Belum login |
| `FORBIDDEN` | 403 | Tidak punya izin |
| `NOT_FOUND` | 404 | Resource tidak ditemukan |
| `CONFLICT` | 409 | Konflik data, misalnya slot sudah terisi |
| `RATE_LIMITED` | 429 | Terlalu banyak request |
| `INTERNAL_ERROR` | 500 | Error server |
| `AI_SCAN_FAILED` | 500/502 | AI scan gagal |
| `PAYMENT_FAILED` | 402/400 | Payment gagal |
| `TOKEN_EXPIRED` | 400 | Token expired |

---

## 16.2 Logging

Log harus menyimpan:

- request ID,
- user ID jika ada,
- role,
- endpoint,
- status code,
- latency,
- error stack untuk server internal,
- IP address,
- user agent.

Jangan log:

- password,
- token mentah,
- CVV,
- nomor kartu,
- medical notes lengkap kecuali di audit terenkripsi/terproteksi,
- image binary.

---

# 17. Desain Audit Trail

## 17.1 Event yang Wajib Diaudit

| Event | Wajib Audit |
|---|---|
| Login gagal berulang | Ya |
| Akses admin tanpa izin | Ya |
| Perubahan medical intake | Ya |
| Perubahan medication | Ya |
| Perubahan allergy | Ya |
| Perubahan lab marker | Ya |
| Perubahan assignment client-specialist | Ya |
| Program invitation create/revoke/access | Ya |
| Payment status update | Ya |
| Appointment cancel/reschedule | Ya |
| Super Admin role update | Ya |
| Export PDF data medis | Ya |

---

## 17.2 Audit Log Format

```json
{
  "actorUserId": "uuid",
  "actorRole": "SPECIALIST",
  "action": "UPDATE_MEDICAL_INTAKE",
  "resourceType": "MedicalIntake",
  "resourceId": "uuid",
  "beforeData": {
    "allergies": ["seafood"]
  },
  "afterData": {
    "allergies": ["seafood", "peanuts"]
  },
  "ipAddress": "127.0.0.1",
  "userAgent": "Mozilla/5.0",
  "createdAt": "2026-08-12T07:23:00Z"
}
```

---

# 18. Desain Notifikasi

## 18.1 Notification Lifecycle

```text
Event terjadi
   |
   v
Create notification record
   |
   v
Determine channel
   |
   v
Queue delivery
   |
   v
Send email/push/in-app
   |
   v
Mark delivered/read
```

---

## 18.2 Notification Table

| Field | Type |
|---|---|
| `id` | UUID |
| `user_id` | UUID |
| `type` | ENUM |
| `title` | VARCHAR |
| `message` | TEXT |
| `data` | JSONB |
| `read_at` | TIMESTAMP |
| `created_at` | TIMESTAMP |

---

## 18.3 Reminder Schedule

| Reminder | Waktu |
|---|---|
| Appointment H-24 | 24 jam sebelum appointment |
| Appointment H-1 | 1 jam sebelum appointment |
| Program reminder | Sesuai konfigurasi program |
| Payment reminder | Setelah invoice pending |
| Review request | Setelah appointment completed |

---

# 19. Desain Offline, Queue, dan Sync

## 19.1 Offline Queue Item

```json
{
  "id": "local_uuid",
  "type": "AI_SCAN_UPLOAD",
  "payload": {},
  "fileRef": "indexeddb_file_ref",
  "status": "PENDING",
  "createdAt": "2026-08-12T07:23:00Z",
  "retryCount": 0
}
```

---

## 19.2 Sync Rules

- Queue diproses saat koneksi kembali.
- Gunakan exponential backoff.
- Jika gagal permanen, tampilkan action manual retry.
- Hindari duplicate submission menggunakan idempotency key.
- Semua write API yang bisa retry harus mendukung idempotency.

---

## 19.3 Idempotency

Header:

```text
Idempotency-Key: uuid
```

Digunakan untuk:

- create appointment,
- create payment,
- upload scan,
- create diary entry,
- send invitation.

---

# 20. Desain Deployment dan Environment

## 20.1 Environment

| Environment | Fungsi |
|---|---|
| `demo` | Prototype publik, dummy data |
| `staging` | QA dan UAT |
| `production` | User nyata |

---

## 20.2 Environment Rules

### Demo

- Dummy data only.
- Payment disabled/simulation.
- Admin demo account terbatas.
- Watermark demo.
- Tidak ada data medis nyata.

### Staging

- Test gateway.
- Test AI key.
- Data testing.
- Monitoring aktif.

### Production

- HTTPS wajib.
- Real database.
- Real payment gateway.
- Backup aktif.
- Security monitoring aktif.

---

## 20.3 CI/CD Pipeline

```text
Code pushed
   |
   v
Install dependencies
   |
   v
Lint
   |
   v
Type check
   |
   v
Unit test
   |
   v
Build
   |
   v
Migration check
   |
   v
Deploy to staging
   |
   v
Smoke test
   |
   v
Manual approval
   |
   v
Deploy to production
```

---

## 20.4 Backup

Production database harus memiliki:

- daily backup,
- point-in-time recovery jika tersedia,
- encrypted backup,
- restore test berkala.

---

# 21. Desain Testing

## 21.1 Testing Level

| Level | Fokus |
|---|---|
| Unit Test | Service, validator, utility |
| Integration Test | API + database |
| E2E Test | User workflow |
| Security Test | Auth, RBAC, sensitive data |
| PWA Test | Installable, offline, service worker |
| Performance Test | Dashboard, diary, scan upload |
| Accessibility Test | Form, navigation, contrast |

---

## 21.2 Critical Test Scenarios

### Auth

- Register dengan email valid.
- Register tanpa consent ditolak.
- Login sebelum email verification ditolak.
- Forgot password token expired ditolak.
- Specialist login wajib 2FA.
- Session expired redirect login.

### RBAC

- Client tidak bisa akses `/admin`.
- Specialist tidak bisa akses client yang bukan assigned.
- Admin Staff tidak bisa melihat medical notes jika permission dibatasi.
- Super Admin dapat melihat audit logs.

### Medical Data

- Update allergy membuat audit log.
- Data medis tidak tampil pada invitation preview.
- Error response tidak membocorkan data medis.

### AI Scan

- Upload gambar valid berhasil.
- Upload file non-image ditolak.
- Confidence rendah menampilkan warning.
- Hasil scan dapat diedit manual.
- Hasil scan dapat disimpan ke diary.
- Offline scan masuk queue.

### Appointment

- Slot tersedia dapat dibooking.
- Slot sama tidak bisa double booking.
- Cancel H-24 berhasil.
- Cancel setelah cut-off ditolak untuk client.
- Reminder dijadwalkan.

### Payment

- Demo tidak melakukan network request kartu.
- Production menggunakan gateway token.
- Webhook invalid signature ditolak.
- Payment paid membuat invoice.

---

# 22. Traceability Design terhadap SRS

| SRS Area | Modul Desain |
|---|---|
| AUTH | Authentication, Session, RBAC |
| DASH | Client Dashboard |
| DIARY | Food Diary |
| SCAN | AI Food Scanner |
| PROG | Program Nutrition, Invitation |
| APPT | Appointment & Booking |
| MEAL | Meal Detail |
| LIB | Food/Recipe Library |
| CLIENT | Client Management & Medical Intake |
| SESS | Session Summary |
| SVC/PAY | Services & Commerce |
| REV | Review Specialist |
| Notification | Notification Module |
| Security | Security, Compliance, Audit Trail |
| PWA | PWA, Offline Queue, Service Worker |
| Admin | Specialist Portal |
| Super Admin | Control Center |

---

# 23. Risiko Teknis dan Mitigasi

## 23.1 Risiko Akses Admin Publik

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Route `/admin/**` dapat diakses publik | Data bocor | Middleware auth + role check + audit log |

---

## 23.2 Risiko Payment Simulation

| Risiko | Dampak | Mitigasi |
|---|---|---|
| User mengira transaksi nyata | Masalah legal dan trust | Disclaimer besar, field dummy disabled, no network request |

---

## 23.3 Risiko AI Food Scan Tidak Akurat

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Estimasi nutrisi salah | Client salah input | Confidence score, edit manual, specialist review |

---

## 23.4 Risiko Kebocoran Data Medis

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data sensitif tampil ke pihak tidak berwenang | Compliance dan reputasi | RBAC, ownership check, audit, no public preview |

---

## 23.5 Risiko Double Booking

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Slot appointment dipakai dua client | Operasional kacau | Slot lock, DB unique constraint, transaction |

---

## 23.6 Risiko Offline Duplicate Sync

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data terkirim dua kali | Diary/payment/appointment duplikat | Idempotency key |

---

# 24. Lampiran

## 24.1 Enum Summary

### User Role

```text
CLIENT
SPECIALIST
ADMIN_STAFF
SUPER_ADMIN
SYSTEM
```

### User Status

```text
ACTIVE
PENDING_VERIFICATION
SUSPENDED
DELETED
```

### Meal Type

```text
BREAKFAST
LUNCH
DINNER
SNACK
OTHER
```

### Appointment Status

```text
PENDING
CONFIRMED
RESCHEDULED
CANCELLED
COMPLETED
NO_SHOW
```

### Payment Status

```text
PENDING
PAID
FAILED
REFUNDED
CANCELLED
```

### Program Status

```text
DRAFT
PUBLISHED
ARCHIVED
```

### AI Scan Status

```text
UPLOADED
QUEUED
PROCESSING
COMPLETED
FAILED
NEEDS_REVIEW
SAVED_TO_DIARY
```

---

## 24.2 Suggested Folder Structure

```text
nutriflow/
├── src/
│   ├── app/
│   │   ├── public/
│   │   ├── app/
│   │   ├── admin/
│   │   └── control-center/
│   ├── components/
│   │   ├── ui/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── diary/
│   │   ├── scans/
│   │   ├── programs/
│   │   ├── appointments/
│   │   ├── payments/
│   │   └── admin/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── diary.service.ts
│   │   ├── scan.service.ts
│   │   ├── program.service.ts
│   │   ├── appointment.service.ts
│   │   └── payment.service.ts
│   ├── server/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── validators/
│   │   ├── jobs/
│   │   └── integrations/
│   ├── database/
│   │   ├── schema/
│   │   ├── migrations/
│   │   └── seeds/
│   ├── lib/
│   │   ├── auth/
│   │   ├── rbac/
│   │   ├── audit/
│   │   ├── logger/
│   │   └── security/
│   ├── pwa/
│   │   ├── manifest.json
│   │   └── service-worker.ts
│   └── tests/
│       ├── unit/
│       ├── integration/
│       └── e2e/
├── docs/
│   ├── SRS-NutriFlow.md
│   └── SDD-NutriFlow.md
├── package.json
└── README.md
```

---

## 24.3 Implementation Priority

### Phase 1 — Security Foundation

- Auth
- RBAC
- Protected admin routes
- Email verification
- 2FA specialist/super admin
- Audit log
- Environment separation

### Phase 2 — Core Client & Specialist Workflow

- Client dashboard
- Food diary
- Medical intake
- Client management
- Appointment
- Program builder
- Food library

### Phase 3 — AI & Engagement

- AI food scan
- Scan to diary
- Specialist review
- Notification
- Secure messaging
- Program progress

### Phase 4 — Commerce & Production Hardening

- Payment gateway
- Invoice
- Reminder
- Calendar sync
- Telehealth link
- Monitoring
- Backup
- Performance optimization

### Phase 5 — Advanced Features

- AI recipe generator
- AI session summary
- Wearable integration
- Advanced micronutrient tracking
- Subscription/package management

---

# Penutup

Dokumen SDD ini mendefinisikan desain teknis NutriFlow sebagai PWA multi-portal yang mencakup client application, specialist practitioner portal, dan super admin control center.

Fokus utama desain adalah:

- keamanan akses,
- perlindungan data medis,
- modularitas sistem,
- kesiapan PWA,
- workflow nutrisi profesional,
- AI food intelligence,
- auditability,
- dan kesiapan transisi dari prototype menuju production-ready application.

Dokumen ini dapat digunakan langsung oleh tim pengembangan sebagai acuan implementasi teknis dan oleh QA sebagai dasar penyusunan test scenario berbasis desain.
```

---