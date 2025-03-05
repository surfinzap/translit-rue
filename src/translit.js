/*!
 * Translit v3.0.1 (Rusyn transliteration)
 * Copyright 2014–2025 Braňo Šandala (https://brano.me)
 * 
 * app: https://tota.sk/translit
 * src: https://github.com/surfinzap/translit-rue
 * 
 * Licensed under MIT (https://github.com/surfinzap/translit-rue/blob/main/LICENSE.txt)
 */
import {
  processUpperCase,
  normalizeHomoglyphs
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
      string = normalizeHomoglyphs(string, "latCyr");
      string = processUpperCase(string, "latCyr");
      string = latCyr.applyTransformations(string);
      return string;
    case "cyrLat":
      string = normalizeHomoglyphs(string, "cyrLat");
      string = processUpperCase(string, "cyrLat");
      string = cyrLat.applyTransformations(string);

      return string;
  }
}