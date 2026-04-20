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
      father : "Bpk. Muhammad Za'im",
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
      undangan : "online",
      phoneNumber : null
    },
    {
      key     : "budi",
      name    : "Budi Santoso",
      address : "Jl. Merpati No. 123, Jakarta",
      undangan : "online",
      phoneNumber : null
    },
    {
      key     : "siti",
      name    : "Siti Aminah",
      address : "Jl. Kenari No. 45, Bandung",
      undangan : "online",
      phoneNumber : "+62 852-3207-7932"
    },
    {
      key     : "ahmad",
      name    : "Ahmad Fauzi",
      address : "Jl. Cendrawasih No. 67, Surabaya",
      undangan : "offline",
      phoneNumber : null
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
