# Software Requirements Specification (SRS)
# NutriFlow — Progressive Web App
## Nutrition App & Specialist Practitioner Portal

| Item | Keterangan |
|---|---|
| **Nama Proyek** | NutriFlow PWA |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-08-01 |
| **Status** | Draft untuk Implementasi |
| **Standar Acuan** | IEEE 830-1998 / ISO/IEC/IEEE 29148 |
| **Sumber Analisis** | Laporan Analisis Komprehensif Fitur Unggulan Proyek Tim Pengembangan (NutriFlow) |

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Deskripsi Umum Sistem](#2-deskripsi-umum-sistem)
3. [Kebutuhan Fungsional (Functional Requirements)](#3-kebutuhan-fungsional)
4. [Kebutuhan Non-Fungsional](#4-kebutuhan-non-fungsional)
5. [Kebutuhan PWA Spesifik](#5-kebutuhan-pwa-spesifik)
6. [Kebutuhan Keamanan & Compliance](#6-kebutuhan-keamanan--compliance)
7. [Arsitektur & Teknologi](#7-arsitektur--teknologi)
8. [Model Data](#8-model-data)
9. [Kebutuhan Antarmuka Eksternal](#9-kebutuhan-antarmuka-eksternal)
10. [Prioritas & Roadmap Rilis](#10-prioritas--roadmap-rilis)
11. [Acceptance Criteria](#11-acceptance-criteria)
12. [Asumsi, Batasan, dan Ketergantungan](#12-asumsi-batasan-dan-ketergantungan)
13. [Glosarium](#13-glosarium)

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen ini mendefinisikan kebutuhan perangkat lunak secara lengkap untuk pengembangan **NutriFlow** sebagai **Progressive Web App (PWA)**. Dokumen ditujukan untuk:

- **AI Agent / Tim Pengembang** — sebagai spesifikasi implementasi.
- **Product Owner & Stakeholder** — sebagai acuan scope dan prioritas.
- **QA / Tester** — sebagai dasar penyusunan test case dan acceptance criteria.

### 1.2 Ruang Lingkup Produk
NutriFlow adalah **platform nutrisi digital hybrid** yang menggabungkan:

1. **Client Nutrition App** — food tracking, AI food scanner, program nutrisi, booking konsultasi.
2. **Specialist Practitioner Portal (Admin)** — client management, medical intake, program creation, services, appointment, food/recipe library.
3. **AI Food Intelligence** — analisis foto makanan, estimasi nutrisi, rekomendasi.
4. **Commerce & Engagement** — payment, review specialist, notifikasi, secure messaging.

Positioning produk: kombinasi fitur B2C (MyFitnessPal, Cronometer) dan B2B/practice management (Healthie, NutriAdmin, Nutrium, Practice Better).

### 1.3 Definisi Istilah
Lihat [Glosarium](#13-glosarium).

### 1.4 Referensi
- Analisis Fitur Tim Dev (user).pdf
- Analisis Fitur Tim Dev (admin).pdf
- Analisis Fitur Unggulan.pdf
- Dokumen kompetitor: Cronometer, MyFitnessPal, Healthie, iNutriMon, NutriAdmin, Nutrium, Practice Better
- Prototype: `https://prototype-application-nutrition.vercel.app/`

---

## 2. Deskripsi Umum Sistem

### 2.1 Perspektif Produk
Sistem terdiri dari **satu PWA dengan dua area utama** yang dipisahkan oleh Role-Based Access Control (RBAC):

| Area | Pengguna | Fungsi Utama |
|---|---|---|
| **Client App** | Client/Pasien | Dashboard, food diary, AI scan, program, booking, payment, review, chat |
| **Specialist Portal** | Specialist/Admin | Client management, intake, program builder, services, appointment, food library, AI scan review |

### 2.2 Kelas Pengguna dan Peran (RBAC)

| Role | Deskripsi | Hak Akses |
|---|---|---|
| **Client** | Pengguna akhir/pasien | Data pribadi sendiri, program yang diikuti, booking, chat dengan specialist-nya |
| **Specialist** | Praktisi nutrisi | Client miliknya, program, services, appointment, food scan review, library |
| **Admin Staff** | Asisten praktik | Subset akses specialist (tanpa data medis sensitif, dapat dikonfigurasi) |
| **Super Admin** | Pengelola platform | Seluruh sistem, user management, audit log, konfigurasi |

### 2.3 Lingkungan Operasi
- **Client-side:** Browser modern (Chrome, Safari, Firefox, Edge) — mobile-first, installable PWA, dukungan offline parsial.
- **Server-side:** Cloud hosting (mis. Vercel/Node runtime atau setara), HTTPS wajib.
- **Environment separation:** `demo` / `staging` / `production` (wajib, temuan analisis §5.8).

### 2.4 Batasan Desain Umum
- Semua route `/admin/**` **wajib** di belakang autentikasi (isu kritis prototype: admin dapat diakses publik).
- Data medis (alergi, kondisi medis, medications) diklasifikasikan **sensitif** — tidak boleh tampil pada halaman publik atau link preview.
- Mode demo wajib menggunakan dummy data berlabel jelas dan disclaimer pembayaran besar.

---

## 3. Kebutuhan Fungsional

> Format ID: `FR-<modul>-<nomor>`. Prioritas: **[C]** Kritis, **[H]** Tinggi, **[M]** Menengah, **[L]** Lanjutan — mengikuti prioritas pada laporan analisis §8.

### 3.1 Autentikasi & Manajemen Akun (AUTH)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-AUTH-01 | Sistem menyediakan registrasi client dengan field: Full Name, Email, Password (min. 8 karakter, kompleksitas divalidasi). | C |
| FR-AUTH-02 | Sistem mewajibkan **email verification** sebelum akun aktif penuh. | C |
| FR-AUTH-03 | Sistem menyediakan login dengan session management (JWT/secure session cookie, httpOnly, SameSite). | C |
| FR-AUTH-04 | Sistem menyediakan **forgot password** dengan token reset ber-expiry. | C |
| FR-AUTH-05 | Sistem menerapkan **RBAC** dengan role: Client, Specialist, Admin Staff, Super Admin. Semua endpoint memvalidasi role di server. | C |
| FR-AUTH-06 | Sistem menyediakan **2FA (TOTP/email OTP)** wajib untuk Specialist dan Super Admin. | C |
| FR-AUTH-07 | Registrasi wajib menyertakan **consent checkbox** (privacy policy & terms) dan menyimpan timestamp persetujuan. | C |
| FR-AUTH-08 | Setelah registrasi, client menjalani **health onboarding** (profil dasar: usia, tinggi, berat, goal, preferensi diet). | H |
| FR-AUTH-09 | Seluruh route `/admin/**` diproteksi middleware auth + role check; akses tanpa izin dialihkan ke login dan dicatat di audit log. | C |

### 3.2 Client Dashboard (DASH)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-DASH-01 | Dashboard menampilkan ringkasan kalori harian (konsumsi vs target). | H |
| FR-DASH-02 | Dashboard menampilkan progress mingguan/bulanan (kalori, makro, kepatuhan program). | H |
| FR-DASH-03 | Dashboard menampilkan grafik berat badan dan body fat dari data session summary. | H |
| FR-DASH-04 | Dashboard menampilkan appointment berikutnya beserta statusnya. | H |
| FR-DASH-05 | Dashboard menampilkan target nutrisi personal (kalori, protein, karbo, lemak) yang dinamis per program. | H |
| FR-DASH-06 | Navigasi utama client: Dashboard, Program, Appointments, Food Diary, Profile. | H |

### 3.3 Food Diary (DIARY)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-DIARY-01 | Client dapat mencatat konsumsi makanan harian per waktu makan (breakfast, lunch, dinner, snack). | H |
| FR-DIARY-02 | Entry diary dapat berasal dari: pencarian food library, hasil AI scan, atau input manual. | H |
| FR-DIARY-03 | Sistem menghitung total kalori & makro harian secara otomatis dan real-time. | H |
| FR-DIARY-04 | Client dapat mengedit/menghapus entry; perubahan tercermin pada ringkasan dashboard. | H |
| FR-DIARY-05 | Diary mendukung riwayat konsumsi harian (kalender historis). | H |
| FR-DIARY-06 | Diary menampilkan estimasi mikronutrien (serat, gula, sodium, dst.) bila data tersedia. | M |

### 3.4 AI Food Scanner (SCAN)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-SCAN-01 | Client dapat mengambil foto (kamera perangkat via PWA) atau upload gambar makanan. | H |
| FR-SCAN-02 | Sistem menampilkan hasil analisis: nama makanan, kalori, protein, karbo, lemak. | H |
| FR-SCAN-03 | Hasil scan menampilkan **confidence score** (mis. 85%). | H |
| FR-SCAN-04 | Client dapat **mengedit manual** hasil scan (nama, porsi, makro) sebelum menyimpan. | H |
| FR-SCAN-05 | Hasil scan dapat disimpan langsung ke **food diary**. | H |
| FR-SCAN-06 | Hasil scan dicocokkan dengan **food library internal** (database matching). | M |
| FR-SCAN-07 | Sistem memberikan **AI recommendation** kontekstual (mis. "Protein Anda masih kurang hari ini", "Kurang sesuai untuk low sodium diet") berdasarkan target program client. | M |
| FR-SCAN-08 | Client dapat mengirim hasil scan ke specialist untuk direview. | M |
| FR-SCAN-09 | Specialist (admin) dapat upload foto, melihat hasil analisis, lalu **Send** ke client tertentu atau **Add to Meal Plan**. | H |
| FR-SCAN-10 | Bila offline, foto di-queue dan diproses ketika koneksi tersedia (background sync). | M |

### 3.5 Program Nutrisi (PROG)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-PROG-01 | Specialist dapat membuat program: nama, deskripsi, pemilihan client, publish. | H |
| FR-PROG-02 | **Program Builder berstruktur**: rencana per hari (Hari 1–N), meal plan per waktu makan, target kalori/makro harian, checklist aktivitas. | H |
| FR-PROG-03 | Sistem menyediakan **template program**: weight loss, muscle gain, maintenance, low sodium, halal, vegetarian/vegan, keto/low carb. | M |
| FR-PROG-04 | Client dapat melihat programnya, menandai meal/aktivitas selesai (checklist kepatuhan). | H |
| FR-PROG-05 | Sistem menghitung **progress program**: % kepatuhan, jumlah meal terpenuhi, kesesuaian hasil scan, catatan specialist. | H |
| FR-PROG-06 | **Program invitation via email** dengan link ber-**signed token acak** dan **expiry date**; preview terbatas (tanpa data medis/sensitif); detail penuh hanya setelah register/login. | C |
| FR-PROG-07 | Admin dapat **revoke** invitation link; semua akses link dicatat (access log). | C |
| FR-PROG-08 | Reminder otomatis program (email/push notification). | M |

### 3.6 Appointment & Booking (APPT)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-APPT-01 | Client dapat memilih tanggal & slot waktu (mis. 09:00, 10:30, 13:00, 14:30, 16:00 WIB) berdasarkan **availability specialist**. | H |
| FR-APPT-02 | Appointment memiliki status: `Pending`, `Confirmed`, `Rescheduled`, `Cancelled`, `Completed`. | H |
| FR-APPT-03 | Client & specialist dapat reschedule dan cancel appointment (dengan aturan cut-off, mis. H-24 jam). | H |
| FR-APPT-04 | Specialist dapat mengelola availability (jam kerja, blocked dates, durasi slot per service). | H |
| FR-APPT-05 | Reminder otomatis via email/push (H-24 dan H-1 jam). | H |
| FR-APPT-06 | Calendar sync (Google Calendar/iCal/Outlook) via ICS feed atau OAuth. | M |
| FR-APPT-07 | Public booking link per specialist. | M |
| FR-APPT-08 | Integrasi telehealth meeting link (mis. auto-generate link video call) pada appointment virtual. | M |
| FR-APPT-09 | Fitur "Request New Date" bila slot tidak tersedia. | H |

### 3.7 Meal & Food Detail (MEAL)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-MEAL-01 | Detail makanan menampilkan: nama, kalori, protein, karbo, lemak, serving size, ingredients, catatan nutritionist. | H |
| FR-MEAL-02 | Detail menampilkan **allergen warning** yang dicocokkan otomatis dengan alergi client. | H |
| FR-MEAL-03 | Detail menampilkan dietary label: Halal, Vegan, Vegetarian, Keto, Low Sodium. | M |
| FR-MEAL-04 | Detail menampilkan mikronutrien (bila tersedia) dan **suitability score** terhadap program client aktif. | M |

### 3.8 Food/Recipe Library (LIB)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-LIB-01 | Specialist dapat menambah makanan/resep: nama, kategori, kalori, protein, karbo, lemak, image, ingredients, steps. | H |
| FR-LIB-02 | Library mendukung search & filter (kategori, diet tag, allergen, rentang kalori). | H |
| FR-LIB-03 | Item library memiliki tag diet & allergen serta serving size. | H |
| FR-LIB-04 | Perhitungan nutrisi otomatis dari ingredients (bila database bahan tersedia). | M |
| FR-LIB-05 | Item memiliki status: `Draft`, `Published`, `Archived`; fitur clone recipe. | M |
| FR-LIB-06 | AI recipe generator (input: bahan/target diet → output resep + estimasi nutrisi). | L |
| FR-LIB-07 | Recipe recommendation untuk client berdasarkan program & preferensi. | M |

### 3.9 Client Management & Medical Intake (CLIENT)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-CLIENT-01 | Specialist dapat membuat client: Full Name, Email, Dietary Goal, Food Allergies, Medical Conditions. | H |
| FR-CLIENT-02 | **Medical Intake Form**: allergies (peanuts, seafood, lactose, gluten, eggs, soy, dll.), medical conditions (diabetes tipe 2, hipertensi, kolesterol, GERD, dll.), dietary preference (balanced, halal, vegetarian, vegan, keto, low sodium), notes & medications. | H |
| FR-CLIENT-03 | Intake diperluas: **informed consent**, emergency contact, riwayat penyakit keluarga, riwayat diet. | H |
| FR-CLIENT-04 | Data antropometri: tinggi, berat, lingkar pinggang, body fat — dengan riwayat perubahan (time series). | H |
| FR-CLIENT-05 | Lab markers: gula darah, kolesterol, tekanan darah — dengan riwayat. | M |
| FR-CLIENT-06 | **Client profile lengkap** menghubungkan: intake, program, food scan, diary, appointment, progress, payment. | H |
| FR-CLIENT-07 | Setiap perubahan data medis dicatat pada **audit trail** (siapa, kapan, sebelum/sesudah). | C |
| FR-CLIENT-08 | Akses data medis dibatasi role (Admin Staff dapat dibatasi dari data sensitif). | C |

### 3.10 Session Summary (SESS)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-SESS-01 | Specialist dapat membuat session summary: berat badan, body fat, target kalori & protein harian, anjuran makanan, catatan, action plan, target mingguan. | H |
| FR-SESS-02 | Client dapat melihat riwayat seluruh session summary. | H |
| FR-SESS-03 | Grafik perubahan berat badan/body fat lintas sesi. | H |
| FR-SESS-04 | Export session summary ke PDF. | M |
| FR-SESS-05 | AI session summary (draft otomatis dari catatan sesi) untuk specialist. | L |

### 3.11 Services & Commerce (SVC / PAY)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-SVC-01 | Specialist dapat membuat service: title, description, duration, price, type (Virtual Only / In-Person / Virtual or In-Person). | H |
| FR-SVC-02 | Service memiliki kategori, status aktif/nonaktif, dan availability tersendiri. | M |
| FR-SVC-03 | Dukungan package/bundle, promo code, recurring session, group consultation. | L |
| FR-PAY-01 | Checkout terhubung ke **payment gateway resmi** (mis. Stripe/Airwallex/Xendit); **tidak ada data kartu yang disimpan/dilewatkan server sendiri** (gunakan tokenization gateway, PCI-DSS compliant). | C |
| FR-PAY-02 | Mode demo: disclaimer besar "SIMULASI PROTOTYPE — TIDAK ADA TRANSAKSI NYATA", watermark pada modal, field kartu dummy nonaktif, **tidak ada network request saat input kartu**. | C |
| FR-PAY-03 | Status pembayaran: `Pending`, `Paid`, `Failed`, `Refunded`. | H |
| FR-PAY-04 | Invoice history untuk client & specialist. | M |
| FR-PAY-05 | Payment reminder otomatis. | M |
| FR-PAY-06 | Metode pembayaran regional (PayNow, GrabPay, DBS PayLah!, kartu VISA/MC/AMEX) via gateway. | M |
| FR-PAY-07 | Subscription/package management (SaaS). | L |

### 3.12 Review Specialist (REV)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-REV-01 | Client dapat memberi rating bintang (1–5) dan testimoni untuk specialist. | H |
| FR-REV-02 | **Review hanya dari client terverifikasi** (pernah menyelesaikan konsultasi). | H |
| FR-REV-03 | Review melalui **moderasi** sebelum tampil publik. | M |
| FR-REV-04 | Kategori review: Komunikasi, Program Nutrisi, Ketepatan Rekomendasi, Kemudahan Konsultasi. | M |
| FR-REV-05 | Halaman profil specialist publik: rating rata-rata, jumlah review, badge (Verified Specialist, Certified Nutritionist, Top Rated), sertifikasi. | M |

### 3.13 Secure Messaging / Consultation Channel (MSG)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-MSG-01 | Chat 1-on-1 client ↔ specialist, real-time (WebSocket/SSE), dengan riwayat percakapan persisten. | H |
| FR-MSG-02 | Komunikasi terenkripsi in-transit (TLS) dan at-rest. | C |
| FR-MSG-03 | Dukungan attachment: foto makanan, PDF, hasil lab (dengan validasi tipe & ukuran file, virus scan bila memungkinkan). | H |
| FR-MSG-04 | Read receipt dan notifikasi pesan baru (push). | M |
| FR-MSG-05 | Message templates untuk specialist. | M |
| FR-MSG-06 | Escalation tag: `Urgent`, `Follow-up`, `Need Review`. | M |
| FR-MSG-07 | Akses channel dibatasi hanya pada pasangan client–specialist terkait (RBAC). | C |

### 3.14 Notifikasi (NOTIF)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-NOTIF-01 | Panel notifikasi in-app dengan "Mark all read". | H |
| FR-NOTIF-02 | **Web Push Notification** (PWA) untuk: appointment reminder, pesan baru, program update, hasil scan dari specialist. | H |
| FR-NOTIF-03 | Notifikasi email untuk event penting (invitation, verifikasi, reminder). | H |
| FR-NOTIF-04 | Preferensi notifikasi per user (opt-in/opt-out per kanal). | M |

### 3.15 Reports & Analytics (RPT)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-RPT-01 | Specialist dashboard analytics: jumlah client aktif, kepatuhan program, appointment stats, revenue summary. | H |
| FR-RPT-02 | Laporan progress per client (berat, makro, kepatuhan) dengan grafik & export PDF. | H |
| FR-RPT-03 | Laporan nutrisi client (harian/mingguan/bulanan). | M |

### 3.16 Konten & Halaman Statis (CMS)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-CMS-01 | Halaman Privacy Policy, Terms of Service, Help Center **terisi konten lengkap** (bukan placeholder). | H |
| FR-CMS-02 | Modul blog/education content (artikel nutrisi) dengan SEO metadata. | M |

---

## 4. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement |
|---|---|---|
| NFR-01 | **Performa** | First Contentful Paint < 2s pada 4G; Lighthouse Performance ≥ 85 (mobile). |
| NFR-02 | **Performa** | Respons API p95 < 500 ms untuk operasi CRUD standar; AI scan < 10 s. |
| NFR-03 | **Ketersediaan** | Uptime target 99.5% (production). |
| NFR-04 | **Skalabilitas** | Mendukung minimal 10.000 pengguna aktif bulanan tanpa perubahan arsitektur. |
| NFR-05 | **Usability** | Mobile-first, responsive (320px–1920px); WCAG 2.1 AA (kontras, keyboard nav, aria-label). |
| NFR-06 | **i18n** | Dukungan Bahasa Indonesia & Inggris; format tanggal/waktu lokal (WIB), multi-currency (IDR, SGD). |
| NFR-07 | **Maintainability** | Kode modular, test coverage minimal 70% pada business logic, CI/CD pipeline. |
| NFR-08 | **Observability** | Logging terstruktur, error tracking, monitoring uptime & performa. |
| NFR-09 | **Backup** | Backup database harian, retensi 30 hari, prosedur restore teruji. |
| NFR-10 | **Browser support** | 2 versi terakhir Chrome, Safari, Firefox, Edge; graceful degradation untuk fitur PWA yang tidak didukung (mis. push di iOS versi lama). |

---

## 5. Kebutuhan PWA Spesifik

| ID | Requirement |
|---|---|
| PWA-01 | **Web App Manifest** lengkap: name, short_name, icons (192/512, maskable), theme_color, background_color, `display: standalone`, start_url. |
| PWA-02 | **Service Worker** dengan strategi caching: app shell (cache-first), API data (network-first + stale-while-revalidate), gambar (cache-first dengan expiry). |
| PWA-03 | **Installable** — memenuhi kriteria install prompt; custom in-app install banner. |
| PWA-04 | **Offline support**: dashboard terakhir, food diary (read + write queue), program aktif dapat diakses offline; halaman offline fallback. |
| PWA-05 | **Background Sync** untuk entry diary & foto scan yang dibuat saat offline. |
| PWA-06 | **Web Push Notifications** (VAPID) dengan permission flow yang sopan (bukan prompt saat first load). |
| PWA-07 | Akses **kamera perangkat** (getUserMedia / input capture) untuk food scan. |
| PWA-08 | **HTTPS wajib** di semua environment. |
| PWA-09 | Lighthouse PWA audit: semua kriteria installability & best practices lulus. |
| PWA-10 | Update strategy: service worker versioning + prompt "Update tersedia" tanpa memutus sesi pengguna. |
| PWA-11 | Data sensitif **tidak dicache** oleh service worker (respons data medis diberi `Cache-Control: no-store`). |

---

## 6. Kebutuhan Keamanan & Compliance

> Merujuk temuan kritis analisis §5.8: halaman admin prototype dapat diakses publik. Seluruh poin berikut berstatus **wajib sebelum go-live**.

| ID | Requirement |
|---|---|
| SEC-01 | Autentikasi wajib untuk seluruh route admin/specialist; tidak ada endpoint admin yang dapat diakses anonim. |
| SEC-02 | RBAC divalidasi **di server** pada setiap request (bukan hanya UI hiding). |
| SEC-03 | Password di-hash dengan bcrypt/argon2; rate limiting pada login & reset password; account lockout progresif. |
| SEC-04 | Session/token: expiry, refresh rotation, revocation saat logout/ganti password. |
| SEC-05 | Enkripsi data at-rest untuk data medis; TLS 1.2+ in-transit. |
| SEC-06 | **Audit log** untuk: login, akses data medis, perubahan data client, akses invitation link, aksi admin. |
| SEC-07 | Invitation link: signed random token (min. 128-bit entropy), expiry, revocable, tidak memuat data medis, tidak dapat ditebak dari ID berurutan. |
| SEC-08 | Payment: gunakan gateway resmi dengan tokenization; aplikasi **tidak pernah menyimpan** PAN/CVV; patuhi PCI-DSS SAQ-A. |
| SEC-09 | Proteksi umum: OWASP Top 10 — input validation, output encoding (XSS), parameterized query (SQLi), CSRF token, security headers (CSP, HSTS, X-Content-Type-Options), upload file validation. |
| SEC-10 | Privacy compliance: kepatuhan **UU PDP (Indonesia)** dan/atau **PDPA (Singapura)** sesuai pasar; consent management; hak akses & hapus data (data subject rights); data retention policy. |
| SEC-11 | Environment separation (demo/staging/production) dengan database terpisah; demo hanya berisi dummy data berlabel jelas. |
| SEC-12 | Secrets management via environment variables/secret manager; tidak ada credential di repository. |

---

## 7. Arsitektur & Teknologi

### 7.1 Arsitektur yang Direkomendasikan

```
[PWA Client (SPA/SSR)] ⇄ HTTPS ⇄ [API Layer (REST/GraphQL)]
                                     ├── Auth Service (JWT + RBAC + 2FA)
                                     ├── Core Service (client, program, appointment, diary, library)
                                     ├── Messaging Service (WebSocket)
                                     ├── AI Service (food image analysis — external ML API/vision model)
                                     ├── Notification Service (Web Push + Email)
                                     ├── Payment Adapter (gateway resmi)
                                     └── [Database + Object Storage + Cache]
```

### 7.2 Rekomendasi Stack (dapat disesuaikan oleh agent)

| Layer | Rekomendasi | Alternatif |
|---|---|---|
| Frontend PWA | Next.js (App Router) + TypeScript + Workbox | Nuxt, SvelteKit |
| UI | Tailwind CSS + komponen aksesibel | MUI, shadcn/ui |
| Backend | Node.js (NestJS/Express) atau Next.js API routes | Go, Python FastAPI |
| Database | PostgreSQL | MySQL |
| ORM | Prisma | Drizzle, TypeORM |
| Realtime | WebSocket (Socket.IO) / SSE | Pusher, Ably |
| Storage | S3-compatible (gambar makanan, attachment, PDF) | — |
| AI Food Scan | Vision model API (mis. multimodal LLM / food recognition API) | Model kustom |
| Push | Web Push (VAPID) | FCM |
| Email | Transactional email service | — |
| Payment | Stripe / Xendit / Airwallex | Midtrans |
| Deploy | Vercel + managed DB | Cloud VM/containers |

---

## 8. Model Data

### 8.1 Entitas Utama (ringkasan)

| Entitas | Atribut Kunci |
|---|---|
| **User** | id, role, name, email, password_hash, email_verified, 2fa_enabled, consent_at |
| **ClientProfile** | user_id, dietary_goal, allergies[], medical_conditions[], dietary_preference, medications, notes, emergency_contact, family_history |
| **Anthropometry** | client_id, date, height, weight, waist, body_fat |
| **LabMarker** | client_id, date, type (blood_sugar/cholesterol/blood_pressure), value |
| **Program** | id, specialist_id, name, description, status, template_type |
| **ProgramDay** | program_id, day_number, target_calories, target_macros |
| **ProgramMeal** | program_day_id, meal_time, food_id/recipe_id, notes |
| **ProgramEnrollment** | program_id, client_id, progress_pct, status |
| **Invitation** | program_id, email, token (signed), expires_at, revoked, access_log[] |
| **FoodItem / Recipe** | id, name, category, calories, protein, carbs, fat, micronutrients, serving_size, diet_tags[], allergen_tags[], ingredients[], steps[], status |
| **DiaryEntry** | client_id, date, meal_time, food_ref/scan_ref/manual, quantity, computed_nutrition |
| **FoodScan** | id, user_id, image_url, result (name, kcal, macros), confidence, edited_values, sent_to_client_id |
| **Service** | specialist_id, title, description, duration, price, currency, type, status |
| **Appointment** | client_id, specialist_id, service_id, datetime, status, meeting_link |
| **Payment** | appointment_id/service_id, amount, currency, method, status, gateway_ref, invoice_no |
| **SessionSummary** | appointment_id, weight, body_fat, target_calories, target_protein, recommendations, action_plan |
| **Review** | client_id, specialist_id, rating, categories{}, text, status (pending/approved/rejected) |
| **Message** | channel_id, sender_id, body, attachments[], read_at, tags[] |
| **Notification** | user_id, type, payload, read_at |
| **AuditLog** | actor_id, action, entity, before, after, ip, timestamp |

---

## 9. Kebutuhan Antarmuka Eksternal

| ID | Interface | Deskripsi |
|---|---|---|
| EI-01 | Payment Gateway API | Charge, refund, webhook status pembayaran. |
| EI-02 | AI Vision API | Analisis gambar makanan → nutrisi + confidence. |
| EI-03 | Email Service | Verifikasi, invitation, reminder, reset password. |
| EI-04 | Web Push Service | Notifikasi push browser. |
| EI-05 | Calendar (ICS/OAuth) | Sync appointment ke Google/iCal/Outlook. |
| EI-06 | Video Call Provider | Telehealth meeting link (fase lanjutan). |
| EI-07 | Wearable API | Fase lanjutan (Google Fit/Apple Health via companion). |

---

## 10. Prioritas & Roadmap Rilis

### Rilis 1 — MVP Aman (Kritis)
- AUTH lengkap (login, verifikasi, RBAC, 2FA specialist/admin, proteksi `/admin`)
- Client dashboard dasar + food diary
- AI food scanner (scan → edit → simpan ke diary)
- Program creation + enrollment + secure invitation
- Appointment booking + status management
- Client management + medical intake + audit trail
- Payment via gateway resmi (atau mode demo dengan disclaimer besar)
- Notifikasi in-app + email
- Privacy/Terms/Help terisi; PWA installable + offline dasar

### Rilis 2 — Pertumbuhan (Tinggi)
- Program builder berstruktur + progress tracking
- Reports & analytics + export PDF
- Secure messaging real-time + attachment
- Session summary + grafik progress
- Review dengan verifikasi & moderasi
- Push notification + reminder otomatis
- Food library: search, filter, tags, serving size

### Rilis 3 — Diferensiasi (Menengah)
- Micronutrient tracking, AI recommendation, database matching
- Calendar sync, public booking page, telehealth
- Invoice history, promo/package, recipe recommendation
- Blog/education content

### Rilis 4 — Ekspansi (Lanjutan)
- AI meal planner, AI session summary, AI recipe generator
- Wearable integration, clinical screening, subscription SaaS
- Multi-specialist/team support, corporate wellness module

---

## 11. Acceptance Criteria

Sistem dinyatakan lulus bila:

1. **Keamanan:** Akses langsung ke URL `/admin/**` tanpa login selalu dialihkan ke halaman login (uji: incognito, direct URL, API call tanpa token → 401/403).
2. **RBAC:** Client tidak dapat mengakses data client lain maupun endpoint specialist (uji IDOR).
3. **PWA:** Lulus Lighthouse installability; app dapat di-install di Android & iOS; food diary dapat ditulis offline dan tersinkron saat online.
4. **AI Scan:** Upload foto → hasil dengan confidence score dalam < 10 detik → dapat diedit → tersimpan ke diary → total harian ter-update.
5. **Invitation:** Link mengandung token acak, kedaluwarsa sesuai konfigurasi, tidak menampilkan data medis, dan dapat di-revoke.
6. **Payment demo:** Tidak ada network request yang membawa data kartu; disclaimer & watermark tampil jelas.
7. **Audit:** Setiap perubahan data medis tercatat lengkap di audit log.
8. **Booking:** Alur book → confirm → reminder → complete/cancel berjalan end-to-end dengan status yang benar.
9. **Aksesibilitas:** Halaman utama lulus pemeriksaan WCAG 2.1 AA otomatis (axe) tanpa error kritis.
10. **Performa:** Lighthouse Performance ≥ 85 (mobile, halaman dashboard).

---

## 12. Asumsi, Batasan, dan Ketergantungan

### Asumsi
1. Prototype yang ada sebagian besar berupa UI; backend dibangun baru sesuai SRS ini.
2. Data pada prototype (nama client, transaksi, hasil scan) adalah dummy.
3. Akurasi AI food scan bersifat estimasi; pengguna diberi kemampuan edit manual.

### Batasan
1. Push notification iOS memerlukan iOS 16.4+ dan app harus di-install ke home screen.
2. Fitur kamera bergantung pada permission browser pengguna.
3. Telehealth video call bergantung pada provider pihak ketiga.

### Ketergantungan
1. Payment gateway resmi (kontrak & API key).
2. AI vision API / model untuk food recognition.
3. Layanan email transaksional dan push notification.

---

## 13. Glosarium

| Istilah | Definisi |
|---|---|
| **PWA** | Progressive Web App — aplikasi web installable dengan kemampuan offline dan push. |
| **RBAC** | Role-Based Access Control — hak akses berdasarkan peran. |
| **AI Food Scanner** | Analisis foto makanan menggunakan AI untuk estimasi nutrisi. |
| **Food Diary** | Catatan konsumsi makanan harian. |
| **Medical Intake** | Form pengumpulan data kesehatan awal client. |
| **Meal Plan** | Rencana makan berdasarkan tujuan nutrisi. |
| **Session Summary** | Ringkasan hasil sesi konsultasi. |
| **Telehealth** | Konsultasi kesehatan jarak jauh via video/digital. |
| **EHR/EMR** | Electronic Health/Medical Record. |
| **Practice Management** | Sistem pengelolaan praktik (appointment, client, billing, layanan). |
| **Signed Token** | Token acak bertanda tangan kriptografis untuk link aman. |
| **Audit Trail** | Catatan kronologis perubahan data dan aktivitas sistem. |

---

*Dokumen ini disusun berdasarkan Laporan Analisis Komprehensif Fitur Unggulan NutriFlow dan siap digunakan sebagai spesifikasi implementasi oleh AI agent atau tim pengembang.*
