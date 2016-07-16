(function(){
		function assert(expected,actual,message){
				if(expected !== actual){
						console.error(message);
				}
		}

		test_dict = {
			"c'ile" : "цїле",
			"kur'atko" : "курятко",
			"klynec'" : "клинець",
			"s'a" : "ся",
			"mis'ac'" : "місяць",
			"znajuť" : "знають",
			"ŷ": "ы",
			"štos'ka": "штоська",
			"jes'" : "єсь",
			"virnŷj" : "вірный",
			"Tr'om" : "Трём",
			"muľar'iv" : "мулярїв",
			"džmur'klo" : "джмурькло",
			"Teper'" : "Теперь",
			"vz'ala" : "взяла",
			"Voz'" : "Возь",
			"gazdŷňa" : "ґаздыня",
			"ľis'i" : "лїсї",
			"C'ilŷj" : "Цїлый",
			"ďity" : "дїти",
			"jich" : "їх",
			"str'is'i" : "стрїсї",
			"noz'i" : "нозї",
			"stojiť" : "стоїть",
			"merenďu" : "мерендю",
			"ňej" : "нєй",
			"Ňanu" : "Няну",
			"tvojoj" : "твоёй",
			"Braňo" : "Бранё",
			"Vlaďo" : "Владё",
			"Oťo" : "Отё",
			"veľo" : "велё",
			"car'u" : "царю",
			"text" : "текст",
			"Chlopci":"Хлопці",
			"chyža":"хижа",
			"Joj": "Ёй",
			"Ji": "Ї",
			"joho" : "ёго",
			"Joho" : "Ёго",
			"jomu" : "ёму",
			"Jomu" : "Ёму",
			"серьёзно" : "ser'jozno",
		}

		test_dict_apostrophe = {
			"str‘is‘i" : "стрїсї",
			"car‘u" : "царю",
			"Otec’" : "Отець",
		}


		// Test translations from latin to azbuka
		for (var key in test_dict){
				assert(translit_lat_azb(key), (test_dict[key]),"Assertion error: " + key + " transliterates to " + translit_lat_azb(key) + ", but should trans’ to " + test_dict[key]);
		}

		// Test translations from azbuka to latin
		for (var key in test_dict){
				assert(translit_azb_lat(test_dict[key]), (key),"Assertion error: " + test_dict[key] + " transliterates to " + translit_azb_lat(test_dict[key]) + ", but should trans’ to " + key);
		}

		// Test if script takes different apostrophes
		assert(streamline_apostrophes("ja‘nk‘o"),"ja'nk'o","Assertion error: apostrophe is not streamlined");
		for (var key in test_dict_apostrophe){
				assert(translit_lat_azb(key), (test_dict_apostrophe[key]),"Assertion error: " + key + " transliterates to " + translit_lat_azb(key) + ", but should trans’ to " + test_dict[key] + "+ — this is an apostrophe error.");
		}

})();
