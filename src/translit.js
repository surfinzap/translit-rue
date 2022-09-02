/*!
 * Translit (Rusyn transliteration) 2.0.7
 * code: https://github.com/surfinzap/translit
 * app: https://tota.sk/translit
 *
 * Copyright 2014-22 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2022-09-01
 */


/* Constants 

   hard vowels = нейотованы гласны
   soft vowels = йотованы гласны
*/

const latinVowelsLowerCase = "aeiouyŷ";
const cyrillicHardVowelsLowerCase = "аеіоуиыї"
const cyrillicSoftVowelsLowerCase = "яєїёю";

const nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýŷžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
const nonLatinUppercase = nonLatinLowercase.toUpperCase();
const lowerCaseChars = "a-z" + nonLatinLowercase;
const upperCaseChars = "A-Z" + nonLatinUppercase;
const allChars = lowerCaseChars + upperCaseChars;

const exceptions = {
		"text" : "текст",
		"taxi" : "таксі",
	};

const doubledDtnl = {
		"ď": "д",
		"Ď": "Д",
		"ť": "т",
		"Ť": "Т",
		"ň": "н",
		"Ň": "Н",
		"ľ": "л",
		"Ľ": "Л",		
	};

const detenele = {
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
	};

const hardConsonants = {
		// cja, cji, cjo, cju, sja, sji, sjo, sju, rja, rji, rjo, rju, zja, zji, zjo, zju
		// keep these characters together, do not optimalize by removing first letters
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
		"r’jo" : "рьё",

		"bji" : "бъї",


		// d + ja, je, ji, jo, ju
		"dja" : "дъя",
		"dje" : "дъє",
		"dji" : "дъї",
		"djo" : "дъё",
		"dju" : "дъю",
		"Dja" : "Дъя",
		"Dje" : "Дъє",
		"Dji" : "Дъї",
		"Djo" : "Дъё",
		"Dju" : "Дъю",

		// n + ja, je, ji, jo, ju
		"nja" : "нъя",
		"nje" : "нъє",
		"nji" : "нъї",
		"njo" : "нъё",
		"nju" : "нъю",
		"Nja" : "Нъя",
		"Nje" : "Нъє",
		"Nji" : "Нъї",
		"Njo" : "Нъё",
		"Nju" : "Нъю",

		// missing examples for:
		// t + ja, je, ji, jo, ju
		// l + ja, je, ji, jo, ju


	};


const softVowels = {
		"ja" : "я",
		"je" : "є",
		"ji" : "ї",
		"jo" : "ё",
		"ju" : "ю",
		"Ja" : "Я",
		"Je" : "Є",
		"Ji" : "Ї",
		"Jo" : "Ё",
		"Ju" : "Ю",		
	};


const dtnl = {
		"ď": "дь",
		"Ď": "Дь",
		"ť": "ть",
		"Ť": "Ть",
		"ň": "нь",
		"Ň": "Нь",
		"ľ": "ль",
		"Ľ": "Ль",
	};

const doubleChars = {
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
	};

const singleChars = {
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




/*
	 (39) dumb single quote,
	 (8217) right single quotation mark
	 (700) modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe
	 (8216) left single quotation mark
*/
function streamlineApostrophes(string) {
	return string.replace(/\'|’|ʼ|‘/g , '’');
}


function mappingToUppercase(mappingOption) {
	let upperCaseMapping = {};

	for (const [key, value] of Object.entries(mappingOption)) {
		upperCaseMapping[key.toUpperCase()] = value.toUpperCase();
	}
	return upperCaseMapping
}


function mapCyrLat(string, mappingOption) {
	for (var rule in mappingOption){
		var re = new RegExp(mappingOption[rule],"g");
		string =  string.replace(re, rule);
	}
	return string;
}



function mapLatCyr(string, mappingOption) {
	for (var rule in mappingOption){
		var re = new RegExp(rule,"g");
		string =  string.replace(re, mappingOption[rule]);
	}
	return string;
}



/*  
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

	@param {string} string: input text for mapping
	@returns {string} where the first (ď|ť|ň|ľ) of the group is transliterated to its cyrillic equivalent, omitting the soft character “ь”
*/
export function mapDoubledDtnlLatCyr(string){
	let pattern =
		'(?<dtnl>[ďťňľ])'
	+ '(\\k<dtnl>)'
	+ '([aeiou])';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2, $3){
		return mapLatCyr($1, doubledDtnl) + $2 + $3;
	});
}



/*  
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

	@param {string} string: input text for mapping
	@returns {string} where the first (д| т | н | л) of the group is transliterated to its latin accented equivalent
*/
export function mapDoubledDtnlCyrLat(string){
	let pattern =
		'(?<dtnl>[дтнл])'
	+ '(\\k<dtnl>)'
	+ '([яєїёю])';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2, $3){
		return mapCyrLat($1, doubledDtnl) + $2 + $3;
	});
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
	+ '([' + latinVowelsLowerCase + '])'
	+ '([' + lowerCaseChars + ']+?)'
	+ '(šŷj|šoho|šomu|šom|šŷm|šŷ|šŷch|šŷmi|šŷmy|ša|šoj|šu|šov|šŷch|še)';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2, $3, $4, $5){
		return $1 + mapLatCyr($2, singleChars) + $3 + $4 + $5;
	});

}



/*
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

	@param {string} string: latin text for mapping
	@returns {string} cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapConsecutiveSoftWovelsLatCyr(string) {
	let pattern =
			'(\\b)'
		+ '((jo|ja|je|ji|ju){2,})';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2){
		return $1 + mapLatCyr($2, softVowels);
	});
}



/*
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

	@param {string} string: latin text for mapping
	@returns {string} cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapConsecutiveSoftWovelsCyrLat(string) {
	let pattern =
			'([^' + allChars + ']|^)'
		+ '(([' + cyrillicSoftVowelsLowerCase + ']){2,})';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2){
		return $1 + mapCyrLat($2, softVowels);
	});
}





/*
	Transliterate ja, je, ji, jo, ju at the beginning of the word

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

	@param {string} string: latin text for mapping
	@returns {string} cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapSoftVowelBeginningWordLatCyr(string) {
	let pattern =
			'(\\b)'
		+ '(j)'
		+ '([' + latinVowelsLowerCase + '])';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2, $3){
		return $1 + mapLatCyr($2 + $3, softVowels);
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

	@param {string} string: cyrillic text for mapping
	@returns {string} latin text with mapped я, є, ї, ё, ю

*/
export function mapSoftVowelBeginningWordCyrLat(string) {
	let pattern =
			'([^' + allChars + ']|^)'
		+ '([' + cyrillicSoftVowelsLowerCase + '])';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2){
		return $1 + mapCyrLat($2, softVowels);
	});
}



/*
	Transliterate ja, je, ji, jo, ju before a vowel (a, e, i, o, u, y, ŷ)

	Examples
	bajusatŷj	↔ баюсaтый
	akciji ↔ aкції
	čornyjova ↔ чорниёвa
	oklejuju ↔ оклеюю
	svojoj ↔ своёй
	šŷje ↔ šŷje
	ujidaty ↔ уїдaти

	@param {string} string: latin text for mapping
	@returns {string} cyrillic text with mapped ja, je, ji, jo, ju
*/
export function mapSoftVowelAfterHardVowelLatCyr(string) {

	let pattern =
			'([' + latinVowelsLowerCase + '])'
		+ '(ja|je|ji|jo|ju)';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2){
		return $1 + mapLatCyr($2, softVowels);
	});
}





/*
	Transliterate я, є, ї, ё, ю before a vowel (а, е, і, о, у, и, ы)

	Examples
	bajusatŷj	↔ баюсaтый
	akciji ↔ aкції
	čornyjova ↔ чорниёвa
	oklejuju ↔ оклеюю
	svojoj ↔ своёй
	šŷje ↔ šŷje
	ujidaty ↔ уїдaти

	@param {string} string: latin text for mapping
	@returns {string} cyrillic text with mapped я, є, ї, ё, ю
*/
export function mapSoftVowelAfterHardVowelCyrLat(string) {

	let pattern =
			'([' + cyrillicHardVowelsLowerCase + '])'
		+ '([' + cyrillicSoftVowelsLowerCase + '])';
	let re = new RegExp(pattern, 'gi');

	return string.replace(re, function($0, $1, $2){
		return $1 + mapCyrLat($2, softVowels);
	});
}



/*
	 Public API
*/
export function translitCyrLat(string) {
	string = mapConsecutiveSoftWovelsCyrLat(string);
	string = mapSoftVowelBeginningWordCyrLat(string);
	string = mapSoftVowelAfterHardVowelCyrLat(string);
	string = mapDoubledDtnlCyrLat(string);
	string = mapCyrLat(string, exceptions);
	string = mapCyrLat(string, detenele);
	string = mapCyrLat(string, hardConsonants);
	string = mapCyrLat(string, dtnl);
	string = mapCyrLat(string, doubleChars);
	string = mapCyrLat(string, singleChars);
	return string;
}



export function translitLatCyr(string) {
	string = streamlineApostrophes(string);
	string = mapSuperlativeLatCyr(string);
	string = mapConsecutiveSoftWovelsLatCyr(string);
	string = mapSoftVowelBeginningWordLatCyr(string);
	string = mapSoftVowelAfterHardVowelLatCyr(string);
	string = mapDoubledDtnlLatCyr(string);
	string = mapLatCyr(string, exceptions);
	string = mapLatCyr(string, detenele);
	string = mapLatCyr(string, hardConsonants);
	string = mapLatCyr(string, dtnl);
	string = mapLatCyr(string, doubleChars);
	string = mapLatCyr(string, singleChars);
	return string;
}