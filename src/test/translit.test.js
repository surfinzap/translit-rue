import {
				mapSuperlativeLatCyr,
				mapJajeBeginningLatCyr,
				mapJajeBeginningCyrLat,
				mapJajeBeforeVowelLatCyr,
				mapJajeBeforeVowelCyrLat,
				translitCyrLat,
				translitLatCyr} from '../translit.js';
import assert from 'assert';


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



describe('(unit, lat) Ja, je, ji, jo, ju before a vowel:\n', () => {
	let testCase = {

		"bajusatŷj" : "baюsatŷj",
		"Bajerivc’i" : "Baєrivc’i",
		"hajik" : "haїk",
		"zajačaty" : "zaяčaty",
		"lyšajovŷj" : "lyšaёvŷj",

		"akceleracija" : "akceleraciя",
		"akciji" : "akciї",
		"funkcijov" : "funkciёv",
		"archijerej" : "archiєrej",
		"policiju" : "policiю",

		"pryjata" : "pryяta",
		"pryjimaňa" : "pryїmaňa",
		"spryjemnenŷj" : "spryєmnenŷj",
		"čornyjova" : "čornyёva",
		"vyjuť" : "vyюť",

		"glejovŷj" : "gleёvŷj",
		"naklejity" : "nakleїty",
		"nejeden" : "neєden",
		"nejadrovŷj" : "neяdrovŷj",
		"oklejuju" : "okleюju",

		"ojalovity" : "oяlovity",
		"pereprojektovaty" : "pereproєktovaty",
		"pidhojity" : "pidhoїty",
		"svoju" : "svoю",
		"svojoj" : "svoёj",

		"šŷje" : "šŷє",
		"vŷjasnyť" : "vŷяsnyť",
		"šŷju" : "šŷю",
		"šŷji" : "šŷї",
		"Kŷjovčan" : "Kŷёvčan",

		"kuju" : "kuю",
		"kulminuje" : "kulminuє",
		"tuja" : "tuя",
		"ujidaty" : "uїdaty",

		"tvojoj" : "tvoёj",
		"Bardejov" : "Bardeёv",

	};

	Object.keys(testCase).forEach((key) => {
		it("Latin → Cyrillic:\n", () => {
			assert.equal(mapJajeBeforeVowelLatCyr(key), testCase[key]);
		});
	});
});



describe('(unit, cyr) Ja, je, ji, jo, ju before a vowel:\n', () => {
	let testCase = {
		// there are cyrillic vowels before ja, je,...

		"bаjusatŷj" : "bаюsatŷj",
		"Bаjerivc’i" : "Bаєrivc’i",
		"hаjik" : "hаїk",
		"zаjačaty" : "zаяčaty",
		"lyšаjovŷj" : "lyšаёvŷj",

		"akceleracіja" : "akceleracія",
		"akcіji" : "akcії",
		"funkcіjov" : "funkcіёv",
		"archіjerej" : "archієrej",
		"policіju" : "policію",

		"prиjata" : "prияta",
		"prиjimaňa" : "prиїmaňa",
		"sprиjemnenŷj" : "sprиєmnenŷj",
		"čornиjova" : "čornиёva",
		"vиjuť" : "vиюť",

		"glеjovŷj" : "glеёvŷj",
		"naklеjity" : "naklеїty",
		"nеjedеn" : "nеєdеn",
		"nеjadrovŷj" : "nеяdrovŷj",
		"oklеjuju" : "oklеюju",

		"оjalоvity" : "ояlоvity",
		"pereprоjektоvaty" : "pereprоєktоvaty",
		"pidhоjity" : "pidhоїty",
		"svоju" : "svою",
		"svоjoj" : "svоёj",

		"šыje" : "šыє",
		"vыjasnyť" : "vыяsnyť",
		"šыju" : "šыю",
		"šыji" : "šыї",
		"Kыjovčan" : "Kыёvčan",

		"kуju" : "kую",
		"kulminуje" : "kulminує",
		"tуja" : "tуя",
		"уjidaty" : "уїdaty",

		"tvоjoj" : "tvоёj",
		"Bardеjov" : "Bardеёv",
		
		"naďїjov" : "naďїёv",

	};

	Object.keys(testCase).forEach((key) => {
		it("Cyrillic → Latin:\n", () => {
			assert.equal(mapJajeBeforeVowelCyrLat(testCase[key]), key);
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



describe('Module tests:\n', () => {
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

		"treťoj" : "третёй",
		"plaksyvo" : "плаксиво",
		"Obľľav" : "Облляв",
		"taksamo": "таксамо",
		"zjemňovaly":"зъємнёвали",
		"ňoho":"нёго",
		"blyžňoho":"ближнёго",
		"Nyžňoho":"Нижнёго",
		"zjojkla":"зъёйкла",
		"Myž’o" : "Мижё",
		"Myž’a" : "Мижя",
		"Myž’u" : "Мижю",



		// Ja, je, ji, jo, ju at the beginning of the word:
		
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



		// Ja, je, ji, jo, ju before a vowel:
		"bajusatŷj" :	"баюсатый",
		"Bajerivc’i" :	"Баєрівцї",
		"hajik" :	"гаїк",
		"zajačaty" :	"заячати",
		"lyšajovŷj" :	"лишаёвый",

		"akceleracija" :	"акцелерація",
		"akciji" :	"акції",
		"funkcijov" :	"функціёв",
		"archijerej" :	"архієрей",
		"policiju" :	"поліцію",

		"pryjata" :	"прията",
		"pryjimaňa" :	"приїманя",
		"spryjemnenŷj" :	"сприємненый",
		"čornyjova" :	"чорниёва",
		"vyjuť" :	"виють",

		"glejovŷj" :	"ґлеёвый",
		"naklejity" :	"наклеїти",
		"nejeden" :	"неєден",
		"nejadrovŷj" :	"неядровый",
		"oklejuju" :	"оклеюю",

		"ojalovity" :	"ояловіти",
		"pereprojektovaty" :	"перепроєктовати",
		"pidhojity" :	"підгоїти",
		"svoju" :	"свою",
		"svojoj" :	"своёй",

		"šŷje" :	"шыє",
		"vŷjasnyť" :	"выяснить",
		"šŷju" :	"шыю",
		"šŷji" :	"шыї",
		"Kŷjovčan" :	"Кыёвчан",

		"kuju" :	"кую",
		"kulminuje" :	"кулмінує",
		"tuja" :	"туя",
		"ujidaty" :	"уїдати",

		"tvojoj" : "твоёй",
		"Bardejov" : "Бардеёв",

		"naďijov" : "надїёв",
		"naďiju" : "надїю",
		"beznaďiji" : "безнадїї",
		"naďija" : "надїя",
		"zabzďiju" : "забздїю",
		"osprosťijuť" : "оспростїють",
		"Jakuťija" : "Якутїя",
		"zeleňijuť" : "зеленїють",
		"chudobňije" : "худобнїє",
		"vŷtľije" : "вытлїє",
		"voľiju" : "волїю",
		"Mefoďija" : "Мефодїя",
		"ďije" : "дїє",
		"poďiju" : "подїю",
		"naďiji" : "надїї",
		"naďij" : "надїй",
		"beznaďiji" : "безнадїї",
		"naďija" : "надїя",

		"zloďijska" : "злодїйска",
		"blahoroďije" : "благородїє",
		"haďij" : "гадїй",
		"zabzďiju" : "забздїю",
		"leoparďij" : "леопардїй",
		"beznaďijno" : "безнадїйно",
		"voľiju" : "волїю",


		//d + ja, je, ji, jo, ju
		"predjidlo":"предъїдло",
		"adjektiviv" : "адъєктівів",
		"nadjazd" : "надъязд",
		"peredjunovŷj" : "передъюновый",



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






