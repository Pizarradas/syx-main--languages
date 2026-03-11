// ================================================
// DATA: Language profiles
// ================================================
// flagCode → maps to syx-main--languages/img/flags/{flagCode}.svg
// ================================================

export const LANGUAGES = {

  // ── ORIGINAL 5 ──────────────────────────────────

  es: {
    id: 'es', name: 'Español', script: 'Latin', direction: 'ltr',
    flagCode: 'es',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.64, syllabicRegularity: 0.72, phoneticSoftness: 0.68,
      avgWordLength: 0.48, morphologyComplexity: 0.52, agglutinationIndex: 0.12,
      avgSentenceLength: 0.55, wordOrderRigidity: 0.48, syntacticDepth: 0.50,
      scriptDensity: 0.45, characterCurvature: 0.62, diacriticFrequency: 0.28
    },
    poem: {
      title: 'Rima XXIII', author: 'Gustavo Adolfo Bécquer',
      lines: ['Por una mirada, un mundo;', 'por una sonrisa, un cielo;', 'por un beso… ¡yo no sé', 'qué te diera por un beso!']
    }
  },

  en: {
    id: 'en', name: 'English', script: 'Latin', direction: 'ltr',
    flagCode: 'gb',
    fontFamily: "'Merriweather', Georgia, serif", fontName: 'Merriweather',
    gsapEase: 'power3.out',
    metrics: {
      vowelConsonantRatio: 0.45, syllabicRegularity: 0.48, phoneticSoftness: 0.42,
      avgWordLength: 0.38, morphologyComplexity: 0.35, agglutinationIndex: 0.08,
      avgSentenceLength: 0.45, wordOrderRigidity: 0.78, syntacticDepth: 0.45,
      scriptDensity: 0.40, characterCurvature: 0.40, diacriticFrequency: 0.02
    },
    poem: {
      title: "I'm Nobody! Who are you?", author: 'Emily Dickinson',
      lines: ["I'm Nobody! Who are you?", "Are you – Nobody – too?", "Then there's a pair of us!", "Don't tell! they'd advertise."]
    }
  },

  ja: {
    id: 'ja', name: '日本語', script: 'CJK', direction: 'ltr',
    flagCode: 'jp',
    fontFamily: "'Noto Serif JP', serif", fontName: 'Noto Serif JP',
    gsapEase: 'expo.out',
    metrics: {
      vowelConsonantRatio: 0.82, syllabicRegularity: 0.92, phoneticSoftness: 0.75,
      avgWordLength: 0.25, morphologyComplexity: 0.78, agglutinationIndex: 0.85,
      avgSentenceLength: 0.35, wordOrderRigidity: 0.55, syntacticDepth: 0.72,
      scriptDensity: 0.95, characterCurvature: 0.90, diacriticFrequency: 0.10
    },
    poem: {
      title: '古池', author: '松尾芭蕉 — Matsuo Bashō',
      lines: ['古池や', '蛙飛び込む', '水の音']
    }
  },

  ar: {
    id: 'ar', name: 'العربية', script: 'Arabic', direction: 'rtl',
    flagCode: 'sa',
    fontFamily: "'Noto Naskh Arabic', serif", fontName: 'Noto Naskh Arabic',
    gsapEase: 'back.out(1.2)',
    metrics: {
      vowelConsonantRatio: 0.38, syllabicRegularity: 0.65, phoneticSoftness: 0.58,
      avgWordLength: 0.52, morphologyComplexity: 0.88, agglutinationIndex: 0.45,
      avgSentenceLength: 0.60, wordOrderRigidity: 0.42, syntacticDepth: 0.68,
      scriptDensity: 0.72, characterCurvature: 0.85, diacriticFrequency: 0.72
    },
    poem: {
      title: 'على هذه الأرض', author: 'محمود درويش — Mahmoud Darwish',
      lines: ['على هذه الأرض ما يستحق الحياة:', 'تردُّد أبريل،', 'ورائحة الخبز في الفجر،', 'وآراء امرأة في الرجال.']
    }
  },

  fi: {
    id: 'fi', name: 'Suomi', script: 'Latin', direction: 'ltr',
    flagCode: 'fi',
    fontFamily: "'Google-Space-Grotesk--regular', 'Space Grotesk', system-ui, sans-serif",
    fontName: 'Space Grotesk', gsapEase: 'power1.inOut',
    metrics: {
      vowelConsonantRatio: 0.58, syllabicRegularity: 0.85, phoneticSoftness: 0.52,
      avgWordLength: 0.92, morphologyComplexity: 0.94, agglutinationIndex: 0.96,
      avgSentenceLength: 0.68, wordOrderRigidity: 0.35, syntacticDepth: 0.82,
      scriptDensity: 0.55, characterCurvature: 0.38, diacriticFrequency: 0.22
    },
    poem: {
      title: 'Kalevala — Runoja', author: 'Elias Lönnrot',
      lines: ['Mieleni minun tekevi,', 'aivoni ajattelevi', 'lähteäni laulamahan,', "saa'ani sanelemahan"]
    }
  },

  // ── 20 NEW LANGUAGES ────────────────────────────

  zh: {
    id: 'zh', name: '中文', script: 'CJK', direction: 'ltr',
    flagCode: 'cn',
    fontFamily: "'Noto Serif SC', serif", fontName: 'Noto Serif SC',
    gsapEase: 'expo.out',
    metrics: {
      vowelConsonantRatio: 0.50, syllabicRegularity: 0.95, phoneticSoftness: 0.55,
      avgWordLength: 0.18, morphologyComplexity: 0.28, agglutinationIndex: 0.05,
      avgSentenceLength: 0.22, wordOrderRigidity: 0.88, syntacticDepth: 0.38,
      scriptDensity: 1.00, characterCurvature: 0.78, diacriticFrequency: 0.00
    },
    poem: {
      title: '静夜思', author: '李白 — Li Bai',
      lines: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。']
    }
  },

  ko: {
    id: 'ko', name: '한국어', script: 'Hangul', direction: 'ltr',
    flagCode: 'kr',
    fontFamily: "'Noto Serif KR', serif", fontName: 'Noto Serif KR',
    gsapEase: 'power3.out',
    metrics: {
      vowelConsonantRatio: 0.58, syllabicRegularity: 0.85, phoneticSoftness: 0.60,
      avgWordLength: 0.35, morphologyComplexity: 0.80, agglutinationIndex: 0.90,
      avgSentenceLength: 0.42, wordOrderRigidity: 0.60, syntacticDepth: 0.70,
      scriptDensity: 0.82, characterCurvature: 0.72, diacriticFrequency: 0.00
    },
    poem: {
      title: '진달래꽃', author: '김소월 — Kim Sowol',
      lines: ['나 보기가 역겨워', '가실 때에는', '말없이 고이', '보내 드리오리다.']
    }
  },

  hi: {
    id: 'hi', name: 'हिन्दी', script: 'Devanagari', direction: 'ltr',
    flagCode: 'in',
    fontFamily: "'Noto Serif Devanagari', serif", fontName: 'Noto Serif Devanagari',
    gsapEase: 'back.out(1.2)',
    metrics: {
      vowelConsonantRatio: 0.48, syllabicRegularity: 0.72, phoneticSoftness: 0.62,
      avgWordLength: 0.45, morphologyComplexity: 0.72, agglutinationIndex: 0.35,
      avgSentenceLength: 0.55, wordOrderRigidity: 0.45, syntacticDepth: 0.65,
      scriptDensity: 0.78, characterCurvature: 0.88, diacriticFrequency: 0.65
    },
    poem: {
      title: 'मेरे तो गिरिधर गोपाल', author: 'मीराबाई — Mirabai',
      lines: ['मेरे तो गिरिधर गोपाल,', 'दूसरो न कोई।', 'जाके सिर मोर मुकुट,', 'मेरो पति सोई।']
    }
  },

  de: {
    id: 'de', name: 'Deutsch', script: 'Latin', direction: 'ltr',
    flagCode: 'de',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power4.out',
    metrics: {
      vowelConsonantRatio: 0.40, syllabicRegularity: 0.52, phoneticSoftness: 0.35,
      avgWordLength: 0.72, morphologyComplexity: 0.78, agglutinationIndex: 0.55,
      avgSentenceLength: 0.70, wordOrderRigidity: 0.65, syntacticDepth: 0.82,
      scriptDensity: 0.52, characterCurvature: 0.42, diacriticFrequency: 0.15
    },
    poem: {
      title: 'Wanderers Nachtlied II', author: 'Johann Wolfgang von Goethe',
      lines: ['Über allen Gipfeln', 'ist Ruh,', 'in allen Wipfeln', 'spürest du kaum einen Hauch.']
    }
  },

  fr: {
    id: 'fr', name: 'Français', script: 'Latin', direction: 'ltr',
    flagCode: 'fr',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.52, syllabicRegularity: 0.68, phoneticSoftness: 0.72,
      avgWordLength: 0.42, morphologyComplexity: 0.62, agglutinationIndex: 0.18,
      avgSentenceLength: 0.55, wordOrderRigidity: 0.72, syntacticDepth: 0.60,
      scriptDensity: 0.46, characterCurvature: 0.45, diacriticFrequency: 0.45
    },
    poem: {
      title: 'Il pleure dans mon cœur', author: 'Paul Verlaine',
      lines: ['Il pleure dans mon cœur', 'comme il pleut sur la ville.', 'Quelle est cette langueur', 'qui pénètre mon cœur?']
    }
  },

  pt: {
    id: 'pt', name: 'Português', script: 'Latin', direction: 'ltr',
    flagCode: 'pt',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.55, syllabicRegularity: 0.62, phoneticSoftness: 0.65,
      avgWordLength: 0.44, morphologyComplexity: 0.65, agglutinationIndex: 0.15,
      avgSentenceLength: 0.52, wordOrderRigidity: 0.60, syntacticDepth: 0.58,
      scriptDensity: 0.44, characterCurvature: 0.44, diacriticFrequency: 0.52
    },
    poem: {
      title: 'Tabacaria', author: 'Fernando Pessoa',
      lines: ['Não sou nada.', 'Nunca serei nada.', 'Não posso querer ser nada.', 'Tenho em mim todos os sonhos do mundo.']
    }
  },

  ru: {
    id: 'ru', name: 'Русский', script: 'Cyrillic', direction: 'ltr',
    flagCode: 'ru',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power3.inOut',
    metrics: {
      vowelConsonantRatio: 0.44, syllabicRegularity: 0.55, phoneticSoftness: 0.50,
      avgWordLength: 0.55, morphologyComplexity: 0.88, agglutinationIndex: 0.35,
      avgSentenceLength: 0.58, wordOrderRigidity: 0.30, syntacticDepth: 0.78,
      scriptDensity: 0.62, characterCurvature: 0.65, diacriticFrequency: 0.05
    },
    poem: {
      title: 'Я вас любил', author: 'Александр Пушкин — Pushkin',
      lines: ['Я вас любил: любовь ещё, быть может,', 'В душе моей угасла не совсем;', 'Но пусть она вас больше не тревожит;', 'Я не хочу печалить вас ничем.']
    }
  },

  it: {
    id: 'it', name: 'Italiano', script: 'Latin', direction: 'ltr',
    flagCode: 'it',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'back.out(1.3)',
    metrics: {
      vowelConsonantRatio: 0.70, syllabicRegularity: 0.78, phoneticSoftness: 0.78,
      avgWordLength: 0.40, morphologyComplexity: 0.58, agglutinationIndex: 0.12,
      avgSentenceLength: 0.48, wordOrderRigidity: 0.55, syntacticDepth: 0.52,
      scriptDensity: 0.42, characterCurvature: 0.44, diacriticFrequency: 0.20
    },
    poem: {
      title: 'Mattina', author: 'Giuseppe Ungaretti',
      lines: ["M'illumino", "d'immenso."]
    }
  },

  el: {
    id: 'el', name: 'Ελληνικά', script: 'Greek', direction: 'ltr',
    flagCode: 'gr',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.58, syllabicRegularity: 0.62, phoneticSoftness: 0.62,
      avgWordLength: 0.48, morphologyComplexity: 0.80, agglutinationIndex: 0.20,
      avgSentenceLength: 0.55, wordOrderRigidity: 0.42, syntacticDepth: 0.72,
      scriptDensity: 0.58, characterCurvature: 0.72, diacriticFrequency: 0.32
    },
    poem: {
      title: 'Ιθάκη', author: 'Κωνσταντίνος Καβάφης — Cavafy',
      lines: ["Σα βγεις στον πηγαιμό για την Ιθάκη,", "να εύχεσαι να 'ναι μακρύς ο δρόμος,", "γεμάτος περιπέτειες,", "γεμάτος γνώσεις."]
    }
  },

  tr: {
    id: 'tr', name: 'Türkçe', script: 'Latin', direction: 'ltr',
    flagCode: 'tr',
    fontFamily: "'Merriweather', Georgia, serif", fontName: 'Merriweather',
    gsapEase: 'expo.out',
    metrics: {
      vowelConsonantRatio: 0.50, syllabicRegularity: 0.82, phoneticSoftness: 0.58,
      avgWordLength: 0.68, morphologyComplexity: 0.90, agglutinationIndex: 0.94,
      avgSentenceLength: 0.62, wordOrderRigidity: 0.40, syntacticDepth: 0.75,
      scriptDensity: 0.50, characterCurvature: 0.42, diacriticFrequency: 0.35
    },
    poem: {
      title: 'En Güzel Deniz', author: 'Nâzım Hikmet',
      lines: ['En güzel deniz:', 'henüz gidilmemiş olanıdır.', 'En güzel çocuk:', 'henüz büyümedi.']
    }
  },

  he: {
    id: 'he', name: 'עברית', script: 'Hebrew', direction: 'rtl',
    flagCode: 'il',
    fontFamily: "'Frank Ruhl Libre', serif", fontName: 'Frank Ruhl Libre',
    gsapEase: 'power2.inOut',
    metrics: {
      vowelConsonantRatio: 0.32, syllabicRegularity: 0.68, phoneticSoftness: 0.48,
      avgWordLength: 0.42, morphologyComplexity: 0.82, agglutinationIndex: 0.52,
      avgSentenceLength: 0.50, wordOrderRigidity: 0.45, syntacticDepth: 0.65,
      scriptDensity: 0.68, characterCurvature: 0.72, diacriticFrequency: 0.60
    },
    poem: {
      title: 'אלוהים מרחם', author: 'יהודה עמיחי — Yehuda Amichai',
      lines: ['אֱלֹהִים מְרַחֵם עַל יַלְדֵי הַגַּן.', 'פָּחוֹת מִזֶּה עַל יַלְדֵי בֵּית הַסֵּפֶר.', 'וְעַל הַגְּדוֹלִים לֹא יְרַחֵם כְּלָל,', 'יַנִּיחַ לָהֶם.']
    }
  },

  th: {
    id: 'th', name: 'ภาษาไทย', script: 'Thai', direction: 'ltr',
    flagCode: 'th',
    fontFamily: "'Noto Serif Thai', serif", fontName: 'Noto Serif Thai',
    gsapEase: 'expo.out',
    metrics: {
      vowelConsonantRatio: 0.55, syllabicRegularity: 0.75, phoneticSoftness: 0.60,
      avgWordLength: 0.22, morphologyComplexity: 0.25, agglutinationIndex: 0.10,
      avgSentenceLength: 0.30, wordOrderRigidity: 0.72, syntacticDepth: 0.38,
      scriptDensity: 0.82, characterCurvature: 0.95, diacriticFrequency: 0.70
    },
    poem: {
      title: 'นิราศภูเขาทอง', author: 'สุนทรภู่ — Sunthorn Phu',
      lines: ['ถึงม้วยดินสิ้นฟ้ามหาสมุทร', 'ไม่สิ้นสุดความรักสมัครสมาน', 'แม้เกิดใหม่ไม่ลืมเลือนกลับเนื้อนาน', 'ขอพบพานพักตร์น้องข้างขวา']
    }
  },

  vi: {
    id: 'vi', name: 'Tiếng Việt', script: 'Latin', direction: 'ltr',
    flagCode: 'vn',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power1.inOut',
    metrics: {
      vowelConsonantRatio: 0.56, syllabicRegularity: 0.72, phoneticSoftness: 0.55,
      avgWordLength: 0.20, morphologyComplexity: 0.20, agglutinationIndex: 0.08,
      avgSentenceLength: 0.28, wordOrderRigidity: 0.80, syntacticDepth: 0.35,
      scriptDensity: 0.48, characterCurvature: 0.50, diacriticFrequency: 0.85
    },
    poem: {
      title: 'Truyện Kiều', author: 'Nguyễn Du',
      lines: ['Trăm năm trong cõi người ta,', 'Chữ tài chữ mệnh khéo là ghét nhau.', 'Trải qua một cuộc bể dâu,', 'Những điều trông thấy mà đau đớn lòng.']
    }
  },

  id: {
    id: 'id', name: 'Bahasa Indonesia', script: 'Latin', direction: 'ltr',
    flagCode: 'id',
    fontFamily: "'Merriweather', Georgia, serif", fontName: 'Merriweather',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.55, syllabicRegularity: 0.80, phoneticSoftness: 0.65,
      avgWordLength: 0.50, morphologyComplexity: 0.60, agglutinationIndex: 0.72,
      avgSentenceLength: 0.48, wordOrderRigidity: 0.65, syntacticDepth: 0.55,
      scriptDensity: 0.40, characterCurvature: 0.40, diacriticFrequency: 0.05
    },
    poem: {
      title: 'Aku', author: 'Chairil Anwar',
      lines: ['Aku ini binatang jalang', 'dari kumpulannya terbuang.', 'Biar peluru menembus kulitku,', 'Aku tetap meradang menerjang.']
    }
  },

  sw: {
    id: 'sw', name: 'Kiswahili', script: 'Latin', direction: 'ltr',
    flagCode: 'ke',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.62, syllabicRegularity: 0.88, phoneticSoftness: 0.68,
      avgWordLength: 0.52, morphologyComplexity: 0.78, agglutinationIndex: 0.80,
      avgSentenceLength: 0.45, wordOrderRigidity: 0.55, syntacticDepth: 0.60,
      scriptDensity: 0.40, characterCurvature: 0.40, diacriticFrequency: 0.02
    },
    poem: {
      title: 'Usiku wa Manane', author: 'Shaaban Robert',
      lines: ['Usiku wa manane', 'ndege hawaimbi.', 'Moyo wangu unaimba', 'kwa huzuni ya mapenzi.']
    }
  },

  pl: {
    id: 'pl', name: 'Polski', script: 'Latin', direction: 'ltr',
    flagCode: 'pl',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power3.out',
    metrics: {
      vowelConsonantRatio: 0.38, syllabicRegularity: 0.45, phoneticSoftness: 0.38,
      avgWordLength: 0.55, morphologyComplexity: 0.88, agglutinationIndex: 0.30,
      avgSentenceLength: 0.60, wordOrderRigidity: 0.28, syntacticDepth: 0.80,
      scriptDensity: 0.50, characterCurvature: 0.44, diacriticFrequency: 0.50
    },
    poem: {
      title: 'Możliwości', author: 'Wisława Szymborska',
      lines: ['Wolę kino.', 'Wolę koty.', 'Wolę dęby', 'nad Wartą.']
    }
  },

  nl: {
    id: 'nl', name: 'Nederlands', script: 'Latin', direction: 'ltr',
    flagCode: 'nl',
    fontFamily: "'Merriweather', Georgia, serif", fontName: 'Merriweather',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.44, syllabicRegularity: 0.55, phoneticSoftness: 0.40,
      avgWordLength: 0.62, morphologyComplexity: 0.62, agglutinationIndex: 0.48,
      avgSentenceLength: 0.62, wordOrderRigidity: 0.60, syntacticDepth: 0.72,
      scriptDensity: 0.48, characterCurvature: 0.42, diacriticFrequency: 0.08
    },
    poem: {
      title: 'de mooiste', author: 'Remco Campert',
      lines: ['poëzie is een daad van bevestiging,', 'een ja-woord aan het leven,', 'ondanks alles', 'ja.']
    }
  },

  sv: {
    id: 'sv', name: 'Svenska', script: 'Latin', direction: 'ltr',
    flagCode: 'se',
    fontFamily: "'Merriweather', Georgia, serif", fontName: 'Merriweather',
    gsapEase: 'power1.inOut',
    metrics: {
      vowelConsonantRatio: 0.52, syllabicRegularity: 0.62, phoneticSoftness: 0.58,
      avgWordLength: 0.52, morphologyComplexity: 0.52, agglutinationIndex: 0.42,
      avgSentenceLength: 0.52, wordOrderRigidity: 0.68, syntacticDepth: 0.62,
      scriptDensity: 0.46, characterCurvature: 0.42, diacriticFrequency: 0.12
    },
    poem: {
      title: 'Allegro', author: 'Tomas Tranströmer',
      lines: ['Jag spelar Haydn efter en svart dag', 'och känner en enkel värme i händerna.', 'Tangenterna vill. Milda hamrar slår.', 'Klangen är grön, livlig och stilla.']
    }
  },

  hu: {
    id: 'hu', name: 'Magyar', script: 'Latin', direction: 'ltr',
    flagCode: 'hu',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'back.out(1.4)',
    metrics: {
      vowelConsonantRatio: 0.55, syllabicRegularity: 0.72, phoneticSoftness: 0.58,
      avgWordLength: 0.85, morphologyComplexity: 0.95, agglutinationIndex: 0.98,
      avgSentenceLength: 0.65, wordOrderRigidity: 0.25, syntacticDepth: 0.85,
      scriptDensity: 0.52, characterCurvature: 0.44, diacriticFrequency: 0.42
    },
    poem: {
      title: 'Szeptember végén', author: 'Petőfi Sándor',
      lines: ['Még nyílnak a völgyben a kerti virágok,', 'Még zöldel a nyárfa az ablak előtt,', 'De látod amottan a téli világot?', 'Már hó takará el a bérci tetőt.']
    }
  },

  fa: {
    id: 'fa', name: 'فارسی', script: 'Arabic', direction: 'rtl',
    flagCode: 'ir',
    fontFamily: "'Noto Naskh Arabic', serif", fontName: 'Noto Naskh Arabic',
    gsapEase: 'power3.out',
    metrics: {
      vowelConsonantRatio: 0.42, syllabicRegularity: 0.62, phoneticSoftness: 0.65,
      avgWordLength: 0.48, morphologyComplexity: 0.72, agglutinationIndex: 0.38,
      avgSentenceLength: 0.55, wordOrderRigidity: 0.38, syntacticDepth: 0.68,
      scriptDensity: 0.75, characterCurvature: 0.88, diacriticFrequency: 0.60
    },
    poem: {
      title: 'غزل', author: 'حافظ شیرازی — Hafez',
      lines: ['الا یا ایها الساقی', 'أدِر کأساً وناولها', 'که عشق آسان نمود اول', 'ولی افتاد مشکل‌ها']
    }
  },

  // ── IDIOMAS DISTINTIVOS (script, tipología, fonología únicos) ────────

  ka: {
    id: 'ka', name: 'ქართული', script: 'Georgian', direction: 'ltr',
    flagCode: 'ge',
    fontFamily: "'Noto Serif Georgian', serif", fontName: 'Noto Serif Georgian',
    gsapEase: 'power4.out',
    metrics: {
      vowelConsonantRatio: 0.35, syllabicRegularity: 0.55, phoneticSoftness: 0.32,
      avgWordLength: 0.72, morphologyComplexity: 0.88, agglutinationIndex: 0.92,
      avgSentenceLength: 0.58, wordOrderRigidity: 0.45, syntacticDepth: 0.78,
      scriptDensity: 0.92, characterCurvature: 0.72, diacriticFrequency: 0.00
    },
    poem: {
      title: 'ვეფხისტყაოსანი', author: 'შოთა რუსთაველი — Shota Rustaveli',
      lines: ['ვეფხისტყაოსანი შექმნა ღმერთმა', 'შექმნა და მოგვცა ჩვენ', 'რათა გვეხმაროს სიყვარულში', 'და სიკეთეში ყოველთვის.']
    }
  },

  ta: {
    id: 'ta', name: 'தமிழ்', script: 'Tamil', direction: 'ltr',
    flagCode: 'in',
    fontFamily: "'Noto Serif Tamil', serif", fontName: 'Noto Serif Tamil',
    gsapEase: 'expo.out',
    metrics: {
      vowelConsonantRatio: 0.68, syllabicRegularity: 0.88, phoneticSoftness: 0.72,
      avgWordLength: 0.65, morphologyComplexity: 0.82, agglutinationIndex: 0.88,
      avgSentenceLength: 0.52, wordOrderRigidity: 0.52, syntacticDepth: 0.75,
      scriptDensity: 0.88, characterCurvature: 0.85, diacriticFrequency: 0.55
    },
    poem: {
      title: 'குறள்', author: 'திருவள்ளுவர் — Thiruvalluvar',
      lines: ['அகர முதல எழுத்தெல்லாம் ஆதி', 'பகவன் முதற்றே உலகு', 'அறத்தாறு இதுவென வேண்டா சிவிகை', 'பொறுத்தாற்றும் பூண் நெடுங்கடை.']
    }
  },

  cy: {
    id: 'cy', name: 'Cymraeg', script: 'Latin', direction: 'ltr',
    flagCode: 'gb',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'sine.inOut',
    metrics: {
      vowelConsonantRatio: 0.52, syllabicRegularity: 0.62, phoneticSoftness: 0.55,
      avgWordLength: 0.72, morphologyComplexity: 0.78, agglutinationIndex: 0.65,
      avgSentenceLength: 0.62, wordOrderRigidity: 0.35, syntacticDepth: 0.72,
      scriptDensity: 0.48, characterCurvature: 0.45, diacriticFrequency: 0.35
    },
    poem: {
      title: 'Hen Wlad fy Nhadau', author: 'Evan James',
      lines: ['Mae hen wlad fy nhadau yn annwyl i mi,', 'Gwlad beirdd a chantorion, enwogion o fri;', 'Ei gwrol ryfelwyr, gwladgarwyr tra mâd,', 'Tros ryddid collasant eu gwaed.']
    }
  },

  eu: {
    id: 'eu', name: 'Euskara', script: 'Latin', direction: 'ltr',
    flagCode: 'pv',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.inOut',
    metrics: {
      vowelConsonantRatio: 0.58, syllabicRegularity: 0.78, phoneticSoftness: 0.62,
      avgWordLength: 0.78, morphologyComplexity: 0.92, agglutinationIndex: 0.95,
      avgSentenceLength: 0.58, wordOrderRigidity: 0.28, syntacticDepth: 0.82,
      scriptDensity: 0.52, characterCurvature: 0.48, diacriticFrequency: 0.25
    },
    poem: {
      title: 'Gernika', author: 'Gabriel Aresti',
      lines: ['Gernika, Gernika, zure arbola', 'gure bihotzetan da zutik', 'eta betiko izango da', 'euskaldunak gara gu.']
    }
  },

  mi: {
    id: 'mi', name: 'Te Reo Māori', script: 'Latin', direction: 'ltr',
    flagCode: 'nz',
    fontFamily: "'Merriweather', Georgia, serif", fontName: 'Merriweather',
    gsapEase: 'sine.out',
    metrics: {
      vowelConsonantRatio: 0.78, syllabicRegularity: 0.95, phoneticSoftness: 0.82,
      avgWordLength: 0.72, morphologyComplexity: 0.72, agglutinationIndex: 0.68,
      avgSentenceLength: 0.48, wordOrderRigidity: 0.42, syntacticDepth: 0.58,
      scriptDensity: 0.42, characterCurvature: 0.55, diacriticFrequency: 0.45
    },
    poem: {
      title: 'Hine e Hine', author: 'Tradicional',
      lines: ['Hine e hine, hine e hine', 'E tama e, e tama e', 'Kua ngenge koe ki te moe', 'Hine e hine, hine e hine.']
    }
  },

  tl: {
    id: 'tl', name: 'Tagalog', script: 'Latin', direction: 'ltr',
    flagCode: 'ph',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.72, syllabicRegularity: 0.92, phoneticSoftness: 0.78,
      avgWordLength: 0.65, morphologyComplexity: 0.58, agglutinationIndex: 0.55,
      avgSentenceLength: 0.55, wordOrderRigidity: 0.48, syntacticDepth: 0.52,
      scriptDensity: 0.45, characterCurvature: 0.58, diacriticFrequency: 0.38
    },
    poem: {
      title: 'Florante at Laura', author: 'Francisco Balagtas',
      lines: ['Sa loob at labas ng bayan kong sawi', 'Kaliluha\'y siyang nangyayaring hari', 'Kagalinga\'t bait ay nalulugami', 'Ininis sa hukay ng dusa\'t pighati.']
    }
  },

  // ── IDIOMAS POCO HABLADOS ────────────────────────────────────────────────

  is: {
    id: 'is', name: 'Íslenska', script: 'Latin', direction: 'ltr',
    flagCode: 'is',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power3.out',
    metrics: {
      vowelConsonantRatio: 0.48, syllabicRegularity: 0.68, phoneticSoftness: 0.45,
      avgWordLength: 0.85, morphologyComplexity: 0.88, agglutinationIndex: 0.72,
      avgSentenceLength: 0.62, wordOrderRigidity: 0.35, syntacticDepth: 0.78,
      scriptDensity: 0.52, characterCurvature: 0.42, diacriticFrequency: 0.18
    },
    poem: {
      title: 'Sólarljóð', author: 'Tradicional',
      lines: ['Sól ek sá', 'sanna segja', 'deigðan þjóðans', 'dóms í hring.']
    }
  },

  ga: {
    id: 'ga', name: 'Gaeilge', script: 'Latin', direction: 'ltr',
    flagCode: 'ie',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'sine.inOut',
    metrics: {
      vowelConsonantRatio: 0.55, syllabicRegularity: 0.58, phoneticSoftness: 0.58,
      avgWordLength: 0.68, morphologyComplexity: 0.82, agglutinationIndex: 0.72,
      avgSentenceLength: 0.55, wordOrderRigidity: 0.32, syntacticDepth: 0.75,
      scriptDensity: 0.48, characterCurvature: 0.48, diacriticFrequency: 0.28
    },
    poem: {
      title: 'An Díthreabhach', author: 'Tradicional',
      lines: ['Is fada an oíche', 'gan bhrí gan bhrí', 'is fada an lá', 'gan ghrian na gaoithe.']
    }
  },

  hy: {
    id: 'hy', name: 'Հայերեն', script: 'Armenian', direction: 'ltr',
    flagCode: 'am',
    fontFamily: "'Noto Serif Armenian', serif", fontName: 'Noto Serif Armenian',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.52, syllabicRegularity: 0.72, phoneticSoftness: 0.58,
      avgWordLength: 0.58, morphologyComplexity: 0.78, agglutinationIndex: 0.55,
      avgSentenceLength: 0.58, wordOrderRigidity: 0.42, syntacticDepth: 0.72,
      scriptDensity: 0.85, characterCurvature: 0.78, diacriticFrequency: 0.12
    },
    poem: {
      title: 'Մահը', author: 'Վահան Տերյան — Vahan Teryan',
      lines: ['Ես գիտեմ, որ իմ մահը', 'Մի օր կգա', 'Ու կմեռնեմ ես', 'Անժամանակ.']
    }
  },

  lt: {
    id: 'lt', name: 'Lietuvių', script: 'Latin', direction: 'ltr',
    flagCode: 'lt',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.inOut',
    metrics: {
      vowelConsonantRatio: 0.58, syllabicRegularity: 0.75, phoneticSoftness: 0.62,
      avgWordLength: 0.72, morphologyComplexity: 0.88, agglutinationIndex: 0.65,
      avgSentenceLength: 0.58, wordOrderRigidity: 0.38, syntacticDepth: 0.78,
      scriptDensity: 0.55, characterCurvature: 0.45, diacriticFrequency: 0.48
    },
    poem: {
      title: 'Tiesiog', author: 'Salomėja Nėris',
      lines: ['Aš gimiau šioje žemėje', 'ir čia manęs laukia', 'mano namai', 'ir mano daina.']
    }
  },

  mt: {
    id: 'mt', name: 'Malti', script: 'Latin', direction: 'ltr',
    flagCode: 'mt',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power2.out',
    metrics: {
      vowelConsonantRatio: 0.48, syllabicRegularity: 0.62, phoneticSoftness: 0.52,
      avgWordLength: 0.55, morphologyComplexity: 0.65, agglutinationIndex: 0.42,
      avgSentenceLength: 0.52, wordOrderRigidity: 0.55, syntacticDepth: 0.62,
      scriptDensity: 0.48, characterCurvature: 0.42, diacriticFrequency: 0.22
    },
    poem: {
      title: 'L-Għanja ta\' Malta', author: 'Dun Karm Psaila',
      lines: ['Lil din l-art ħelwa, l-Omm li tatna isimha', 'Ħarsna minn żewġ naħat', 'u ħarsna minn kull ħabta', 'fejn inti tinsab.']
    }
  },

  et: {
    id: 'et', name: 'Eesti', script: 'Latin', direction: 'ltr',
    flagCode: 'ee',
    fontFamily: "'Lora', Georgia, serif", fontName: 'Lora',
    gsapEase: 'power1.inOut',
    metrics: {
      vowelConsonantRatio: 0.58, syllabicRegularity: 0.82, phoneticSoftness: 0.55,
      avgWordLength: 0.78, morphologyComplexity: 0.92, agglutinationIndex: 0.95,
      avgSentenceLength: 0.58, wordOrderRigidity: 0.32, syntacticDepth: 0.75,
      scriptDensity: 0.52, characterCurvature: 0.42, diacriticFrequency: 0.35
    },
    poem: {
      title: 'Mu isamaa on minu arm', author: 'Lydia Koidula',
      lines: ['Mu isamaa on minu arm', 'Kõik armastus on mul tema', 'Ja ma pean teda kiitma', 'Kui ma suudan.']
    }
  }

};

// Human-readable labels for the 12 linguistic metrics
export const METRIC_LABELS = {
  vowelConsonantRatio:  'Vowel Ratio',
  syllabicRegularity:   'Syllabic Reg.',
  phoneticSoftness:     'Phonetic Soft.',
  avgWordLength:        'Avg Word Len.',
  morphologyComplexity: 'Morphology',
  agglutinationIndex:   'Agglutination',
  avgSentenceLength:    'Sentence Len.',
  wordOrderRigidity:    'Word Order',
  syntacticDepth:       'Syntax Depth',
  scriptDensity:        'Script Density',
  characterCurvature:   'Char. Curvature',
  diacriticFrequency:   'Diacritics'
};

// Rich metadata per metric: used by tooltips and the radar chart
// axisLabel  → compact label on radar spokes (≤12 chars)
// icon       → Unicode glyph (visual anchor in the tooltip)
// label      → full human name (tooltip title)
// desc       → explanation of what the metric captures and what hi/lo implies
// visual     → what visual property this metric drives
export const METRIC_INFO = {
  vowelConsonantRatio: {
    axisLabel: 'Vocal ratio',
    icon: '◎',
    label: 'Vocal / Consonante',
    desc: 'Proporción de vocales respecto al total de fonemas. Alto → lengua abierta y musical (Italiano 0.70, Swahili 0.62). Bajo → lengua consonántica y densa (Polaco 0.38, Alemán 0.40).',
    visual: 'Regula el chroma del color acento junto con la suavidad fonética.',
    source: 'PHOIBLE (V/(V+C) por inventario fonológico)',
    low: 'Polaco 0.38',
    high: 'Italiano 0.70'
  },
  syllabicRegularity: {
    axisLabel: 'Syllabic reg.',
    icon: '∿',
    label: 'Regularidad silábica',
    desc: 'Homogeneidad del patrón silábico (CV, CVC…). Alto → ritmo predecible y metrónomo (Japonés 0.92, Turco 0.82). Bajo → grupos consonánticos imprevisibles (Inglés 0.48, Polaco 0.45).',
    visual: 'Controla el line-height del poema: más regular = líneas más juntas.',
    source: 'Estimado (PHOIBLE: estructura silábica)',
    low: 'Polaco 0.45',
    high: 'Japonés 0.92'
  },
  phoneticSoftness: {
    axisLabel: 'Soft. fonética',
    icon: '◌',
    label: 'Suavidad fonética',
    desc: 'Predominio de sonidos suaves (líquidas, nasales, vocales abiertas). Alto → Italiano 0.78, Swahili 0.68. Bajo → Polaco 0.38, Alemán 0.35. Determina si la identidad visual "fluye" o "corta".',
    visual: 'Mapea al border-radius de toda la UI y al letter-spacing tipográfico.',
    source: 'PHOIBLE (líquidas, nasales, vocales abiertas vs. oclusivas)',
    low: 'Alemán 0.35',
    high: 'Italiano 0.78'
  },
  avgWordLength: {
    axisLabel: 'Word length',
    icon: '⟷',
    label: 'Longitud media de palabra',
    desc: 'Extensión media de las palabras en sílabas o grafemas. Alto → lenguas aglutinantes con palabras muy largas (Húngaro 0.85, Finlandés 0.92). Bajo → lenguas monosilábicas (Chino 0.18, Tailandés 0.22).',
    visual: 'Controla el gap-scale del layout: palabras largas necesitan más espacio visual.',
    source: 'Estimado (corpus / WALS 20A exponence)',
    low: 'Chino 0.18',
    high: 'Finlandés 0.92'
  },
  morphologyComplexity: {
    axisLabel: 'Morfología',
    icon: '⊕',
    label: 'Complejidad morfológica',
    desc: 'Riqueza del sistema de casos, conjugaciones, concordancias y formas verbales. Alto → Húngaro (18 casos, 0.95), Árabe (raíces triconsonánticas, 0.88). Bajo → Chino 0.28, Tailandés 0.25.',
    visual: 'Regula el font-weight tipográfico: más complejo = tipos más pesados y assertivos.',
    source: 'WALS 20A (fusion), 49A (number of cases), Grambank',
    low: 'Tailandés 0.25',
    high: 'Húngaro 0.95'
  },
  agglutinationIndex: {
    axisLabel: 'Agglutinación',
    icon: '⊞',
    label: 'Índice de aglutinación',
    desc: 'Grado en que la lengua forma palabras concatenando morfemas. Alto → Húngaro 0.98, Turco 0.94, Finlandés 0.96. Bajo → Chino 0.05, Inglés 0.08. Determina cuánto "se apilan" los significados.',
    visual: 'Controla el grosor del border-width: aglutinación alta = líneas estructurales más marcadas.',
    source: 'WALS 22A (exponence of inflectional formatives)',
    low: 'Chino 0.05',
    high: 'Húngaro 0.98'
  },
  avgSentenceLength: {
    axisLabel: 'Sentence len.',
    icon: '≡',
    label: 'Longitud media de oración',
    desc: 'Extensión media de las oraciones. Las lenguas con morfología rica y orden libre tienden a oraciones más largas y elaboradas (Alemán 0.70, Húngaro 0.65). Las aislantes son más directas (Chino 0.22).',
    visual: 'Contribuye indirectamente a la densidad visual y al espaciado del poema.',
    source: 'Estimado (corpus / Grambank)',
    low: 'Chino 0.22',
    high: 'Alemán 0.70'
  },
  wordOrderRigidity: {
    axisLabel: 'Word order',
    icon: '→',
    label: 'Rigidez del orden de palabras',
    desc: 'Libertad para reordenar los constituyentes de la oración. Alto → Inglés 0.78, Chino 0.88 (SVO obligatorio). Bajo → Ruso 0.30, Polaco 0.28 (el caso morfológico desambigua).',
    visual: 'Influye en la composición del layout: rigidez alta → diseño más reticular y ortogonal.',
    source: 'WALS 81A (S-V order), 3A (SOV/SVO)',
    low: 'Polaco 0.28',
    high: 'Chino 0.88'
  },
  syntacticDepth: {
    axisLabel: 'Syntax depth',
    icon: '⬡',
    label: 'Profundidad sintáctica',
    desc: 'Profundidad media del árbol de dependencias oracional. Alto → Alemán 0.82, Húngaro 0.85 (oraciones subordinadas complejas y anidadas). Bajo → Tailandés 0.38, Chino 0.38.',
    visual: 'Mapea directamente al blur de las sombras: sintaxis profunda → capas visuales dramáticas.',
    source: 'Grambank (subordination, embedding)',
    low: 'Tailandés 0.38',
    high: 'Húngaro 0.85'
  },
  scriptDensity: {
    axisLabel: 'Script density',
    icon: '⿰',
    label: 'Densidad de script',
    desc: 'Cantidad de información visual codificada por grafema. Alto → Chino 1.00 (miles de caracteres), Japonés 0.95, Tailandés 0.82. Bajo → Latín básico 0.40–0.48.',
    visual: 'Controla la duración de las animaciones: más denso = transiciones más lentas y ceremoniosas.',
    source: 'Estimado (tamaño del inventario de grafemas)',
    low: 'Latín básico 0.40',
    high: 'Chino 1.00'
  },
  characterCurvature: {
    axisLabel: 'Curvatura',
    icon: '◍',
    label: 'Curvatura de trazos',
    desc: 'Proporción de trazos curvos respecto a los angulares en el sistema de escritura. Alto → Tailandés 0.95, Árabe 0.85, Hindi 0.88. Bajo → Finlandés 0.38, Inglés 0.40.',
    visual: 'Refuerza el ritmo de las transiciones: mucha curvatura → animaciones más orgánicas.',
    source: 'Estimado (análisis visual del script)',
    low: 'Finlandés 0.38',
    high: 'Tailandés 0.95'
  },
  diacriticFrequency: {
    axisLabel: 'Diacríticos',
    icon: '˜',
    label: 'Frecuencia de diacríticos',
    desc: 'Densidad de marcas diacríticas (tildes, vocalizaciones, marcas de tono). Alto → Vietnamita 0.85 (6 tonos en cada sílaba), Árabe 0.72, Hebreo 0.60. Bajo → Inglés 0.02, Indonesio 0.05.',
    visual: 'Contribuye a la densidad del script y la riqueza visual de la tipografía.',
    source: 'Estimado (PHOIBLE tonos, Unicode combining marks)',
    low: 'Inglés 0.02',
    high: 'Vietnamita 0.85'
  }
};
