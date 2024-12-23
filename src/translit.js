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
 * Processes a string by applying a series of transliteration rules to convert Latin text to Cyrillic. 
 *
 * @param {string} string - The input string in Latin script.
 * @returns {string} - The processed string in Cyrillic script.
 */
export function processLatCyr(string) {

  const transformations = [
    normalizeApostrophes,
    latCyr.mapSuperlative,
    latCyr.mapSoftVowelsSequence,
    latCyr.mapJojJovBeginningWord,
    latCyr.mapSingleJo,
    latCyr.mapSoftVowelAtWordStart,
    latCyr.mapSoftVowelAfterHardVowel,
    latCyr.mapDtnlDoubled,
  ];

  string = transformations.reduce(
    (result, transform) => transform(result),
    string
  );

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
  const transformations = [
    cyrLat.mapSoftVowelsSequence,
    cyrLat.mapSoftVowelAtWordStart,
    cyrLat.mapSoftVowelAfterHardVowel,
    cyrLat.mapDtnlDoubled,
  ];

  string = transformations.reduce(
    (result, transform) => transform(result),
    string
  );

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