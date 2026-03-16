/**
 * ============================================================
 *  WEDDING INVITATION — DATA CONFIGURATION
 *  Edit this file to customise every detail of the invitation.
 * ============================================================
 */

const weddingData = {

  /* ── COUPLE ─────────────────────────────────────────────── */
  groom: {
    fullName   : "Kukoh Santoso",
    nickname   : "Kukoh",
    parents    : {
      father : "Bpk. Wasono",
      mother : "Ibu Darmini"
    },
    instagram  : "kukoh.santoso"
  },

  bride: {
    fullName   : "Ziyanaddini Qurrota 'Ayun",
    nickname   : "Ziyan",
    parents    : {
      father : "Bpk. Muhammad Zaim Nur",
      mother : "Ibu Tholi'ah"
    },
    instagram  : "ziyanaddini.qurrota"
  },

  /* ── WEDDING ─────────────────────────────────────────────── */
  wedding: {
    // ISO-8601 — used for countdown & calendar link
    date         : "2026-06-07T08:00:00+07:00",
    dateFormatted: "Ahad, 7 Juni 2026",
    hijriyah     : "21 Dzulhijjah 1447 H",
    hashtag      : "#qkohzqa",
    quote        : "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    quoteSource  : "QS. Ar-Rum: 21"
  },

  /* ── EVENTS ─────────────────────────────────────────────── */
  events: {
    akad: {
      title      : "Akad Nikah",
      date       : "Ahad, 07 Juni 2026",
      time       : "08.00 – 10.00 WIB",
      venue      : "Mushola Al-Hikmah",
      address    : "RT 11/RW04 Dsn. Silir Lor, Ds. Dikir, Tambakboyo, Kab. Tuban",
      mapsEmbed  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.2411612450423!2d111.77939077750634!3d-6.861784875440246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e770b6b475d16ef%3A0x2ad0a263821c09d7!2sMushola%20Al%20Hikmah!5e1!3m2!1sen!2sid!4v1773685538173!5m2!1sen!2sid",
      mapsLink   : "https://maps.app.goo.gl/gwTAdZS9KQgbpSHDA"
    },
    resepsi: {
      title      : "Resepsi Pernikahan",
      date       : "Ahad, 07 Juni 2026",
      time       : "11.00 – 14.00 WIB",
      venue      : "Kediaman Mempelai Pria",
      address    : "RT 11/RW04 Dsn. Silir Lor, Ds. Dikir, Tambakboyo, Kab. Tuban",
      mapsEmbed  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.239501074275!2d111.78168157475655!3d-6.862008793136519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e770b9f98edd767%3A0x3d7620cbb06cc0a4!2sQkoh%20St!5e1!3m2!1sen!2sid!4v1773685399162!5m2!1sen!2sid",
      mapsLink   : "https://maps.app.goo.gl/GE6RZ4jfceoEDhCg7"
    }
  },

  /* ── DRESS CODE ──────────────────────────────────────────── */
  dressCode: {
    theme      : "Sage Green & Ivory",
    description: "Hadir dengan nuansa elegan dalam balutan warna-warna berikut:",
    colors     : [
      { hex: "#FDFAF5", name: "Ivory White"  },
      { hex: "#8B9E7E", name: "Sage Green"   },
      { hex: "#C8A97E", name: "Warm Gold"    },
      { hex: "#C4B5A5", name: "Dusty Taupe"  }
    ]
  },

  /* ── BANK TRANSFER ───────────────────────────────────────── */
  bankTransfer: [
    {
      bank          : "BCA",
      accountNumber : "1234 5678 90",
      accountName   : "Raka Andhika Pratama",
      color         : "#005BAC"
    },
    {
      bank          : "BRI",
      accountNumber : "0987 6543 21 000",
      accountName   : "Salsabila Putri Maharani",
      color         : "#005BAC"
    },
    {
      bank          : "Mandiri",
      accountNumber : "1122 3344 5566",
      accountName   : "Raka Andhika Pratama",
      color         : "#003F72"
    }
  ],

  /* ── GUEST LIST ──────────────────────────────────────────── */
  /*
   *  URL usage  →  index.html?to=KEY
   *  e.g.  index.html?to=budi   OR   index.html?to=001
   *
   *  Key is case-insensitive (normalised to lower-case in JS).
   */
  guests: {
    "default"        : { name: "Tamu Undangan",                    address: "" },
    "budi"           : { name: "Sdr. Budi Santoso",                address: "Jl. Merpati No. 3, Antapani, Bandung" },
    "ani"            : { name: "Ibu Ani Rahayu & Keluarga",        address: "Jl. Mawar No. 12, Surabaya" },
    "hendra"         : { name: "Bpk. Hendra & Ibu Maria",          address: "Jl. Cendana No. 8, Tangerang Selatan" },
    "andi"           : { name: "Bpk. Andi Wijaya & Keluarga",      address: "Jl. Flamboyan No. 22, Bogor" },
    "siti"           : { name: "Ibu Siti Nurhaliza",               address: "Jl. Dahlia No. 15, Depok" },
    "keluarga-besar" : { name: "Keluarga Besar Pratama & Maharani", address: "" },
    "001"            : { name: "Bpk. Ahmad Fauzi & Keluarga",       address: "Jl. Kenanga No. 7, Bekasi" },
    "002"            : { name: "Ibu Siti Nurhaliza",               address: "Jl. Dahlia No. 15, Depok" },
    "003"            : { name: "Bpk. Andi Wijaya & Keluarga",      address: "Jl. Flamboyan No. 22, Bogor" },
    "004"            : { name: "Bpk. Dani Permana & Keluarga",     address: "Jl. Anggrek No. 5, Cimahi" },
    "005"            : { name: "Ibu Rina Kusumawati",              address: "Jl. Teratai No. 19, Bandung Barat" }
  }
};
