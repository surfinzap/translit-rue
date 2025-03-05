import assert from "assert";
import { translit } from "../src/translit.js";
import { mapObjectToUpperCase, lowerCaseWords } from "./scaffolding.js";

describe("Module tests:\n", () => {
  let testCase = {
    "ji": "ї",
    "ŷ": "ы",
    "Ji": "Ї",

    ...lowerCaseWords,
    ...mapObjectToUpperCase(lowerCaseWords),
  };

  Object.keys(testCase).forEach((key) => {
    it("Lat → Cyr:\n", () => {
      assert.equal(translit(key, "latCyr"), testCase[key]);
    });
    it("Lat → Lat (no change):\n", () => {
      assert.equal(translit(key, "cyrLat"), key);
    });
    it("Lat → Cyr → Lat (no change):\n", () => {
      assert.equal(translit(translit(key, "latCyr"), "cyrLat"), key);
    });
    it("Cyr → Lat:\n", () => {
      assert.equal(translit(testCase[key], "cyrLat"), key);
    });
    it("Cyr → Cyr (no change):\n", () => {
      assert.equal(translit(testCase[key], "latCyr"), testCase[key]);
    });
    it("Cyr → Lat → Cyr (no change):\n", () => {
      assert.equal(translit(translit(testCase[key], "cyrLat"), "latCyr"), testCase[key]);
    });
  });
});

