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
    address    : "RT 11/RW 04 Dsn. Silir Lor, Ds. Dikir, Kec. Tambakboyo, Kab. Tuban"
  },

  bride: {
    fullName   : "Ziyanaddini Qurrota A'yun",
    nickname   : "Zian",
    parents    : {
      father : "Bpk. Muhammad Za'im",
      mother : "Ibu Tholi'ah"
    },
    address    : "RT 03/RW 02 Ds. Sedayulawas, Kec. Brondong Kab. Lamongan"
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
      time       : "09.00 – 10.00 WIB",
      venue      : "Mushola Al-Hikmah",
      address    : "RT 11/RW 04 Dsn. Silir Lor, Ds. Dikir, Kec. Tambakboyo, Kab. Tuban",
      mapsEmbed  : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.2411612450423!2d111.77939077750634!3d-6.861784875440246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e770b6b475d16ef%3A0x2ad0a263821c09d7!2sMushola%20Al%20Hikmah!5e1!3m2!1sen!2sid!4v1773685538173!5m2!1sen!2sid",
      mapsLink   : "https://maps.app.goo.gl/gwTAdZS9KQgbpSHDA"
    },
    resepsi: {
      title      : "Resepsi Pernikahan",
      date       : "Ahad, 07 Juni 2026",
      time       : "10.00 – 14.00 WIB",
      venue      : "Kediaman Mempelai Pria",
      address    : "RT 11/RW 04 Dsn. Silir Lor, Ds. Dikir, Kec. Tambakboyo, Kab. Tuban",
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
      "key": "rabu-bangkok",
      "name": "Rabu",
      "address": "Bangkok",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "arfi-antasofa-batang",
      "name": "Arfi Antasofa",
      "address": "Batang",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "hanik-bendan",
      "name": "Hanik",
      "address": "Bendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nahar-bendan",
      "name": "Nahar",
      "address": "Bendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kak-dhika-bendan",
      "name": "Kak Dhika",
      "address": "Bendan",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "rita-bendan",
      "name": "Rita",
      "address": "Bendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mutiara-sulatin-bendan",
      "name": "Mutiara (Sulatin)",
      "address": "Bendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "niko-bendan",
      "name": "Niko",
      "address": "Bendan",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "iwan-bendan",
      "name": "Iwan",
      "address": "Bendan",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ramat-bendan",
      "name": "Ramat",
      "address": "Bendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "soim-bendan",
      "name": "Soim",
      "address": "Bendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "yanti-kardoyo-bendan",
      "name": "Yanti (Kardoyo)",
      "address": "Bendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "timbang-bendan-mander",
      "name": "Timbang",
      "address": "Bendan - Mander",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "djumaidah-bendan-mander",
      "name": "Djumaidah",
      "address": "Bendan - Mander",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "abdul-ghofur-cerme",
      "name": "Abdul Ghofur",
      "address": "Cerme",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rizki-cerme",
      "name": "Rizki",
      "address": "Cerme",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-huda-cokrowati",
      "name": "Bpk. Huda",
      "address": "Cokrowati",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mat-pendek-dampung",
      "name": "Mat (Pendek)",
      "address": "Dampung",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nanda-dampung",
      "name": "Nanda",
      "address": "Dampung",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "utomo-daresan",
      "name": "Utomo",
      "address": "Daresan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "riyati-dasin",
      "name": "Riyati",
      "address": "Dasin",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "shodiq-dasin",
      "name": "Shodiq",
      "address": "Dasin",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "santoso-dasin",
      "name": "Santoso",
      "address": "Dasin",
      "kindOfFriend": "Teman SMP",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tatik-dasin",
      "name": "Tatik",
      "address": "Dasin",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "m-hadi-yussalam-dasin",
      "name": "M. Hadi Yussalam",
      "address": "Dasin",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ramijan-dikir",
      "name": "Ramijan",
      "address": "Dikir",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "gatot-dikir",
      "name": "Gatot",
      "address": "Dikir",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muslikin-dikir",
      "name": "Muslikin",
      "address": "Dikir",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "umma-dikir",
      "name": "Umma",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kofirin-dikir",
      "name": "Kofirin",
      "address": "Dikir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wawan-dikir",
      "name": "Wawan",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "suryanto-dikir",
      "name": "Suryanto",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "aang-dikir",
      "name": "Aang",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rofik-jawi-dikir",
      "name": "Rofik (Jawi)",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tholabul-karim-dikir",
      "name": "Tholabul Karim",
      "address": "Dikir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "dicky-bayhaqi-dikir",
      "name": "Dicky Bayhaqi",
      "address": "Dikir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rokim-dikir",
      "name": "Rokim",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "didik-tohari-dikir",
      "name": "Didik Tohari",
      "address": "Dikir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tain-dikir",
      "name": "Tain",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mei-dikir",
      "name": "Mei",
      "address": "Dikir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "agus-dikir",
      "name": "Agus",
      "address": "Dikir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ibnu-dikir",
      "name": "Ibnu",
      "address": "Dikir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "najib-dikir",
      "name": "Najib",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nawir-dikir",
      "name": "Nawir",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rika-rahayu-dikir",
      "name": "Rika (Rahayu)",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "fitri-dikir",
      "name": "Fitri",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bayu-dikir",
      "name": "Bayu",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ilmi-dikir",
      "name": "Ilmi",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hantoyo-dikir",
      "name": "Hantoyo",
      "address": "Dikir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ansori-dikir-geneng",
      "name": "Ansori",
      "address": "Dikir - Geneng",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wibowo-dikir-tambakboyo",
      "name": "Wibowo",
      "address": "Dikir Tambakboyo",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "aji-mendo-frt",
      "name": "Aji (Mendo)",
      "address": "FRT",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "siaful-ahbab-frt",
      "name": "Siaful Ahbab",
      "address": "FRT",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "asmira-gadon",
      "name": "Asmira",
      "address": "Gadon",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "pipit-gadon",
      "name": "Pipit",
      "address": "Gadon",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lailiyatul-munawaroh-gadon",
      "name": "Lailiyatul Munawaroh",
      "address": "Gadon",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ahmad-ghozali-gadon",
      "name": "Ahmad Ghozali",
      "address": "Gadon",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-moh-darul-afan-gaji-kerek",
      "name": "Ust. Moh. Darul Afan",
      "address": "Gaji - Kerek",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sasmiati-gandu",
      "name": "Sasmiati",
      "address": "Gandu",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "abu-naim-jamong",
      "name": "Abu Naim",
      "address": "Jamong",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kuswanto-karang-pacar-bancar",
      "name": "Kuswanto",
      "address": "Karang Pacar - Bancar",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hana-ratri-rahayu-karangasem",
      "name": "Hana Ratri Rahayu",
      "address": "Karangasem",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "zam-zam-karangpacar",
      "name": "Zam-zam",
      "address": "Karangpacar",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "suci-karangpacar",
      "name": "Suci",
      "address": "Karangpacar",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wakid-kebumen",
      "name": "Wakid",
      "address": "Kebumen",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "suliswanto-kebumen",
      "name": "Suliswanto",
      "address": "Kebumen",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kak-karjono-kenanti",
      "name": "Kak Karjono",
      "address": "Kenanti",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "korik-klutuk",
      "name": "Korik",
      "address": "Klutuk",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "m-zainuddin-zuhri-klutuk",
      "name": "M. Zainuddin Zuhri",
      "address": "Klutuk",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "teguh-arianto-klutuk",
      "name": "Teguh Arianto",
      "address": "Klutuk",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wahid-anwar-klutuk",
      "name": "Wahid Anwar",
      "address": "Klutuk",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sindi-mander",
      "name": "Sindi",
      "address": "Mander",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sahrul-nijam-mander",
      "name": "Sahrul Nijam",
      "address": "Mander",
      "kindOfFriend": "Teman SMP",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muhimatul-ifadah-margosuko-bancar",
      "name": "Muhimatul Ifadah",
      "address": "Margosuko - Bancar",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ririn-mbendan",
      "name": "Ririn",
      "address": "Mbendan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "siti-ulhusna-merkawang",
      "name": "Siti Ulhusna",
      "address": "Merkawang",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "m-roghib-qoyyimudin-merkawang",
      "name": "M. Roghib Qoyyimudin",
      "address": "Merkawang",
      "kindOfFriend": "Teman SMK",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "khoirur-rozikin-merkawang",
      "name": "Khoirur Rozikin",
      "address": "Merkawang",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "yoga-mge",
      "name": "Yoga",
      "address": "MGE",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "fian-hidayah-mge",
      "name": "Fian Hidayah",
      "address": "MGE",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "basyir-mge",
      "name": "Basyir",
      "address": "MGE",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "stifa-mge",
      "name": "Stifa",
      "address": "MGE",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "dipta-mge",
      "name": "Dipta",
      "address": "MGE",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "khoirunnisa-devita-sari-mge",
      "name": "Khoirunnisa Devita Sari",
      "address": "MGE",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "abdul-rahman-saleh-mge",
      "name": "Abdul Rahman Saleh",
      "address": "MGE",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "syafatus-syafiin-ndolok-ngulahan",
      "name": "Syafatus Syafi'in",
      "address": "Ndolok - Ngulahan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "juwanto-ngulahan",
      "name": "Juwanto",
      "address": "Ngulahan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tain-ngulahan",
      "name": "Tain",
      "address": "Ngulahan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ubab-pabeyan",
      "name": "Ubab",
      "address": "Pabeyan",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bashori-pasatan",
      "name": "Bashori",
      "address": "Pasatan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "afan-mushonep-pasatan",
      "name": "Afan Mushonep",
      "address": "Pasatan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lukman-pelem",
      "name": "Lukman",
      "address": "Pelem",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rohmadi-pesantren-klutuk",
      "name": "Rohmadi",
      "address": "Pesantren Klutuk",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kasrofi-pesantren-klutuk",
      "name": "Kasrofi",
      "address": "Pesantren Klutuk",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ustzh-septi-isnayati-hidayat-pkbm-nurul-jadid",
      "name": "Ustzh. Septi Isnayati Hidayat",
      "address": "PKBM Nurul Jadid",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-maslikan-pkbm-nurul-jadid",
      "name": "Ust. Maslikan",
      "address": "PKBM Nurul Jadid",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-syaifuddin-pkbm-nurul-jadid",
      "name": "Ust. Syaifuddin",
      "address": "PKBM Nurul Jadid",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ustzh-herlinawati-pkbm-nurul-jadid",
      "name": "Ustzh. Herlinawati",
      "address": "PKBM Nurul Jadid",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "jani-plajan",
      "name": "Jani",
      "address": "Plajan",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ratmaji-plajan",
      "name": "Ratmaji",
      "address": "Plajan",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mujiati-plajan",
      "name": "Mujiati",
      "address": "Plajan",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "pita-plajan",
      "name": "Pita",
      "address": "Plajan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tria-plajan",
      "name": "Tria",
      "address": "Plajan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "intan-plajan",
      "name": "Intan",
      "address": "Plajan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rofik-plajan",
      "name": "Rofik",
      "address": "Plajan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "uul-plajan",
      "name": "Uul",
      "address": "Plajan",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kundono-plajan-kidul",
      "name": "Kundono",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wanto-plajan-kidul",
      "name": "Wanto",
      "address": "Plajan Kidul",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tarim-plajan-kidul",
      "name": "Tarim",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wariyati-plajan-kidul",
      "name": "Wariyati",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "har-plajan-kidul",
      "name": "Har",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "suwandi-plajan-kidul",
      "name": "Suwandi",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kholis-plajan-kidul",
      "name": "Kholis",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "santoso-plajan-kidul",
      "name": "Santoso",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "priyono-plajan-kidul",
      "name": "Priyono",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "warsani-plajan-kidul",
      "name": "Warsani",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "agus-plajan-kidul",
      "name": "Agus",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "udin-plajan-kidul",
      "name": "Udin",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ika-plajan-kidul",
      "name": "Ika",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "fian-plajan-kidul",
      "name": "Fian",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "abdul-rokim-plajan-kidul",
      "name": "Abdul Rokim",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "witono-plajan-kidul",
      "name": "Witono",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mila-plajan-kidul",
      "name": "Mila",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "apit-londo-plajan-kidul",
      "name": "Apit (Londo)",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "depi-plajan-kidul",
      "name": "Depi",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "danang-plajan-kidul",
      "name": "Danang",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "saipul-darmo-plajan-kidul",
      "name": "Saipul (Darmo)",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "said-plajan-kidul",
      "name": "Said",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bunarko-plajan-kidul",
      "name": "Bunarko",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mur-plajan-kidul",
      "name": "Mur",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "topan-plajan-kidul",
      "name": "Topan",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "irwan-plajan-kidul",
      "name": "Irwan",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "dulure-said-plajan-kidul",
      "name": "Dulure Said",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "timah-plajan-kidul",
      "name": "Timah",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kardi-plajan-kidul",
      "name": "Kardi",
      "address": "Plajan Kidul",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "zainuri-arif-plumpang",
      "name": "Zainuri Arif",
      "address": "Plumpang",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ust-amin-pondok-fathimiyyah",
      "name": "Ust. Amin",
      "address": "Pondok Fathimiyyah",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-rohman-pondok-fathimiyyah",
      "name": "Ust. Rohman",
      "address": "Pondok Fathimiyyah",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "amin-rosyid-pucuk-lamongan",
      "name": "Amin Rosyid",
      "address": "Pucuk - Lamongan",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "rudik-pule",
      "name": "Rudik",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hendra-pule",
      "name": "Hendra",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nurul-pule",
      "name": "Nurul",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nita-pule",
      "name": "Nita",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "boi-pule",
      "name": "Boi",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rian-pule",
      "name": "Rian",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "dinda-pule",
      "name": "Dinda",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "anake-kasri-pule",
      "name": "Anake Kasri",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wiji-wiono-pule",
      "name": "Wiji Wiono",
      "address": "Pule",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "harmiko-pule-mander-pugoh",
      "name": "Harmiko",
      "address": "Pule Mander (Pugoh)",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "shokip-pulo",
      "name": "Shokip",
      "address": "Pulo",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "andri-pulo",
      "name": "Andri",
      "address": "Pulo",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "laili-hidayah-rengel",
      "name": "Laili Hidayah",
      "address": "Rengel",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "eta-pristanti-rengel",
      "name": "Eta Pristanti",
      "address": "Rengel",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ust-bashofi-sdi-data",
      "name": "Ust. Bashofi",
      "address": "SDI DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-idris-sdi-data",
      "name": "Ust. Idris",
      "address": "SDI DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "apit-silir",
      "name": "Apit",
      "address": "Silir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tutik-silir",
      "name": "Tutik",
      "address": "Silir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ulul-albab-silir",
      "name": "Ulul Albab",
      "address": "Silir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "suwandin-silir",
      "name": "Suwandin",
      "address": "Silir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wakola-silir",
      "name": "Wakola",
      "address": "Silir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wabika-silir",
      "name": "Wabika",
      "address": "Silir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "natan-mbah-ruk-silir",
      "name": "Natan (Mbah Ruk)",
      "address": "Silir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "iron-silir",
      "name": "Iron",
      "address": "Silir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "toksin-silir",
      "name": "Toksin",
      "address": "Silir",
      "kindOfFriend": "Teman SD",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rasmadi-dapok-silir",
      "name": "Rasmadi (Dapok)",
      "address": "Silir",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sholeh-silir-lor",
      "name": "Sholeh",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "munawaroh-silir-lor",
      "name": "Munawaroh",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "abdul-rokhim-silir-lor",
      "name": "Abdul Rokhim",
      "address": "Silir lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kastono-silir-lor",
      "name": "Kastono",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ahmad-zaka-silir-lor",
      "name": "Ahmad Zaka",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wawan-silir-lor",
      "name": "Wawan",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "serli-silir-lor",
      "name": "Serli",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "yulaikah-silir-lor",
      "name": "Yulaikah",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sholakudin-silir-lor",
      "name": "Sholakudin",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "khoirul-uma-silir-lor",
      "name": "Khoirul Uma",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "khozinatul-muarifin-silir-lor",
      "name": "Khozinatul Mu'arifin",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "arip-silir-lor",
      "name": "Arip",
      "address": "Silir Lor",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hardiyan-smk-marif",
      "name": "Hardiyan",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-kholilur-rohman-smk-marif",
      "name": "Ust. Kholilur Rohman",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-putut-sudiyono-smk-marif",
      "name": "Bpk. Putut Sudiyono",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-davi-parmono-jati-smk-marif",
      "name": "Bpk. Davi Parmono Jati",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-ahmad-tain-smk-marif",
      "name": "Bpk. Ahmad Ta'in",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-m-saiful-anwar-smk-marif",
      "name": "Bpk. M. Saiful Anwar",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-tony-prasetyo-smk-marif",
      "name": "Bpk. Tony Prasetyo",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muhammad-kholil-a-rosyidi-smk-marif",
      "name": "Muhammad Kholil A Rosyidi",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "eko-prasetyo-smk-marif",
      "name": "Eko Prasetyo",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-m-aries-khoerul-huda-smk-marif",
      "name": "Bpk. M. Aries Khoerul Huda",
      "address": "SMK Ma'arif",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ustzh-risa-mahmudah-smp-data",
      "name": "Ustzh. Risa Mahmudah",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mas-husni-muzadi-smp-data",
      "name": "Mas Husni Muzadi",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-suwardi-kamat-smp-data",
      "name": "Ust. Suwardi Kamat",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "usthabibul-lubab-smp-data",
      "name": "Ust.Habibul Lubab",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-ali-ghufron-smp-data",
      "name": "Ust. Ali Ghufron",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ustzh-darmini-smp-data",
      "name": "Ustzh. Darmini",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ustzh-hana-ratri-rahayu-smp-data",
      "name": "Ustzh. Hana Ratri Rahayu",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-m-hasan-bisri-smp-data",
      "name": "Ust. M. Hasan Bisri",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ust-risa-mahmudah-smp-data",
      "name": "Ust. Risa Mahmudah",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mas-hasan-smp-data",
      "name": "Mas Hasan",
      "address": "SMP DATA",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ahmad-rofiqi-sobontoto",
      "name": "Ahmad Rofiqi",
      "address": "Sobontoto",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "dholil-sotang",
      "name": "Dholil",
      "address": "Sotang",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "khomsatun-nur-sotang",
      "name": "Khomsatun Nur",
      "address": "Sotang",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "januri-tambakboyo",
      "name": "Januri",
      "address": "Tambakboyo",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "adiar-fitrianto-tambakboyo",
      "name": "Adiar Fitrianto",
      "address": "Tambakboyo",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rizal-alamin-tambakboyo",
      "name": "Rizal Alamin",
      "address": "Tambakboyo",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "zainal-fanani-tambakboyo",
      "name": "Zainal Fanani",
      "address": "Tambakboyo",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-tejo-koramil-tambakboyo",
      "name": "Bpk. Tejo (Koramil)",
      "address": "Tambakboyo",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sanep-tambakromo",
      "name": "Sanep",
      "address": "Tambakromo",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kiki-lukita-sari-unirow",
      "name": "Kiki Lukita Sari",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "afrizal-malna-unirow",
      "name": "Afrizal Malna",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muhammad-rifki-bayhaqy-unirow",
      "name": "Muhammad Rifki Bayhaqy",
      "address": "Unirow",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "yetno-unirow",
      "name": "Yetno",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "aries-unirow",
      "name": "Aries",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "samsul-unirow",
      "name": "Samsul",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "yayang-puguh-unirow",
      "name": "Yayang Puguh",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "m-iqbal-unirow",
      "name": "M. Iqbal",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "masud-unirow",
      "name": "Masud",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "reza-agit-unirow",
      "name": "Reza Agit",
      "address": "Unirow",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kak-hadi-probolinggo",
      "name": "Kak Hadi",
      "address": "Probolinggo",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "toni-oktoro-jombang",
      "name": "Toni Oktoro",
      "address": "Jombang",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    }
  ],

  // Untuk tamu dari pihak mempelai wanita
  "guestsWoman": [
    {
      "key": "riska-sedayulawas",
      "name": "Riska",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rifka-sedayulawas",
      "name": "Rifka",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mela-sedayulawas",
      "name": "Mela",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "aisyah-sedayulawas",
      "name": "Aisyah",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ayu-sedayulawas",
      "name": "Ayu",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "devi-tlogoretno",
      "name": "Devi",
      "address": "Tlogoretno",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rika-punggur",
      "name": "Rika",
      "address": "Punggur",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "atus-podang",
      "name": "Atus",
      "address": "Podang",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nunik-podang",
      "name": "Nunik",
      "address": "Podang",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ani-podang",
      "name": "Ani",
      "address": "Podang",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "eka-smk-blimbing",
      "name": "Eka SMK",
      "address": "Blimbing",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "linda-blimbing",
      "name": "Linda",
      "address": "Blimbing",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "fira-sedayulawas",
      "name": "Fira",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hilmi-pambon",
      "name": "Hilmi",
      "address": "Pambon",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "haris-pambon",
      "name": "Haris",
      "address": "Pambon",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ficky-smk-tlogoretno",
      "name": "Ficky SMK",
      "address": "Tlogoretno",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "faruq-pambon",
      "name": "Faruq",
      "address": "Pambon",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "egi-wedung",
      "name": "Egi",
      "address": "Wedung",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mursyidul-cumpleng",
      "name": "Mursyidul",
      "address": "Cumpleng",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lia-kosmetik-podang",
      "name": "Lia Kosmetik",
      "address": "Podang",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "milawati-wedung",
      "name": "Milawati",
      "address": "Wedung",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "anti-wedung",
      "name": "Anti",
      "address": "Wedung",
      "kindOfFriend": "Teman SMK",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ficky-smp-blimbing",
      "name": "Ficky SMP",
      "address": "Blimbing",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "agil-blimbing",
      "name": "Agil",
      "address": "Blimbing",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bagus-sedayulawas",
      "name": "Bagus",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sholeh-punggur",
      "name": "Sholeh",
      "address": "Punggur",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "dina-sedayulawas",
      "name": "Dina",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muhlisin-gembyang",
      "name": "Muhlisi",
      "address": "Gembyang",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nia-montong-tuban",
      "name": "Nia",
      "address": "Montong Tuban",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "nindi-plumpang-tuban",
      "name": "Nindi",
      "address": "Plumpang Tuban",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "via-plumpang-tuban",
      "name": "Via",
      "address": "Plumpang Tuban",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "risty-jompong",
      "name": "Risty",
      "address": "Jompong",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "iik-singgahan",
      "name": "Iik",
      "address": "Singgahan",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "isbah-singgahan",
      "name": "Isbah",
      "address": "Singgahan",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "lestari-bongkaran",
      "name": "Lestari",
      "address": "Bongkaran",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "maratus-merakurak",
      "name": "Maratus",
      "address": "Merakurak",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "fika-misbah-rembang",
      "name": "Fika / Misbah",
      "address": "Rembang",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "andik-krisna-kerek",
      "name": "Andik Krisna",
      "address": "Kerek",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "melinda-tuban",
      "name": "Melinda",
      "address": "Tuban",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "fijar-paciran",
      "name": "Fijar",
      "address": "Paciran",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "yoga-singgahan",
      "name": "Yoga",
      "address": "Singgahan",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ririn-safitri-sedayulawas",
      "name": "Ririn Safitri",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hilda-tuban",
      "name": "Hilda",
      "address": "Tuban",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "mbak-ayu-tuban",
      "name": "Mbak Ayu",
      "address": "Tuban",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "micha-sedayulawas",
      "name": "Micha",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "fita-is-sedayulawas",
      "name": "Fita IS",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman Kuliah",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-heny-karjanto-spd-smk-n-1-brondong",
      "name": "Bpk Heny Karjanto, S.Pd",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "a-novin-budi-rossandy-spd-smk-n-1-brondong",
      "name": "A. Novin Budi Rossandy, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "abdul-basith-spdi-mpd-smk-n-1-brondong",
      "name": "Abdul Basith, S.Pd.I., M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-abdul-choliq-babat",
      "name": "Bpk Abdul Choliq",
      "address": "Babat",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ahmadi-masum-rahmatal-iman-spd-smk-n-1-brondong",
      "name": "Ahmadi Ma'sum Rahmatul Iman, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "amirul-ahmad-mukhtaromin-spdi-smk-n-1-brondong",
      "name": "Amirul Ahmad Mukhtaromin., S.Pd.I.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-anam-muhajir-smk-n-1-brondong",
      "name": "Bpk Anam Muhajir",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "anang-sujiono-spd-mpd-smk-n-1-brondong",
      "name": "Anang Sujiono, S.Pd., M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "apri-sugian-hady-spd-smk-n-1-brondong",
      "name": "Apri Sugian Hady, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "aries-amin-afrianto-spd-smk-n-1-brondong",
      "name": "Aries Amin Afrianto, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "dian-maya-pitaloka-spd-smk-n-1-brondong",
      "name": "Dian Maya Pitaloka, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "edy-zuliyanto-skom-mpd-smk-n-1-brondong",
      "name": "Edy Zuliyanto, S.Kom., M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "eliana-spd-mpd-smk-n-1-brondong",
      "name": "Eliana, S.Pd., M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "drs-emal-iskandar-dinata-mpd-smk-n-1-brondong",
      "name": "Drs. Emal Iskandar Dinata. M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hikmawati-spd-smk-n-1-brondong",
      "name": "Hikmawati, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "khoirul-anam-spd-smk-n-1-brondong",
      "name": "Khoirul Anam, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-khusnul-mubaroq-smk-n-1-brondong",
      "name": "Bpk Khusnul Mubaroq",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "kuliah-spd-smk-n-1-brondong",
      "name": "Kuliah, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lianatul-malufah-spd-mpd-smk-n-1-brondong",
      "name": "Lianatul Ma'lufah, S.Pd., M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lilis-setyaningsih-mkom-smk-n-1-brondong",
      "name": "Lilis Setyaningsih, M.Kom.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "m-abdul-somad-spd-smk-n-1-brondong",
      "name": "M. Abdul Somad, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "moh-yakup-spd-smk-n-1-brondong",
      "name": "Moh. Yakup, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "maimunah-skom-msi-smk-n-1-brondong",
      "name": "Maimunah, S.Kom., M.Si.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "drs-masykuri-mpd-smk-n-1-brondong",
      "name": "Drs. Masykuri, M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "misgik-kartanto-spd-smk-n-1-brondong",
      "name": "Misgik Kartanto, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "drs-muflih-mpd-smk-n-1-brondong",
      "name": "Drs. Muflih, M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "m-fadh-al-husni-skom-smk-n-1-brondong",
      "name": "M. Fadh Al-Husni, S.Kom.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "munshorif-spd-smk-n-1-brondong",
      "name": "Munshorif, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muslih-spd-smk-n-1-brondong",
      "name": "Muslih, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nailul-authar-skom-smk-n-1-brondong",
      "name": "Nailul Authar, S.Kom.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "oelivia-skom-smk-n-1-brondong",
      "name": "Oelivia, S.Kom.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "risantika-yanuarristi-spd-gr-smk-n-1-brondong",
      "name": "Risantika Yanuarristi, S.Pd., Gr.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "siswandi-spd-smk-n-1-brondong",
      "name": "Siswandi, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "siti-nur-istianingsih-spd-mpd-smk-n-1-brondong",
      "name": "Siti Nur Istianingsih, S.Pd., M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wisnu-aditya-kurniawan-sor-smk-n-1-brondong",
      "name": "Wisnu Aditya Kurniawan, S.Or.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "wiwik-masrofah-spd-mpd-smk-n-1-brondong",
      "name": "Wiwik Masrofah, S.Pd., M.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "zainal-arifin-spd-msi-smk-n-1-brondong",
      "name": "Zainal Arifin, S.Pd., M.Si.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "zuhrotul-titik-khotimah-spd-smk-n-1-brondong",
      "name": "Zuhrotul Titik Khotimah, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "elva-alvi-khoiriyah-skom-smk-n-1-brondong",
      "name": "Elva Alvi Khoiriyah, S.Kom.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "uji-usa-aisyiyah-spd-smk-n-1-brondong",
      "name": "Uji Usa Aisyiyah, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nur-fathin-afifah-spd-kons-smk-n-1-brondong",
      "name": "Nur Fathin Afifah, S.Pd., Kons.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "drsegbal-smk-n-1-brondong",
      "name": "Drs.Egbal",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ali-fauzi-smk-n-1-brondong",
      "name": "Ali Fauzi",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "awwalus-saadah-spd-smk-n-1-brondong",
      "name": "Awwalus Sa'adah, S.Pd",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "farihatur-rosyida-smk-n-1-brondong",
      "name": "Farihatur Rosyida",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "habib-mahrus-smk-n-1-brondong",
      "name": "Habib Mahrus",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "himatus-syarifah-sh-smk-n-1-brondong",
      "name": "Himatus Syarifah, S.H.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "imanullah-alvin-n-skom-smk-n-1-brondong",
      "name": "Imanullah Alvin N., S.kom.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "jamiati-mualifah-se-smk-n-1-brondong",
      "name": "Jamiati Mualifah, S.E.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "listari-ismahani-spd-smk-n-1-brondong",
      "name": "Listari Ismahani S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "maruf-budi-utomo-sm-smk-n-1-brondong",
      "name": "Ma'ruf Budi Utomo, S.M.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "pandi-skom-smk-n-1-brondong",
      "name": "Pandi, S.Kom.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "roufur-rohim-spd-smk-n-1-brondong",
      "name": "Roufur Rohim, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sri-ekawati-sm-smk-n-1-brondong",
      "name": "Sri Ekawati, S.M.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "zainul-arifin-spd-smk-n-1-brondong",
      "name": "Zainul Arifin S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "andy-kris-perdawan-amdt-smk-n-1-brondong",
      "name": "Andy Kris Perdawan, A.Md.T.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "khoirul-huda-smk-n-1-brondong",
      "name": "Khoirul Huda",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-octo-ayomy-nganjuk",
      "name": "Bpk Octo Ayomy",
      "address": "Nganjuk",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-ahmad-juhairi-lamongan",
      "name": "Bpk Ahmad Juhairi",
      "address": "Lamongan",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-muhammad-subkan-lamongan",
      "name": "Bpk Muhammad Subkan",
      "address": "Lamongan",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-sholahudin-sedayulawas",
      "name": "Bpk Sholahudin",
      "address": "Sedayulawas",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-latif-merakurak",
      "name": "Bpk Latif",
      "address": "Merakurak",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ibu-lusy-lestari-sedayulawas",
      "name": "Ibu Lusy Lestari",
      "address": "Sedayulawas",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ibu-wiwik-widodo-widang",
      "name": "Ibu Wiwik Widodo",
      "address": "Widang",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ibu-suci-ngimbang",
      "name": "Ibu Suci",
      "address": "Ngimbang",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-alam-gresik",
      "name": "Bpk Alam",
      "address": "Gresik",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-amri-gresik",
      "name": "Bpk Amri",
      "address": "Gresik",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-ihwanur-rohim-tlogoretno",
      "name": "Bpk Ihwanur Rohim",
      "address": "Tlogoretno",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-iqbal-lazuardy-jompong",
      "name": "Bpk Iqbal Lazuardy",
      "address": "Jompong",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ibu-diah-kediri",
      "name": "Ibu Diah",
      "address": "Kediri",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "mbk-wid-pambon",
      "name": "Mbk Wid",
      "address": "Pambon",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mbk-us-cumpleng",
      "name": "Mbk Us",
      "address": "Cumpleng",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-sudarto-lamongan",
      "name": "Bpk Sudarto",
      "address": "Lamongan",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "fikri-abdillah-spd-smk-n-1-brondong",
      "name": "Fikri Abdillah, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ay-mahfudhi-spd-smk-n-1-brondong",
      "name": "AY. Mahfudhi, S.Pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muftinin-st-msi-smk-n-1-brondong",
      "name": "Muftinin, S.T., M.Si.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mat-rukun-sst-spd-mm-smk-n-1-brondong",
      "name": "Mat Rukun, S.ST., S.Pd., M.M.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-wahono-smk-n-1-brondong",
      "name": "Bpk Wahono",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "bpk-muhammad-suud-smk-n-1-brondong",
      "name": "Bpk Muhammad Su'ud",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "al-hamro-andalusia-spd-smk-n-1-brondong",
      "name": "Al-Hamro' Andalusia, S.pd.",
      "address": "SMK N 1 Brondong",
      "kindOfFriend": "Guru",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "saom-sedayulawas",
      "name": "Saom",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "iik-sedayulawas",
      "name": "Iik",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "roni-sedayulawas",
      "name": "Roni",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mamluhah-sedayulawas",
      "name": "Mamluhah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "hartini-sedayulawas",
      "name": "Hartini",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sumarni-sedayulawas",
      "name": "Sumarni",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sampur-sedayulawas",
      "name": "Sampur",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sumiah-sedayulawas",
      "name": "Sumi'ah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mika-sedayulawas",
      "name": "Mika",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "abid-sedayulawas",
      "name": "Abid",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lala-sedayulawas",
      "name": "Lala",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rodho-sedayulawas",
      "name": "Rodho",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tatik-sedayulawas",
      "name": "Tatik",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "yudi-sedayulawas",
      "name": "Yudi",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "de-nik-sedayulawas",
      "name": "De Nik",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "anggi-sedayulawas",
      "name": "Anggi",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-hardhi-sedayulawas",
      "name": "Bpk Hardi",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "de-tin-nasek-sedayulawas",
      "name": "De Tin Nasek",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mas-oni-sedayulawas",
      "name": "Mas Oni",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lip-toyo-sedayulawas",
      "name": "Lip Toyo",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mbah-martijah-sedayulawas",
      "name": "Mbah Martijah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mima-sedayulawas",
      "name": "Mima",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "buk-sip-sedayulawas",
      "name": "Buk Sip",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mbk-titin-sedayulawas",
      "name": "Mbk Titin",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mbk-eka-sedayulawas",
      "name": "Mbk Eka",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "cak-nanang-sedayulawas",
      "name": "Cak Nanang",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "yuk-neng-jiro-sedayulawas",
      "name": "Yuk Neng Jiro",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "arip-sedayulawas",
      "name": "Arip",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ana-sedayulawas",
      "name": "Ana",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "dhowi-sedayulawas",
      "name": "Dhowi",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sufatus-sedayulawas",
      "name": "Sufatus",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nasrul-sedayulawas",
      "name": "Nasrul",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ana-nganjuk-sedayulawas",
      "name": "Ana Nganjuk",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bidayah-sedayulawas",
      "name": "Bidayah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bahrul-sedayulawas",
      "name": "Bahrul",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "aaf-sedayulawas",
      "name": "Aaf",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "fian-sedayulawas",
      "name": "Fian",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "zayin-sedayulawas",
      "name": "Zayin",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "tifa-sedayulawas",
      "name": "Tifa",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "afif-sedayulawas",
      "name": "Afif",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sonif-sedayulawas",
      "name": "Sonif",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "siska-sedayulawas",
      "name": "Siska",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "zubaida-sedayulawas",
      "name": "Zubaida",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "indah-sedayulawas",
      "name": "Indah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "ida-sedayulawas",
      "name": "Ida",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "anam-sedayulawas",
      "name": "Anam",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rohim-sedayulawas",
      "name": "Rohim",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "asek-sedayulawas",
      "name": "Asek",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "amin-sedayulawas",
      "name": "Amin",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "dek-eka-sedayulawas",
      "name": "Dek Eka",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "abi-umi-jakarta",
      "name": "Abi & Umi",
      "address": "Jakarta",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "mbk-uun-jakarta",
      "name": "Mbk Uun",
      "address": "Jakarta",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "mas-aam-mbk-wilan-jakarta",
      "name": "Mas Aam & Mbk Wilan",
      "address": "Jakarta",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "mas-qiqi-jakarta",
      "name": "Mas Qiqi",
      "address": "Jakarta",
      "kindOfFriend": "Keluarga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "diki-sedayulawas",
      "name": "Diki",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "fifi-sedayulawas",
      "name": "Fifi",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muhibah-sedayulawas",
      "name": "Muhibah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mbk-nunung-sedayulawas",
      "name": "Mbk Nunung",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mariyam-sedayulawas",
      "name": "Mariyam",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mbk-tul-sedayulawas",
      "name": "Mbk Tul",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lek-dah-sedayulawas",
      "name": "Lek Dah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "suharti-sedayulawas",
      "name": "Suharti",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mulin-sedayulawas",
      "name": "Mulin",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "asiyah-sedayulawas",
      "name": "Asiyah",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "cinta-sedayulawas",
      "name": "Cinta",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "aslan-sedayulawas",
      "name": "Aslan",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rini-sedayulawas",
      "name": "Rini",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "sofiq-sedayulawas",
      "name": "Sofiq",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "enis-sedayulawas",
      "name": "Enis",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "muayadah-iir-sedayulawas",
      "name": "Mu'ayadah IIR",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "jamil-sedayulawas",
      "name": "Jamil",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "man-anim-sedayulawas",
      "name": "Man Anim",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bek-kaseni-sedayulawas",
      "name": "Bek Kaseni",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "anisa-sedayulawas",
      "name": "Anisa",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "anita-sedayulawas",
      "name": "Anita",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "vera-fuad-sedayulawas",
      "name": "Vera / Fuad",
      "address": "Sedayulawas",
      "kindOfFriend": "Keluarga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rusmiati-sedayulawas",
      "name": "Rusmiati",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "rohmawati-sedayulawas",
      "name": "Rohmawati",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "qomsiyati-sedayulawas",
      "name": "Qomsiyati",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "suami-sedayulawas",
      "name": "Su'ami",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "maghfiroh-sedayulawas",
      "name": "Maghfiroh",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mukhlis-fitrotin-sedayulawas",
      "name": "Mukhlis Fitrotin",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "indra-sedayulawas",
      "name": "Indra",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "seh-sedayulawas",
      "name": "Seh",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "saropah-sedayulawas",
      "name": "Saropah",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nasihah-sedayulawas",
      "name": "Nasihah",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mak-tun-sedayulawas",
      "name": "Mak Tun",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "nia-sedayulawas",
      "name": "Nia",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "farah-sedayulawas",
      "name": "Farah",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "mbok-jah-sedayulawas",
      "name": "Mbok Jah",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "kasrik-sedayulawas",
      "name": "Kasrik",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "farihah-sedayulawas",
      "name": "Farihah",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bu-heni-sedayulawas",
      "name": "Bu Heni",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "bpk-afif-tuban-sedayulawas",
      "name": "Bpk Afif (Tuban)",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "khonita-sedayulawas",
      "name": "Khonita",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "ira-sedayulawas",
      "name": "Ira",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "azima-sugio",
      "name": "Azima",
      "address": "Sugio",
      "kindOfFriend": "Teman",
      "undangan": "online",
      "phoneNumber": null
    },
    {
      "key": "yuk-is-fida-sedayulawas",
      "name": "Yuk Is/ Fida",
      "address": "Sedayulawas",
      "kindOfFriend": "Tetangga",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "lila-sedayulawas",
      "name": "Lila",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    },
    {
      "key": "meitri-sedayulawas",
      "name": "Meitri",
      "address": "Sedayulawas",
      "kindOfFriend": "Teman",
      "undangan": "offline",
      "phoneNumber": null
    }
  ]

};
