export function mapObjectToUpperCase(testCase) {
  let upperCaseMapping = {};

  for (const [key, value] of Object.entries(testCase)) {
    upperCaseMapping[key.toUpperCase()] = value.toUpperCase();
  }
  return upperCaseMapping;
}

export function mapArrayToUpperCase(testCase) {
  return testCase.map((test) => test.map((item) => item.toUpperCase()));
}


export let lowerCaseWords = {
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
