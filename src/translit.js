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
  mapping
 } from "./constants";

import {
  applyTranslitRule,
  processUpperCase
} from "./utils";

import * as latCyr from "./lat_to_cyr";
import * as cyrLat from "./cyr_to_lat";



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
      string = latCyr.applyTransformations(string);
      return string;
    case "cyrLat":
      string = applyTranslitRule(string, mapping.homoglyphs, "latCyr"); // opposite direction as we need to cyrillize the latin homoglyphs
      string = processUpperCase(string, "cyrLat");
      string = cyrLat.applyTransformations(string);
      return string;
  }
}