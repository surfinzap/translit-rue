import {
        mapSuperlativeLatCyr,
        mapDoubledDtnlLatCyr,
        mapDoubledDtnlCyrLat,
        mapConsecutiveSoftWovelsLatCyr,
        mapConsecutiveSoftWovelsCyrLat,
        mapSoftVowelBeginningWordLatCyr,
        mapSoftVowelBeginningWordCyrLat,
        mapSoftVowelAfterHardVowelLatCyr,
        mapSoftVowelAfterHardVowelCyrLat,
        processUpperCase,
        translit,} from '../src/translit.js';
import assert from 'assert';

function mapToUppercase(testCase) {
  let upperCaseMapping = {};

  for (const [key, value] of Object.entries(testCase)) {
    upperCaseMapping[key.toUpperCase()] = value.toUpperCase();
  }
  return upperCaseMapping;
}


describe(' (unit) Superlative transliteration:\n', () => {
  let testCase = {

    // lower case
    "najatraktivňišŷj" :  "найatraktivňišŷj", 
    "najelegantňišŷj" :   "найelegantňišŷj",
    "najinteligentňišŷj" : "найinteligentňišŷj",
    "najobľubleňišŷj" : "найobľubleňišŷj",
    "najužasňišŷj" : "найužasňišŷj",

    // Title Case
    "Najatraktivňišŷj" :  "Найatraktivňišŷj", 
    "Najelegantňišŷj" :   "Найelegantňišŷj",
    "Najinteligentňišŷj" : "Найinteligentňišŷj",
    "Najobľubleňišŷj" : "Найobľubleňišŷj",
    "Najužasňišŷj" : "Найužasňišŷj",

    // upper case
    "NAJATRAKTIVŇIŠŶJ" :  "НАЙATRAKTIVŇIŠŶJ", 
    "NAJELEGANTŇIŠŶJ" :   "НАЙELEGANTŇIŠŶJ",
    "NAJINTELIGENTŇIŠŶJ" : "НАЙINTELIGENTŇIŠŶJ",
    "NAJOBĽUBLEŇIŠŶJ" : "НАЙOBĽUBLEŇIŠŶJ",
    "NAJUŽASŇIŠŶJ" : "НАЙUŽASŇIŠŶJ",

    // inflection 
    "najobľubleňišŷj" : "найobľubleňišŷj",
    "najobľubleňišoho" : "найobľubleňišoho",
    "najobľubleňišomu" : "найobľubleňišomu",
    "najobľubleňišim" : "найobľubleňišim",
    "najobľubleňišŷm" : "найobľubleňišŷm",
    "najobľubleňišŷ" : "найobľubleňišŷ",
    "najobľubleňišŷch" : "найobľubleňišŷch",
    "najobľubleňišŷma" : "найobľubleňišŷma",
    "najobľubleňiša" : "найobľubleňiša",
    "najobľubleňišoj" : "найobľubleňišoj",
    "najobľubleňišij" : "найobľubleňišij",
    "najobľubleňišu" : "найobľubleňišu",
    "najobľubleňišov" : "найobľubleňišov",
    "najobľubleňiše" : "найobľubleňiše",

    "Najobľubleňišŷj" : "Найobľubleňišŷj",
    "Najobľubleňišoho" : "Найobľubleňišoho",
    "Najobľubleňišomu" : "Найobľubleňišomu",
    "Najobľubleňišim" : "Найobľubleňišim",
    "Najobľubleňišŷm" : "Найobľubleňišŷm",
    "Najobľubleňišŷ" : "Найobľubleňišŷ",
    "Najobľubleňišŷch" : "Найobľubleňišŷch",
    "Najobľubleňišŷma" : "Найobľubleňišŷma",
    "Najobľubleňiša" : "Найobľubleňiša",
    "Najobľubleňišoj" : "Найobľubleňišoj",
    "Najobľubleňišij" : "Найobľubleňišij",
    "Najobľubleňišu" : "Найobľubleňišu",
    "Najobľubleňišov" : "Найobľubleňišov",
    "Najobľubleňiše" : "Найobľubleňiše",

    "NAJOBĽUBLEŇIŠŶJ" : "НАЙOBĽUBLEŇIŠŶJ",
    "NAJOBĽUBLEŇIŠOHO" : "НАЙOBĽUBLEŇIŠOHO",
    "NAJOBĽUBLEŇIŠOMU" : "НАЙOBĽUBLEŇIŠOMU",
    "NAJOBĽUBLEŇIŠIM" : "НАЙOBĽUBLEŇIŠIM",
    "NAJOBĽUBLEŇIŠŶM" : "НАЙOBĽUBLEŇIŠŶM",
    "NAJOBĽUBLEŇIŠŶ" : "НАЙOBĽUBLEŇIŠŶ",
    "NAJOBĽUBLEŇIŠŶCH" : "НАЙOBĽUBLEŇIŠŶCH",
    "NAJOBĽUBLEŇIŠŶMA" : "НАЙOBĽUBLEŇIŠŶMA",
    "NAJOBĽUBLEŇIŠA" : "НАЙOBĽUBLEŇIŠA",
    "NAJOBĽUBLEŇIŠOJ" : "НАЙOBĽUBLEŇIŠOJ",
    "NAJOBĽUBLEŇIŠIJ" : "НАЙOBĽUBLEŇIŠIJ",
    "NAJOBĽUBLEŇIŠU" : "НАЙOBĽUBLEŇIŠU",
    "NAJOBĽUBLEŇIŠOV" : "НАЙOBĽUBLEŇIŠOV",
    "NAJOBĽUBLEŇIŠE" : "НАЙOBĽUBLEŇIŠE",
    
    

    // false positive
    "najidž" : "najidž",
    "najveksyj" : "najveksyj" //naj following a consonant
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(mapSuperlativeLatCyr(key), testCase[key]);
    });

  });
});



describe(' (unit) consecutive soft vowels (ja, je, ji, jo, ju):\n', () => {
  let testCase = {
  "jajaj" : "яяj",
  "jajajaj" : "яяяj",
  "jajejaj" : "яєяj",
  "jejej" : "єєj",
  "jejejej" : "єєєj",
  "jijij" : "їїj",
  "jijijij" : "їїїj",
  "jojoj" : "ёёj",
  "jojojoj" : "ёёёj",
  "jujuj" : "ююj",
  "jujujuj" : "юююj",

  "Jajaj" : "Яяj",
  "Jajajaj" : "Яяяj",
  "Jajejaj" : "Яєяj",
  "Jejej" : "Єєj",
  "Jejejej" : "Єєєj",
  "Jijij" : "Їїj",
  "Jijijij" : "Їїїj",
  "Jojoj" : "Ёёj",
  "Jojojoj" : "Ёёёj",
  "Jujuj" : "Ююj",
  "Jujujuj" : "Юююj",

  //false positives for unit test
  "jaj" : "jaj",
  "jej" : "jej",
  "jij" : "jij",
  "joj" : "joj",
  "juj" : "juj",
  "яй" : "яй",
  "єй" : "єй",
  "їй" : "їй",
  "ёй" : "ёй",
  "юй" : "юй",


  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(mapConsecutiveSoftWovelsLatCyr(key), testCase[key]);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(mapConsecutiveSoftWovelsCyrLat(testCase[key]), key);
    });
  });
});



describe(' (unit) Ja, je, ji, jo, ju at the beginning of the word:\n', () => {
  let testCase = {

  "jabčanka" : "яbčanka",
  "jedenastka" : "єdenastka",
  "jidnaňa" : "їdnaňa",
  "jubilant" : "юbilant",
  "ji": "ї",

  "Jabčanka" : "Яbčanka",
  "Jedenastka" : "Єdenastka",
  "Jidnaňa" : "Їdnaňa",
  "Jubilant" : "Юbilant",
   "Ji": "Ї",

  // false positives
  "jedenadc’atŷj" : "єdenadc’atŷj",
  "každopadňi" : "každopadňi",
  "zrivňovaty" : "zrivňovaty",
  "čeľustnŷj" : "čeľustnŷj",

  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(mapSoftVowelBeginningWordLatCyr(key), testCase[key]);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(mapSoftVowelBeginningWordCyrLat(testCase[key]), key);
    });
  });
});



describe('(unit, lat) Consolidate letter group (ďď | ťť | ňň | ľľ) followed by aeiou:\n', () => {
  let testCase = {
    
    // matches
    "oďďilena" : "oдďilena",
    "žyťťa" : "žyтťa",
    "raňňij" : "raнňij",
    "Os’iňňe" : "Os’iнňe",
    "ľľuť" : "лľuť",
    "ľľaty" : "лľaty",

    "Ďďilena" : "Дďilena",
    "Ťťa" : "Тťa",
    "Ňňij" : "Нňij",
    "Ňňe" : "Нňe",
    "Ľľuť" : "Лľuť",
    "Ľľaty" : "Лľaty",

    // false positives, no accents on dtnl
    "oddŷchly" : "oddŷchly",
    "piddaty" : "piddaty",
    "nadderaty" : "nadderaty",
    "naddobaty" : "naddobaty",
    "naddunajskŷj" : "naddunajskŷj",
    "Latta" : "Latta",
    "alegretto" : "alegretto",
    "motto" : "motto",
    "Rotterdam" : "Rotterdam",
    "neperestanno" : "neperestanno",
    "každodennŷj" : "každodennŷj",
    "Humenne" : "Humenne",
    "bulla" : "bulla",
    "Tallin" : "Tallin",

    //false positive, mix of d-t-n-l
    "odťikaty" : "odťikaty",


  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(mapDoubledDtnlLatCyr(key), testCase[key]);
    });
  });
});



describe('(unit, cyr) Consolidate letter group (дд | тт | нн | лл) followed by яєїёю:\n', () => {
  let testCase = {
    
    // matches
    "оďдїлена" : "оддїлена",
    "жиťтя" : "життя",
    "рaňнїй" : "рaннїй",
    "Осїňнє" : "Осїннє",
    "Ľлють" : "Ллють",
    "Ľляти" : "Лляти",
    
    "Ďдїлена" : "Ддїлена",
    "Ťтя" : "Ття",
    "Ňнїй" : "Ннїй",
    "Ňнє" : "Ннє",
    "Ľлють" : "Ллють",
    "Ľляти" : "Лляти",
    
    // false positives, no accents on dtnl
    "оддыхли" : "оддыхли",
    "піддати" : "піддати",
    "наддерaти" : "наддерaти",
    "наддoбати" : "наддoбати",
    "наддунaйскый" : "наддунaйскый",
    "Латта" : "Латта",
    "алеґрeтто" : "алеґрeтто",
    "мотто" : "мотто",
    "Роттердaм" : "Роттердaм",
    "неперестанно" : "неперестанно",
    "каждоденный" : "каждоденный",
    "Гумeнне" : "Гумeнне",
    "булла" : "булла",
    "Тaллін" : "Тaллін",
    
    //false positive, mix of d-t-n-l
    "одтїкaти" : "одтїкaти",


  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(mapDoubledDtnlCyrLat(testCase[key]), key);
    });
  });
});



describe('(unit, lat) Ja, je, ji, jo, ju before a vowel:\n', () => {
  let testCase = {

    "bajusatŷj" : "baюsatŷj",
    "Bajerivc’i" : "Baєrivc’i",
    "hajik" : "haїk",
    "zajačaty" : "zaяčaty",
    "lyšajovŷj" : "lyšaёvŷj",

    "akceleracija" : "akceleraciя",
    "akciji" : "akciї",
    "funkcijov" : "funkciёv",
    "archijerej" : "archiєrej",
    "policiju" : "policiю",

    "pryjata" : "pryяta",
    "pryjimaňa" : "pryїmaňa",
    "spryjemnenŷj" : "spryєmnenŷj",
    "čornyjova" : "čornyёva",
    "vyjuť" : "vyюť",

    "glejovŷj" : "gleёvŷj",
    "naklejity" : "nakleїty",
    "nejeden" : "neєden",
    "nejadrovŷj" : "neяdrovŷj",
    "oklejuju" : "okleюju",

    "ojalovity" : "oяlovity",
    "pereprojektovaty" : "pereproєktovaty",
    "pidhojity" : "pidhoїty",
    "svoju" : "svoю",
    "svojoj" : "svoёj",

    "šŷje" : "šŷє",
    "vŷjasnyť" : "vŷяsnyť",
    "šŷju" : "šŷю",
    "šŷji" : "šŷї",
    "Kŷjovčan" : "Kŷёvčan",

    "kuju" : "kuю",
    "kulminuje" : "kulminuє",
    "tuja" : "tuя",
    "ujidaty" : "uїdaty",

    "tvojoj" : "tvoёj",
    "Bardejov" : "Bardeёv",

  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(mapSoftVowelAfterHardVowelLatCyr(key), testCase[key]);
    });
  });
});



describe('(unit, cyr) Ja, je, ji, jo, ju before a vowel:\n', () => {
  let testCase = {
    // there are cyrillic vowels before ja, je,...

    "bаjusatŷj" : "bаюsatŷj",
    "Bаjerivc’i" : "Bаєrivc’i",
    "hаjik" : "hаїk",
    "zаjačaty" : "zаяčaty",
    "lyšаjovŷj" : "lyšаёvŷj",

    "akceleracіja" : "akceleracія",
    "akcіji" : "akcії",
    "funkcіjov" : "funkcіёv",
    "archіjerej" : "archієrej",
    "policіju" : "policію",

    "prиjata" : "prияta",
    "prиjimaňa" : "prиїmaňa",
    "sprиjemnenŷj" : "sprиєmnenŷj",
    "čornиjova" : "čornиёva",
    "vиjuť" : "vиюť",

    "glеjovŷj" : "glеёvŷj",
    "naklеjity" : "naklеїty",
    "nеjedеn" : "nеєdеn",
    "nеjadrovŷj" : "nеяdrovŷj",
    "oklеjuju" : "oklеюju",

    "оjalоvity" : "ояlоvity",
    "pereprоjektоvaty" : "pereprоєktоvaty",
    "pidhоjity" : "pidhоїty",
    "svоju" : "svою",
    "svоjoj" : "svоёj",

    "šыje" : "šыє",
    "vыjasnyť" : "vыяsnyť",
    "šыju" : "šыю",
    "šыji" : "šыї",
    "Kыjovčan" : "Kыёvčan",

    "kуju" : "kую",
    "kulminуje" : "kulminує",
    "tуja" : "tуя",
    "уjidaty" : "уїdaty",

    "tvоjoj" : "tvоёj",
    "Bardеjov" : "Bardеёv",
    
    "naďїjov" : "naďїёv",

  };

  Object.keys(testCase).forEach((key) => {
    it("Cyrillic → Latin:\n", () => {
      assert.equal(mapSoftVowelAfterHardVowelCyrLat(testCase[key]), key);
    });
  });
});






describe('Apostrophes:\n', () => {
  let testCase = {
    "str‘is‘i" : "стрїсї",
    "car‘u" : "царю",
    "Otec’" : "Отець",
    "Otec'" : "Отець",
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(translit(key, "latCyr"), testCase[key]);
    });
  });
});


let testLowerCaseWords = {
  "c’ile" : "цїле",
  "kur’atko" : "курятко",
  "klynec’" : "клинець",
  "s’a" : "ся",
  "mis’ac’" : "місяць",
  "znajuť" : "знають",
  "štos’ka": "штоська",
  "jes’" : "єсь",
  "virnŷj" : "вірный",
  "Tr’om" : "Трём",
  "muľar’iv" : "мулярїв",
  "džmur’klo" : "джмурькло",
  "Teper’" : "Теперь",
  "vz’ala" : "взяла",
  "Voz’" : "Возь",
  "gazdŷňa" : "ґаздыня",
  "ľis’i" : "лїсї",
  "C’ilŷj" : "Цїлый",
  "ďity" : "дїти",
  "jich" : "їх",
  "str’is’i" : "стрїсї",
  "noz’i" : "нозї",
  "stojiť" : "стоїть",
  "merenďu" : "мерендю",
  "ňej" : "нєй",
  "Ňanu" : "Няну",
  "Braňo" : "Бранё",
  "Vlaďo" : "Владё",
  "Oťo" : "Отё",
  "veľo" : "велё",
  "car’u" : "царю",
  "text" : "текст",
  "taxi" : "таксі",
  "Chlopci":"Хлопці",
  "chyža":"хижа",
  

  "ser’jozno" : "серьёзно",
  "objisty" : "объїсти",
  "zjazvene" : "зъязвене",
  "Zjavyla" : "Зъявила",
  "Myž’ko" : "Мижько",
  "ňoj" : "нёй",

  "treťoj" : "третёй",
  "plaksyvo" : "плаксиво",
  "taksamo": "таксамо",
  "zjemňovaly":"зъємнёвали",
  "ňoho":"нёго",
  "blyžňoho":"ближнёго",
  "Nyžňoho":"Нижнёго",
  "zjojkla":"зъёйкла",
  "Myž’o" : "Мижё",
  "Myž’a" : "Мижя",
  "Myž’u" : "Мижю",

  // Ja, je, ji, ju at the beginning of the word:
  
  "jabčanka jabčanka" : "ябчанка ябчанка",

  "jabčanka" : "ябчанка",
  "jedenastka" : "єденастка",
  "jidnaňa" : "їднаня",
  "jubilant" : "юбілант",
  
  "Jabčanka" : "Ябчанка",
  "Jedenastka" : "Єденастка",
  "Jidnaňa" : "Їднаня",
  "Jubilant" : "Юбілант",
  
  "jedenadc’atŷj" : "єденадцятый",
  "každopadňi" : "каждопаднї",
  "zrivňovaty" : "зрівнёвати",
  "čeľustnŷj" : "челюстный",
  
  
  // jo is a special case		
  // majority of words starts with "йо"
  "jotovanŷma" : "йотованыма",
  "Joakim" : "Йоакім",
  "jobovskŷj" : "йобовскый",
  "Johanesburg" : "Йоганесбурґ",
  "Johanesburčan" : "Йоганесбурчан",
  "jogurt" : "йоґурт",


  // consecutive soft vowels
  "jajaj" : "яяй",
  "jajajaj" : "яяяй",
  "jajejaj" : "яєяй",
  "jejej" : "єєй",
  "jejejej" : "єєєй",
  "jijij" : "їїй",
  "jijijij" : "їїїй",
  "jojoj" : "ёёй",
  "jojojoj" : "ёёёй",
  "jujuj" : "ююй",
  "jujujuj" : "юююй",

  "Jajaj" : "Яяй",
  "Jajajaj" : "Яяяй",
  "Jajejaj" : "Яєяй",
  "Jejej" : "Єєй",
  "Jejejej" : "Єєєй",
  "Jijij" : "Їїй",
  "Jijijij" : "Їїїй",
  "Jojoj" : "Ёёй",
  "Jojojoj" : "Ёёёй",
  "Jujuj" : "Ююй",
  "Jujujuj" : "Юююй",

  // joj, jov variations
  "joj": "ёй",
  "joj" : "ёй",
  "jojk" : "ёйк",
  "jojkaňa" : "ёйканя",
  "jojčaty" : "ёйчати",
  "jov" : "ёв",
  "jovha" : "ёвга",
  "jovsag" : "ёвсаґ",
  "Joj": "Ёй",
  "Joj" : "Ёй",
  "Jojk" : "Ёйк",
  "Jojkaňa" : "Ёйканя",
  "Jojčaty" : "Ёйчати",
  "Jov" : "Ёв",
  "Jovha" : "Ёвга",
  "Jovsag" : "Ёвсаґ",
  
  // only jo
  // "O-Jo-Joj" : "О-Ё-Ёй",
  // "o-jo-joj" : "о-ё-ёй",

  // exceptions
  "joho" : "ёго",
  "jomu" : "ёму",
  "Joho" : "Ёго",
  "Jomu" : "Ёму",



  // Ja, je, ji, jo, ju before a vowel:
  "bajusatŷj" :	"баюсатый",
  "Bajerivc’i" :	"Баєрівцї",
  "hajik" :	"гаїк",
  "zajačaty" :	"заячати",
  "lyšajovŷj" :	"лишаёвый",

  "akceleracija" :	"акцелерація",
  "akciji" :	"акції",
  "funkcijov" :	"функціёв",
  "archijerej" :	"архієрей",
  "policiju" :	"поліцію",

  "pryjata" :	"прията",
  "pryjimaňa" :	"приїманя",
  "spryjemnenŷj" :	"сприємненый",
  "čornyjova" :	"чорниёва",
  "vyjuť" :	"виють",

  "glejovŷj" :	"ґлеёвый",
  "naklejity" :	"наклеїти",
  "nejeden" :	"неєден",
  "nejadrovŷj" :	"неядровый",
  "oklejuju" :	"оклеюю",

  "ojalovity" :	"ояловіти",
  "pereprojektovaty" :	"перепроєктовати",
  "pidhojity" :	"підгоїти",
  "svoju" :	"свою",
  "svojoj" :	"своёй",

  "šŷje" :	"шыє",
  "vŷjasnyť" :	"выяснить",
  "šŷju" :	"шыю",
  "šŷji" :	"шыї",
  "Kŷjovčan" :	"Кыёвчан",

  "kuju" :	"кую",
  "kulminuje" :	"кулмінує",
  "tuja" :	"туя",
  "ujidaty" :	"уїдати",

  "tvojoj" : "твоёй",
  "Bardejov" : "Бардеёв",

  "naďijov" : "надїёв",
  "naďiju" : "надїю",
  "beznaďiji" : "безнадїї",
  "naďija" : "надїя",
  "zabzďiju" : "забздїю",
  "osprosťijuť" : "оспростїють",
  "Jakuťija" : "Якутїя",
  "zeleňijuť" : "зеленїють",
  "chudobňije" : "худобнїє",
  "vŷtľije" : "вытлїє",
  "voľiju" : "волїю",
  "Mefoďija" : "Мефодїя",
  "ďije" : "дїє",
  "poďiju" : "подїю",
  "naďiji" : "надїї",
  "naďij" : "надїй",
  "beznaďiji" : "безнадїї",
  "naďija" : "надїя",

  "zloďijska" : "злодїйска",
  "blahoroďije" : "благородїє",
  "haďij" : "гадїй",
  "zabzďiju" : "забздїю",
  "leoparďij" : "леопардїй",
  "beznaďijno" : "безнадїйно",
  "voľiju" : "волїю",


  //d + ja, je, ji, jo, ju
  "predjidlo":"предъїдло",
  "adjektiviv" : "адъєктівів",
  "nadjazd" : "надъязд",
  "peredjunovŷj" : "передъюновый",

  // n + ju, je (no examples for ja, ji, jo)
  "konjunktura" : "конъюнктура",
  "injekcija" : "інъєкція",

  // missing examples for:
  // t + ja, je, ji, jo, ju
  // l + ja, je, ji, jo, ju


  // superlative
  "najatraktivňišŷj" :  "найатрактівнїшый", 
  "najelegantňišŷj" :   "найелеґантнїшый",
  "najinteligentňišŷj" : "найінтеліґентнїшый",
  "najobľubleňišŷj" : "найоблюбленїшый",
  "najužasňišŷj" : "найужаснїшый",

  "Najatraktivňišŷj" :  "Найатрактівнїшый", 
  "Najelegantňišŷj" :   "Найелеґантнїшый",
  "Najinteligentňišŷj" : "Найінтеліґентнїшый",
  "Najobľubleňišŷj" : "Найоблюбленїшый",
  "Najužasňišŷj" : "Найужаснїшый",

  // superlative inflection 
  "najobľubleňišŷj" : "найоблюбленїшый",
  "najobľubleňišoho" : "найоблюбленїшого",
  "najobľubleňišomu" : "найоблюбленїшому",
  "najobľubleňišim" : "найоблюбленїшім",
  "najobľubleňišŷm" : "найоблюбленїшым",
  "najobľubleňišŷ" : "найоблюбленїшы",
  "najobľubleňišŷch" : "найоблюбленїшых",
  "najobľubleňišŷma" : "найоблюбленїшыма",
  "najobľubleňiša" : "найоблюбленїша",
  "najobľubleňišoj" : "найоблюбленїшой",
  "najobľubleňišij" : "найоблюбленїшій",
  "najobľubleňišu" : "найоблюбленїшу",
  "najobľubleňišov" : "найоблюбленїшов",
  "najobľubleňiše" : "найоблюбленїше",

  "Najobľubleňišŷj" : "Найоблюбленїшый",
  "Najobľubleňišoho" : "Найоблюбленїшого",
  "Najobľubleňišomu" : "Найоблюбленїшому",
  "Najobľubleňišim" : "Найоблюбленїшім",
  "Najobľubleňišŷm" : "Найоблюбленїшым",
  "Najobľubleňišŷ" : "Найоблюбленїшы",
  "Najobľubleňišŷch" : "Найоблюбленїшых",
  "Najobľubleňišŷma" : "Найоблюбленїшыма",
  "Najobľubleňiša" : "Найоблюбленїша",
  "Najobľubleňišoj" : "Найоблюбленїшой",
  "Najobľubleňišij" : "Найоблюбленїшій",
  "Najobľubleňišu" : "Найоблюбленїшу",
  "Najobľubleňišov" : "Найоблюбленїшов",
  "Najobľubleňiše" : "Найоблюбленїше",


  // doubled dtnl
  "oďďilena" : "оддїлена",
  "žyťťa" : "життя",
  "raňňij" : "раннїй",
  "Os’iňňe" : "Осїннє",
  "ľľuť" : "ллють",
  "ľľaty" : "лляти",
  "Ďďilena" : "Ддїлена",
  "Ťťa" : "Ття",
  "Ňňij" : "Ннїй",
  "Ňňe" : "Ннє",
  "Ľľuť" : "Ллють",
  "Ľľaty" : "Лляти",
  // doubled dtnl false positives
  "oddŷchly" : "оддыхли",
  "piddaty" : "піддати",
  "nadderaty" : "наддерати",
  "naddobaty" : "наддобати",
  "naddunajskŷj" : "наддунайскый",
  "Latta" : "Латта",
  "alegretto" : "алеґретто",
  "motto" : "мотто",
  "Rotterdam" : "Роттердам",
  "neperestanno" : "неперестанно",
  "každodennŷj" : "каждоденный",
  "Humenne" : "Гуменне",
  "bulla" : "булла",
  "Tallin" : "Таллін",
  "odťikaty" : "одтїкати",

    // only jo
  "O-Jo-Joj" : "О-Ё-Ёй",
  "o-jo-joj" : "о-ё-ёй",


};

let testUpperCaseWords = mapToUppercase(testLowerCaseWords);


describe('Module tests:\n', () => {


  let testCase = {
    "ji": "ї",
    "ŷ": "ы",
    "Ji": "Ї",

    ...testLowerCaseWords,
    ...testUpperCaseWords,
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(translit(key, "latCyr"), testCase[key]);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(translit(testCase[key], "cyrLat"), key);
    });
  });
});





describe('(unit) Uppercase tests:\n', () => {
  let testCase = {
    
    // correct identification of Upper Case
    "Single uppercase word BRAŇO": 
    "Single uppercase word БРАНЁ",


    // Upper case false positives
    "lower case string" : "lower case string",
    "Title Case String" : "Title Case String",
    "Sentence case string" : "Sentence case string",
    "A sentence case string" : "A sentence case string",
    "Ŷ": "Ŷ", // SINGLE LETTER WITHOUT UPPERCASE CONTEXT
    "Ы": "Ы", // SINGLE LETTER WITHOUT UPPERCASE CONTEXT

    

    // Upper case variations
    "ONE LETTER G JI UPPER CASE" : "ОНЕ ЛЕТТЕР Ґ Ї УППЕР ЦАСЕ",
    "ONE LETTER G JI JA UPPER CASE" : 
    "ОНЕ ЛЕТТЕР Ґ Ї Я УППЕР ЦАСЕ",
    "ONE LETTER G V V UPPER CASE" : 
    "ОНЕ ЛЕТТЕР Ґ В В УППЕР ЦАСЕ",
    "ONE LETTER G UPPER CASE" : "ОНЕ ЛЕТТЕР Ґ УППЕР ЦАСЕ",
    "G STARTING JU UPPERCASE" : "Ґ СТАРТІНҐ Ю УППЕРЦАСЕ",
    "ENDING JA UPPER CASE G" : "ЕНДІНҐ Я УППЕР ЦАСЕ Ґ",
    "UPPERCASE UPPERCASE" : "УППЕРЦАСЕ УППЕРЦАСЕ",
    "G V UPPERCASE" : "Ґ В УППЕРЦАСЕ",
    "G V V UPPERCASE" : "Ґ В В УППЕРЦАСЕ",

    // Special boundaries
    "G-V-UPPERCASE" : "Ґ-В-УППЕРЦАСЕ",
    "G–V–UPPERCASE" : "Ґ–В–УППЕРЦАСЕ",
    "G—V—UPPERCASE" : "Ґ—В—УППЕРЦАСЕ",
    "«G V V UPPERCASE»" : "«Ґ В В УППЕРЦАСЕ»",
    "«UPPERCASE G V V»" : "«УППЕРЦАСЕ Ґ В В»",
    "„G V V UPPERCASE“" : "„Ґ В В УППЕРЦАСЕ“",
    "„UPPERCASE G V V“" : "„УППЕРЦАСЕ Ґ В В“",
    "UPPERCASE G V V:" : "УППЕРЦАСЕ Ґ В В:",
    "UPPERCASE G V V;" : "УППЕРЦАСЕ Ґ В В;",

    "C’ilŷj" : "C’ilŷj", //false positive
    "Цїлый" : "Цїлый", //false positive

    ...testUpperCaseWords,



  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(processUpperCase(key, 'latCyr'), testCase[key]);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(processUpperCase(testCase[key], 'cyrLat'), key);
    });
  });
});