import assert from "assert";
import { translit } from "../src/translit.js";
import { 
  mapObjectToUpperCase, 
  mapArrayToUpperCase, 
  lowerCaseWords } from "./scaffolding.js";
import {
  normalizeApostrophes, 
  normalizeHomoglyphs,
  processUpperCase,
} from "../src/utils.js";



describe("(unit) Normalize apostrophes:\n", () => {
  const accentChars = ["'", "’", "ʼ", "‘", "‛", "´", "`", "′"];

  function generateAccents(testCase, accentChars) {
    let result = {};

    for (let [key, value] of Object.entries(testCase)) {
      let parts = key.split("'");

      if (parts.length === 2) {
        for (let accent of accentChars) {
          let variantKey = parts[0] + accent + parts[1];
          result[variantKey] = value;
        }
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  let hardConsonants = {
    "kinc'a": "kinc’a",
    "c'inyla": "c’inyla",
    "tanc'ovaty": "tanc’ovaty",
    "misc'u": "misc’u",
    "s'a": "s’a",
    "Bis'iduj": "Bis’iduj",
    "volos'om": "volos’om",
    "pros'u": "pros’u",
    "Pr'ašiv": "Pr’ašiv",
    "mir'i": "mir’i",
    "tr'och": "tr’och",
    "chmur'u": "chmur’u",
    "vz'aty": "vz’aty",
    "berez'i": "berez’i",
    "z'ojkla": "z’ojkla",
    "rez'ume": "rez’ume",
    "Myž'a": "Myž’a",
    "Myž'o": "Myž’o",
    "Myž'u": "Myž’u",

    "str´is´i": "str’is’i",
  };

  let accentsEnd = {
    "Otec'": "Otec’",
    "jes'": "jes’",
    "teper'": "teper’",
    "piňaz'": "piňaz’",
    "ž'": "ž’",
  };

  let accentsStart = {
    "'o": "’o",
  };

  let expectedUseCases = {
    ...generateAccents(hardConsonants, accentChars),
    ...mapObjectToUpperCase(generateAccents(hardConsonants, accentChars)),
    ...generateAccents(accentsEnd, accentChars),
    ...mapObjectToUpperCase(generateAccents(accentsEnd, accentChars)),
    ...generateAccents(accentsStart, accentChars),
    ...mapObjectToUpperCase(generateAccents(accentsStart, accentChars)),
  };

  Object.keys(expectedUseCases).forEach((key) => {
    it("should change the apostrophe:\n", () => {
      assert.equal(normalizeApostrophes(key), expectedUseCases[key]);
    });
  });

  let falsePositives = {
    // combinations of letters where apostrophe shouldn’t appear
    "d'a": "d'a",
    "t'a": "t'a",
    "n'a": "n'a",
    "l'a": "l'a",
    "d'e": "d'e",
    "t'e": "t'e",
    "n'e": "n'e",
    "l'e": "l'e",
    "d'i": "d'i",
    "t'i": "t'i",
    "n'i": "n'i",
    "l'i": "l'i",
    "d'o": "d'o",
    "t'o": "t'o",
    "n'o": "n'o",
    "l'o": "l'o",
    "d'u": "d'u",
    "t'u": "t'u",
    "n'u": "n'u",
    "l'u": "l'u",
  };

  Object.keys(falsePositives).forEach((key) => {
    it("shouldn’t change the apostrophe:\n", () => {
      assert.equal(normalizeApostrophes(key), falsePositives[key]);
    });
  });
});


describe("(c→l) Normalize homoglyphs:\n", () => {
  // Cyrillic+Stray Latin | Cyrillic | Latin
  let homoglyphsCyrLat = [
    ["Aкорд", "Акорд", "Akord"], // A
    ["Вера", "Вера", "Vera"], // a
    ["Bеранда", "Веранда", "Veranda"], // B
    ["Cтраа", "Страа", "Straa"], // C
    ["cтраа", "страа", "straa"], // c
    ["Eбола", "Ебола", "Ebola"], // E
    ["ебола", "ебола", "ebola"], // e
    ["Hаїдж", "Наїдж", "Najidž"], // H
    ["Iля", "Іля", "Iľa"], // I
    ["iз", "із", "iz", "skipStray"], // i
    ["Kажда", "Кажда", "Každa"], // K
    ["Mосква", "Москва", "Moskva"], // M
    ["Oрличaн", "Орличан", "Orlyčan"], // O
    ["oчі", "очі", "oči"], // o
    ["Pозточaн", "Розточан", "Roztočan"], // P
    ["pомaнтік", "романтік", "romantik"], // p
    ["Tакый", "Такый", "Takŷj"], // T
    ["Xрістoс", "Хрістос", "Christos"], // X
    ["xрін", "хрін", "chrin"], // x
    ["xpін", "хрін", "chrin", "skipStray"], // xp
    ["Yж", "Уж", "Už", "skipStray"], // Y
    ["yжытём", "ужытём", "užŷťom"], // y
  ];

  homoglyphsCyrLat = [
    ...homoglyphsCyrLat,
    ...mapArrayToUpperCase(homoglyphsCyrLat),
  ];

  homoglyphsCyrLat.forEach(
    ([input, expectedCyrillic, expectedLatin, exception]) => {
      if (exception == undefined) {
        it("(cyr → cyr) should consolidate stray Latin characters:\n", () => {
          assert.equal(normalizeHomoglyphs(input, "latCyr"), expectedCyrillic);
        });

        it("(cyr → cyr → cyr) should consolidate stray Latin characters:\n", () => {
          assert.equal(
            normalizeHomoglyphs(normalizeHomoglyphs(input, "latCyr"), "latCyr"),
            expectedCyrillic
          );
        });

        it("(cyr → cyr) (module) should consolidate stray Latin characters:\n", () => {
          assert.equal(translit(input, "latCyr"), expectedCyrillic);
        });
      }

      it("(lat → lat) shouldn’t change Latin words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(expectedLatin, "cyrLat"),
          expectedLatin
        );
      });

      it("(lat → lat → lat) shouldn’t change Latin words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedLatin, "cyrLat"),
            "cyrLat"
          ),
          expectedLatin
        );
      });

      it("(cyr → cyr) shouldn’t change Cyrillic words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(expectedCyrillic, "latCyr"),
          expectedCyrillic
        );
      });

      it("(cyr → cyr → cyr) shouldn’t change Cyrillic words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedCyrillic, "latCyr"),
            "latCyr"
          ),
          expectedCyrillic
        );
      });

      it("(cyr → lat → cyr) shouldn’t change Cyrillic words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedCyrillic, "cyrLat"),
            "latCyr"
          ),
          expectedCyrillic
        );
      });

      it("(lat → cyr → lat) shouldn’t change Latin words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedLatin, "latCyr"),
            "cyrLat"
          ),
          expectedLatin
        );
      });

      it("(cyr → lat) (module) should convert to Latin correctly:\n", () => {
        assert.equal(translit(input, "cyrLat"), expectedLatin);
      });
    }
  );
});


describe("(l→c) Normalize homoglyphs:\n", () => {
  let homoglyphsLatCyr = [
    // Latin+Stray Cyrillic | Latin | Cyrillic
    ["Аkord", "Akord", "Акорд"], // A
    ["аkord", "akord", "акорд"], // a
    ["Вraňo", "Braňo", "Бранё"], // B
    ["Сejlon", "Cejlon", "Цейлон"], // C
    ["сela", "cela", "цела"], // c
    ["Еvakuacija", "Evakuacija", "Евакуація"], // E
    ["еvakuacija", "evakuacija", "евакуація"], // e
    ["Нirkŷ", "Hirkŷ", "Гіркы"], // H
    ["Іľa", "Iľa", "Іля"], // I
    ["іz", "iz", "із", "skipStray"], // i
    ["Кoňi", "Koňi", "Конї"], // K
    ["Мyž’o", "Myž’o", "Мижё"], // M
    ["Оtec’", "Otec’", "Отець"], // O
    ["оtec’", "otec’", "отець"], // o
    ["Рtašata", "Ptašata", "Пташата"], // P
    ["рtašata", "ptašata", "пташата"], // P
    ["Тeper’", "Teper’", "Теперь"], // T
    ["Teхt", "Text", "Текст"], // x
    ["vŷstupуtу", "vŷstupyty", "выступити"], // y
  ];

  homoglyphsLatCyr = [
    ...homoglyphsLatCyr,
    ...mapArrayToUpperCase(homoglyphsLatCyr),
  ];

  homoglyphsLatCyr.forEach(
    ([input, expectedLatin, expectedCyrillic, exception]) => {
      if (exception == undefined) {
        it("(lat → lat) should consolidate stray Cyrillic characters:\n", () => {
          assert.equal(normalizeHomoglyphs(input, "cyrLat"), expectedLatin);
        });

        it("(lat → lat → lat) should consolidate stray Cyrillic characters:\n", () => {
          assert.equal(
            normalizeHomoglyphs(normalizeHomoglyphs(input, "cyrLat"), "cyrLat"),
            expectedLatin
          );
        });
      }

      it("(cyr → cyr) shouldn’t change Cyrillic words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(expectedCyrillic, "latCyr"),
          expectedCyrillic
        );
      });

      it("(cyr → cyr → cyr) shouldn’t change Cyrillic words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedCyrillic, "latCyr"),
            "latCyr"
          ),
          expectedCyrillic
        );
      });

      it("(lat → lat) shouldn’t change Latin words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(expectedLatin, "cyrLat"),
          expectedLatin
        );
      });

      it("(lat → lat → lat) shouldn’t change Latin words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedLatin, "cyrLat"),
            "cyrLat"
          ),
          expectedLatin
        );
      });

      it("(lat → cyr → lat) shouldn’t change Latin words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedLatin, "latCyr"),
            "cyrLat"
          ),
          expectedLatin
        );
      });

      it("(cyr → lat → cyr) shouldn’t change Cyrillic words:\n", () => {
        assert.equal(
          normalizeHomoglyphs(
            normalizeHomoglyphs(expectedCyrillic, "cyrLat"),
            "latCyr"
          ),
          expectedCyrillic
        );
      });

      it("(lat → cyr) (module) should convert to Cyrillic correctly:\n", () => {
        assert.equal(translit(input, "latCyr"), expectedCyrillic);
      });

      it("(lat → lat) (module) should consolidate stray Cyrillic characters:\n", () => {
        assert.equal(translit(input, "cyrLat"), expectedLatin);
      });
    }
  );
});


describe("(unit) Uppercase tests:\n", () => {
  let testCase = {
    // correct identification of Upper Case
    "Single uppercase word BRAŇO": "Single uppercase word БРАНЁ",

    // Upper case false positives
    "lower case string": "lower case string",
    "Title Case String": "Title Case String",
    "Sentence case string": "Sentence case string",
    "A sentence case string": "A sentence case string",
    "Ŷ": "Ŷ", // SINGLE LETTER WITHOUT UPPERCASE CONTEXT
    "Ы": "Ы", // SINGLE LETTER WITHOUT UPPERCASE CONTEXT

    // Upper case variations
    "ONE LETTER G JI UPPER CASE": "ОНЕ ЛЕТТЕР Ґ Ї УППЕР ЦАСЕ",
    "ONE LETTER G JI JA UPPER CASE": "ОНЕ ЛЕТТЕР Ґ Ї Я УППЕР ЦАСЕ",
    "ONE LETTER G V V UPPER CASE": "ОНЕ ЛЕТТЕР Ґ В В УППЕР ЦАСЕ",
    "ONE LETTER G UPPER CASE": "ОНЕ ЛЕТТЕР Ґ УППЕР ЦАСЕ",
    "G STARTING JU UPPERCASE": "Ґ СТАРТІНҐ Ю УППЕРЦАСЕ",
    "ENDING JA UPPER CASE G": "ЕНДІНҐ Я УППЕР ЦАСЕ Ґ",
    "UPPERCASE UPPERCASE": "УППЕРЦАСЕ УППЕРЦАСЕ",
    "G V UPPERCASE": "Ґ В УППЕРЦАСЕ",
    "G V V UPPERCASE": "Ґ В В УППЕРЦАСЕ",

    // Special boundaries
    "G-V-UPPERCASE": "Ґ-В-УППЕРЦАСЕ",
    "G–V–UPPERCASE": "Ґ–В–УППЕРЦАСЕ",
    "G—V—UPPERCASE": "Ґ—В—УППЕРЦАСЕ",
    "«G V V UPPERCASE»": "«Ґ В В УППЕРЦАСЕ»",
    "«UPPERCASE G V V»": "«УППЕРЦАСЕ Ґ В В»",
    "„G V V UPPERCASE“": "„Ґ В В УППЕРЦАСЕ“",
    "„UPPERCASE G V V“": "„УППЕРЦАСЕ Ґ В В“",
    "UPPERCASE G V V:": "УППЕРЦАСЕ Ґ В В:",
    "UPPERCASE G V V;": "УППЕРЦАСЕ Ґ В В;",

    "C’ilŷj": "C’ilŷj", //false positive
    "Цїлый": "Цїлый", //false positive

    ...mapObjectToUpperCase(lowerCaseWords),
  };

  Object.keys(testCase).forEach((key) => {
    it("Latin → Cyrillic:\n", () => {
      assert.equal(processUpperCase(key, "latCyr"), testCase[key]);
    });
    it("Cyrillic → Cyrillic:\n", () => {
      assert.equal(processUpperCase(testCase[key], "latCyr"), testCase[key]);
    });
    it("Cyrillic → Latin:\n", () => {
      assert.equal(processUpperCase(testCase[key], "cyrLat"), key);
    });
    it("Latin → Latin (no change):\n", () => {
      assert.equal(processUpperCase(key, "cyrLat"), key);
    });
  });
});
