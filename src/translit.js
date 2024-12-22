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
  vowelsLowerCase,
  chars,
  mapping,
 } from "./constants";

import {
  normalizeApostrophes,
  applyTranslitRule
} from "./utils";

import * as latCyr from "./lat_to_cyr";
import * as cyrLat from "./cyr_to_lat";





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
  + "([" + vowelsLowerCase.latin + "])"
  + "([" + chars.lowerCase + "]+?)"
  + "(šŷj|šoho|šomu|šim|šŷm|šŷ|šŷch|šŷma|ša|šoj|šij|šu|šov|še)";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2, $3, $4, $5){
    return $1 + applyTranslitRule($2, mapping.singleChars, "latCyr") + $3 + $4 + $5;
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
    return $1 + applyTranslitRule($2, mapping.softVowels, "latCyr");
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
      "([^" + chars.all + "]|^)"
    + "(([" + vowelsLowerCase.cyrillicSoft + "]){2,})";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, mapping.softVowels, "cyrLat");
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
    return $1 + applyTranslitRule($2, mapping.jojJov, "latCyr");
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
      "(^|[^" + chars.all + "])"
    + "(jo)"
    + "([^" + chars.all + "]|$)";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2, $3){
    return $1 + applyTranslitRule($2, mapping.softVowels, "latCyr") + $3;
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
    return $1 + applyTranslitRule($2 + $3, mapping.softVowels, "latCyr");
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
      "([^" + chars.all + "]|^)"
    + "([" + vowelsLowerCase.cyrillicSoft + "])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, mapping.softVowels, "cyrLat");
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
      "([" + vowelsLowerCase.latin + "])"
    + "(ja|je|ji|jo|ju)";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, mapping.softVowels, "latCyr");
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
      "([" + vowelsLowerCase.cyrillicHard + "])"
    + "([" + vowelsLowerCase.cyrillicSoft + "])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, mapping.softVowels, "cyrLat");
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
  string = latCyr.mapDtnlDoubled(string);

  const mappingRules = [
    mapping.exceptionsCapitalized,
    mapping.exceptions,
    mapping.dtnlVowel,
    mapping.johoJomu,
    mapping.hardConsonants,
    mapping.dtnlAtWordEnd,
    mapping.digraphs,
    mapping.singleChars,
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
  string = cyrLat.mapDtnlDoubled(string);

  const mappingRules = [
    mapping.exceptionsCapitalized,
    mapping.exceptions,
    mapping.dtnlVowel,
    mapping.hardConsonants,
    mapping.dtnlAtWordEnd,
    mapping.digraphs,
    mapping.singleChars,
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
     "([" + chars.upperCase + "’]{2,})"
   + "([^" + chars.lowerCase + "]|$)";
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
      "([^" + chars.upperCase + "’]|^)"
    + "([" + chars.upperCase + "’])"
    + "(?=[" + spacingChars + "][" + chars.upperCase + "][^" + chars.lowerCase + "’])";
  
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
      "([" + chars.upperCase + "’][\\s])"
    + "([" + chars.upperCase + "])"
    + "([^" + chars.upperCase + "]|$)";
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
      string = applyTranslitRule(string, mapping.homoglyphs, "cyrLat"); // opposite direction as we need to latinize the cyrillic homoglyphs
      string = processUpperCase(string, "latCyr");
      string = processLatCyr(string);
      return string;
    case "cyrLat":
      string = applyTranslitRule(string, mapping.homoglyphs, "latCyr"); // opposite direction as we need to cyrillize the latin homoglyphs
      string = processUpperCase(string, "cyrLat");
      string = processCyrLat(string);
      return string;
  }
}