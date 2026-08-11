# **Laporan Analisis Komprehensif Fitur Unggulan Proyek Tim Pengembangan** 

## **Studi Kasus: NutriFlow — Prototype Nutrition App & Specialist Practitioner Portal** 

## **1. Pendahuluan** 

### **1.1 Tujuan Analisis** 

Laporan ini disusun untuk menganalisis secara komprehensif fitur-fitur unggulan yang telah diimplementasikan oleh tim pengembangan pada proyek NutriFlow, baik dari sisi client/user application maupun specialist practitioner/admin portal. 

Analisis dilakukan dengan pendekatan sistem analis senior, yaitu dengan meninjau: 

- Fitur yang sudah tersedia pada prototype tim pengembangan. 

- Kesesuaian fitur dengan kebutuhan aplikasi nutrisi modern. 

- Perbandingan fitur NutriFlow dengan website atau aplikasi pesaing yang telah dianalisis sebelumnya. 

- Kekuatan, kelemahan, serta peluang pengembangan fitur lanjutan. 

- Catatan risiko teknis, keamanan, dan pengalaman pengguna. 

Sumber utama analisis berasal dari dokumen berikut: 

1. Analisis Fitur Tim Dev (user).pdf 

2. Analisis Fitur Tim Dev (admin).pdf 

3. Analisis Fitur Unggulan.pdf 

4. Dokumen scraping fitur kompetitor nutrisi: 

   - Cronometer 

   - MyFitnessPal 

   - Healthie 

   - iNutriMon 

   - NutriAdmin 

   - Nutrium 

   - Practice Better 

### **1.2 Tujuan Membandingkan Fitur dengan Situs Web Pesaing** 

Perbandingan dengan kompetitor dilakukan untuk mengetahui posisi aktual NutriFlow dalam lanskap aplikasi nutrisi digital. Tujuan utamanya adalah: 

1. Memvalidasi kelengkapan fitur Menentukan apakah fitur yang dibangun tim pengembangan sudah termasuk fitur umum yang lazim ditemukan pada aplikasi nutrisi, EHR, practice management, atau nutrition tracking modern. 

2. Mengidentifikasi competitive advantage 

   - Menemukan fitur yang membuat NutriFlow lebih unggul atau lebih inovatif dibandingkan pesaing. 

3. Mengidentifikasi gap fitur Mengetahui fitur penting yang sudah dimiliki pesaing namun belum tersedia pada prototype NutriFlow. 

4. Memberikan rekomendasi pengembangan Menyusun saran fitur baru, perbaikan UI/UX, peningkatan keamanan, dan prioritas pengembangan berikutnya. 

5. Mendukung pengambilan keputusan bisnis dan teknis Hasil analisis ini dapat digunakan oleh tim pengembangan, analis sistem, product owner, maupun stakeholder untuk menentukan roadmap produk. 

## **2. Gambaran Umum Proyek NutriFlow** 

Berdasarkan dokumen scraping <u>prototype, NutriFlow terdiri dari dua bagian utama:</u> 

|No|Bagian<br>Sistem|URL Sumber|Peran|
|---|---|---|---|
|1|NutriFlow<br>Client<br>Health<br>Sanctuary|https://prototype-application-nutrition.vercel<br>.app/|Aplikasi sisi<br>client/pasien<br>untuk melihat<br>program nutrisi,<br>booking<br>konsultasi, scan<br>makanan, review,<br>dan pembayaran.|
|2|NutriFlow<br>Admin /<br>Specialist<br>Practitioner<br>Portal|https://prototype-application-nutrition.vercel<br>.app/admin/index.html|Portal<br>praktisi/spesialis<br>untuk mengelola<br>client, program,<br>layanan, library<br>makanan/resep,<br>appointment, dan<br>hasil AI food<br>scan.|



Secara konsep, NutriFlow bukan hanya aplikasi food tracker biasa, tetapi mengarah ke kombinasi antara: 

- Aplikasi nutrisi untuk client 

- Portal praktisi nutrisi 

- Sistem konsultasi 

- Program nutrisi personal 

- AI food scanner 

- Booking dan payment simulation 

- Client engagement platform 

Dengan demikian, posisi NutriFlow lebih dekat dengan kombinasi fitur dari beberapa kompetitor seperti: 

|Kompetitor|Kemiripan dengan NutriFlow|
|---|---|
|MyFitnessPal|Food tracking, calorie estimation, macro tracking, mobile-style user<br>experience|
|Cronometer|Nutrient tracking, food analysis, biometrics-style nutrition monitoring|
|NutriAdmin|Client management, meal planning, recipe/food library, practitioner<br>tools|
|Nutrium|Client app, dietitian workflow, appointment, progress monitoring|
|Healthie|Patient engagement, EHR-style client management, journaling,<br>appointment, clinical workflow|
|Practice Better|Scheduling, client portal, secure communication, practitioner<br>dashboard|
|iNutriMon|Clinical nutrition perspective, intake, medical conditions, nutrition<br>planning|



## **3. Perbandingan Fitur** 

### **3.1 Ringkasan Matrix Fitur NutriFlow vs Kompetitor** 

|No|Fitur|NutriFlow|Kompetitor|Analisis Singkat|
|---|---|---|---|---|
||||yang Memiliki||
||||Fitur Serupa||



|1|Dashboard client|Ada|MyFitnessPal,<br>Cronometer,<br>Nutrium,<br>Practice Better|NutriFlow sudah<br>memiliki struktur<br>dashboard client,<br>namun masih<br>berbasis prototype<br>dengan data<br>contoh.|
|---|---|---|---|---|
|2|Program nutrisi<br>personal|Ada|Nutrium,<br>NutriAdmin,<br>Practice Better,<br>Healthie|Sudah relevan<br>dengan kebutuhan<br>aplikasi nutrisi<br>profesional.|
|3|Booking konsultasi|Ada|Healthie,<br>NutriAdmin,<br>Nutrium,<br>Practice Better|Fitur cukup kuat<br>karena sudah ada<br>pemilihan tanggal<br>dan slot waktu.|
|4|AI food scanner|Ada|MyFitnessPal,<br>Cronometer,<br>NutriAdmin|Menjadi fitur<br>unggulan karena<br>mendukung<br>analisis makanan<br>berbasis foto.|
|5|Meal detail modal|Ada|Cronometer,<br>MyFitnessPal,<br>Nutrium|Sudah<br>menampilkan kalori<br>dan makro, tetapi<br>belum terlihat<br>detail mikronutrien.|
|6|Checkout/payment<br>simulation|Ada|Healthie,<br>NutriAdmin,<br>Nutrium,<br>Practice Better,<br>MyFitnessPal|UI pembayaran<br>sangat lengkap,<br>tetapi masih<br>simulasi dan perlu<br>perhatian<br>keamanan.|



|7|Review specialist|Ada|Nutrium,<br>marketplace<br>kesehatan,<br>beberapa<br>platform<br>konsultasi|Fitur review<br>menjadi nilai<br>trust-building yang<br>baik.|
|---|---|---|---|---|
|8|Form registrasi client|Ada|Semua<br>kompetitor<br>utama|Fitur dasar sudah<br>tersedia.|
|9|Admin client<br>management|Ada|Healthie,<br>NutriAdmin,<br>Nutrium,<br>Practice Better|Sudah kuat karena<br>mendukung data<br>goal, alergi, kondisi<br>medis.|
|10|Medical intake form|Ada|Healthie,<br>iNutriMon,<br>Practice Better|Fitur sangat<br>penting dan<br>membuat<br>NutriFlow lebih<br>klinis.|
|11|Recipe/Food Library|Ada|NutriAdmin,<br>Nutrium,<br>MyFitnessPal,<br>Cronometer|Sudah ada form<br>tambah<br>resep/makanan,<br>tetapi belum<br>terlihat database<br>besar.|
|12|Program creation|Ada|Nutrium,<br>NutriAdmin,<br>Practice Better,<br>Healthie|Sudah mendukung<br>pembuatan<br>program oleh<br>specialist.|
|13|Program invitation<br>via email|Ada|Healthie,<br>Practice Better,<br>Nutrium|Fitur engagement<br>yang baik, tetapi<br>perlu keamanan<br>link preview.|



|14|Services<br>management|Ada|Healthie,<br>NutriAdmin,<br>Practice Better|Sudah mendukung<br>title, duration,<br>price, dan tipe<br>layanan.|
|---|---|---|---|---|
|15|Consultation<br>channel/chat|Ada|Healthie,<br>Nutrium,<br>Practice Better|Sudah ada konsep<br>channel konsultasi,<br>perlu validasi fitur<br>real-time.|
|16|Notification panel|Ada|Hampir semua<br>aplikasi modern|Sudah tersedia,<br>termasuk mark all<br>read.|
|17|Privacy Policy,<br>Terms, Help Center|Ada di<br>footer|Semua<br>platform<br>profesional|Sudah ada sebagai<br>struktur, tetapi<br>perlu dipastikan<br>halaman<br>benar-benar terisi.|



## **4. Analisis Detail Fitur yang Diimplementasikan Tim Dev** 

### **4.1 Dashboard Client** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow memiliki halaman utama client dengan navigasi: 

- Dashboard 

- Program 

- Appointments 

- Profile 

Dashboard ini berfungsi sebagai pusat aktivitas client untuk melihat program, konsultasi, progress, makanan, notifikasi, dan akses ke fitur lain. 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|MyFitnessPal|Personalized<br>dashboard|MyFitnessPal menampilkan statistik kalori,<br>makro, olahraga, dan progres harian.|
|Cronometer|Nutrition<br>dashboard|Cronometer lebih kuat pada detail nutrien,<br>grafik, biometrik, dan laporan.|
|Nutrium|Client mobile app<br>dashboard|Nutrium menampilkan meal plan, food diary,<br>chat, dan progress tracking.|
|Practice<br>Better|Client portal|Practice Better menyediakan dashboard<br>client untuk appointment, dokumen, program,<br>dan komunikasi.|



#### **Analisis** 

Dashboard NutriFlow sudah berada pada arah yang tepat karena menjadi pusat interaksi client. Namun, dibandingkan Cronometer dan MyFitnessPal, dashboard NutriFlow belum terlihat memiliki: 

- Grafik progres jangka panjang. 

- Breakdown mikronutrien. 

- Riwayat konsumsi harian. 

- Target kalori dan makro yang dinamis. 

- Integrasi aktivitas fisik atau wearable. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

- Cronometer memiliki laporan nutrien yang sangat detail hingga puluhan nutrien. 

- MyFitnessPal memiliki food diary harian yang kuat dan basis data makanan besar. 

- Nutrium memiliki integrasi antara dietitian dan aplikasi client secara berkelanjutan. 

- Practice Better memiliki dashboard yang terintegrasi dengan dokumen, billing, dan appointment. 

#### **Rekomendasi** 

NutriFlow sebaiknya menambahkan: 

1. Ringkasan kalori harian. 

2. Progress mingguan/bulanan. 

3. Grafik berat badan. 

4. Grafik kepatuhan program. 

5. Target nutrisi personal. 

6. Food diary harian. 

7. Status appointment berikutnya. 

### **4.2 Program Nutrisi Personal** 

#### **Deskripsi Fitur NutriFlow** 

Pada sisi client, terdapat menu Program. Pada sisi admin, specialist dapat membuat program melalui form: 

- Program Name 

- Program Description 

- Select Clients 

- Tombol Publish Program 

Terdapat juga fitur Program Invitation yang memungkinkan specialist mengirim link program ke email client. 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|Nutrium|Personalized diet<br>plans|Nutrium memiliki meal planning software dan<br>personalized diet plan.|
|NutriAdmin|Meal plan<br>generator|NutriAdmin mampu menghasilkan meal plan<br>lengkap dalam 60 detik.|
|Practice<br>Better|Protocols &<br>programs|Practice Better mendukung protocols,<br>programs, dan courses untuk client.|
|Healthie|Care plans &<br>programs|Healthie memiliki care plan dan program<br>engagement.|



#### **Analisis** 

Fitur program NutriFlow sudah mencakup kebutuhan dasar untuk membuat dan membagikan program nutrisi ke client. Fitur ini sangat penting karena membedakan NutriFlow dari aplikasi food tracker sederhana. 

Namun, berdasarkan data yang tersedia, program NutriFlow masih terlihat terbatas pada: 

- Nama program. 

- Deskripsi program. 

- Pemilihan client. 

- Publish program. 

- Invitation link. 

Belum terlihat adanya: 

- Struktur program mingguan. 

- Target nutrisi per hari. 

- Meal plan detail. 

- Checklist kepatuhan client. 

- Template program. 

- Progress tracking per program. 

- Evaluasi hasil program. 

- Otomatisasi reminder program. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

|Kompetitor|Aspek Unik|
|---|---|
|NutriAdmin|Meal plan generator otomatis berbasis diet/makro tertentu.|
|Nutrium|Pre-built meal plan templates dan recipe library.|
|Practice Better|Program/courses berbasis engagement dan follow-up.|
|Healthie|Program otomatis fixed-start dan rolling.|



#### **Rekomendasi** 

NutriFlow dapat meningkatkan fitur program dengan: 

1. Program Builder Berstruktur ○ Hari ke-1 sampai hari ke-7. 

   - Meal plan per waktu makan. 

   - Target kalori/makro harian. 

   - Checklist aktivitas. 

2. Template Program ○ Weight loss. ○ Muscle gain. ○ Maintenance. ○ Low sodium. ○ Halal diet. ○ Vegetarian/vegan. ○ Keto/low carb. 

3. Progress Program ○ Persentase kepatuhan. ○ Jumlah meal yang berhasil diikuti. ○ Jumlah scan makanan yang sesuai/tidak sesuai. 

- Catatan specialist. 

- 4. Program Invitation Security ○ Link preview harus memakai token acak. ○ Link memiliki expiry date. ○ Akses data sensitif hanya setelah login. 

### **4.3 Booking Konsultasi / Appointment** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow menyediakan fitur booking konsultasi dengan: 

- Pemilihan tanggal. 

- Slot waktu: 

   - 09:00 

   - 10:30 

   - 13:00 

   - 14:30 

○ 16:00 WIB 

- Tombol Request New Date. 

Pada admin portal juga terdapat menu Appointments. 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|Healthie|Scheduling +<br>Google/iCal/Outlook sync|Healthie lebih matang karena<br>mendukung kalender online, embed<br>website, dan sinkronisasi kalender<br>eksternal.|
|NutriAdmin|Calendar & appointments|NutriAdmin mendukung reminder<br>otomatis dan pengiriman slot ke client.|
|Nutrium|Appointment management|Nutrium mendukung booking,<br>reminder, dan follow-up otomatis.|
|Practice<br>Better|Scheduling, booking page,<br>widgets|Practice Better memiliki public<br>booking page dan widget.|



#### **Analisis** 

Fitur booking NutriFlow termasuk salah satu fitur kuat karena sudah menyediakan pilihan slot waktu. Dibandingkan aplikasi nutrisi B2C seperti MyFitnessPal dan Cronometer, fitur ini lebih profesional karena mendukung interaksi dengan specialist. 

Namun, dibandingkan platform practice management seperti Healthie dan Practice Better, fitur appointment NutriFlow masih perlu ditingkatkan. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

- Healthie mendukung sinkronisasi dengan Google Calendar, iCal, dan Outlook. 

- Practice Better memiliki booking widget dan public booking page. 

- NutriAdmin memungkinkan pengiriman slot waktu ke client. 

- Nutrium memiliki reminder appointment otomatis. 

#### **Rekomendasi** 

Tambahkan fitur: 

1. Calendar sync. 

2. Reminder otomatis via email/WhatsApp. 

3. Status appointment: 

   - Pending 

   - Confirmed 

   - Rescheduled 

   - Cancelled 

   - Completed 

4. Reschedule appointment. 

5. Cancel appointment. 

6. Specialist availability management. 

7. Public booking link. 

8. Integrasi dengan telehealth meeting link. 

### **4.4 AI Food Scanner** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow memiliki fitur AI Food Scanner pada sisi client dan admin. Pada sisi client: 

- User dapat upload/scan foto makanan. 

- Sistem menampilkan estimasi nutrisi otomatis. 

##### <u>Contoh hasil:</u> 

|Makanan|Kalori|Protein|Karbo|Lemak|
|---|---|---|---|---|
|Avocado Egg Toast|320 kcal|14g|22g|18g|
|Avocado Toast|320 kcal|14g|28g|18g|



Pada sisi admin: 

- Specialist dapat upload foto. 

- Hasil analisis dapat dikirim ke client tertentu. 

- Terdapat opsi Send dan Add to Meal Plan. 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|MyFitnessPal|Meal Scan AI|MyFitnessPal Premium/Premium+ memiliki<br>fitur log makanan dengan foto berbasis AI.|
|Cronometer|Photo & Voice<br>Logging|Cronometer mendukung photo logging dan<br>voice logging.|



|NutriAdmin|AI Recipe<br>Generator|NutriAdmin menggunakan AI untuk<br>menghasilkan resep, bukan hanya scan<br>makanan.|
|---|---|---|
|Practice|AI Dictation dan|Practice Better memakai AI untuk|
|Better|AI Summary|dokumentasi sesi, bukan food scan.|
|Healthie|AI Scribe|Healthie memakai AI untuk clinical charting.|



#### **Analisis** 

AI Food Scanner adalah salah satu fitur unggulan NutriFlow. Fitur ini berpotensi menjadi competitive advantage karena: 

- Mempercepat pencatatan makanan. 

- Mengurangi hambatan input manual. 

- Memberikan estimasi kalori dan makro secara instan. 

- Bisa dikirim ke client oleh admin. 

- Bisa ditambahkan ke meal plan. 

Fitur ini menggabungkan pendekatan MyFitnessPal/Cronometer dengan workflow praktisi seperti NutriAdmin atau Nutrium. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

|Kompetitor|Aspek Unik|
|---|---|
|MyFitnessPal|Meal scan terhubung dengan food diary dan database makanan<br>besar.|
|Cronometer|Akurasi database terverifikasi dan detail nutrien sangat luas.|
|NutriAdmin|AI recipe generator dengan gambar dan analisis nutrisi.|
|Healthie|AI Scribe untuk dokumentasi klinis.|
|Practice Better|AI Summary dan AI Dictation untuk sesi konsultasi.|



#### **Rekomendasi** 

Fitur AI Food Scanner NutriFlow dapat ditingkatkan menjadi: 

1. AI Food Scanner + Food Diary 

Hasil scan otomatis masuk ke catatan makan harian. 

2. Confidence Score 

Sistem menampilkan tingkat keyakinan hasil scan, misalnya 85%. 

3. Edit Manual 

User bisa mengubah porsi, nama makanan, atau makro jika hasil AI kurang tepat. 

4. Database Matching 

Hasil scan dicocokkan dengan database makanan internal. 

5. Micronutrient Estimation 

Tambahkan estimasi serat, gula, sodium, vitamin, atau mineral. 

6. AI Recommendation 

Setelah scan, sistem memberi saran: 

   - “Protein Anda masih kurang hari ini.” 

   - “Makanan ini tinggi lemak.” 

   - “Cocok untuk program muscle gain.” 

   - “Kurang sesuai untuk low sodium diet.” 

7. Send to Specialist 

Client dapat mengirim hasil scan ke specialist untuk review. 

### **4.5 Meal Detail Modal** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow memiliki modal detail makanan. Contoh data: 

- Berry Smoothie 

- 350 kcal 

- 30g protein 

- 45g carbs 

- 8g fat 

- Catatan nutritionist 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|Cronometer|Detail makanan<br>dan nutrien|Cronometer jauh lebih detail karena melacak<br>84+ nutrien.|
|MyFitnessPal|Food detail macro<br>& calories|MyFitnessPal menyediakan kalori, makro,<br>porsi, dan database besar.|
|Nutrium|Meal plan detail|Nutrium menyediakan detail meal plan untuk<br>client.|
|NutriAdmin|Nutrition analysis|NutriAdmin dapat menganalisis makanan,<br>resep, food diary, dan meal plan.|



#### **Analisis** 

Meal Detail Modal NutriFlow sudah baik untuk kebutuhan dasar. Kehadiran catatan nutritionist menjadi nilai tambah karena memberikan konteks personal, bukan hanya angka nutrisi. 

Namun, fitur ini masih belum sedetail kompetitor yang fokus pada nutrition analysis. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

- Cronometer: micronutrient tracking. 

- NutriAdmin: analisis DRI dan defisiensi mikronutrien. 

- MyFitnessPal: database restoran dan item makanan skala besar. 

- Nutrium: integrasi meal plan dengan progress client. 

#### **Rekomendasi** 

Tambahkan informasi: 

1. Serving size. 

2. Ingredients. 

3. Allergen warning. 

4. Dietary label: 

   - Halal 

   - Vegan 

   - Vegetarian 

   - Keto 

   - Low sodium 

5. Micronutrients. 

6. Nutritionist recommendation. 

7. Suitability score terhadap program client. 

### **4.6 Checkout / Payment Simulation** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow memiliki modal pembayaran yang cukup lengkap dan realistis. Informasi yang ditemukan: 

|Item|Nilai|
|---|---|
|Referensi Transaksi|TRX-SG-2026-98124|
|Mata Uang|SGD|
|Metode Pembayaran|PayNow, GrabPay, DBS PayLah!, Kartu VISA/MC/AMEX|
|Nama Perusahaan|NutriFlow SG Pte. Ltd.|
|UEN|202688921N|
|Bank|DBS Bank Singapore|
|Virtual Account|033-904819-2|



|Total Tagihan|S$150.00|
|---|---|
|Label Keamanan|VERIFIED, 256-bit SSL Bank Security, Airwallex SG|
|Timeout|14:58|
|Disclaimer|Prototype simulation — no actual charges|



#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|Healthie|Billing, invoicing,<br>payment processing|Healthie memiliki payment processing<br>dan transfer ke rekening bank.|
|NutriAdmin|Stripe payment &<br>recurring billing|NutriAdmin mendukung pembayaran<br>online via Stripe dan langganan.|
|Nutrium|Payments & invoicing|Nutrium mendukung invoice dan<br>transaksi digital.|
|Practice<br>Better|Practice Better<br>Payments|Practice Better memiliki billing, invoice,<br>dan tracking finansial.|
|MyFitnessPal|Subscription payment|MyFitnessPal memiliki pembayaran<br>untuk Premium/Premium+.|



#### **Analisis** 

Dari sisi UI, fitur checkout NutriFlow terlihat sangat matang. Bahkan tampilannya menyerupai sistem pembayaran produksi. Ini menjadi keunggulan dari sisi presentasi prototype. Namun, terdapat catatan penting: 

- Modal checkout sangat realistis. 

- Ada field kartu kredit: 

   - Card Number 

   - Expiry Date 

   - CVV 

- Disclaimer prototype relatif kecil. 

- Perlu dipastikan tidak ada data kartu yang dikirim ke server atau analytics. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

- NutriAdmin memiliki recurring billing. 

- Healthie memiliki billing dan insurance-related workflow. 

- Practice Better memiliki payment reminder otomatis. 

- MyFitnessPal memiliki subscription management. 

- Nutrium memiliki invoicing yang terhubung dengan practice management. 

#### **Risiko** 

Fitur ini memiliki risiko UX dan keamanan jika tidak dijelaskan sebagai simulasi. Pengguna atau reviewer bisa mengira bahwa transaksi benar-benar diproses. 

#### **Rekomendasi** 

1. Perbesar disclaimer: 

   - “SIMULASI PROTOTYPE — TIDAK ADA TRANSAKSI NYATA” 

2. Tambahkan watermark pada modal pembayaran. 

3. Hilangkan input kartu kredit pada demo publik. 

4. Jika tetap ditampilkan, gunakan field dummy nonaktif. 

5. Pastikan tidak ada request network saat input kartu. 

6. Untuk versi produksi, gunakan payment gateway resmi. 

7. Tambahkan invoice history. 

8. Tambahkan status pembayaran: 

   - Pending 

   - Paid 

   - Failed 

   - Refunded 

9. Tambahkan payment reminder. 

### **4.7 Review Specialist** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow memiliki fitur rating dan review untuk specialist. 

##### <u>Contoh data:</u> 

|Item|Nilai|
|---|---|
|Rating rata-rata|4.9|
|Jumlah review|18 client reviews|
|Specialist|Dr. Hasan|



Terdapat form testimoni dan rating bintang. 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor<br>Fitur Serupa|Perbandingan|
|---|---|



|Nutrium|Professional reviews|Nutrium menggunakan review<br>untuk membangun kredibilitas<br>dietitian.|
|---|---|---|
|Practice<br>Better|Tidak terlalu menonjol sebagai<br>marketplace review|Lebih fokus ke client engagement<br>dan practice management.|
|Healthie|Tidak dominan pada public<br>review|Lebih fokus EHR dan patient<br>engagement.|
|NutriAdmin|Review website/perusahaan|Lebih banyak menampilkan rating<br>software, bukan review specialist<br>individual.|



#### **Analisis** 

Fitur review specialist adalah fitur trust-building yang baik. Dalam konteks aplikasi nutrisi, review dapat meningkatkan kepercayaan client untuk memilih specialist. 

Fitur ini cukup unik karena tidak semua platform practice management menonjolkan review individual. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

- Nutrium memiliki professional reviews untuk membangun kredibilitas. 

- Beberapa platform wellness menggunakan testimonial section di landing page. 

- Kompetitor seperti Healthie dan Practice Better lebih kuat dalam compliance dan clinical trust, bukan review publik. 

#### **Rekomendasi** 

1. Tambahkan moderasi review. 

2. Tambahkan verifikasi: 

   - Review hanya dari client yang pernah konsultasi. 

3. Tambahkan kategori review: 

   - Komunikasi 

   - Program nutrisi 

   - Ketepatan rekomendasi 

   - Kemudahan konsultasi 

4. Tambahkan halaman profil specialist. 

5. Tambahkan badge: 

   - Verified Specialist 

   - Certified Nutritionist 

   - Top Rated 

6. Tambahkan award atau certification section. 

### **4.8 Form Registrasi Client** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow memiliki form registrasi “Register & Unlock” dengan field: 

- Full Name 

- Email Address 

- Create Password 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|Semua<br>kompetitor|Sign up / register|Semua platform profesional memiliki<br>registrasi dan login.|
|Healthie|Intake onboarding|Healthie lebih lengkap karena onboarding<br>terhubung dengan EHR.|
|NutriAdmin|Client portal login|NutriAdmin memiliki akses client portal.|
|Nutrium|App sign up dan<br>login|Nutrium memiliki login untuk dietitian dan<br>client.|
|Practice Better|Client portal<br>account|Practice Better memiliki portal client<br>lengkap.|



#### **Analisis** 

Fitur registrasi NutriFlow sudah memenuhi kebutuhan dasar, namun belum terlihat adanya: 

- Login flow lengkap. 

- Forgot password. 

- Email verification. 

- Role-based access. 

- Consent agreement. 

- Privacy acknowledgement. 

- Onboarding health profile. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

- Healthie memiliki intake & onboarding lengkap. 

- Practice Better memiliki portal client dengan dokumen dan consent. 

- Nutrium memiliki client app yang terhubung dengan dietitian. 

- NutriAdmin mendukung kuesioner sebelum konsultasi. 

#### **Rekomendasi** 

Tambahkan: 

1. Email verification. 

2. Forgot password. 

3. Consent checkbox. 

4. Privacy policy agreement. 

5. Health onboarding setelah register. 

6. Role: 

   - Client 

   - Specialist 

   - Admin 

7. Two-factor authentication untuk specialist/admin. 

### **4.9 Session Summary** 

#### **Deskripsi Fitur NutriFlow** 

NutriFlow menampilkan ringkasan sesi konsultasi klinis. Contoh data: 

|Metrik|Nilai|
|---|---|
|Berat Badan|168.0 lbs|
|Body Fat|22.4%|
|Target Kalori Harian|2.100 kcal/hari|
|Target Protein Harian|150 g/hari|
|Anjuran Karbo|Sweet potato, quinoa|



#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|Perbandingan|
|---|---|---|
|Cronometer|Biometrics tracking|Cronometer melacak data biometrik dan<br>nutrisi.|
|Healthie|Charting dan care<br>plans|Healthie lebih klinis dan mendalam.|
|Nutrium|Progress monitoring|Nutrium melacak perubahan ukuran<br>tubuh, perilaku, dan kebiasaan makan.|



|Practice|Notes, protocols,|Practice Better memiliki dokumentasi sesi|
|---|---|---|
|Better|session summary|dan AI summary.|
|iNutriMon|Clinical nutrition<br>monitoring|iNutriMon lebih kuat pada data klinis<br>rumah sakit dan biokimia.|



#### **Analisis** 

Session Summary NutriFlow menunjukkan arah yang sangat baik karena menghubungkan hasil konsultasi dengan target nutrisi client. Fitur ini dapat menjadi bridge antara aplikasi tracking dan sistem konsultasi profesional. 

Namun, masih perlu pengembangan untuk menjadi catatan klinis yang lebih lengkap. 

#### **Aspek Unik Kompetitor yang Belum Dimiliki** 

- Healthie memiliki smart-fill charting dan care plans. 

- Practice Better memiliki AI Summary. 

- iNutriMon mendukung data biokimia dan formula klinis. 

- Nutrium memiliki progress monitoring jangka panjang. 

#### **Rekomendasi** 

Tambahkan: 

1. Riwayat session summary. 

2. Catatan specialist. 

3. Action plan. 

4. Target mingguan. 

5. Grafik perubahan berat badan/body fat. 

6. Rekomendasi berbasis program. 

7. Export PDF. 

8. AI session summary untuk specialist. 

## **5. Analisis Halaman Administrasi** 

### **5.1 Gambaran Umum Halaman Administrasi** 

Halaman administrasi NutriFlow terdeteksi sebagai: NutriFlow Admin - Control Dashboard URL sumber: https://prototype-application-nutrition.vercel.app/admin/index.html Navigasi utama terdiri dari: 

- Clients 

- Programs 

- Food Scans 

- Appointments 

- Services 

● Profile Sidebar terdiri dari: 

- Clients 

- Programs 

- Appointments 

- Services 

- Profile 

Terdapat user badge: 

- “DH”, kemungkinan inisial dari Dr. Hasan. 

### **5.2 Modul Halaman Admin** 

|No|Modul|Deskripsi|Analisis|
|---|---|---|---|
|1|Notifikasi|Panel notifikasi dengan<br>tombol Mark all read|Fitur standar dashboard<br>modern dan berguna untuk<br>workflow specialist.|
|2|Create Client &<br>Intake|Form tambah client baru|Sangat penting untuk<br>practice management.|
|3|Medical Intake<br>Form|Alergi, kondisi medis,<br>preferensi diet, notes,<br>medications|Fitur kuat karena membawa<br>NutriFlow ke arah clinical<br>nutrition.|
|4|Consultation<br>Channel|Chat aktif dengan client|Penting untuk engagement<br>dan follow-up.|
|5|Recipe/Food<br>Library|Tambah makanan/resep,<br>nutrisi, bahan, langkah|Selaras dengan NutriAdmin<br>dan Nutrium.|
|6|Program<br>Invitation|Kirim link program ke<br>email client|Baik untuk onboarding, tetapi<br>perlu kontrol keamanan link.|
|7|Program<br>Creation|Membuat program dan<br>publish|Core feature untuk specialist.|
|8|Services<br>Management|Membuat layanan,<br>durasi, harga, tipe lokasi|Mendukung monetisasi dan<br>pengelolaan layanan.|



|9|AI Food<br>Scanner Admin|Upload foto dan kirim<br>hasil ke client|Fitur unggulan karena<br>menggabungkan AI dan<br>workflow specialist.|
|---|---|---|---|
|10|Food Scan<br>Detail|Send dan Add to Meal<br>Plan|Sangat relevan untuk<br>integrasi scan dengan<br>program nutrisi.|



### **5.3 Analisis Create Client & Medical Intake** 

#### **Field Create Client** 

|Field|Fungsi|
|---|---|
|Full Name|Identitas client|
|Email Address|Kontak dan invitation|
|Dietary Goal|Tujuan nutrisi|
|Food Allergies|Informasi alergi|
|Medical Conditions|Kondisi medis|



#### **Field Medical Intake** 

|Field|Fungsi|
|---|---|
|Allergies|Menyimpan alergi seperti peanuts, seafood, lactose, gluten,<br>eggs, soy|
|Medical Conditions|Diabetes tipe 2, hipertensi, kolesterol tinggi, GERD|
|Dietary Preference|Balanced, halal, vegetarian, vegan, keto, low sodium|
|Notes & Medications|Catatan medis dan obat|



#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Perbandingan|
|---|---|
|Healthie|Memiliki intake & onboarding lebih lengkap, termasuk form intake,<br>waiver, consent, dan charting.|



|Practice<br>Better|Memiliki form templates dan automation untuk intake client.|
|---|---|
|NutriAdmin|Memiliki questionnaires yang bisa dikustomisasi.|
|iNutriMon|Lebih kuat pada skrining klinis dan parameter rumah sakit.|
|Nutrium|Menyimpan riwayat medis dan progress client.|



#### **Analisis** 

Medical Intake NutriFlow adalah salah satu fitur paling kuat dalam prototype admin. Dengan adanya alergi, medical conditions, dietary preference, dan medications, sistem sudah mendekati kebutuhan praktik nutrisi profesional. 

Namun, fitur ini perlu dikembangkan agar lebih aman, terstruktur, dan sesuai compliance. 

#### **Rekomendasi** 

1. Tambahkan informed consent. 

2. Tambahkan emergency contact. 

3. Tambahkan riwayat penyakit keluarga. 

4. Tambahkan riwayat diet. 

5. Tambahkan data antropometri: 

   - Tinggi badan 

   - Berat badan 

   - Lingkar pinggang 

   - Body fat 

6. Tambahkan lab markers: 

   - Gula darah 

   - Kolesterol 

   - Tekanan darah 

7. Tambahkan audit trail perubahan data. 

8. Tambahkan role-based access control. 

### **5.4 Analisis Recipe/Food Library** 

#### **Deskripsi** 

Admin dapat menambahkan makanan atau resep dengan field: 

- Food/Recipe Name 

- Category Type 

- Calories 

- Protein 

- Carbs 

- Fat 

- Image URL 

- Ingredients 

##### ● Steps 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|
|---|---|
|NutriAdmin|Recipe management, 360.000+ recipe database, nutrition analysis|
|Nutrium|Recipe library profesional|
|MyFitnessPal|Database makanan skala besar|
|Cronometer|Database makanan terverifikasi|
|NutriAdmin|AI Recipe Generator|



#### **Analisis** 

Fitur Recipe/Food Library NutriFlow sudah memenuhi kebutuhan dasar manajemen makanan dan resep. Namun, dibandingkan kompetitor, kekurangan utamanya adalah belum terlihat: 

- Database besar. 

- Validasi nutrisi otomatis. 

- Filter resep. 

- Tag diet. 

- Analisis mikronutrien. 

- Shopping list. 

- Recipe recommendation. 

- AI recipe generation. 

#### **Rekomendasi** 

1. Tambahkan kategori diet: 

   - Halal 

   - Vegan 

   - Vegetarian 

   - Keto 

   - Low sodium 

   - High protein 

2. Tambahkan allergen tags. 

3. Tambahkan serving size. 

4. Tambahkan automatic nutrition calculation. 

5. Tambahkan recipe search dan filter. 

6. Tambahkan AI recipe generator. 

7. Tambahkan fitur clone recipe. 

8. Tambahkan approval status: 

   - Draft 

   - Published 

○ Archived 

### **5.5 Analisis Program Invitation** 

#### **Deskripsi** 

Admin dapat mengirim link program ke email client. Link preview disebut dapat diakses tanpa registrasi, lalu client dapat klik register untuk mulai logging dan chat dengan specialist. 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|
|---|---|
|Healthie|Patient onboarding dan client engagement|
|Practice Better|Program invitation, portal, secure messaging|
|Nutrium|Client app invitation dan engagement|
|NutriAdmin|Client portal dan questionnaire link|



#### **Analisis** 

Fitur invitation ini baik untuk mengurangi hambatan onboarding. Client dapat melihat program terlebih dahulu sebelum membuat akun. Secara bisnis, ini dapat meningkatkan conversion rate. Namun, terdapat risiko keamanan jika link preview: 

- Tidak memakai token acak. 

- Tidak memiliki expiry time. 

- Bisa diakses publik. 

- Berisi data personal atau medis. 

- Bisa ditebak dari ID berurutan. 

#### **Rekomendasi** 

1. Gunakan signed token. 

2. Tambahkan expiration time. 

3. Batasi data preview. 

4. Jangan tampilkan data medis sebelum login. 

5. Tambahkan register/login gate untuk detail penuh. 

6. Catat log akses invitation link. 

7. Tambahkan revoke link oleh admin. 

### **5.6 Analisis Services Management** 

#### **Deskripsi** 

Admin dapat membuat layanan dengan field: 

- Service Title 

- Description 

- Duration 

- Price 

- Type/Location: 

   - Virtual Only 

   - In-Person 

   - Virtual or In-Person 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|
|---|---|
|Healthie|Scheduling, services, billing|
|Practice Better|Services, packages, appointments|
|NutriAdmin|Banyak layanan dengan harga berbeda|
|Nutrium|Appointment dan payment workflow|



#### **Analisis** 

Services Management adalah fitur penting karena mendukung sisi bisnis NutriFlow. Dengan fitur ini, specialist dapat membuat layanan berbayar dan menghubungkannya dengan booking serta payment. 

Namun, belum terlihat adanya: 

- Paket layanan. 

- Bundling. 

- Promo. 

- Kupon. 

- Recurring consultation. 

- Group session. 

- Availability per service. 

- Capacity limit. 

- Service category. 

#### **Rekomendasi** 

1. Tambahkan service category. 

2. Tambahkan package/bundle. 

3. Tambahkan promo code. 

4. Tambahkan recurring session. 

5. Tambahkan group consultation. 

6. Tambahkan link service ke payment. 

7. Tambahkan availability per specialist. 

8. Tambahkan status aktif/nonaktif layanan. 

### **5.7 Analisis Consultation Channel** 

#### **Deskripsi** 

Terdapat channel konsultasi aktif dengan client, contoh: 

- Sarah Jenkins — Active Consultation Channel 

#### **Perbandingan dengan Kompetitor** 

|Kompetitor|Fitur Serupa|
|---|---|
|Healthie|Secure messaging, group messaging, blast messaging|
|Nutrium|Direct client chat|
|Practice Better|Secure messaging 1-on-1 dan grup|
|NutriAdmin|Client portal communication|



#### **Analisis** 

Consultation channel penting untuk engagement. Fitur ini membuat NutriFlow lebih dari sekadar food tracker karena menyediakan komunikasi antara specialist dan client. Namun, berdasarkan data prototype, belum dapat dipastikan apakah chat ini: 

- Real-time. 

- Aman/encrypted. 

- Mendukung attachment. 

- Mendukung notifikasi. 

- Memiliki riwayat percakapan. 

- Memiliki template balasan. 

- Memiliki batasan akses role. 

#### **Rekomendasi** 

1. Tambahkan secure messaging. 

2. Tambahkan attachment: 

   - Foto makanan 

   - PDF 

   - Lab result 

3. Tambahkan message templates. 

4. Tambahkan read receipt. 

5. Tambahkan chat history. 

6. Tambahkan escalation tag: 

   - Urgent 

   - Follow-up 

   - Need Review 

7. Tambahkan kebijakan privasi komunikasi. 

### **5.8 Catatan Keamanan Halaman Admin** 

#### **Temuan Kritis** 

Dokumen scraping mencatat bahwa halaman admin dapat diakses langsung tanpa proses login/autentikasi. 

URL: 

https://prototype-application-nutrition.vercel.app/admin/index.html 

Jika ini hanya untuk demo, risikonya masih dapat diterima dalam konteks prototype terbatas. Namun, jika aplikasi akan go-live, ini adalah masalah serius. 

#### **Risiko** 

|No|Risiko|Dampak|
|---|---|---|
|1|Broken access control|Pengguna tidak berwenang dapat membuka<br>admin dashboard.|
|2|Eksposur data client|Nama client dan data medis dapat terlihat publik.|
|3|Penyalahgunaan fitur<br>admin|Orang lain dapat mencoba membuat program,<br>service, atau data client.|
|4|Kebocoran data sensitif|Alergi, kondisi medis, dan medications termasuk<br>data sensitif.|
|5|Reputasi produk<br>menurun|Reviewer atau stakeholder dapat menilai sistem<br>tidak aman.|



#### **Rekomendasi Prioritas Tinggi** 

1. Tambahkan login admin. 

2. Terapkan role-based access control: 

   - Super Admin 

   - Specialist 

   - Assistant/Admin Staff 

   - Client 

3. Proteksi semua route /admin. 

4. Gunakan session management. 

5. Tambahkan token authentication. 

6. Tambahkan audit log. 

7. Gunakan dummy data yang jelas pada demo. 

8. Jangan tampilkan data medis pada halaman publik. 

9. Tambahkan environment separation: 

   - Demo 

   - Staging 

   - Production 

## **6. Analisis Berdasarkan Panduan “Analisis Fitur Unggulan.pdf”** 

Dokumen Analisis Fitur Unggulan.pdf menggunakan pendekatan matrix checklist untuk membandingkan fitur prototype dengan kompetitor. Walaupun contoh pada dokumen tersebut menggunakan domain bisnis spa, pendekatan analisisnya tetap relevan untuk NutriFlow. Pendekatan yang dapat diterapkan pada NutriFlow adalah: 

1. Memisahkan fitur menjadi kategori. 

2. Menentukan apakah fitur tersebut umum pada kompetitor. 

3. Menentukan apakah prototype sudah memilikinya. 

4. Mengidentifikasi kekurangan prototype. 

5. Mengidentifikasi competitive advantage. 

6. Mengusulkan inovasi lanjutan. 

### **6.1 Matrix Checklist NutriFlow** 

Keterangan: 

- ✅ = Tersedia 

- ❌ = Tidak tersedia / belum ditemukan 

- ⚠ = Tersedia sebagian / masih prototype / perlu validasi 

|Kategori &<br>Fitur|Crono<br>meter|MyFitn<br>essPal|Hea<br>lthie|NutriA<br>dmin|Nutr<br>ium|Pra<br>ctic<br>e<br>Bett<br>er|iNutri<br>Mon|Nutri<br>Flow|
|---|---|---|---|---|---|---|---|---|
|Food<br>tracking|✅|✅|⚠|✅|✅|⚠|❌|⚠|
|AI<br>food/photo<br>scan|✅|✅|❌|⚠|❌|❌|❌|✅|
|Macro<br>tracking|✅|✅|⚠|✅|✅|⚠|⚠|✅|
|Micronutrien<br>t tracking|✅|⚠|⚠|✅|✅|❌|⚠|❌|
|Meal|⚠|✅|⚠|✅|✅|✅|⚠|⚠|



|planning|||||||||
|---|---|---|---|---|---|---|---|---|
|Recipe/Foo<br>d library|✅|✅|⚠|✅|✅|✅|❌|✅|
|Program<br>creation|❌|❌|✅|✅|✅|✅|⚠|✅|
|Client<br>managemen<br>t|❌|❌|✅|✅|✅|✅|✅|✅|
|Medical<br>intake|❌|❌|✅|⚠|⚠|✅|✅|✅|
|Appointment<br>booking|❌|❌|✅|✅|✅|✅|⚠|✅|
|Payment/ch<br>eckout|✅|✅|✅|✅|✅|✅|❌|⚠|
|Client<br>review|❌|❌|❌|⚠|✅|❌|❌|✅|
|Secure<br>messaging/c<br>hat|❌|❌|✅|⚠|✅|✅|⚠|⚠|
|Telehealth|❌|❌|✅|✅|⚠|✅|⚠|❌|
|Notification<br>panel|✅|✅|✅|✅|✅|✅|⚠|✅|
|Admin portal|❌|❌|✅|✅|✅|✅|✅|✅|
|Role-based<br>access|❌|❌|✅|✅|✅|✅|✅|❌|
|Compliance/<br>security|✅|⚠|✅|✅|✅|✅|✅|⚠|
|Reports &<br>analytics|✅|✅|✅|✅|⚠|✅|✅|❌|
|Wearable<br>integration|✅|✅|⚠|❌|⚠|❌|❌|❌|
|Blog/educati<br>on|✅|✅|✅|✅|✅|✅|⚠|❌|





<!-- Start of picture text -->
Help  ✅ ✅ ✅ ✅ ✅ ✅ ⚠ ⚠<br>center/policy<br>pages<br><!-- End of picture text -->

### **6.2 Fitur “Wajib” yang Sudah Dipenuhi NutriFlow** 

Berdasarkan pola umum dari kompetitor, NutriFlow sudah memenuhi beberapa fitur penting: 

1. Client dashboard 

2. Program nutrisi 

3. Booking konsultasi 

4. AI food scanner 

5. Macro display 

6. Specialist/admin portal 

7. Client management 

8. Medical intake 

9. Food/recipe library 

10. Payment simulation 

11. Review specialist 

12. Notification panel 

### **6.3 Kekurangan NutriFlow Dibandingkan Fitur Umum Kompetitor** 

Beberapa fitur yang umum ditemukan pada kompetitor tetapi belum ditemukan atau belum matang di NutriFlow: 

|No|Kekurangan|Kompetitor<br>Pembanding|Dampak|
|---|---|---|---|
|1|Belum ada<br>authentication admin|Healthie, NutriAdmin,<br>Nutrium, Practice<br>Better|Risiko keamanan tinggi.|
|2|Belum ada role-based<br>access control|Healthie, Practice<br>Better, Nutrium|Sulit mengatur hak akses<br>pengguna.|
|3|Belum ada food diary<br>harian penuh|MyFitnessPal,<br>Cronometer, Nutrium|Client belum bisa<br>melakukan tracking<br>konsumsi harian secara<br>lengkap.|
|4|Belum ada reports &<br>analytics|Cronometer,<br>Healthie, Practice<br>Better|Specialist sulit<br>mengevaluasi progress<br>jangka panjang.|



|5|Belum ada<br>micronutrient tracking|Cronometer,<br>NutriAdmin|Analisis nutrisi masih<br>terbatas pada makro.|
|---|---|---|---|
|6|Belum ada telehealth|Healthie, NutriAdmin,<br>Practice Better|Konsultasi belum<br>sepenuhnya digital<br>end-to-end.|
|7|Belum ada calendar<br>sync|Healthie, NutriAdmin,<br>Practice Better|Appointment kurang<br>terintegrasi dengan<br>workflow pengguna.|
|8|Belum ada secure<br>messaging yang<br>tervalidasi|Healthie, Nutrium,<br>Practice Better|Chat perlu peningkatan<br>keamanan dan reliabilitas.|
|9|Belum ada wearable<br>integration|MyFitnessPal,<br>Cronometer|Data aktivitas dan<br>biometrik belum otomatis.|
|10|Belum ada<br>blog/education content|Cronometer,<br>NutriAdmin, Nutrium|Engagement dan edukasi<br>pengguna belum<br>maksimal.|
|11|Belum ada<br>subscription<br>management|MyFitnessPal,<br>Healthie, Practice<br>Better|Monetisasi belum lengkap.|
|12|Belum ada invoice<br>history|Healthie, NutriAdmin,<br>Practice Better|Payment workflow belum<br>matang.|



### **6.4 Keunggulan NutriFlow** 

<u>NutriFlow memiliki beberapa keunggulan yang cukup kuat dibandingkan sebagian kompetitor:</u> 

|No|Keunggulan|Penjelasan|
|---|---|---|
|1|Kombinasi client app dan<br>admin portal|Tidak hanya aplikasi tracking, tetapi juga<br>mendukung workflow specialist.|
|2|AI food scanner tersedia di<br>sisi client dan admin|Fitur ini menghubungkan AI dengan<br>kebutuhan praktisi.|



|3|Medical intake cukup lengkap|Sudah mencakup alergi, kondisi medis,<br>preferensi diet, dan obat.|
|---|---|---|
|4|Program invitation|Mendukung onboarding client melalui<br>email/link.|
|5|Services management|Mendukung model bisnis konsultasi nutrisi.|
|6|Review specialist|Membantu trust-building.|
|7|Checkout simulation sangat<br>matang secara UI|Cocok untuk presentasi prototype, meski<br>perlu penanda simulasi lebih jelas.|
|8|Add to Meal Plan dari hasil<br>scan|Potensi besar untuk menghubungkan AI<br>scan dengan meal planning.|



## **7. Analisis Strategis Fitur Unggulan** 

### **7.1 NutriFlow sebagai Hybrid Platform** 

NutriFlow memiliki potensi menjadi platform hybrid yang menggabungkan: 

|Dimensi|Contoh Kompetitor|Posisi NutriFlow|
|---|---|---|
|Consumer food<br>tracking|MyFitnessPal,<br>Cronometer|NutriFlow sudah punya AI scanner,<br>tetapi belum punya food diary lengkap.|
|Practice<br>management|NutriAdmin,<br>Practice Better|NutriFlow sudah punya admin portal,<br>client management, services, program.|
|Dietitian-client<br>engagement|Nutrium, Healthie|NutriFlow sudah punya program<br>invitation, consultation channel, review.|
|Clinical nutrition|iNutriMon, Healthie|NutriFlow sudah punya medical intake,<br>tetapi belum punya skrining klinis<br>formal.|



Artinya, NutriFlow tidak harus meniru satu kompetitor secara penuh. Strategi terbaik adalah menjadikannya sebagai platform modular: 

1. Client Nutrition App 

2. Specialist Portal 

3. AI Food Intelligence 

4. Program & Meal Plan Engine 

5. Appointment & Consultation System 

6. Payment & Service Commerce 

7. Analytics & Progress Monitoring 

## **8. Rekomendasi Pengembangan Fitur Baru** 

### **8.1 Prioritas Kritis** 

Fitur berikut perlu diprioritaskan sebelum prototype dianggap siap untuk demo formal atau <u>go-live terbatas.</u> 

|Prioritas|Fitur|Alasan|
|---|---|---|
|1|Admin authentication|Saat ini halaman admin dapat diakses<br>publik.|
|2|Role-based access control|Untuk membedakan akses client,<br>specialist, admin.|
|3|Demo data protection|Data medis dan nama client harus jelas<br>dummy.|
|4|Payment disclaimer besar|Menghindari kesalahpahaman transaksi<br>nyata.|
|5|Disable real card input pada<br>demo|Menghindari risiko data kartu<br>dimasukkan oleh user.|
|6|Secure invitation link|Program preview tidak boleh membuka<br>data sensitif.|



### **8.2 Prioritas Tinggi** 

|Prioritas|Fitur|Alasan|
|---|---|---|
|1|Food diary harian|Fitur utama aplikasi nutrisi.|
|2|Progress tracking|Agar client dan specialist dapat melihat<br>perkembangan.|
|3|Reports & analytics|Dibutuhkan untuk evaluasi program.|



|4|Meal plan builder|Mengubah program menjadi rencana<br>makan yang lebih actionable.|
|---|---|---|
|5|Appointment status<br>management|Agar booking lebih realistis.|
|6|Secure messaging|Komunikasi client-specialist harus aman.|
|7|Email notification/reminder|Meningkatkan engagement.|
|8|Client profile lengkap|Menghubungkan intake, program, scan,<br>appointment, dan progress.|



### **8.3 Prioritas Menengah** 

|Prioritas|Fitur|Alasan|
|---|---|---|
|1|Micronutrient tracking|Meningkatkan kualitas analisis<br>nutrisi.|
|2|Recipe recommendation|Menambah nilai fitur food library.|
|3|AI recommendation setelah food<br>scan|Membuat AI scanner lebih<br>bermanfaat.|
|4|Calendar integration|Memudahkan specialist dan client.|
|5|Telehealth integration|Melengkapi consultation workflow.|
|6|Invoice history|Mendukung monetisasi.|
|7|Review moderation|Menjaga kualitas dan kepercayaan<br>review.|
|8|Blog/education content|Mendukung edukasi dan SEO.|



### **8.4 Prioritas Lanjutan** 

Prioritas Fitur Alasan 

|1|Wearable integration|Mengambil data aktivitas dan kesehatan<br>otomatis.|
|---|---|---|
|2|AI meal planner|Menyamai dan melampaui<br>NutriAdmin/MyFitnessPal Premium+.|
|3|AI session summary|Menyamai Practice Better AI dan Healthie AI<br>Scribe.|
|4|Clinical screening tools|Jika ingin masuk pasar klinis seperti<br>iNutriMon.|
|5|Subscription packages|Untuk model bisnis SaaS.|
|6|Multi-specialist/team<br>support|Untuk klinik atau group practice.|
|7|Corporate wellness<br>module|Jika ingin bersaing dengan Nutrium Care.|



## **9. Kesimpulan** 

### **9.1 Temuan Utama** 

Berdasarkan analisis terhadap prototype NutriFlow dan perbandingan dengan kompetitor, dapat disimpulkan bahwa NutriFlow memiliki fondasi fitur yang cukup kuat. Prototype ini sudah mencakup banyak fitur penting, terutama: 

1. Dashboard client. 

2. Program nutrisi. 

3. Booking konsultasi. 

4. AI food scanner. 

5. Meal detail modal. 

6. Session summary. 

7. Checkout/payment simulation. 

8. Review specialist. 

9. Admin client management. 

10. Medical intake form. 

11. Recipe/Food Library. 

12. Program creation. 

13. Program invitation. 

14. Services management. 

15. Consultation channel. 

Fitur-fitur tersebut menunjukkan bahwa NutriFlow sudah bergerak ke arah platform nutrisi yang 

tidak hanya berfungsi sebagai food tracker, tetapi juga sebagai platform konsultasi nutrisi berbasis specialist. 

### **9.2 Kekurangan Utama Dibandingkan Kompetitor** 

Kekurangan paling penting yang ditemukan adalah: 

1. Halaman admin dapat diakses publik tanpa autentikasi. Ini merupakan isu kritis dari sisi keamanan dan harus menjadi prioritas utama. 

2. Belum terlihat role-based access control. Sistem perlu membedakan akses client, specialist, admin, dan mungkin super admin. 

3. Food diary belum lengkap. Dibandingkan MyFitnessPal, Cronometer, dan Nutrium, NutriFlow belum terlihat memiliki pencatatan konsumsi harian yang matang. 

4. Belum ada reports & analytics. Kompetitor seperti Cronometer, Healthie, Practice Better, dan NutriAdmin memiliki laporan dan analitik lebih kuat. 

5. AI food scanner belum terhubung penuh dengan food diary, progress, dan recommendation engine. 

6. Checkout masih berupa simulasi yang terlalu realistis. Hal ini perlu diperjelas agar tidak menimbulkan kesalahpahaman. 

7. Belum ada telehealth. Padahal fitur ini umum pada Healthie, Practice Better, dan NutriAdmin. 

8. Belum ada compliance dan privacy implementation yang terlihat. Untuk aplikasi yang memuat data medis, aspek ini sangat penting. 

### **9.3 Saran Strategis** 

Agar NutriFlow lebih kompetitif, pengembangan berikutnya sebaiknya diarahkan ke empat area utama: 

#### **A. Keamanan dan Akses** 

- Admin login. 

- Role-based access control. 

- Secure program invitation link. 

- Audit trail. 

- Data privacy notice. 

- Consent management. 

#### **B. Core Nutrition Experience** 

- Food diary. 

- Meal plan builder. 

- Progress tracking. 

- Nutrition analytics. 

- Micronutrient tracking. 

- AI recommendation. 

#### **C. Specialist Workflow** 

- Client profile lengkap. 

- Session notes. 

- Program templates. 

- Appointment management. 

- Secure messaging. 

- Reports/export PDF. 

#### **D. Monetisasi dan Engagement** 

- Payment gateway production-ready. 

- Invoice history. 

- Subscription/package. 

- Reminder otomatis. 

- Review moderation. 

- Education/blog content. 

### **9.4 Kesimpulan Akhir** 

NutriFlow memiliki potensi besar untuk menjadi platform nutrisi digital yang kompetitif karena sudah menggabungkan beberapa elemen penting dari aplikasi B2C seperti MyFitnessPal/Cronometer dan platform B2B/practice management seperti Healthie, NutriAdmin, Nutrium, dan Practice Better. 

Keunggulan terbesar NutriFlow saat ini adalah kombinasi antara: 

- AI Food Scanner 

- Specialist Admin Portal 

- Medical Intake 

- Program Creation 

- Booking Consultation 

- Payment Simulation 

- Review Specialist 

Namun, sebelum dikembangkan lebih jauh, tim perlu memprioritaskan perbaikan pada aspek keamanan, terutama proteksi halaman admin. Setelah itu, pengembangan dapat difokuskan pada food diary, analytics, meal planning, dan secure communication agar NutriFlow dapat bersaing lebih kuat dengan platform nutrisi profesional yang sudah matang. 

## **10. Lampiran** 

### **10.1 Sumber Dokumen** 

No Nama Dokumen Fungsi dalam Analisis 

|1|Analisis Fitur Tim Dev<br>(user).pdf|Sumber utama fitur sisi client NutriFlow.|
|---|---|---|
|2|Analisis Fitur Tim Dev<br>(admin).pdf|Sumber utama fitur sisi admin/specialist portal<br>NutriFlow.|
|3|Analisis Fitur<br>Unggulan.pdf|Panduan struktur analisis matrix, checklist,<br>competitive advantage, dan rekomendasi inovasi.|
|4|Analisis Fitur<br>cronometer.pdf|Pembanding fitur food tracking dan nutrisi detail.|
|5|Analisis Fitur<br>myfitnesspal.pdf|Pembanding fitur B2C nutrition tracking, meal<br>scan, premium, dan meal planner.|
|6|Analisis Fitur<br>gethealthie.pdf|Pembanding EHR, patient engagement,<br>scheduling, billing, AI Scribe.|
|7|Analisis Fitur<br>INutriMon.pdf|Pembanding clinical nutrition dan medical<br>screening.|
|8|Analisis Fitur<br>nutriadmin.pdf|Pembanding practice management, meal plan,<br>recipe, payment, telehealth.|
|9|Analisis Fitur nutrium.pdf|Pembanding dietitian platform, client app,<br>corporate wellness, engagement.|
|10|Analisis Fitur<br>practicebetter.pdf|Pembanding EHR, scheduling, secure<br>messaging, programs, AI summary.|



### **10.2 Catatan Batasan Analisis** 

1. Analisis dilakukan berdasarkan data publik dan dokumen scraping yang diberikan. 

2. Beberapa fitur prototype mungkin hanya berupa tampilan UI dan belum tentu memiliki backend fungsional. 

3. Status fitur dinilai berdasarkan keberadaan fitur pada dokumen, bukan hasil pengujian teknis langsung. 

4. Beberapa data seperti nama client, transaksi, dan hasil scan diasumsikan sebagai dummy data prototype. 

5. Rekomendasi dibuat berdasarkan kesimpulan logis dari perbandingan dengan kompetitor. 

### **10.3 Glosarium** 

|Istilah|Penjelasan|
|---|---|
|AI Food Scanner|Fitur analisis makanan dari foto menggunakan AI.|
|Client Portal|Area khusus client untuk melihat program, appointment, dan<br>data pribadi.|
|EHR|Electronic Health Record, sistem rekam kesehatan elektronik.|
|EMR|Electronic Medical Record, rekam medis elektronik.|
|Food Diary|Catatan konsumsi makanan harian.|
|Meal Plan|Rencana makan yang disusun berdasarkan tujuan nutrisi.|
|Medical Intake|Form awal untuk mengumpulkan data kesehatan client.|
|Practice<br>Management|Sistem pengelolaan praktik profesional seperti appointment,<br>client, billing, dan layanan.|
|RBAC|Role-Based Access Control, pengaturan hak akses<br>berdasarkan peran pengguna.|
|Secure Messaging|Komunikasi aman antara client dan specialist.|
|Telehealth|Konsultasi kesehatan jarak jauh melalui video atau platform<br>digital.|



