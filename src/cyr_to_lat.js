import { vowelsLowerCase, chars, mapping } from "./constants";
import { applyTranslitRule } from "./utils";

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
export function mapDtnlDoubled(string) {
  let pattern =
    "(?<dtnl>[дтнл])" + // <dtnl> is capturing group name
    "(\\k<dtnl>)" + // match the same char as in previous match
    "([яєїёю])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function ($0, $1, $2, $3) {
    return applyTranslitRule($1, mapping.dtnlDoubled, "cyrLat") + $2 + $3;
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
export function mapSoftVowelsSequence(string) {
  let pattern =
      "([^" + chars.all + "]|^)"
    + "(([" + vowelsLowerCase.cyrillicSoft + "]){2,})";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, mapping.softVowels, "cyrLat");
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
export function mapSoftVowelAtWordStart(string) {
  let pattern =
    "([^" + chars.all + "]|^)"
  + "([" + vowelsLowerCase.cyrillicSoft + "])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function ($0, $1, $2) {
    return $1 + applyTranslitRule($2, mapping.softVowels, "cyrLat");
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
export function mapSoftVowelAfterHardVowel(string) {

  let pattern =
      "([" + vowelsLowerCase.cyrillicHard + "])"
    + "([" + vowelsLowerCase.cyrillicSoft + "])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, mapping.softVowels, "cyrLat");
  });
}