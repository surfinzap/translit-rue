import {
				mapSuperlativeLatCyr,
				mapJajeBeginningLatCyr,
				mapJajeBeginningCyrLat,
				translitCyrLat,
				translitLatCyr} from '../translit.js';
import assert from 'assert';

describe('Basic transliteration:\n', () => {
	let testCase = {
		"c’ile" : "цїле",
		"kur’atko" : "курятко",
		"klynec’" : "клинець",
		"s’a" : "ся",
		"mis’ac’" : "місяць",
		"znajuť" : "знають",
		"ŷ": "ы",
		"štos’ka": "штоська",
		"jes’" : "єсь",
		"virnŷj" : "вірный",
		"Tr’om" : "Трём",
		"muľar’iv" : "мулярїв",
		"džmur’klo" : "джмурькло",
		"Teper’" : "Теперь",
		"vz’ala" : "взяла",
		"Voz’" : "Возь",
		"gazdŷňa" : "ґаздыня",
		"ľis’i" : "лїсї",
		"C’ilŷj" : "Цїлый",
		"ďity" : "дїти",
		"jich" : "їх",
		"str’is’i" : "стрїсї",
		"noz’i" : "нозї",
		"stojiť" : "стоїть",
		"merenďu" : "мерендю",
		"ňej" : "нєй",
		"Ňanu" : "Няну",
		"tvojoj" : "твоёй",
		"Braňo" : "Бранё",
		"Vlaďo" : "Владё",
		"Oťo" : "Отё",
		"veľo" : "велё",
		"car’u" : "царю",
		"text" : "текст",
		"taxi" : "таксі",
		"Chlopci":"Хлопці",
		"chyža":"хижа",

		"ser’jozno" : "серьёзно",
		"zjazvene" : "зъязвене",
		"Zjavyla" : "Зъявила",
		"Myž’ko" : "Мижько",
		"ňoj" : "нёй",
		"Bardejov" : "Бардеёв",
		"treťoj" : "третёй",
		"plaksyvo" : "плаксиво",
		"Čornyjova":"Чорниёва",
		"Obľľav" : "Облляв",
		"plaksyvo" : "плаксиво",
		"taksamo": "таксамо",
		"zjemňovaly":"зъємнёвали",
		"ňoho":"нёго",
		"blyžňoho":"ближнёго",
		"Nyžňoho":"Нижнёго",
		"zjojkla":"зъёйкла",
		"predjidlo":"предъїдло",
		"Myž’o" : "Мижё",
		"Myž’a" : "Мижя",
		"Myž’u" : "Мижю",
	};

	Object.keys(testCase).forEach((key) => {
		it("Latin → Cyrillic:\n", () => {
			assert.equal(translitLatCyr(key), testCase[key]);
		});
		it("Cyrillic → Latin:\n", () => {
			assert.equal(translitCyrLat(testCase[key]), key);
		});
	});
});


describe(' (unit) Superlative transliteration:\n', () => {
	let testCase = {

		// lower case
		"najatraktivňišŷj" :  "найatraktivňišŷj", 
		"najelegantňišŷj" :   "найelegantňišŷj",
		"najinteligentňišŷj" : "найinteligentňišŷj",
		"najobľubleňišŷj" : "найobľubleňišŷj",
		"najužasňišŷj" : "найužasňišŷj",

		// Title Case
		"Najatraktivňišŷj" :  "Найatraktivňišŷj", 
		"Najelegantňišŷj" :   "Найelegantňišŷj",
		"Najinteligentňišŷj" : "Найinteligentňišŷj",
		"Najobľubleňišŷj" : "Найobľubleňišŷj",
		"Najužasňišŷj" : "Найužasňišŷj",

		// upper case
		"NAJATRAKTIVŇIŠŶJ" :  "НАЙATRAKTIVŇIŠŶJ", 
		"NAJELEGANTŇIŠŶJ" :   "НАЙELEGANTŇIŠŶJ",
		"NAJINTELIGENTŇIŠŶJ" : "НАЙINTELIGENTŇIŠŶJ",
		"NAJOBĽUBLEŇIŠŶJ" : "НАЙOBĽUBLEŇIŠŶJ",
		"NAJUŽASŇIŠŶJ" : "НАЙUŽASŇIŠŶJ",

		// false positive
		"najidž" : "najidž",
		"najveksyj" : "najveksyj" //naj following a consonant
	};

	Object.keys(testCase).forEach((key) => {
		it("Latin → Cyrillic:\n", () => {
			assert.equal(mapSuperlativeLatCyr(key), testCase[key]);
		});

	});
});



describe(' (module) Superlative transliteration:\n', () => {
	let testCase = {

		// lower case
		"najatraktivňišŷj" :  "найатрактівнїшый", 
		"najelegantňišŷj" :   "найелеґантнїшый",
		"najinteligentňišŷj" : "найінтеліґентнїшый",
		"najobľubleňišŷj" : "найоблюбленїшый",
		"najužasňišŷj" : "найужаснїшый",

		// title case
		"Najatraktivňišŷj" :  "Найатрактівнїшый", 
		"Najelegantňišŷj" :   "Найелеґантнїшый",
		"Najinteligentňišŷj" : "Найінтеліґентнїшый",
		"Najobľubleňišŷj" : "Найоблюбленїшый",
		"Najužasňišŷj" : "Найужаснїшый",

		// // upper case
		// "NAJATRAKTIVŇIŠŶJ" :  "НАЙАТРАКТІВНЇШЫЙ", 
		// "NAJELEGANTŇIŠŶJ" :   "НАЙЕЛЕҐАНТНЇШЫЙ",
		// "NAJINTELIGENTŇIŠŶJ" : "НАЙІНТЕЛІҐЕНТНЇШЫЙ",
		// "NAJOBĽUBLEŇIŠŶJ" : "НАЙОБЛЮБЛЕНЇШЫЙ",
		// "NAJUŽASŇIŠŶJ" : "НАЙУЖАСНЇШЫЙ",
	};

	Object.keys(testCase).forEach((key) => {
		it("Latin → Cyrillic:\n", () => {
			assert.equal(translitLatCyr(key), testCase[key]);
		});
		it("Cyrillic → Latin:\n", () => {
			assert.equal(translitCyrLat(testCase[key]), key);
		});
	});
});




describe(' (unit) Ja, je, ji, jo, ju at the beginning of the word:\n', () => {
	let testCase = {

	"jabčanka" : "яbčanka",
	"jedenastka" : "єdenastka",
	"jidnaňa" : "їdnaňa",
	"joho" : "ёho",
	"jubilant" : "юbilant",
	"o-jo-joj" : "o-ё-ёj",
	"ji": "ї",

	"Jabčanka" : "Яbčanka",
	"Jedenastka" : "Єdenastka",
	"Jidnaňa" : "Їdnaňa",
	"Joho" : "Ёho",
	"Jokohama":	"Ёkohama",
	"Jubilant" : "Юbilant",
	"O-Jo-Joj" : "O-Ё-Ёj",
	"Ji": "Ї",

	// false positives
	"jedenadc’atŷj" : "єdenadc’atŷj",
	"každopadňi" : "každopadňi",
	"zrivňovaty" : "zrivňovaty",
	"čeľustnŷj" : "čeľustnŷj",

	};

	Object.keys(testCase).forEach((key) => {
		it("Latin → Cyrillic:\n", () => {
			assert.equal(mapJajeBeginningLatCyr(key), testCase[key]);
		});
		it("Cyrillic → Latin:\n", () => {
			assert.equal(mapJajeBeginningCyrLat(testCase[key]), key);
		});
	});
});




describe('(module) Ja, je, ji, jo, ju at the beginning of the word:\n', () => {
	let testCase = {

	"jabčanka jabčanka" : "ябчанка ябчанка",

	"jabčanka" : "ябчанка",
	"jedenastka" : "єденастка",
	"jidnaňa" : "їднаня",
	"joho" : "ёгo",
	"jubilant" : "юбілант",
	"o-jo-joj" : "о-ё-ёй",

	"Jabčanka" : "Ябчанка",
	"Jedenastka" : "Єденастка",
	"Jidnaňa" : "Їднаня",
	"Joho" : "Ёгo",
	"Jubilant" : "Юбілант",
	"O-Jo-Joj" : "О-Ё-Ёй",
	
	"Joj": "Ёй",
	"Ji": "Ї",
	"joho" : "ёго",
	"Joho" : "Ёго",
	"jomu" : "ёму",
	"Jomu" : "Ёму",

	"jedenadc’atŷj" : "єденадцятый",
	"každopadňi" : "каждопаднї",
	"zrivňovaty" : "зрівнёвати",
	"čeľustnŷj" : "челюстный",

	};

	Object.keys(testCase).forEach((key) => {
		it("Latin → Cyrillic:\n", () => {
			assert.equal(translitLatCyr(key), testCase[key]);
		});
		it("Cyrillic → Latin:\n", () => {
			assert.equal(translitCyrLat(testCase[key]), key);
		});
	});
});




describe('Apostrophes:\n', () => {
	let testCase = {
		"str‘is‘i" : "стрїсї",
		"car‘u" : "царю",
		"Otec’" : "Отець",
		"Otec'" : "Отець",
	};

	Object.keys(testCase).forEach((key) => {
		it("Latin → Cyrillic:\n", () => {
			assert.equal(translitLatCyr(key), testCase[key]);
		});
	});
});
