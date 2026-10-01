/**
 * ISI PROFIL PESANTREN
 * ------------------------------------------------------------------
 * Semua teks landing page diambil dari berkas ini supaya mudah diganti.
 *
 * CATATAN PENTING:
 * - Nama, alamat, dan kota SUDAH BENAR (sesuai keterangan pengelola).
 * - Bagian lain masih ISI SEMENTARA (dummy) dan perlu diganti dengan
 *   data resmi pesantren. Bagian yang perlu diganti ditandai komentar
 *   "GANTI:" di atasnya.
 * - Foto belum ada; sementara memakai kotak penanda "Foto menyusul".
 */

export const pesantren = {
  nama: "Pondok Pesantren Al-Muhsin",
  namaPendek: "PP. Al-Muhsin",
  kota: "Kota Blitar",
  alamat: "Jl. Kaliputih, Dawuhan, Kauman, Kota Blitar",
  // GANTI: nomor telepon/WhatsApp resmi
  telepon: "(0342) 000000",
  whatsapp: "0812-0000-0000",
  // GANTI: alamat surel resmi
  email: "info@almuhsin.sch.id",
  petaUrl: "https://maps.google.com/?q=Jl.+Kaliputih+Dawuhan+Kauman+Kota+Blitar",
  jamLayanan: "Senin - Sabtu, 07.00 - 16.00 WIB",
};

export const hero = {
  // GANTI bila motto resmi pesantren berbeda
  motto: "Mencetak Generasi Qur'ani, Berilmu, dan Berakhlak",
  kalimat:
    "Pondok Pesantren Al-Muhsin Kota Blitar membina santri dalam ilmu agama dan pendidikan formal, dengan bimbingan para asatidz serta lingkungan yang kondusif untuk menuntut ilmu.",
};

// GANTI: profil resmi pesantren
export const profil = {
  sejarah: [
    "Pondok Pesantren Al-Muhsin Kota Blitar berdiri sebagai lembaga pendidikan Islam yang membina santri dalam bidang ilmu agama dan pendidikan formal. (Isi sementara — mohon diganti dengan sejarah resmi pesantren.)",
    "Sejak awal berdirinya, pesantren ini berkomitmen mendampingi santri untuk menguasai ilmu alat, memperdalam kajian kitab, dan membiasakan adab serta akhlak dalam kehidupan sehari-hari. (Isi sementara.)",
  ],
  visi: "Menjadi lembaga pendidikan Islam yang unggul dalam membentuk santri yang beriman, berilmu, berakhlak mulia, dan bermanfaat bagi masyarakat. (Isi sementara.)",
  misi: [
    "Menyelenggarakan pendidikan agama dan umum yang seimbang. (Isi sementara.)",
    "Membina hafalan dan pemahaman Al-Qur'an. (Isi sementara.)",
    "Menanamkan akhlak dan kemandirian santri. (Isi sementara.)",
    "Menyiapkan santri yang siap mengabdi kepada masyarakat. (Isi sementara.)",
  ],
  // GANTI: nama pengasuh & pimpinan
  pengasuh: [
    { jabatan: "Pengasuh", nama: "(nama pengasuh)" },
    { jabatan: "Pimpinan Pondok", nama: "(nama pimpinan)" },
  ],
};

// GANTI: program pendidikan yang benar-benar berjalan
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

// GANTI: berita asli (sementara hanya contoh tampilan)
export const berita = [
  {
    judul: "Contoh Berita: Kegiatan Haul dan Doa Bersama",
    tanggal: "1 Oktober 2026",
    kategori: "Kegiatan",
    ringkasan: "Contoh isi berita. Berita asli dapat ditulis melalui menu Berita setelah modulnya dipasang. (Isi sementara.)",
  },
  {
    judul: "Contoh Berita: Penerimaan Santri Baru",
    tanggal: "20 September 2026",
    kategori: "Pengumuman",
    ringkasan: "Contoh isi berita mengenai alur dan syarat pendaftaran santri baru. (Isi sementara.)",
  },
  {
    judul: "Contoh Berita: Prestasi Santri di Lomba",
    tanggal: "5 September 2026",
    kategori: "Prestasi",
    ringkasan: "Contoh isi berita prestasi santri pada perlombaan tingkat kota. (Isi sementara.)",
  },
];

// GANTI: kegiatan yang biasa ditampilkan (foto menyusul)
export const galeri = [
  "Kegiatan Belajar",
  "Hafalan & Muraja'ah",
  "Pengajian Umum",
  "Kerja Bakti",
  "Olahraga",
  "Pentas Seni",
];

export const menuTambahan = {
  masukAplikasi: { label: "Masuk Aplikasi", href: "/app" },
  catatan: "Menu ini untuk ustadz, bendahara, dan petugas keamanan.",
};
