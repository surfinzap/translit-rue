import { vowelsLowerCase, chars, mapping } from "./constants";
import { applyTranslitRule } from "./utils";

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
export function mapDtnlDoubled(string) {
  let pattern =
    "(?<dtnl>[ďťňľ])" + // <dtnl> is capturing group name
    "(\\k<dtnl>)" + // match the same char as in previous match
    "([aeiou])";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function ($0, $1, $2, $3) {
    return applyTranslitRule($1, mapping.dtnlDoubled, "latCyr") + $2 + $3;
  });
}
