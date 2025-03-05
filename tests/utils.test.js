import assert from "assert";
import { translit } from "../src/translit.js";
import { mapArrayToUpperCase } from "./scaffolding.js";
import {
  normalizeHomoglyphs,
} from "../src/utils.js";




describe("(cyr) Normalize homoglyphs:\n", () => {
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


describe("(lat) Normalize homoglyphs:\n", () => {
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
