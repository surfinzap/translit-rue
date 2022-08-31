/*!
 * Translit (Rusyn transliteration) 2.0.7
 * https://tota.sk/translit
 *
 * Copyright 2014-20 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2020-07-27
 */


/*
Notes for improvement

Move "ďijo" as "ijo" from priority-set-3 to priority-set-1
- thought begind that vowel + (ja|jo|je...) is part where the word could be split, so that's case where no apostrophe should be

Establish rules for ja, jo, je... teda hlavni jo
- ze koli sa pise jak 'o (v stredi slova)
- ze koli sa pise jak jo (na zacatku slova)

*/


/* Constants */

const latinVowelsUnaccentedLowerCase = "aeiouy";
const cyrillicJajejijoju = "яєїёю";

const nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
const nonLatinUppercase = nonLatinLowercase.toUpperCase();
const nonLatinChars = nonLatinLowercase + nonLatinUppercase;
const lowercaseChars = "a-z" + nonLatinLowercase;
const uppercaseChars = "A-Z" + nonLatinUppercase;
const allChars = lowercaseChars + uppercaseChars;



const mapping = {
	"exceptions" : {
		"text" : "текст",
		"taxi" : "таксі",
	},

	"priority-set-1" : {
		"ľľa" : "лля",
		"Ľľa" : "Лля",
		"ďijo" : "дїё",
		"Ďijo" : "Дїё",
		"dji" : "дъї",
	},

	"priority-set-2" : {
		// di ti ni li
		"ďi": "дї",
		"Ďi": "Дї",
		"ťi": "тї",
		"Ťi": "Тї",
		"ňi": "нї",
		"Ňi": "Нї",
		"ľi": "лї",
		"Ľi": "Лї",
		// da ta na la
		"ďa": "дя",
		"Ďa": "Дя",
		"ťa": "тя",
		"Ťa": "Тя",
		"ňa": "ня",
		"Ňa": "Ня",
		"ľa": "ля",
		"Ľa": "Ля",
		// du tu nu lu
		"ďu": "дю",
		"Ďu": "Дю",
		"ťu": "тю",
		"Ťu": "Тю",
		"ňu": "ню",
		"Ňu": "Hю",
		"ľu": "лю",
		"Ľu": "Лю",
		// do to no lo
		"ďo": "дё",
		"Ďo": "Дё",
		"ťo": "тё",
		"Ťo": "Тё",
		"ňo": "нё",
		"Ňo": "Hё",
		"ľo": "лё",
		"Ľo": "Лё",
		// de te ne le
		"ďe": "дє",
		"Ďe": "Дє",
		"ťe": "тє",
		"Ťe": "Тє",
		"ňe": "нє",
		"Ňe": "Hє",
		"ľe": "лє",
		"Ľe": "Лє",
		// cja, cji, cjo, cju, sja, sji, sjo, sju, rja, rji, rjo, rju, zja, zji, zjo, zju
		// it is important to hold these characters together, do not optimalize by removing first letters
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
		"ž’a" : "жя",
		"Ž’a" : "Жя",
		"ž’i" : "жї",
		"Ž’i" : "Жї",
		"ž’o" : "жё",
		"Ž’o" : "Жё",
		"ž’u" : "жю",
		"Ž’u" : "Жю",

	},

	"priority-set-3" : {
		"zja" : "зъя",
		"Zja" : "Зъя",
		"zje" : "зъє",
		"Zje" : "Зъє",
		"zji" : "зъї",
		"Zji" : "Зъї",
		"zjo" : "зъё",
		"Zjo" : "Зъё",
		"zju" : "зъю",
		"Zju" : "Зъю",
		"r’jo" : "рьё",
		"R’jo" : "Рьё",
		"ajo": "аё",
		"Ajo": "Аё",
		"ejo": "её",
		"Ejo": "Её",
		"yjo":"иё",
		"Yjo":"Иё",
		"ojo": "оё",
		"Ojo": "Оё",
	},




	"carons" : {
		"ď": "дь",
		"Ď": "Дь",
		"ť": "ть",
		"Ť": "Ть",
		"ň": "нь",
		"Ň": "Нь",
		"ľ": "ль",
		"Ľ": "Ль",
	},
	"basic" : {
		"ja": "я",
		"Ja": "Я",
		"ju": "ю",
		"Ju": "Ю",
		"je": "є",
		"Je": "Є",
		// "jo": "ё",
		// "Jo": "Ё",
		"’o": "ё",
		"’O": "Ë",
		"ji": "ї",
		"Ji": "Ї",
		"ch": "х",
		"Ch": "Х",
		"šč": "щ",
		"Šč": "Щ",
		"c’" : "ць",
		"C’" : "Ць",
		"s’" : "сь",
		"S’" : "Сь",
		"r’" : "рь",
		"R’" : "Рь",
		"z’" : "зь",
		"Z’" : "Зь",
		"ž’" : "жь",
		"Ž’" : "Жь",
	},
	"chars" : {
		"a" : "а",
		"b" : "б",
		"v" : "в",
		"h" : "г",
		"g" : "ґ",
		"d" : "д",
		"e" : "е",
		"z" : "з",
		"i" : "і",
		"y" : "и",
		"j" : "й",
		"k" : "к",
		"l" : "л",
		"m" : "м",
		"n" : "н",
		"o" : "о",
		"p" : "п",
		"r" : "р",
		"s" : "с",
		"t" : "т",
		"u" : "у",
		"f" : "ф",
		"ŷ" : "ы",
		"c" : "ц",
		"č" : "ч",
		"ž" : "ж",
		"š" : "ш",
		"A" : "А",
		"B" : "Б",
		"V" : "В",
		"H" : "Г",
		"G" : "Ґ",
		"D" : "Д",
		"E" : "Е",
		"Z" : "З",
		"I" : "I",
		"Y" : "И",
		"J" : "Й",
		"K" : "К",
		"L" : "Л",
		"M" : "М",
		"N" : "Н",
		"O" : "О",
		"P" : "П",
		"R" : "Р",
		"S" : "С",
		"T" : "Т",
		"U" : "У",
		"F" : "Ф",
		"Ŷ" : "Ы",
		"C" : "Ц",
		"Č" : "Ч",
		"Ž" : "Ж",
		"Š" : "Ш",
	}
}

/*
	 (39) dumb single quote,
	 (8217) right single quotation mark
	 (700) modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe
	 (8216) left single quotation mark
*/
function streamlineApostrophes(string) {
	return string.replace(/\'|’|ʼ|‘/g , '’');
}

function mapCyrLat(string, mappingOption) {
	for (var rule in mapping[mappingOption]){
		var re = new RegExp(mapping[mappingOption][rule],"g");
		string =  string.replace(re, rule);
	}
	return string;
}


function mapLatCyr(string, mappingOption) {
	for (var rule in mapping[mappingOption]){
		var re = new RegExp(rule,"g");
		string =  string.replace(re, mapping[mappingOption][rule]);
	}
	return string;
}


/*
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

	@param {string} string: input text for mapping
	@returns {string} where all words that begin with "naj|Naj|NAJ" followed by a vowel will be transliterated to "най|Най|НАЙ"
*/
export function mapSuperlativeLatCyr(string){
		let pattern =
			'(\\b)'
		+ '(naj)'
		+ '([aeiou])'
		+ '([' + lowercaseChars + ']+?)'
		+ '(šŷj|šoho|šomu|šom|šŷm|šŷ|šŷch|šŷmi|šŷmy|ša|šoj|šu|šov|šŷch|še)';
		let re = new RegExp(pattern, 'gi');

		return string.replace(re, function($0, $1, $2, $3, $4, $5){
			return $1 + mapLatCyr($2, 'chars') + $3 + $4 + $5;
		});

/*
	Transliaterate ja, je, ji, jo, ju at the beginning of the word

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

*/
export function mapJajejijojuBeginningLatCyr(string) {
	let pattern =
			'(\\b)'
		+ '(j)'
		+ '([' + latinVowelsUnaccentedLowerCase + '])';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2, $3){
		return $1 + mapLatCyr($2 + $3, 'jajejijoju');
	});
}



/*
	Transliaterate я, є, ї, ё, ю at the beginning of the word

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

*/
export function mapJajejijojuBeginningCyrLat(string) {
	let pattern =
			'([^' + allChars + ']|^)'
		+ '([' + cyrillicJajejijoju + '])';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2){
		return $1 + mapCyrLat($2, 'jajejijoju');
	});
}



/*
	 Public API
*/
export function translitCyrLat(string) {
	string = mapJajejijojuBeginningCyrLat(string);
	string = mapCyrLat(string, "exceptions");
	string = mapCyrLat(string, "priority-set-1");
	string = mapCyrLat(string, "priority-set-2");
	string = mapCyrLat(string, "priority-set-3");
	string = mapCyrLat(string, "carons");
	string = mapCyrLat(string, "basic");
	string = mapCyrLat(string, "chars");
	return string;
}



export function translitLatCyr(string) {
	string = streamlineApostrophes(string);
	string = mapSuperlativeLatCyr(string);
	string = mapJajejijojuBeginningLatCyr(string);
	string = mapLatCyr(string, 'exceptions');
	string = mapLatCyr(string, 'priority-set-1');
	string = mapLatCyr(string, 'priority-set-2');
	string = mapLatCyr(string, 'priority-set-3');
	string = mapLatCyr(string, 'carons');
	string = mapLatCyr(string, 'basic');
	string = mapLatCyr(string, 'chars');
	return string;
}
