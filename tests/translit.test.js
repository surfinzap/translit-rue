import assert from "assert";
import { translit } from "../src/translit.js";
import {
  normalizeApostrophes,
  processUpperCase
} from "../src/utils.js";

function mapObjectToUpperCase(testCase) {
  let upperCaseMapping = {};

  for (const [key, value] of Object.entries(testCase)) {
    upperCaseMapping[key.toUpperCase()] = value.toUpperCase();
  }
  return upperCaseMapping;
}











describe("(unit) Normalize apostrophes:\n", () => {
  const accentChars = ["'", "’", "ʼ", "‘", "‛", "´", "`", "′"];

  function generateAccents(testCase, accentChars) {
    let result = {};

    for (let [key, value] of Object.entries(testCase)) {
      let parts = key.split("'");

      if (parts.length === 2) {
        for (let accent of accentChars) {
          let variantKey = parts[0] + accent + parts[1];
          result[variantKey] = value;
        }
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  let hardConsonants = {
    "kinc'a": "kinc’a",
    "c'inyla": "c’inyla",
    "tanc'ovaty": "tanc’ovaty",
    "misc'u": "misc’u",
    "s'a": "s’a",
    "Bis'iduj": "Bis’iduj",
    "volos'om": "volos’om",
    "pros'u": "pros’u",
    "Pr'ašiv": "Pr’ašiv",
    "mir'i": "mir’i",
    "tr'och": "tr’och",
    "chmur'u": "chmur’u",
    "vz'aty": "vz’aty",
    "berez'i": "berez’i",
    "z'ojkla": "z’ojkla",
    "rez'ume": "rez’ume",
    "Myž'a": "Myž’a",
    "Myž'o": "Myž’o",
    "Myž'u": "Myž’u",

    "str´is´i": "str’is’i",
  };

  let accentsEnd = {
    "Otec'": "Otec’",
    "jes'": "jes’",
    "teper'": "teper’",
    "piňaz'": "piňaz’",
    "ž'": "ž’",
  };

  let accentsStart = {
    "'o": "’o",
  };

  let expectedUseCases = {
    ...generateAccents(hardConsonants, accentChars),
    ...mapObjectToUpperCase(generateAccents(hardConsonants, accentChars)),
    ...generateAccents(accentsEnd, accentChars),
    ...mapObjectToUpperCase(generateAccents(accentsEnd, accentChars)),
    ...generateAccents(accentsStart, accentChars),
    ...mapObjectToUpperCase(generateAccents(accentsStart, accentChars)),
  };

  Object.keys(expectedUseCases).forEach((key) => {
    it("should change the apostrophe:\n", () => {
      assert.equal(normalizeApostrophes(key), expectedUseCases[key]);
    });
  });

  let falsePositives = {
    // combinations of letters where apostrophe shouldn’t appear
    "d'a": "d'a",
    "t'a": "t'a",
    "n'a": "n'a",
    "l'a": "l'a",
    "d'e": "d'e",
    "t'e": "t'e",
    "n'e": "n'e",
    "l'e": "l'e",
    "d'i": "d'i",
    "t'i": "t'i",
    "n'i": "n'i",
    "l'i": "l'i",
    "d'o": "d'o",
    "t'o": "t'o",
    "n'o": "n'o",
    "l'o": "l'o",
    "d'u": "d'u",
    "t'u": "t'u",
    "n'u": "n'u",
    "l'u": "l'u",
  };

  Object.keys(falsePositives).forEach((key) => {
    it("shouldn’t change the apostrophe:\n", () => {
      assert.equal(normalizeApostrophes(key), falsePositives[key]);
    });
  });
});



let testLowerCaseWords = {
  "zazr’ila": "зазрїла",
  "Otec’": "Отець",
  "c’ile": "цїле",
  "kur’atko": "курятко",
  "klynec’": "клинець",
  "s’a": "ся",
  "mis’ac’": "місяць",
  "znajuť": "знають",
  "štos’ka": "штоська",
  "jes’": "єсь",
  "virnŷj": "вірный",
  "Tr’om": "Трём",
  "muľar’iv": "мулярїв",
  "džmur’klo": "джмурькло",
  "Teper’": "Теперь",
  "vz’ala": "взяла",
  "Voz’": "Возь",
  "gazdŷňa": "ґаздыня",
  "ľis’i": "лїсї",
  "C’ilŷj": "Цїлый",
  "ďity": "дїти",
  "jich": "їх",
  "str’is’i": "стрїсї",
  "noz’i": "нозї",
  "stojiť": "стоїть",
  "merenďu": "мерендю",
  "ňej": "нєй",
  "Ňanu": "Няну",
  "Braňo": "Бранё",
  "Vlaďo": "Владё",
  "Oťo": "Отё",
  "veľo": "велё",
  "car’u": "царю",
  "Chlopci": "Хлопці",
  "chyža": "хижа",
  "text Text": "текст Текст", // exception
  "Text text": "Текст текст", // exception
  "text": "текст", // exception
  "textovŷj": "текстовый", // exception
  "Textovŷj": "Текстовый", // exception
  "taxi": "таксі", // exception
  "Taxi": "Таксі", // exception
  "Jožko": "Йожко", // exception
  "Jožkovomu": "Йожковому", // exception

  "ser’jozno": "серьёзно",
  "objisty": "объїсти",
  "zjazvene": "зъязвене",
  "Zjavyla": "Зъявила",
  "Myž’ko": "Мижько",
  "ňoj": "нёй",

  "treťoj": "третёй",
  "plaksyvo": "плаксиво",
  "taksamo": "таксамо",
  "zjemňovaly": "зъємнёвали",
  "ňoho": "нёго",
  "blyžňoho": "ближнёго",
  "Nyžňoho": "Нижнёго",
  "zjojkla": "зъёйкла",
  "Myž’o": "Мижё",
  "Myž’a": "Мижя",
  "Myž’u": "Мижю",

  // Ja, je, ji, ju at the beginning of the word:

  "jabčanka jabčanka": "ябчанка ябчанка",

  "jabčanka": "ябчанка",
  "jedenastka": "єденастка",
  "jidnaňa": "їднаня",
  "jubilant": "юбілант",

  "Jabčanka": "Ябчанка",
  "Jedenastka": "Єденастка",
  "Jidnaňa": "Їднаня",
  "Jubilant": "Юбілант",

  "jedenadc’atŷj": "єденадцятый",
  "každopadňi": "каждопаднї",
  "zrivňovaty": "зрівнёвати",
  "čeľustnŷj": "челюстный",

  // jo is a special case
  // majority of words starts with "йо"
  "jotovanŷma": "йотованыма",
  "Joakim": "Йоакім",
  "jobovskŷj": "йобовскый",
  "Johanesburg": "Йоганесбурґ",
  "Johanesburčan": "Йоганесбурчан",
  "jogurt": "йоґурт",

  // consecutive soft vowels
  "jajaj": "яяй",
  "jajajaj": "яяяй",
  "jajejaj": "яєяй",
  "jejej": "єєй",
  "jejejej": "єєєй",
  "jijij": "їїй",
  "jijijij": "їїїй",
  "jojoj": "ёёй",
  "jojojoj": "ёёёй",
  "jujuj": "ююй",
  "jujujuj": "юююй",

  "Jajaj": "Яяй",
  "Jajajaj": "Яяяй",
  "Jajejaj": "Яєяй",
  "Jejej": "Єєй",
  "Jejejej": "Єєєй",
  "Jijij": "Їїй",
  "Jijijij": "Їїїй",
  "Jojoj": "Ёёй",
  "Jojojoj": "Ёёёй",
  "Jujuj": "Ююй",
  "Jujujuj": "Юююй",

  // joj, jov variations
  "joj": "ёй",
  "jojk": "ёйк",
  "jojkaňa": "ёйканя",
  "jojčaty": "ёйчати",
  "jov": "ёв",
  "jovha": "ёвга",
  "jovsag": "ёвсаґ",
  "Jojk": "Ёйк",
  "Joj": "Ёй",
  "Jojkaňa": "Ёйканя",
  "Jojčaty": "Ёйчати",
  "Jov": "Ёв",
  "Jovha": "Ёвга",
  "Jovsag": "Ёвсаґ",

  // only jo
  "O-Jo-Joj": "О-Ё-Ёй",
  "o-jo-joj": "о-ё-ёй",

  // exceptions
  "joho": "ёго",
  "jomu": "ёму",
  "Joho": "Ёго",
  "Jomu": "Ёму",

  // Ja, je, ji, jo, ju before a vowel:
  "bajusatŷj": "баюсатый",
  "Bajerivc’i": "Баєрівцї",
  "hajik": "гаїк",
  "zajačaty": "заячати",
  "lyšajovŷj": "лишаёвый",

  "akceleracija": "акцелерація",
  "akciji": "акції",
  "funkcijov": "функціёв",
  "archijerej": "архієрей",
  "policiju": "поліцію",

  "pryjata": "прията",
  "pryjimaňa": "приїманя",
  "spryjemnenŷj": "сприємненый",
  "čornyjova": "чорниёва",
  "vyjuť": "виють",

  "glejovŷj": "ґлеёвый",
  "naklejity": "наклеїти",
  "nejeden": "неєден",
  "nejadrovŷj": "неядровый",
  "oklejuju": "оклеюю",

  "ojalovity": "ояловіти",
  "pereprojektovaty": "перепроєктовати",
  "pidhojity": "підгоїти",
  "svoju": "свою",
  "svojoj": "своёй",

  "šŷje": "шыє",
  "vŷjasnyť": "выяснить",
  "šŷju": "шыю",
  "šŷji": "шыї",
  "Kŷjovčan": "Кыёвчан",

  "kuju": "кую",
  "kulminuje": "кулмінує",
  "tuja": "туя",
  "ujidaty": "уїдати",

  "tvojoj": "твоёй",
  "Bardejov": "Бардеёв",

  "naďijov": "надїёв",
  "naďiju": "надїю",
  "beznaďiji": "безнадїї",
  "naďija": "надїя",
  "zabzďiju": "забздїю",
  "osprosťijuť": "оспростїють",
  "Jakuťija": "Якутїя",
  "zeleňijuť": "зеленїють",
  "chudobňije": "худобнїє",
  "vŷtľije": "вытлїє",
  "voľiju": "волїю",
  "Mefoďija": "Мефодїя",
  "ďije": "дїє",
  "poďiju": "подїю",
  "naďiji": "надїї",
  "naďij": "надїй",

  "zloďijska": "злодїйска",
  "blahoroďije": "благородїє",
  "haďij": "гадїй",
  "leoparďij": "леопардїй",
  "beznaďijno": "безнадїйно",

  //d + ja, je, ji, jo, ju
  "predjidlo": "предъїдло",
  "adjektiviv": "адъєктівів",
  "nadjazd": "надъязд",
  "peredjunovŷj": "передъюновый",

  // n + ju, je (no examples for ja, ji, jo)
  "konjunktura": "конъюнктура",
  "injekcija": "інъєкція",

  // missing examples for:
  // t + ja, je, ji, jo, ju
  // l + ja, je, ji, jo, ju

  // superlative
  "najatraktivňišŷj": "найатрактівнїшый",
  "najelegantňišŷj": "найелеґантнїшый",
  "najinteligentňišŷj": "найінтеліґентнїшый",
  "najužasňišŷj": "найужаснїшый",

  "Najatraktivňišŷj": "Найатрактівнїшый",
  "Najelegantňišŷj": "Найелеґантнїшый",
  "Najinteligentňišŷj": "Найінтеліґентнїшый",
  "Najužasňišŷj": "Найужаснїшый",

  // superlative inflection
  "najobľubleňišŷj": "найоблюбленїшый",
  "najobľubleňišoho": "найоблюбленїшого",
  "najobľubleňišomu": "найоблюбленїшому",
  "najobľubleňišim": "найоблюбленїшім",
  "najobľubleňišŷm": "найоблюбленїшым",
  "najobľubleňišŷ": "найоблюбленїшы",
  "najobľubleňišŷch": "найоблюбленїшых",
  "najobľubleňišŷma": "найоблюбленїшыма",
  "najobľubleňiša": "найоблюбленїша",
  "najobľubleňišoj": "найоблюбленїшой",
  "najobľubleňišij": "найоблюбленїшій",
  "najobľubleňišu": "найоблюбленїшу",
  "najobľubleňišov": "найоблюбленїшов",
  "najobľubleňiše": "найоблюбленїше",

  "Najobľubleňišŷj": "Найоблюбленїшый",
  "Najobľubleňišoho": "Найоблюбленїшого",
  "Najobľubleňišomu": "Найоблюбленїшому",
  "Najobľubleňišim": "Найоблюбленїшім",
  "Najobľubleňišŷm": "Найоблюбленїшым",
  "Najobľubleňišŷ": "Найоблюбленїшы",
  "Najobľubleňišŷch": "Найоблюбленїшых",
  "Najobľubleňišŷma": "Найоблюбленїшыма",
  "Najobľubleňiša": "Найоблюбленїша",
  "Najobľubleňišoj": "Найоблюбленїшой",
  "Najobľubleňišij": "Найоблюбленїшій",
  "Najobľubleňišu": "Найоблюбленїшу",
  "Najobľubleňišov": "Найоблюбленїшов",
  "Najobľubleňiše": "Найоблюбленїше",

  // doubled dtnl
  "oďďilena": "оддїлена",
  "žyťťa": "життя",
  "raňňij": "раннїй",
  "Os’iňňe": "Осїннє",
  "ľľuť": "ллють",
  "ľľaty": "лляти",
  "Ďďilena": "Ддїлена",
  "Ťťa": "Ття",
  "Ňňij": "Ннїй",
  "Ňňe": "Ннє",
  "Ľľuť": "Ллють",
  "Ľľaty": "Лляти",
  // doubled dtnl false positives
  "oddŷchly": "оддыхли",
  "piddaty": "піддати",
  "nadderaty": "наддерати",
  "naddobaty": "наддобати",
  "naddunajskŷj": "наддунайскый",
  "Latta": "Латта",
  "alegretto": "алеґретто",
  "motto": "мотто",
  "Rotterdam": "Роттердам",
  "neperestanno": "неперестанно",
  "každodennŷj": "каждоденный",
  "Humenne": "Гуменне",
  "bulla": "булла",
  "Tallin": "Таллін",
  "odťikaty": "одтїкати",
  "vŷstupyty": "выступити",
};

let testUpperCaseWords = mapObjectToUpperCase(testLowerCaseWords);

describe("Module tests:\n", () => {
  let testCase = {
    "ji": "ї",
    "ŷ": "ы",
    "Ji": "Ї",

    ...testLowerCaseWords,
    ...testUpperCaseWords,
  };

  Object.keys(testCase).forEach((key) => {
    it("Lat → Cyr:\n", () => {
      assert.equal(translit(key, "latCyr"), testCase[key]);
    });
    it("Lat → Lat (no change):\n", () => {
      assert.equal(translit(key, "cyrLat"), key);
    });
    it("Lat → Cyr → Lat (no change):\n", () => {
      assert.equal(translit(translit(key, "latCyr"), "cyrLat"), key);
    });
    it("Cyr → Lat:\n", () => {
      assert.equal(translit(testCase[key], "cyrLat"), key);
    });
    it("Cyr → Cyr (no change):\n", () => {
      assert.equal(translit(testCase[key], "latCyr"), testCase[key]);
    });
    it("Cyr → Lat → Cyr (no change):\n", () => {
      assert.equal(translit(translit(testCase[key], "cyrLat"), "latCyr"), testCase[key]);
    });
  });
});

describe("(unit) Uppercase tests:\n", () => {
  let testCase = {
    // correct identification of Upper Case
    "Single uppercase word BRAŇO": "Single uppercase word БРАНЁ",

    // Upper case false positives
    "lower case string": "lower case string",
    "Title Case String": "Title Case String",
    "Sentence case string": "Sentence case string",
    "A sentence case string": "A sentence case string",
    "Ŷ": "Ŷ", // SINGLE LETTER WITHOUT UPPERCASE CONTEXT
    "Ы": "Ы", // SINGLE LETTER WITHOUT UPPERCASE CONTEXT

    // Upper case variations
    "ONE LETTER G JI UPPER CASE": "ОНЕ ЛЕТТЕР Ґ Ї УППЕР ЦАСЕ",
    "ONE LETTER G JI JA UPPER CASE": "ОНЕ ЛЕТТЕР Ґ Ї Я УППЕР ЦАСЕ",
    "ONE LETTER G V V UPPER CASE": "ОНЕ ЛЕТТЕР Ґ В В УППЕР ЦАСЕ",
    "ONE LETTER G UPPER CASE": "ОНЕ ЛЕТТЕР Ґ УППЕР ЦАСЕ",
    "G STARTING JU UPPERCASE": "Ґ СТАРТІНҐ Ю УППЕРЦАСЕ",
    "ENDING JA UPPER CASE G": "ЕНДІНҐ Я УППЕР ЦАСЕ Ґ",
    "UPPERCASE UPPERCASE": "УППЕРЦАСЕ УППЕРЦАСЕ",
    "G V UPPERCASE": "Ґ В УППЕРЦАСЕ",
    "G V V UPPERCASE": "Ґ В В УППЕРЦАСЕ",

    // Special boundaries
    "G-V-UPPERCASE": "Ґ-В-УППЕРЦАСЕ",
    "G–V–UPPERCASE": "Ґ–В–УППЕРЦАСЕ",
    "G—V—UPPERCASE": "Ґ—В—УППЕРЦАСЕ",
    "«G V V UPPERCASE»": "«Ґ В В УППЕРЦАСЕ»",
    "«UPPERCASE G V V»": "«УППЕРЦАСЕ Ґ В В»",
    "„G V V UPPERCASE“": "„Ґ В В УППЕРЦАСЕ“",
    "„UPPERCASE G V V“": "„УППЕРЦАСЕ Ґ В В“",
    "UPPERCASE G V V:": "УППЕРЦАСЕ Ґ В В:",
    "UPPERCASE G V V;": "УППЕРЦАСЕ Ґ В В;",

    "C’ilŷj": "C’ilŷj", //false positive
    "Цїлый": "Цїлый", //false positive

    ...testUpperCaseWords,
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(processUpperCase(key, "latCyr"), testCase[key]);
    });
    it("Cyrillic → Cyrillic:\n", () => {
      assert.equal(processUpperCase(testCase[key], "latCyr"), testCase[key]);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(processUpperCase(testCase[key], "cyrLat"), key);
    });
    it("Latin → Latin (no change):\n", () => {
      assert.equal(processUpperCase(key, "cyrLat"), key);
    });
  });
});
