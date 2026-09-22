/**
 * Menyamarkan data pribadi pada tangkapan layar portofolio.
 *
 *   node tools/redact-images.js
 *
 * Membaca berkas asli dari content/_raw/<key>/, mengaburkan area yang
 * terdaftar di BIDANG, lalu menulis hasilnya ke content/redacted/<key>/.
 * Hanya hasil yang tersamar itu yang dirujuk data/projects.json dan
 * dijadikan sumber oleh tools/optimize-images.js.
 *
 * MENGAPA DIKABURKAN, BUKAN DITUTUP KOTAK SOLID:
 * kotak solid menyembunyikan sekaligus bentuk tabelnya, sehingga tangkapan
 * layar kehilangan gunanya sebagai peraga. Kaburan kuat tetap menyisakan
 * struktur kolom dan baris, tetapi tidak menyisakan teks yang terbaca.
 *
 * KOORDINAT ditulis dalam ruang 960px — sama dengan lebar turunan yang
 * dipakai di situs — supaya angkanya bisa dibaca langsung dari tampilan yang
 * terlihat. Skrip menskalakannya sendiri ke lebar berkas asli.
 *
 * CATATAN PENTING: ini hanya menyamarkan berkas yang TERBIT. Berkas asli
 * yang pernah ter-commit tetap dapat diambil dari riwayat git; membersihkan
 * riwayat adalah pekerjaan terpisah yang menulis ulang seluruh riwayat repo.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const RAW = path.join(ROOT, 'content', '_raw');
const OUT = path.join(ROOT, 'content', 'redacted');

/* Daftar area per berkas, dalam koordinat ruang 960px: [x, y, lebar, tinggi].
   Sengaja dibuat longgar — area yang kurang lebar menyisakan potongan nama
   yang masih terbaca, dan itu lebih buruk daripada mengaburkan sedikit
   berlebih. */
const BIDANG = {
  e_raport: {
    // 01 layar masuk — tidak ada data pribadi
    '02.png': [
      [703, 188, 160, 100]   // riwayat masuk: nama-nama guru
    ],
    '03.png': [
      [166, 226, 172, 202]   // kolom NIS dan Nama Siswa
    ],
    '04.png': [
      [406, 178, 172, 248]   // kolom Nama Guru
    ],
    '05.png': [
      [292, 78, 156, 32],    // dialog: nama siswa dan nomor induk
      [223, 322, 350, 116]   // baris di belakang dialog: nama dan NISN
    ],
    '06.png': [
      [24, 4, 140, 20],      // judul tab peramban
      [441, 70, 126, 24],    // kepala raport: nama peserta didik dan NISN
      [570, 444, 110, 24]    // tanda tangan wali kelas
    ],
    '07.png': [
      [24, 4, 172, 20],      // judul tab peramban
      [452, 264, 200, 26],   // kotak nama peserta didik
      [464, 312, 176, 26],   // kotak NISN / NIS
      [436, 420, 232, 32],   // telepon dan surel sekolah
      [400, 454, 80, 14]     // catatan kaki: nama dan nomor induk
    ],
    '08.png': [
      [24, 4, 148, 20],      // judul tab peramban
      [462, 58, 78, 24],     // kepala raport: nama dan NISN
      [572, 328, 84, 20],    // tanda tangan wali kelas
      [392, 454, 96, 14]     // catatan kaki
    ],
    '09.png': [
      [860, 2, 98, 22],      // nama guru yang sedang masuk
      [193, 250, 146, 180]   // kolom Nama Siswa
    ],
    '10.png': [
      [860, 2, 98, 22],      // nama guru yang sedang masuk
      [193, 230, 146, 176]   // kolom Nama Siswa
    ]
  }
};

async function kerjakan() {
  let ditulis = 0, dilewati = 0;
  const galat = [];

  for (const [key, berkas] of Object.entries(BIDANG)) {
    const dirRaw = path.join(RAW, key);
    const dirOut = path.join(OUT, key);
    if (!fs.existsSync(dirRaw)) { galat.push(`${key}: content/_raw/${key} tidak ada`); continue; }
    fs.mkdirSync(dirOut, { recursive: true });

    for (const nama of fs.readdirSync(dirRaw).filter(f => /\.png$/i.test(f)).sort()) {
      const src = path.join(dirRaw, nama);
      const dst = path.join(dirOut, nama);
      const area = berkas[nama];

      if (!area) {                       // tidak ada data pribadi: salin apa adanya
        fs.copyFileSync(src, dst);
        dilewati++;
        continue;
      }

      const gambar = sharp(src);
      const { width, height } = await gambar.metadata();
      const skala = width / 960;

      const tempelan = [];
      for (const [x, y, w, h] of area) {
        // Dijepit ke dalam batas gambar: satu koordinat yang meleset keluar
        // membuat sharp melempar, dan seluruh berkas gagal disamarkan.
        const left = Math.max(0, Math.round(x * skala));
        const top = Math.max(0, Math.round(y * skala));
        const lebar = Math.min(Math.round(w * skala), width - left);
        const tinggi = Math.min(Math.round(h * skala), height - top);
        if (lebar <= 0 || tinggi <= 0) { galat.push(`${key}/${nama}: area [${x},${y},${w},${h}] di luar gambar`); continue; }

        const potongan = await sharp(src)
          .extract({ left, top, width: lebar, height: tinggi })
          // Sigma diikatkan ke tinggi area: kaburan tetap sekuat itu baik pada
          // satu baris teks maupun pada blok tabel yang tinggi.
          .blur(Math.max(6, Math.round(tinggi / 6)))
          .toBuffer();
        tempelan.push({ input: potongan, left, top });
      }

      await gambar.composite(tempelan).png().toFile(dst);
      ditulis++;
    }
  }

  console.log(`disamarkan : ${ditulis} berkas`);
  console.log(`disalin apa adanya : ${dilewati} berkas (tanpa data pribadi)`);
  if (galat.length) {
    console.error('\nGALAT:');
    for (const g of galat) console.error('  - ' + g);
    process.exit(1);
  }
}

kerjakan().catch(e => { console.error(e); process.exit(1); });
