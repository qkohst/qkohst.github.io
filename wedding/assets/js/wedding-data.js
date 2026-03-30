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
    }
  },

  bride: {
    fullName   : "Ziyanaddini Qurrota A'yun",
    nickname   : "Zian",
    parents    : {
      father : "Bpk. Muhammad Zaim Nour",
      mother : "Ibu Tholi'ah"
    }
  },

  /* ── WEDDING ─────────────────────────────────────────────── */
  wedding: {
    // ISO-8601 — used for countdown & calendar link
    date         : "2026-06-07T08:00:00+07:00",
    dateFormatted: "Ahad, 7 Juni 2026",
    hijriyah     : "21 Dzulhijjah 1447 H",
    hashtag      : "#qkohzqa",
    quote        : "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    quoteSource  : "QS. Ar-Rum: 21",

    // ── BACKGROUND MUSIC ──────────────────────────────────────
    // Isi dengan URL langsung ke file MP3 (bukan YouTube).
    // Sumber gratis & halal digunakan:
    //   • Pixabay Music  → https://pixabay.com/music/  (download, salin link CDN)
    //   • File lokal     → 'assets/music/bgm.mp3'
    // Contoh URL Pixabay (ganti dengan track pilihanmu):
    musicUrl : "assets/music/bgm.mp3"
    // ↑↑ "Romantic Cinematic Piano" — Pixabay royalty-free
  },

  /* ── EVENTS ─────────────────────────────────────────────── */
  events: {
    akad: {
      title      : "Akad Nikah",
      date       : "Ahad, 07 Juni 2026",
      time       : "08.00 – 10.00 WIB",
      venue      : "Mushola Al-Hikmah",
      address    : "RT 11/RW 04 Dsn. Silir Lor, Ds. Dikir, Tambakboyo, Kab. Tuban",
      mapsEmbed  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.2411612450423!2d111.77939077750634!3d-6.861784875440246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e770b6b475d16ef%3A0x2ad0a263821c09d7!2sMushola%20Al%20Hikmah!5e1!3m2!1sen!2sid!4v1773685538173!5m2!1sen!2sid",
      mapsLink   : "https://maps.app.goo.gl/gwTAdZS9KQgbpSHDA"
    },
    resepsi: {
      title      : "Resepsi Pernikahan",
      date       : "Ahad, 07 Juni 2026",
      time       : "11.00 – 14.00 WIB",
      venue      : "Kediaman Mempelai Pria",
      address    : "RT 11/RW 04 Dsn. Silir Lor, Ds. Dikir, Tambakboyo, Kab. Tuban",
      mapsEmbed  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.239501074275!2d111.78168157475655!3d-6.862008793136519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e770b9f98edd767%3A0x3d7620cbb06cc0a4!2sQkoh%20St!5e1!3m2!1sen!2sid!4v1773685399162!5m2!1sen!2sid",
      mapsLink   : "https://maps.app.goo.gl/GE6RZ4jfceoEDhCg7"
    }
  },

  /* ── BANK TRANSFER ───────────────────────────────────────── */
  bankTransfer: [
    {
      bank          : "BCA",
      accountNumber : "8240 9275 79",
      accountName   : "Kukoh Santoso",
      color         : "#0060AF"
    },
    {
      bank          : "BRI",
      accountNumber : "6299 01 048845 53 4",
      accountName   : "Ziyanaddini Qurrota A'yun",
      color         : "#00529C"
    }
  ],

  /* ── GUEST LIST ──────────────────────────────────────────── */
  /*
   *  URL usage  →  index.html?to=KEY
   *  e.g.  index.html?to=budi   OR   index.html?to=001
   *
   *  Key is case-insensitive (normalised to lower-case in JS).
   */

  // Untuk tamu dari pihak mempelai pria
  guestsMan: [
    {
      key : "default",
      name : "Bapak/Ibu/Saudara/i",
      address : "Di Tempat",
      phoneNumber : null
    },
    {
      key     : "budi",
      name    : "Budi Santoso",
      address : "Jl. Merpati No. 123, Jakarta",
      phoneNumber : null
    },
    {
      key     : "siti",
      name    : "Siti Aminah",
      address : "Jl. Kenari No. 45, Bandung",
      phoneNumber : "+62 852-3207-7932"
    },
    {
      key     : "ahmad",
      name    : "Ahmad Fauzi",
      address : "Jl. Cendrawasih No. 67, Surabaya",
      phoneNumber : null
    }
  ],

  // Untuk tamu dari pihak mempelai wanita
  guestsWoman: [
    {
      key : "default",
      name : "Bapak/Ibu/Saudara/i",
      address : "Di Tempat",
      phoneNumber : null
    },
    {
      key     : "siti",
      name    : "Siti Aminah",
      address : "Jl. Kenari No. 45, Bandung",
      phoneNumber : null
    },
    {
      key     : "dina",
      name    : "Dina Putri",
      address : "Jl. Melati No. 89, Yogyakarta",
      phoneNumber : "+62 852-3207-7932"
    }
  ]

};
