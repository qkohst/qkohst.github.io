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
  guestsWoman: [
    {
      key: "riska-sedayulawas",
      name: "Riska",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "rifka-sedayulawas",
      name: "Rifka",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "mela-sedayulawas",
      name: "Mela",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "aisyah-sedayulawas",
      name: "Aisyah",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ayu-sedayulawas",
      name: "Ayu",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "devi-tlogoretno",
      name: "Devi",
      address: "Tlogoretno",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "rika-punggur",
      name: "Rika",
      address: "Punggur",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "atus-podang",
      name: "Atus",
      address: "Podang",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "nunik-podang",
      name: "Nunik",
      address: "Podang",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ani-podang",
      name: "Ani",
      address: "Podang",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "eka-blimbing",
      name: "Eka",
      address: "Blimbing",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "linda-blimbing",
      name: "Linda",
      address: "Blimbing",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "fira-sedayulawas",
      name: "Fira",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "hilmi-pambon",
      name: "Hilmi",
      address: "Pambon",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "haris-pambon",
      name: "Haris",
      address: "Pambon",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ficky-smk-tlogoretno",
      name: "Ficky Smk",
      address: "Tlogoretno",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "faruq-pambon",
      name: "Faruq",
      address: "Pambon",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "egi-wedung",
      name: "Egi",
      address: "Wedung",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ficky-smp-blimbing",
      name: "Ficky Smp",
      address: "Blimbing",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "agil-blimbing",
      name: "Agil",
      address: "Blimbing",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bagus-sedayulawas",
      name: "Bagus",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "sholeh-punggur",
      name: "Sholeh",
      address: "Punggur",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "dina-sedayulawas",
      name: "Dina",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "muhlisin-gembyang",
      name: "Muhlisin",
      address: "Gembyang",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "nia-montong-tuban",
      name: "Nia",
      address: "Montong Tuban",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "nindi-plumpang-tuban",
      name: "Nindi",
      address: "Plumpang Tuban",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "via-plumpang-tuban",
      name: "Via",
      address: "Plumpang Tuban",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "risty-jompong",
      name: "Risty",
      address: "Jompong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "iik-singgahan",
      name: "Iik",
      address: "Singgahan",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "isbah-singgahan",
      name: "Isbah",
      address: "Singgahan",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "lestari-bongkaran",
      name: "Lestari",
      address: "Bongkaran",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "maratus-merakurak",
      name: "Maratus",
      address: "Merakurak",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "fika-misbah-rembang",
      name: "Fika / Misbah",
      address: "Rembang",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "andik-krisna-kerek",
      name: "Andik Krisna",
      address: "Kerek",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "melinda-tuban",
      name: "Melinda",
      address: "Tuban",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "fijar-paciran",
      name: "Fijar",
      address: "Paciran",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "lia-kosmetik-podang",
      name: "Lia Kosmetik",
      address: "Podang",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "mila-wedung",
      name: "Mila",
      address: "Wedung",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "anti-wedung",
      name: "Anti",
      address: "Wedung",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "yoga-singgahan",
      name: "Yoga",
      address: "Singgahan",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "putri-tuban",
      name: "Putri",
      address: "Tuban",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-heny-karjanto-smk-n-1-brondong",
      name: "Bpk Heny Karjanto",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-a-novin-budi-rossandy-smk-n-1-brondong",
      name: "Bpk A. Novin Budi Rossandy",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-abdul-basith-smk-n-1-brondong",
      name: "Bpk Abdul Basith",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-abdul-choliq-babat",
      name: "Bpk Abdul Choliq",
      address: "Babat",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-ahmadi-masum-rahmatul-iman-smk-n-1-brondong",
      name: "Bpk Ahmadi Ma'Sum Rahmatul Iman",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-amirul-ahmad-mukhtaromin-smk-n-1-brondong",
      name: "Bpk Amirul Ahmad Mukhtaromin",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-anam-muhajir-smk-n-1-brondong",
      name: "Bpk Anam Muhajir",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-anang-sujiono-smk-n-1-brondong",
      name: "Bpk Anang Sujiono",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-apri-sugian-hady-smk-n-1-brondong",
      name: "Bpk Apri Sugian Hady",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-aries-amin-afrianto-smk-n-1-brondong",
      name: "Bpk Aries Amin Afrianto",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-dian-maya-pitaloka-smk-n-1-brondong",
      name: "Ibu Dian Maya Pitaloka",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-edy-zuliyanto-smk-n-1-brondong",
      name: "Bpk Edy Zuliyanto",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-eliana-smk-n-1-brondong",
      name: "Ibu Eliana",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-emal-iskandar-dinata-smk-n-1-brondong",
      name: "Bpk Emal Iskandar Dinata",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-hikmawati-smk-n-1-brondong",
      name: "Ibu Hikmawati",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-khoirul-anam-smk-n-1-brondong",
      name: "Bpk Khoirul Anam",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-khusnul-mubaroq-smk-n-1-brondong",
      name: "Bpk Khusnul Mubaroq",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-kuliah-smk-n-1-brondong",
      name: "Ibu Kuliah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-lianatul-malufah-smk-n-1-brondong",
      name: "Ibu Lianatul Ma'Lufah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-lilis-setiyaningsih-smk-n-1-brondong",
      name: "Ibu Lilis Setiyaningsih",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-m-abdul-somad-smk-n-1-brondong",
      name: "Bpk M. Abdul Somad",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-m-yakup-mastukul-smk-n-1-brondong",
      name: "Bpk M. Yakup Mastukul",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-maimunah-smk-n-1-brondong",
      name: "Ibu Maimunah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-masykuri-smk-n-1-brondong",
      name: "Bpk Masykuri",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-misgik-kartanto-smk-n-1-brondong",
      name: "Bpk Misgik Kartanto",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-muflih-smk-n-1-brondong",
      name: "Bpk Muflih",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-muhammad-fadh-al-husni-smk-n-1-brondong",
      name: "Bpk Muhammad Fadh Al Husni",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-munshorif-smk-n-1-brondong",
      name: "Bpk Munshorif",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-muslih-smk-n-1-brondong",
      name: "Bpk Muslih",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-nailul-authar-smk-n-1-brondong",
      name: "Bpk Nailul Authar",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-oelivia-smk-n-1-brondong",
      name: "Ibu Oelivia",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-risantika-yanuarristi-smk-n-1-brondong",
      name: "Ibu Risantika Yanuarristi",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-siswandi-smk-n-1-brondong",
      name: "Bpk Siswandi",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-siti-nur-istianingsih-smk-n-1-brondong",
      name: "Ibu Siti Nur Istianingsih",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-wisnu-aditya-kurniawan-smk-n-1-brondong",
      name: "Bpk Wisnu Aditya Kurniawan",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-wiwik-masrofah-smk-n-1-brondong",
      name: "Ibu Wiwik Masrofah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-zainal-arifin-smk-n-1-brondong",
      name: "Bpk Zainal Arifin",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-zuhrotul-titik-khotimah-smk-n-1-brondong",
      name: "Ibu Zuhrotul Titik Khotimah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-elva-alvi-khoiriyah-smk-n-1-brondong",
      name: "Ibu Elva Alvi Khoiriyah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-uji-usa-aisyiyah-smk-n-1-brondong",
      name: "Ibu Uji Usa Aisyiyah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-nur-fathin-afifah-smk-n-1-brondong",
      name: "Ibu Nur Fathin Afifah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-kusnadi-smk-n-1-brondong",
      name: "Bpk Kusnadi",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-ali-fauzi-smk-n-1-brondong",
      name: "Bpk Ali Fauzi",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-awwalus-saadah-smk-n-1-brondong",
      name: "Ibu Awwalus Saadah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-farihatur-rosyidah-smk-n-1-brondong",
      name: "Ibu Farihatur Rosyidah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-habib-mahrus-smk-n-1-brondong",
      name: "Bpk Habib Mahrus",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-himatus-syarifah-smk-n-1-brondong",
      name: "Ibu Himatus Syarifah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-imanullah-alvin-nazaruddin-smk-n-1-brondong",
      name: "Bpk Imanullah Alvin Nazaruddin",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-jamiati-mualifah-smk-n-1-brondong",
      name: "Ibu Jamiati Mualifah",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-listari-ismahani-smk-n-1-brondong",
      name: "Ibu Listari Ismahani",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-maruf-budi-utomo-smk-n-1-brondong",
      name: "Bpk Ma'Ruf Budi Utomo",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-pandi-smk-n-1-brondong",
      name: "Bpk Pandi",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-roufur-rohim-smk-n-1-brondong",
      name: "Bpk Roufur Rohim",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-sri-ekawati-smk-n-1-brondong",
      name: "Ibu Sri Ekawati",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-zainul-arifin-smk-n-1-brondong",
      name: "Bpk Zainul Arifin",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "andy-kris-smk-n-1-brondong",
      name: "Andy Kris",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "khoirul-huda-smk-n-1-brondong",
      name: "Khoirul Huda",
      address: "SMK N 1 Brondong",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-octo-ayomy-nganjuk",
      name: "Bpk Octo Ayomy",
      address: "Nganjuk",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-ahmad-juhairi-lamongan",
      name: "Bpk Ahmad Juhairi",
      address: "Lamongan",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-bpk-muhammad-subkan-lamongan",
      name: "Bpk Bpk Muhammad Subkan",
      address: "Lamongan",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-bpk-solahudin-sedayulawas",
      name: "Bpk Bpk Solahudin",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-latif-merakurak",
      name: "Bpk Latif",
      address: "Merakurak",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "ibu-lusy-lestari-sedayulawas",
      name: "Ibu Lusy Lestari",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ibu-wiwik-widodo-widang",
      name: "Ibu Wiwik Widodo",
      address: "Widang",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "ibu-suci-ngimbang",
      name: "Ibu Suci",
      address: "Ngimbang",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-alam-gresik",
      name: "Bpk Alam",
      address: "Gresik",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-amri-gresik",
      name: "Bpk Amri",
      address: "Gresik",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "bpk-ihwanur-rohim-tlogoretno",
      name: "Bpk Ihwanur Rohim",
      address: "Tlogoretno",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-iqbal-lazuardy-jompong",
      name: "Bpk Iqbal Lazuardy",
      address: "Jompong",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "ibu-diah-kediri",
      name: "Ibu Diah",
      address: "Kediri",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "ririn-safitri-sedayulawas",
      name: "Ririn Safitri",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "hilda-tuban",
      name: "Hilda",
      address: "Tuban",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "mbak-ayu-tuban",
      name: "Mbak Ayu",
      address: "Tuban",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "khonita-sedayulawas",
      name: "Khonita",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "ira-sedayulawas",
      name: "Ira",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "azima-sugio",
      name: "Azima",
      address: "Sugio",
      undangan: "online",
      phoneNumber: null
    },
    {
      key: "mbk-wid-pambon",
      name: "Mbk Wid",
      address: "Pambon",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "mbk-us-cumpleng",
      name: "Mbk Us",
      address: "Cumpleng",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "micha-sedayulawas",
      name: "Micha",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "fita-is-sedayulawas",
      name: "Fita Is",
      address: "Sedayulawas",
      undangan: "offline",
      phoneNumber: null
    },
    {
      key: "bpk-sudarto-lamongan",
      name: "Bpk Sudarto",
      address: "Lamongan",
      undangan: "online",
      phoneNumber: null
    }
  ]

};
