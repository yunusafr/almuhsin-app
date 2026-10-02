/**
 * ISI PROFIL PESANTREN
 * ------------------------------------------------------------------
 * Semua teks landing page diambil dari berkas ini supaya mudah diganti.
 *
 * SUMBER ISI (diambil 1 Oktober 2026 dari situs resmi lembaga):
 * - Sejarah, visi, dan misi  : https://smkislam1blitar.sch.id/sejarah-sekolah/
 *                              https://smkislam1blitar.sch.id/visi-misi/
 * - Foto hero & galeri       : berita resmi di smkislam1blitar.sch.id
 *                              (disimpan sendiri di public/img/pesantren/)
 * - Nama, alamat, pengasuh   : keterangan pengelola pesantren
 *
 * Pondok Pesantren Al-Muhsin berada di lingkungan SMK Islam 1 Blitar —
 * sebutan resmi pada berita lembaga: "Pondok Pesantren Al-Muhsin SMK Islam 1
 * Blitar". Karena itu sejarah, visi, dan misi di bawah ini adalah milik
 * lembaga (Yayasan/LP Ma'arif NU Kota Blitar), bukan karangan.
 *
 * MASIH PERLU DILENGKAPI (ditandai komentar "GANTI:"):
 * - nomor telepon/WhatsApp/surel pesantren
 * - program pendidikan & fasilitas (belum ada sumber resminya)
 * - motto resmi pesantren (sekarang usulan)
 */

export const pesantren = {
  nama: "Pondok Pesantren Al-Muhsin",
  namaPendek: "PP. Al-Muhsin",
  kota: "Kota Blitar",
  alamat: "Jl. Kaliputih, Dawuhan, Kauman, Kota Blitar",
  // GANTI: nomor telepon/WhatsApp resmi pesantren
  telepon: "(0342) 000000",
  whatsapp: "0812-0000-0000",
  // GANTI: alamat surel resmi pesantren
  email: "info@almuhsin.sch.id",
  petaUrl: "https://maps.google.com/?q=Jl.+Kaliputih+Dawuhan+Kauman+Kota+Blitar",
  jamLayanan: "Senin - Sabtu, 07.00 - 16.00 WIB",
};

export const hero = {
  // GANTI bila motto resmi pesantren berbeda
  motto: "Mencetak Generasi Qur'ani, Berilmu, dan Berakhlak",
  kalimat:
    "Pondok Pesantren Al-Muhsin berada di lingkungan SMK Islam 1 Blitar. Santri dibina dalam ilmu agama dan pendidikan formal, dengan bimbingan para asatidz serta lingkungan yang kondusif untuk menuntut ilmu.",
  foto: "/img/pesantren/hero-pesantren.jpg",
  keteranganFoto: "Haflah Muwadda'ah santri Pondok Pesantren Al-Muhsin",
};

export const profil = {
  /**
   * Sejarah lembaga — dikutip dari halaman Sejarah Sekolah (situs resmi).
   * Diringkas tanpa mengubah makna.
   */
  sejarah: [
    "Pondok Pesantren Al-Muhsin merupakan pondok pesantren di lingkungan SMK Islam 1 Blitar, beralamat di Jl. Kaliputih, Dawuhan, Kauman, Kota Blitar.",
    "Lembaga induknya, SMK Islam 1 Blitar, didirikan pada 2 Januari 1968 oleh Lembaga Pendidikan Ma'arif NU Cabang Blitar, dengan misi pengembangan ajaran Islam Ahlus Sunnah wal Jama'ah. Pada awal berdirinya bernama STM NU Blitar (Sekolah Teknologi Menengah Nahdlatul Ulama), kemudian berganti nama menjadi STM Islam Blitar pada tahun 1971.",
    "Sejak berdiri, lembaga ini memadukan pendidikan kejuruan dengan pembinaan keagamaan — sebagaimana tercermin pada semboyan sekolah: Religius & Kompeten.",
  ],
  /** Visi lembaga — dikutip dari halaman Visi dan Misi (situs resmi). */
  visi: "Mewujudkan SMK Islam 1 Blitar menjadi sekolah yang mampu mencetak teknisi yang profesional, beriman, bertaqwa kepada Allah SWT dan berakhlak mulia.",
  /** Misi lembaga — dikutip dari halaman Visi dan Misi (situs resmi). */
  misi: [
    "Melaksanakan kurikulum berbasis kompetensi melalui pembelajaran dan penilaian berbasis kompetensi dan produksi.",
    "Meningkatkan potensi peserta didik melalui kegiatan keagamaan, ekstrakurikuler, dan pembinaan kedisiplinan.",
    "Meningkatkan kuantitas dan kualitas sumber daya melalui peningkatan kualifikasi dan sertifikasi kompetensi.",
    "Mengembangkan dan meningkatkan sarana dan prasarana.",
    "Mewujudkan kultur yang bermartabat, ramah, dan santun dalam suasana kekeluargaan.",
    "Membangun kondisi yang tertib, aman, bersih, indah, nyaman, hijau, rindang, dan sehat.",
    "Mewujudkan unit produksi sebagai wahana pelatihan berbasis produksi dan kewirausahaan.",
    "Berupaya mewujudkan sistem dan kualitas pengelolaan melalui manajemen mutu ISO.",
  ],
  pengasuh: [
    { jabatan: "Pengasuh", nama: "Drs. KH. Subakir, M.Ag." },
    { jabatan: "Pimpinan Pondok", nama: "Ust. Muchammad Ma'sum, M.Pd." },
  ],
};

// GANTI: program pendidikan yang benar-benar berjalan di pesantren
export const program = [
  { nama: "Madrasah Diniyah", keterangan: "Kajian ilmu alat, fikih, dan akhlak setiap hari. (Isi sementara.)" },
  { nama: "Tahfidzul Qur'an", keterangan: "Bimbingan hafalan dengan setoran dan muraja'ah rutin. (Isi sementara.)" },
  { nama: "Kajian Kitab Kuning", keterangan: "Pembacaan kitab salaf bersama para asatidz. (Isi sementara.)" },
  { nama: "Pendidikan Formal", keterangan: "Sekolah formal setingkat MTs/MA. (Isi sementara.)" },
  { nama: "Bahasa Arab & Inggris", keterangan: "Pembiasaan percakapan dua bahasa. (Isi sementara.)" },
  { nama: "Keterampilan & Kemandirian", keterangan: "Kegiatan praktik dan kemandirian santri. (Isi sementara.)" },
];

// GANTI: fasilitas yang benar-benar tersedia
export const fasilitas = [
  { nama: "Masjid", keterangan: "Pusat ibadah dan kegiatan santri." },
  { nama: "Asrama Santri", keterangan: "Kamar tidur dengan pengawasan musyrif." },
  { nama: "Ruang Kelas", keterangan: "Ruang belajar madrasah dan sekolah." },
  { nama: "Perpustakaan", keterangan: "Koleksi kitab dan buku pelajaran." },
  { nama: "Aula", keterangan: "Tempat kegiatan bersama dan pengajian umum." },
  { nama: "Lapangan", keterangan: "Olahraga dan kegiatan luar ruang." },
];

/**
 * Galeri kegiatan — HANYA kegiatan Pondok Pesantren Al-Muhsin / santri.
 * Berita sekolah yang umum (upacara, kunjungan studi tiru, pelatihan
 * industri) sengaja TIDAK dimasukkan agar halaman ini fokus ke pondok.
 * Foto asli dari berita resmi lembaga, disimpan sendiri di
 * public/img/pesantren/ (bukan mengambil dari situs lain setiap dibuka).
 */
export const galeri = [
  { foto: "/img/pesantren/kegiatan-ziarah-wali.jpg", judul: "Ziarah wali ke Madura bersama santri Pondok Pesantren Al-Muhsin" },
  { foto: "/img/pesantren/kegiatan-ramadhan.jpg", judul: "Kegiatan Pondok Pesantren Ramadhan 1446 H" },
  { foto: "/img/pesantren/kegiatan-maulid.jpg", judul: "Peringatan Maulid Nabi dan Hari Santri Nasional bersama KH. Subakir" },
  { foto: "/img/pesantren/kegiatan-halal-bihalal.jpg", judul: "Halal bi halal keluarga besar LP Ma'arif NU di aula pesantren" },
  { foto: "/img/pesantren/kegiatan-halaqoh.jpg", judul: "Halaqoh dan Festival Media Pondok Jawa Timur (MPJ) 2024" },
  { foto: "/img/pesantren/kegiatan-blkk.jpg", judul: "Kunjungan Menteri Ketenagakerjaan RI ke BLKK Al-Muhsin" },
];

export const menuTambahan = {
  masukAplikasi: { label: "Masuk Aplikasi", href: "/app" },
  catatan: "Menu ini untuk ustadz, bendahara, dan petugas keamanan.",
};
