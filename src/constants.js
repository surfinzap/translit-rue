/* Constants 

   hard vowels = нейотованы гласны
   soft vowels = йотованы гласны
*/
export const latinVowelsLowerCase = "aeiouyŷ";
export const cyrillicHardVowelsLowerCase = "аеіоуиыї";
export const cyrillicSoftVowelsLowerCase = "яєїёю";

const nonLatinLowercase =
  "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
const nonLatinUppercase = nonLatinLowercase.toUpperCase();
export const lowerCaseChars = "a-z" + nonLatinLowercase;
export const upperCaseChars = "A-Z" + nonLatinUppercase;
export const allChars = lowerCaseChars + upperCaseChars;

const exceptions = {
  "text": "текст",
  "taxi": "таксі",
  "jožk": "йожк",
};

const exceptionsCapitalized = {};

for (const [key, value] of Object.entries(exceptions)) {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
  exceptionsCapitalized[capitalizedKey] = capitalizedValue;
}


/*
  Mapping between latin and cyrillic characters

  Coding
  key: latin
  value: cyrillic
*/
export const mapping = {
  "homoglyphs": {
    // Homoglyph, a letter with a similar shape, but belonging to a different alphabet and having a different Unicode code point
    "A": "А",
    "a": "а",
    "B": "В",
    "C": "С",
    "c": "с",
    "E": "Е",
    "e": "е",
    "H": "Н",
    "I": "І",
    "i": "і",
    "K": "К",
    "M": "М",
    "O": "О",
    "o": "о",
    "P": "Р",
    "p": "р",
    "T": "Т",
    "X": "Х",
    "x": "х",
    "Y": "У",
    "y": "у",
  },
  "singleChars": {
    "a": "а",
    "b": "б",
    "v": "в",
    "h": "г",
    "g": "ґ",
    "d": "д",
    "e": "е",
    "z": "з",
    "i": "і",
    "y": "и",
    "j": "й",
    "k": "к",
    "l": "л",
    "m": "м",
    "n": "н",
    "o": "о",
    "p": "п",
    "r": "р",
    "s": "с",
    "t": "т",
    "u": "у",
    "f": "ф",
    "ŷ": "ы",
    "c": "ц",
    "č": "ч",
    "ž": "ж",
    "š": "ш",
    "A": "А",
    "B": "Б",
    "V": "В",
    "H": "Г",
    "G": "Ґ",
    "D": "Д",
    "E": "Е",
    "Z": "З",
    "I": "І",
    "Y": "И",
    "J": "Й",
    "K": "К",
    "L": "Л",
    "M": "М",
    "N": "Н",
    "O": "О",
    "P": "П",
    "R": "Р",
    "S": "С",
    "T": "Т",
    "U": "У",
    "F": "Ф",
    "Ŷ": "Ы",
    "C": "Ц",
    "Č": "Ч",
    "Ž": "Ж",
    "Š": "Ш",
  },
  "digraphs": {
    "ja": "я",
    "Ja": "Я",
    "ju": "ю",
    "Ju": "Ю",
    "je": "є",
    "Je": "Є",
    "’o": "ё",
    "’O": "Ë",
    "ji": "ї",
    "Ji": "Ї",
    "ch": "х",
    "Ch": "Х",
    "šč": "щ",
    "Šč": "Щ",
    "c’": "ць",
    "C’": "Ць",
    "s’": "сь",
    "S’": "Сь",
    "r’": "рь",
    "R’": "Рь",
    "z’": "зь",
    "Z’": "Зь",
    "ž’": "жь",
    "Ž’": "Жь",
  },
  "hardConsonants": {
    // cja, cji, cjo, cju, sja, sji, sjo, sju, rja, rji, rjo, rju, zja, zji, zjo, zju
    // keep these characters together, do not optimize by removing first letters
    "c’a": "ця",
    "C’a": "Ця",
    "c’i": "цї",
    "C’i": "Цї",
    "c’o": "цё",
    "C’o": "Цё",
    "c’u": "цю",
    "C’u": "Цю",
    "s’a": "ся",
    "S’a": "Ся",
    "s’i": "сї",
    "S’i": "Сї",
    "s’o": "сё",
    "S’o": "Сё",
    "s’u": "сю",
    "S’u": "Сю",
    "r’a": "ря",
    "R’a": "Ря",
    "r’i": "рї",
    "R’i": "Рї",
    "r’o": "рё",
    "R’o": "Рё",
    "r’u": "рю",
    "R’u": "Рю",
    "z’a": "зя",
    "Z’a": "Зя",
    "z’i": "зї",
    "Z’i": "Зї",
    "z’o": "зё",
    "Z’o": "Зё",
    "z’u": "зю",
    "Z’u": "Зю",
    "ž’a": "жя",
    "Ž’a": "Жя",
    "ž’i": "жї",
    "Ž’i": "Жї",
    "ž’o": "жё",
    "Ž’o": "Жё",
    "ž’u": "жю",
    "Ž’u": "Жю",

    "zja": "зъя",
    "Zja": "Зъя",
    "zje": "зъє",
    "Zje": "Зъє",
    "zji": "зъї",
    "Zji": "Зъї",
    "zjo": "зъё",
    "Zjo": "Зъё",
    "zju": "зъю",
    "Zju": "Зъю",

    "R’jo": "Рьё",
    "r’jo": "рьё",

    "bji": "бъї",

    // d + ja, je, ji, jo, ju
    "dja": "дъя",
    "dje": "дъє",
    "dji": "дъї",
    "djo": "дъё",
    "dju": "дъю",
    "Dja": "Дъя",
    "Dje": "Дъє",
    "Dji": "Дъї",
    "Djo": "Дъё",
    "Dju": "Дъю",

    // n + ja, je, ji, jo, ju
    "nja": "нъя",
    "nje": "нъє",
    "nji": "нъї",
    "njo": "нъё",
    "nju": "нъю",
    "Nja": "Нъя",
    "Nje": "Нъє",
    "Nji": "Нъї",
    "Njo": "Нъё",
    "Nju": "Нъю",

    // haven’t found examples for:
    // t + ja, je, ji, jo, ju
    // l + ja, je, ji, jo, ju
  },
  "softVowels": {
    "ja": "я",
    "je": "є",
    "ji": "ї",
    "jo": "ё",
    "ju": "ю",
    "Ja": "Я",
    "Je": "Є",
    "Ji": "Ї",
    "Jo": "Ё",
    "Ju": "Ю",
  },
  "dtnlVowel": {
    // da ta na la
    "ďa": "дя",
    "Ďa": "Дя",
    "ťa": "тя",
    "Ťa": "Тя",
    "ňa": "ня",
    "Ňa": "Ня",
    "ľa": "ля",
    "Ľa": "Ля",

    // de te ne le
    "ďe": "дє",
    "Ďe": "Дє",
    "ťe": "тє",
    "Ťe": "Тє",
    "ňe": "нє",
    "Ňe": "Hє",
    "ľe": "лє",
    "Ľe": "Лє",

    // di ti ni li
    "ďi": "дї",
    "Ďi": "Дї",
    "ťi": "тї",
    "Ťi": "Тї",
    "ňi": "нї",
    "Ňi": "Нї",
    "ľi": "лї",
    "Ľi": "Лї",

    // do to no lo
    "ďo": "дё",
    "Ďo": "Дё",
    "ťo": "тё",
    "Ťo": "Тё",
    "ňo": "нё",
    "Ňo": "Hё",
    "ľo": "лё",
    "Ľo": "Лё",

    // du tu nu lu
    "ďu": "дю",
    "Ďu": "Дю",
    "ťu": "тю",
    "Ťu": "Тю",
    "ňu": "ню",
    "Ňu": "Hю",
    "ľu": "лю",
    "Ľu": "Лю",
  },
  "dtnlDoubled": {
    "ď": "д",
    "Ď": "Д",
    "ť": "т",
    "Ť": "Т",
    "ň": "н",
    "Ň": "Н",
    "ľ": "л",
    "Ľ": "Л",
  },
  "dtnlAtWordEnd": {
    "ď": "дь",
    "Ď": "Дь",
    "ť": "ть",
    "Ť": "Ть",
    "ň": "нь",
    "Ň": "Нь",
    "ľ": "ль",
    "Ľ": "Ль",
  },
  "johoJomu": {
    "joho": "ёго",
    "jomu": "ёму",
    "Joho": "Ёго",
    "Jomu": "Ёму",
  },
  "jojJov": {
    "joj": "ёй",
    "Joj": "Ёй",
    "jov": "ёв",
    "Jov": "Ёв",
  },
  "exceptions": exceptions,
  "exceptionsCapitalized": exceptionsCapitalized
};












