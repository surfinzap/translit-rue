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
export function mapSuperlative(string){
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
export function mapSoftVowelsSequence(string) {
  let pattern =
      "(\\b)"
    + "((jo|ja|je|ji|ju){2,})";
  let re = new RegExp(pattern, "gi");

  return string.replace(re, function($0, $1, $2){
    return $1 + applyTranslitRule($2, mapping.softVowels, "latCyr");
  });
}