import assert from "assert";
import * as latCyr from "../src/lat_to_cyr.js";
import * as cyrLat from "../src/cyr_to_lat.js";


describe("(l→c, unit) Superlative transliteration:\n", () => {
  let testCase = {
    // lower case
    "najatraktivňišŷj": "найatraktivňišŷj",
    "najelegantňišŷj": "найelegantňišŷj",
    "najinteligentňišŷj": "найinteligentňišŷj",
    "najužasňišŷj": "найužasňišŷj",

    // Title Case
    "Najatraktivňišŷj": "Найatraktivňišŷj",
    "Najelegantňišŷj": "Найelegantňišŷj",
    "Najinteligentňišŷj": "Найinteligentňišŷj",
    "Najužasňišŷj": "Найužasňišŷj",

    // upper case
    "NAJATRAKTIVŇIŠŶJ": "НАЙATRAKTIVŇIŠŶJ",
    "NAJELEGANTŇIŠŶJ": "НАЙELEGANTŇIŠŶJ",
    "NAJINTELIGENTŇIŠŶJ": "НАЙINTELIGENTŇIŠŶJ",
    "NAJUŽASŇIŠŶJ": "НАЙUŽASŇIŠŶJ",

    // inflection
    "najobľubleňišŷj": "найobľubleňišŷj",
    "najobľubleňišoho": "найobľubleňišoho",
    "najobľubleňišomu": "найobľubleňišomu",
    "najobľubleňišim": "найobľubleňišim",
    "najobľubleňišŷm": "найobľubleňišŷm",
    "najobľubleňišŷ": "найobľubleňišŷ",
    "najobľubleňišŷch": "найobľubleňišŷch",
    "najobľubleňišŷma": "найobľubleňišŷma",
    "najobľubleňiša": "найobľubleňiša",
    "najobľubleňišoj": "найobľubleňišoj",
    "najobľubleňišij": "найobľubleňišij",
    "najobľubleňišu": "найobľubleňišu",
    "najobľubleňišov": "найobľubleňišov",
    "najobľubleňiše": "найobľubleňiše",

    "Najobľubleňišŷj": "Найobľubleňišŷj",
    "Najobľubleňišoho": "Найobľubleňišoho",
    "Najobľubleňišomu": "Найobľubleňišomu",
    "Najobľubleňišim": "Найobľubleňišim",
    "Najobľubleňišŷm": "Найobľubleňišŷm",
    "Najobľubleňišŷ": "Найobľubleňišŷ",
    "Najobľubleňišŷch": "Найobľubleňišŷch",
    "Najobľubleňišŷma": "Найobľubleňišŷma",
    "Najobľubleňiša": "Найobľubleňiša",
    "Najobľubleňišoj": "Найobľubleňišoj",
    "Najobľubleňišij": "Найobľubleňišij",
    "Najobľubleňišu": "Найobľubleňišu",
    "Najobľubleňišov": "Найobľubleňišov",
    "Najobľubleňiše": "Найobľubleňiše",

    "NAJOBĽUBLEŇIŠŶJ": "НАЙOBĽUBLEŇIŠŶJ",
    "NAJOBĽUBLEŇIŠOHO": "НАЙOBĽUBLEŇIŠOHO",
    "NAJOBĽUBLEŇIŠOMU": "НАЙOBĽUBLEŇIŠOMU",
    "NAJOBĽUBLEŇIŠIM": "НАЙOBĽUBLEŇIŠIM",
    "NAJOBĽUBLEŇIŠŶM": "НАЙOBĽUBLEŇIŠŶM",
    "NAJOBĽUBLEŇIŠŶ": "НАЙOBĽUBLEŇIŠŶ",
    "NAJOBĽUBLEŇIŠŶCH": "НАЙOBĽUBLEŇIŠŶCH",
    "NAJOBĽUBLEŇIŠŶMA": "НАЙOBĽUBLEŇIŠŶMA",
    "NAJOBĽUBLEŇIŠA": "НАЙOBĽUBLEŇIŠA",
    "NAJOBĽUBLEŇIŠOJ": "НАЙOBĽUBLEŇIŠOJ",
    "NAJOBĽUBLEŇIŠIJ": "НАЙOBĽUBLEŇIŠIJ",
    "NAJOBĽUBLEŇIŠU": "НАЙOBĽUBLEŇIŠU",
    "NAJOBĽUBLEŇIŠOV": "НАЙOBĽUBLEŇIŠOV",
    "NAJOBĽUBLEŇIŠE": "НАЙOBĽUBLEŇIŠE",

    // false positive
    "najidž": "najidž",
    "najveksyj": "najveksyj", //naj following a consonant
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(latCyr.mapSuperlative(key), testCase[key]);
    });
    it("Cyrillic → Cyrillic (no change):\n", () => {
      assert.equal(latCyr.mapSuperlative(testCase[key]), testCase[key]);
    });
  });
});



describe("(l→c, c→l, unit) consecutive soft vowels (ja, je, ji, jo, ju):\n", () => {
  let testCase = {
    "jajaj": "яяj",
    "jajajaj": "яяяj",
    "jajejaj": "яєяj",
    "jejej": "єєj",
    "jejejej": "єєєj",
    "jijij": "їїj",
    "jijijij": "їїїj",
    "jojoj": "ёёj",
    "jojojoj": "ёёёj",
    "jujuj": "ююj",
    "jujujuj": "юююj",

    "Jajaj": "Яяj",
    "Jajajaj": "Яяяj",
    "Jajejaj": "Яєяj",
    "Jejej": "Єєj",
    "Jejejej": "Єєєj",
    "Jijij": "Їїj",
    "Jijijij": "Їїїj",
    "Jojoj": "Ёёj",
    "Jojojoj": "Ёёёj",
    "Jujuj": "Ююj",
    "Jujujuj": "Юююj",

    //false positives for unit test
    "jaj": "jaj",
    "jej": "jej",
    "jij": "jij",
    "joj": "joj",
    "juj": "juj",
    "яй": "яй",
    "єй": "єй",
    "їй": "їй",
    "ёй": "ёй",
    "юй": "юй",
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(latCyr.mapSoftVowelsSequence(key), testCase[key]);
    });
    it("Latin → Latin (no change):\n", () => {
      assert.equal(cyrLat.mapSoftVowelsSequence(key), key);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(cyrLat.mapSoftVowelsSequence(testCase[key]), key);
    });
    it("Cyrillic → Cyrillic (no change):\n", () => {
      assert.equal(latCyr.mapSoftVowelsSequence(testCase[key]), testCase[key]);
    });
  });
});



describe("(l→c, c→l, unit) Ja, je, ji, jo, ju at the beginning of the word:\n", () => {
  let testCase = {
    "jabčanka": "яbčanka",
    "jedenastka": "єdenastka",
    "jidnaňa": "їdnaňa",
    "jubilant": "юbilant",
    "ji": "ї",

    "Jabčanka": "Яbčanka",
    "Jedenastka": "Єdenastka",
    "Jidnaňa": "Їdnaňa",
    "Jubilant": "Юbilant",
    "Ji": "Ї",

    // false positives
    "jedenadc’atŷj": "єdenadc’atŷj",
    "každopadňi": "každopadňi",
    "zrivňovaty": "zrivňovaty",
    "čeľustnŷj": "čeľustnŷj",
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(latCyr.mapSoftVowelAtWordStart(key), testCase[key]);
    });
    it("Latin → Latin (no change):\n", () => {
      assert.equal(cyrLat.mapSoftVowelAtWordStart(key), key);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(cyrLat.mapSoftVowelAtWordStart(testCase[key]), key);
    });
    it("Cyrillic → Cyrillic (no change):\n", () => {
      assert.equal(
        latCyr.mapSoftVowelAtWordStart(testCase[key]),
        testCase[key]
      );
    });
  });
});



describe("(l→c, unit) Consolidate letter group (ďď | ťť | ňň | ľľ) followed by aeiou:\n", () => {
  let testCase = {
    // matches
    "oďďilena": "oдďilena",
    "žyťťa": "žyтťa",
    "raňňij": "raнňij",
    "Os’iňňe": "Os’iнňe",
    "ľľuť": "лľuť",
    "ľľaty": "лľaty",

    "Ďďilena": "Дďilena",
    "Ťťa": "Тťa",
    "Ňňij": "Нňij",
    "Ňňe": "Нňe",
    "Ľľuť": "Лľuť",
    "Ľľaty": "Лľaty",

    // false positives, no accents on dtnl
    "oddŷchly": "oddŷchly",
    "piddaty": "piddaty",
    "nadderaty": "nadderaty",
    "naddobaty": "naddobaty",
    "naddunajskŷj": "naddunajskŷj",
    "Latta": "Latta",
    "alegretto": "alegretto",
    "motto": "motto",
    "Rotterdam": "Rotterdam",
    "neperestanno": "neperestanno",
    "každodennŷj": "každodennŷj",
    "Humenne": "Humenne",
    "bulla": "bulla",
    "Tallin": "Tallin",

    //false positive, mix of d-t-n-l
    "odťikaty": "odťikaty",
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(latCyr.mapDtnlDoubled(key), testCase[key]);
    });
    it("Cyrillic → Cyrillic (no change):\n", () => {
      assert.equal(latCyr.mapDtnlDoubled(testCase[key]), testCase[key]);
    });
  });
});



describe("(c→l, unit) Consolidate letter group (дд | тт | нн | лл) followed by яєїёю:\n", () => {
  let testCase = {
    // matches
    "оďдїлена": "оддїлена",
    "жиťтя": "життя",
    "рaňнїй": "рaннїй",
    "Осїňнє": "Осїннє",
    "Ľлють": "Ллють",
    "Ľляти": "Лляти",

    "Ďдїлена": "Ддїлена",
    "Ťтя": "Ття",
    "Ňнїй": "Ннїй",
    "Ňнє": "Ннє",

    // false positives, no accents on dtnl
    "оддыхли": "оддыхли",
    "піддати": "піддати",
    "наддерaти": "наддерaти",
    "наддoбати": "наддoбати",
    "наддунaйскый": "наддунaйскый",
    "Латта": "Латта",
    "алеґрeтто": "алеґрeтто",
    "мотто": "мотто",
    "Роттердaм": "Роттердaм",
    "неперестанно": "неперестанно",
    "каждоденный": "каждоденный",
    "Гумeнне": "Гумeнне",
    "булла": "булла",
    "Тaллін": "Тaллін",

    //false positive, mix of d-t-n-l
    "одтїкaти": "одтїкaти",
  };

  Object.keys(testCase).forEach((key) => {
    it("Cyrillic → Latin :\n", () => {
      assert.equal(cyrLat.mapDtnlDoubled(testCase[key]), key);
    });
    it("Latin → Latin (no change):\n", () => {
      assert.equal(cyrLat.mapDtnlDoubled(key), key);
    });
  });
});



describe("(l→c, unit) Ja, je, ji, jo, ju before a vowel:\n", () => {
  let testCase = {
    "bajusatŷj": "baюsatŷj",
    "Bajerivc’i": "Baєrivc’i",
    "hajik": "haїk",
    "zajačaty": "zaяčaty",
    "lyšajovŷj": "lyšaёvŷj",

    "akceleracija": "akceleraciя",
    "akciji": "akciї",
    "funkcijov": "funkciёv",
    "archijerej": "archiєrej",
    "policiju": "policiю",

    "pryjata": "pryяta",
    "pryjimaňa": "pryїmaňa",
    "spryjemnenŷj": "spryєmnenŷj",
    "čornyjova": "čornyёva",
    "vyjuť": "vyюť",

    "glejovŷj": "gleёvŷj",
    "naklejity": "nakleїty",
    "nejeden": "neєden",
    "nejadrovŷj": "neяdrovŷj",
    "oklejuju": "okleюju",

    "ojalovity": "oяlovity",
    "pereprojektovaty": "pereproєktovaty",
    "pidhojity": "pidhoїty",
    "svoju": "svoю",
    "svojoj": "svoёj",

    "šŷje": "šŷє",
    "vŷjasnyť": "vŷяsnyť",
    "šŷju": "šŷю",
    "šŷji": "šŷї",
    "Kŷjovčan": "Kŷёvčan",

    "kuju": "kuю",
    "kulminuje": "kulminuє",
    "tuja": "tuя",
    "ujidaty": "uїdaty",

    "tvojoj": "tvoёj",
    "Bardejov": "Bardeёv",
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(latCyr.mapSoftVowelAfterHardVowel(key), testCase[key]);
    });
    it("Cyrillic → Cyrillic (no change):\n", () => {
      assert.equal(
        latCyr.mapSoftVowelAfterHardVowel(testCase[key]),
        testCase[key]
      );
    });
  });
});



describe("(c→l, unit) Ja, je, ji, jo, ju before a vowel:\n", () => {
  let testCase = {
    // there are cyrillic vowels before ja, je,...

    "bаjusatŷj": "bаюsatŷj",
    "Bаjerivc’i": "Bаєrivc’i",
    "hаjik": "hаїk",
    "zаjačaty": "zаяčaty",
    "lyšаjovŷj": "lyšаёvŷj",

    "akceleracіja": "akceleracія",
    "akcіji": "akcії",
    "funkcіjov": "funkcіёv",
    "archіjerej": "archієrej",
    "policіju": "policію",

    "prиjata": "prияta",
    "prиjimaňa": "prиїmaňa",
    "sprиjemnenŷj": "sprиєmnenŷj",
    "čornиjova": "čornиёva",
    "vиjuť": "vиюť",

    "glеjovŷj": "glеёvŷj",
    "naklеjity": "naklеїty",
    "nеjedеn": "nеєdеn",
    "nеjadrovŷj": "nеяdrovŷj",
    "oklеjuju": "oklеюju",

    "оjalоvity": "ояlоvity",
    "pereprоjektоvaty": "pereprоєktоvaty",
    "pidhоjity": "pidhоїty",
    "svоju": "svою",
    "svоjoj": "svоёj",

    "šыje": "šыє",
    "vыjasnyť": "vыяsnyť",
    "šыju": "šыю",
    "šыji": "šыї",
    "Kыjovčan": "Kыёvčan",

    "kуju": "kую",
    "kulminуje": "kulminує",
    "tуja": "tуя",
    "уjidaty": "уїdaty",

    "tvоjoj": "tvоёj",
    "Bardеjov": "Bardеёv",

    "naďїjov": "naďїёv",
  };

  Object.keys(testCase).forEach((key) => {
    it("Cyrillic → Latin:\n", () => {
      assert.equal(cyrLat.mapSoftVowelAfterHardVowel(testCase[key]), key);
    });
    it("Latin → Latin (no change):\n", () => {
      assert.equal(cyrLat.mapSoftVowelAfterHardVowel(key), key);
    });
  });
});