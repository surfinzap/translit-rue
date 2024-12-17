/*!
 * Translit (Rusyn transliteration) 2.1.1
 * code: https://github.com/surfinzap/translit
 * app: https://tota.sk/translit
 *
 * Copyright 2014-24 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2024-12-01
 */

import { 
  latinVowelsLowerCase,
  cyrillicHardVowelsLowerCase,
  cyrillicSoftVowelsLowerCase,
  lowerCaseChars,
  upperCaseChars,
  allChars,
  exceptions,
  exceptionsCapitalized,
  johoJomu,
  jojJov,
  doubledDtnl,
  detenele,
  hardConsonants,
  softVowels,
  dtnl,
  doubleChars,
  singleChars,
  homoglyphs,
 } from "./constants";



/** 
  Identify apostrophe candidates around 'hardConsonants' and 'doubleChars' and normalize them with the (8217)

  Inputs
  '  (39)     dumb single quote
  ‘  (8216)   left single quotation mark
  ’  (8217)   right single quotation mark
  ʼ  (700)    modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe [1]
  ‛  (8219)   single high-reversed-9 quotation mark
  ´  (180)    acute accent
  `  (96)     grave accent
  ′  (8242)   prime

  Output
  ’  (8217)		right single quotation mark
  (In theory, the output should be (700), however (700) is often not included in fonts, so the 8217 is a viable alternative)

  Normalizes apostrophes to a consistent character in the given string.
  @param {string} string - The input string containing text with various apostrophe forms.
  @returns {string} - The string with normalized apostrophes.
*/
export function normalizeApostrophes(string) {
  const accentChars = "'’ʼ‘‛´`′";

  // match hard consonants
  string = string.replace(
    new RegExp(
      "([csrzž])"
    + "(["+ accentChars +"])"
    + "([aeiou])", 
      "gi"
    ),
    "$1’$3"
  );

  // match ending accents 
  string = string.replace(
    new RegExp(
      "([csrzž])"
    + "(["+ accentChars +"])"
    + "(\\B)", 
      "gi"
    ),
    "$1’$3"
  );

  // match starting accents 
  string = string.replace(
    new RegExp(
      "(\\B)"
    + "(["+ accentChars +"])"
    + "([o])", 
      "gi"
    ),
    "$1’$3"
  );

  return string;
}

/**
 * Applies a transliteration mapping rule to a string, replacing patterns
 * based on the specified direction (Cyrillic to Latin or Latin to Cyrillic).
 *
 * @param {string} string - The input string to be transliterated.
 * @param {Object} mappingRule - An object containing the transliteration rules.
 * @param {string} direction - The direction of transliteration. 
 * Use "cyrLat" for Cyrillic to Latin, and "latCyr" for Latin to Cyrillic.
 * 
 * @returns {string} - The transliterated string with applied rules.
 */
export function applyTranslitRule(string, mappingRule, direction) {
  if (direction === "cyrLat") {
    for (const rule in mappingRule) {
      let re = new RegExp(mappingRule[rule], "g");
      string = string.replace(re, rule);
    }
  } else if (direction === "latCyr") {
    for (const rule in mappingRule) {
      let re = new RegExp(rule, "g");
      string = string.replace(re, mappingRule[rule]);
    }
  }
  return string;  
}


/**  
  Consolidate letter group (ďď | ťť | ňň | ľľ) followed by aeiou

  Naive transliteration would be to transliterate:
  first “ď” → дь
  and the rest “ďa” → дя 

  However, the correct transliteration is to omit the soft character:
  ďďa → ддя

  Examples
  oďďilena → оддїлена
  žyťťa → життя
  raňňij → рaннїй
  ľľaty → лляти

  Counterexamples (unaccented dd, tt, nn, ll)
  naddunajskŷj → наддунaйскый
  motto → мотто
  Humenne → Гумeнне
  Tallin → Тaллін

  Counterexamples (combination of letters, e.g d–t)
  odťikaty → одтїкaти

  @param {string} string - input text for mapping
  @returns {string} - where the first (ď|ť|ň|ľ) of the group is transliterated to its cyrillic equivalent, omitting the soft character “ь”
*/
export function mapDoubledDtnlLatCyr(string){
  let pattern =
    "(?<dtnl>[ďťňľ])"
  + "(\\k<dtnl>)"
  + "([aeiou])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2, $3){
    return applyTranslitRule($1, doubledDtnl, "latCyr") + $2 + $3;
  });
}



/**  
  Consolidate letter group (дд | тт | нн | лл) followed by яєїёю

  Naive transliteration would be to translate:
  first “д” → d
  and the rest “дя” → ďa

  However, the correct transliteration is double the accents on consonants:
  ддя → ďďa

  Examples
  oďďilena → оддїлена
  žyťťa → життя
  raňňij → рaннїй
  ľľaty → лляти

  Counterexamples (unaccented dd, tt, nn, ll)
  naddunajskŷj → наддунaйскый
  motto → мотто
  Humenne → Гумeнне
  Tallin → Тaллін

  Counterexamples (combination of letters, e.g d–t)
  odťikaty → одтїкaти

  @param {string} string - input text for mapping
  @returns {string} - where the first (д| т | н | л) of the group is transliterated to its latin accented equivalent
*/
export function mapDoubledDtnlCyrLat(string){
  let pattern =
    "(?<dtnl>[дтнл])"
  + "(\\k<dtnl>)"
  + "([яєїёю])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2, $3){
    return applyTranslitRule($1, doubledDtnl, "cyrLat") + $2 + $3;
  });
}




/**
  Transliterate words that begin with "naj|Naj|NAJ" followed by a vowel to "най|Най|НАЙ"

  Standard transliteration for "ja", "je", "ji", "jo", "ju" is:
  ja → я
  je → є
  ji → ї
  jo → ё
  ju → ю
  
  However, when "j" + "vowel" is in place where you could hyphenate a word, 
  then you translitate "j" + "vowel" to "й" + "vowel" and vice versa.
  
  Examples
  "najatraktivňišŷj" → "найатрактівнїшый"

  Counterexamples
  "najidž" → "наїдж"

  Algorithm
  match all words beginning with naj, following with a vowel and not ending with any of superlative suffixes

  @param {string} string - input text for mapping
  @returns {string} - where all words that begin with "naj|Naj|NAJ" followed by a vowel will be transliterated to "най|Най|НАЙ"
*/
export function mapSuperlativeLatCyr(string){
  let pattern =
    "(\\b)"
  + "(naj)"
  + "([" + latinVowelsLowerCase + "])"
  + "([" + lowerCaseChars + "]+?)"
  + "(šŷj|šoho|šomu|šim|šŷm|šŷ|šŷch|šŷma|ša|šoj|šij|šu|šov|še)";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2, $3, $4, $5){
    return $1 + applyTranslitRule($2, singleChars, "latCyr") + $3 + $4 + $5;
  });

}



/**
  Transliterate consecutive soft vowels (ja, je, ji, jo, ju) from latin to cyrillic

  Transliteration rules:
  jajaj ↔ яяй
  jejej ↔ єєй
  jijij ↔ їїй
  jojoj ↔ ёёй
  jojojoj ↔ ёёёй
  jujuj ↔ ююй

  Counterexamples
  singles, e.g. joj

  @param {string} string - latin text for mapping
  @returns {string} - cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapConsecutiveSoftWovelsLatCyr(string) {
  let pattern =
      "(\\b)"
    + "((jo|ja|je|ji|ju){2,})";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, softVowels, "latCyr");
  });
}



/**
  Transliterate consecutive soft vowels (ja, je, ji, jo, ju) from cyrillic to latin

  Transliteration rules:
  jajaj ↔ яяй
  jejej ↔ єєй
  jijij ↔ їїй
  jojoj ↔ ёёй
  jojojoj ↔ ёёёй
  jujuj ↔ ююй

  Counterexamples
  singles, e.g. joj

  @param {string} string - latin text for mapping
  @returns {string} - cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapConsecutiveSoftWovelsCyrLat(string) {
  let pattern =
      "([^" + allChars + "]|^)"
    + "(([" + cyrillicSoftVowelsLowerCase + "]){2,})";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, softVowels, "cyrLat");
  });
}


/**
  Transliterate words that begin with joj-, jov- from latin to cyrillic

  Transliteration rules:
  jojkaňa → ёйканя
  Jovha → Ёвга 

  @param {string} string - latin text for mapping
  @returns {string} - cyrillic text with mapped joj-, jov- 
*/
export function mapJojJovBeginningWordLatCyr(string) {
  let pattern =
      "(\\b)"
    + "(joj|jov)";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, jojJov, "latCyr");
  });
}



/**
  Transliterate single word “jo”

  Transliteration rules:
  jo → ё
  Jo → Ё 

  @param {string} string - latin text for mapping
  @returns {string} - cyrillic text with mapped jo 
*/
export function mapSingleJoLatCyr(string) {
  let pattern =
      "(^|[^" + allChars + "])"
    + "(jo)"
    + "([^" + allChars + "]|$)";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2, $3){
    return $1 + applyTranslitRule($2, softVowels, "latCyr") + $3;
  });
}



/**
  Transliterate ja, je, ji, ju at the beginning of the word

  Transliteration rules:
  ja ↔ я
  je ↔ є
  ji ↔ ї
  ju ↔ ю
  
  Exception
  jo ↔ ё
  We don’t map “jo” here as it a special case handled in separate functions:
  - mapConsecutiveSoftWovelsLatCyr
  - mapConsecutiveSoftWovelsCyrLat
  - applyTranslitRule(string, exceptions, direction)
  - mapJojJovBeginningWordLatCyr
  - mapJojJovBeginningWordCyrLat


  Examples
  jabčanka ↔ ябчaнка
  jedenastka ↔ єденастка
  jidnaňa ↔ їднaня
  joho ↔ ёгo
  o-jo-joj ↔ о-ё-ёй
  jubilant ↔ юбілaнт
    
  Counterexamples
  jedenadc’atŷj ↔ єденадцятый (ja in the middle)
  každopadňi ↔ каждопаднї
  zrivňovaty ↔ зрiвнёвати
  čeľustnŷj ↔ чeлюстный

  @param {string} string - latin text for mapping
  @returns {string} - cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapSoftVowelBeginningWordLatCyr(string) {
  let pattern =
      "(\\b)"
    + "(j)"
    + "([aeiuyŷ])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2, $3){
    return $1 + applyTranslitRule($2 + $3, softVowels, "latCyr");
  });
}



/*
  Transliterate я, є, ї, ё, ю at the beginning of the word

  Transliteration rules:
  ja ↔ я
  je ↔ є
  ji ↔ ї
  jo ↔ ё
  ju ↔ ю

  Examples
  jabčanka ↔ ябчaнка
  jedenastka ↔ єденастка
  jidnaňa ↔ їднaня
  joho ↔ ёгo
  o-jo-joj ↔ о-ё-ёй
  jubilant ↔ юбілaнт
    
  Counterexamples
  jedenadc’atŷj ↔ єденадцятый (ja in the middle)
  každopadňi ↔ каждопаднї
  zrivňovaty ↔ зрiвнёвати
  čeľustnŷj ↔ чeлюстный

  @param {string} string - cyrillic text for mapping
  @returns {string} - latin text with mapped я, є, ї, ё, ю

*/
export function mapSoftVowelBeginningWordCyrLat(string) {
  let pattern =
      "([^" + allChars + "]|^)"
    + "([" + cyrillicSoftVowelsLowerCase + "])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, softVowels, "cyrLat");
  });
}



/** 
  Transliterate ja, je, ji, jo, ju before a vowel (a, e, i, o, u, y, ŷ)

  Examples
  bajusatŷj	↔ баюсaтый
  akciji ↔ aкції
  čornyjova ↔ чорниёвa
  oklejuju ↔ оклеюю
  svojoj ↔ своёй
  šŷje ↔ šŷje
  ujidaty ↔ уїдaти

  @param {string} string - latin text for mapping
  @returns {string} - cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapSoftVowelAfterHardVowelLatCyr(string) {

  let pattern =
      "([" + latinVowelsLowerCase + "])"
    + "(ja|je|ji|jo|ju)";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, softVowels, "latCyr");
  });
}



/**
  Transliterate я, є, ї, ё, ю before a vowel (а, е, і, о, у, и, ы)

  Examples
  bajusatŷj	↔ баюсaтый
  akciji ↔ aкції
  čornyjova ↔ чорниёвa
  oklejuju ↔ оклеюю
  svojoj ↔ своёй
  šŷje ↔ šŷje
  ujidaty ↔ уїдaти

  @param {string} string - latin text for mapping
  @returns {string} - cyrillic text with mapped я, є, ї, ё, ю
*/
export function mapSoftVowelAfterHardVowelCyrLat(string) {

  let pattern =
      "([" + cyrillicHardVowelsLowerCase + "])"
    + "([" + cyrillicSoftVowelsLowerCase + "])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, softVowels, "cyrLat");
  });
}



/**
 * Processes a string by applying a series of transliteration rules to convert Latin text to Cyrillic. 
 *
 * @param {string} string - The input string in Latin script.
 * @returns {string} - The processed string in Cyrillic script.
 */
export function processLatCyr(string) {
  string = normalizeApostrophes(string);
  string = mapSuperlativeLatCyr(string);
  string = mapConsecutiveSoftWovelsLatCyr(string);
  string = mapJojJovBeginningWordLatCyr(string);
  string = mapSingleJoLatCyr(string);
  string = mapSoftVowelBeginningWordLatCyr(string);
  string = mapSoftVowelAfterHardVowelLatCyr(string);
  string = mapDoubledDtnlLatCyr(string);

  const mappingRules = [
    exceptionsCapitalized,
    exceptions,
    detenele,
    johoJomu,
    hardConsonants,
    dtnl,
    doubleChars,
    singleChars,
  ];

  for (const mappingRule of mappingRules) {
    string = applyTranslitRule(string, mappingRule, "latCyr");
  }

  return string;
}



/**
 * Processes a string by applying a series of transliteration rules to convert Cyrillic text to Latin.
 *
 * @param {string} string - The input string in Cyrillic script.
 * @returns {string} - The processed string in Latin script.
 */
export function processCyrLat(string) {
  string = mapConsecutiveSoftWovelsCyrLat(string);
  string = mapSoftVowelBeginningWordCyrLat(string);
  string = mapSoftVowelAfterHardVowelCyrLat(string);
  string = mapDoubledDtnlCyrLat(string);

  const mappingRules = [
    exceptionsCapitalized,
    exceptions,
    detenele,
    hardConsonants,
    dtnl,
    doubleChars,
    singleChars,
  ];

  for (const mappingRule of mappingRules) {
    string = applyTranslitRule(string, mappingRule, "cyrLat");
  }

  return string;
}

/** 
  Identify UPPERCASE letters and transliterate them according to a mapping option

  - process upper case words with 2 or more letter
  - process single-letter uppercase word in case it is around uppercase words

  @param {string} string - text for mapping
  @param {string} direction - latCyr | cyrLat
  @returns {string} transliterated upper case text
*/
export function processUpperCase(string, direction){
  /* handle uppercase */
  let spacingChars = "-–—\\s";
  
  let multiCharUpperCaseWord =
     "([" + upperCaseChars + "’]{2,})"
   + "([^" + lowerCaseChars + "]|$)";
  let multiCharRegex = new RegExp(multiCharUpperCaseWord, "g");

  string = string.replace(multiCharRegex, function($0, $1, $2){
    switch (direction) {
      case "latCyr":
        return processLatCyr($1.toLowerCase()).toUpperCase() + $2;
      case "cyrLat":
        return processCyrLat($1.toLowerCase()).toUpperCase() + $2;
    }
  });


  let singleCharBeforeUpperCase =
      "([^" + upperCaseChars + "’]|^)"
    + "([" + upperCaseChars + "’])"
    + "(?=[" + spacingChars + "][" + upperCaseChars + "][^" + lowerCaseChars + "’])";
  
  let singleCharBeforeRegex = new RegExp(singleCharBeforeUpperCase, "g");

  string = string.replace(singleCharBeforeRegex, function($0, $1, $2){
    switch (direction) {
      case "latCyr":
        return $1 + processLatCyr($2.toLowerCase()).toUpperCase();
      case "cyrLat":
        return $1 + processCyrLat($2.toLowerCase()).toUpperCase();
    }
  });



  let singleCharAfterUpperCase =
      "([" + upperCaseChars + "’][\\s])"
    + "([" + upperCaseChars + "])"
    + "([^" + upperCaseChars + "]|$)";
  let singleCharAfterRegex = new RegExp(singleCharAfterUpperCase, "g");
  
  string = string.replace(singleCharAfterRegex, function($0, $1, $2, $3){
    switch (direction) {
      case "latCyr":
        return $1 + processLatCyr($2.toLowerCase()).toUpperCase() + $3;
      case "cyrLat":
        return $1 + processCyrLat($2.toLowerCase()).toUpperCase() + $3;
    }
  });

  return string;
}


/**
 * PUBLIC API
 * Transliterates a string between Latin and Cyrillic scripts based on the specified direction. 
 *
 * @param {string} string - The input string to be transliterated.
 * @param {string} direction - The direction of transliteration. 
 * Use "latCyr" to convert Latin to Cyrillic, and "cyrLat" to convert Cyrillic to Latin.
 * 
 * @returns {string} - The transliterated string.
 */
export function translit(string, direction) {
  switch (direction) {
    case "latCyr":
      string = applyTranslitRule(string, homoglyphs, "cyrLat"); // opposite direction as we need to latinize the cyrillic homoghlyphs
      string = processUpperCase(string, "latCyr");
      string = processLatCyr(string);
      return string;
    case "cyrLat":
      string = applyTranslitRule(string, homoglyphs, "latCyr"); // opposite direction as we need to cyrillize the latin homoghlyphs
      string = processUpperCase(string, "cyrLat");
      string = processCyrLat(string);
      return string;
  }
}