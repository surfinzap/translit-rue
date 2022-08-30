import {
				mapSuperlativeLatCyr,
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
		"Joj": "Ёй",
		"Ji": "Ї",
		"joho" : "ёго",
		"Joho" : "Ёго",
		"jomu" : "ёму",
		"Jomu" : "Ёму",
		"ser’jozno" : "серьёзно",
		"zjazvene" : "зъязвене",
		"Zjavyla" : "Зъявила",
		"Myž’ko" : "Мижько",
		"ňoj" : "нёй",
		"Bardejov" : "Бардеёв",
		"naďijov" : "надїёв",
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
		"o-jo-joj" : "о-ё-ёй",
		"o-joj-joj" : "о-ёй-ёй",
		"oj-joj-joj" : "ой-ёй-ёй",
		"najobľubleňišŷj" : "найоблюбленїшый"
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
