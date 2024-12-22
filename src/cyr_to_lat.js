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
