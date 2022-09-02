# Changelog for Rusyn transliterate

## 2.1.0 // 2022-09-

### 🐛 Fixes
- superlative adjectives where a prefix “naj” follows a vowel are now transliterated properly:
  - ⛔ before: najatraktivňišŷj → наятрактівнїшый
  - ✅ now: najatraktivňišŷj → найатрактівнїшый
- improve identification of soft vowels (ja, je, ji, jo, ju) at the beginning of the word
  - ⛔ before: jojkaňa → йойканя
  - ✅ now: jojkaňa → ёйканя
- improve identification of soft vowels (ja, je, ji, jo, ju) before a vowel:
  - ⛔ before: функціёв → funkci’ov
  - ✅ now: функціёв → funkcijov
- improve identification of “Дъ” + “я, є, ї, ё, ю”:
  - ⛔ before: передъюновый → peredъjunovŷj
  - ✅ now: передъюновый → peredjunovŷj
- improve transliteration for doubled “ďď, ťť, ňň, ľľ”, followed by vowels “a, e, i, o, u”
  - ⛔ before: oďďilena → одьдїлена
  - ✅ now: oďďilena → оддїлена
  - ⛔ before: життя → žytťa
  - ✅ now: життя → žyťťa
- improve mapping when “d” or “n” acts as a hard consonant before soft vowels (ja, je, ji, jo, ju):
  - ⛔ before: injekcia → інєкція
  - ✅ now: injekcia → інъєкція
  - ⛔ before: інъєкція → inъjekcija
  - ✅ now: інъєкція → injekcia
  - ⛔ before: nadjazd → надязд
  - ✅ now: nadjazd → надъязд
  - ⛔ before: надъязд → nadъjazd
  - ✅ now: надъязд → nadjazd
- improve signalization of hard sign after “b”:
  - ⛔ before: объїсти → obъjisty
  - ✅ now: объїсти → objisty
- improve mapping of consecutive soft vowels (ja, je, ji, jo, ju):
  - ⛔ before: Ёёёй → Jo’o’oj
  - ✅ now: Ёёёй → Jojojoj




### 🔨 Maintenance
- Add more unit and module tests to test edge cases



## 2.0.7 // 2022-06-25
There are no changes in functionality in this release.

### Maintenance
- Update NPM packages to their latest versions



## 2.0.6 // 2022-06-25
There are no changes in functionality in this release.

### Maintenance
- Update NPM packages to their latest versions



## 2.0.1 // 2020-07-27
There are no changes in functionality in this release

### Maintenance
- Update NPM packages to their latest versions



## 2.0.0 // 2019-12-28
* Refactor translit so it can be used as NPM package ([translit-rue](https://www.npmjs.com/package/translit-rue)) or minified JavaScript library
* Labeled as major version because it introduces breaking changes (different function names). ([View README.md](https://github.com/surfinzap/translit/blob/master/README.md)) for details of use.



## 1.0.2 // 2019-12-23
* Release translit as an NPM package ([translit-rue](https://www.npmjs.com/package/translit-rue))



## 1.0.1 // 2017-01-15
* hotfix: dji > дъї (e.g. predjidlo > предъїдло)
* hotfix: ž'a > жя, ž'i > жї, ž'o > жё, ž'u > жю (e.g. Myž'a > Мижя)
* update: change punctuation from apostrophe to right single quotation mark



## 2016-08-24
 * 1.0.0 released. This is a major version as it was tested on and used for transliteration of a book Червеный берег (by Людміла Шандалова).
 * include exceptions for "Joho, joho, Jomu, jomu, ser'jozno, ...ňo..., ťoj, zjavyla, zjemnyty, ...ľľa..., plaksyvo ..."
 * improve transliteration of soft and hard signs
 * improve transliteration of "vowel + ё"
 * set exceptions for taxi and text

## 2016-01-21
 * 0.29 released
 * fix streamlineApostrophes

## 2015-10-13
 * 0.28 released
 * fix for ch —> х
 * another apostrophe streamlining (’)
 * added exception for joj, Joj

## 2015-09-27
 * 0.27 released
 * apostrophes streamlining (if you were to use ‘ in source latin text, it gets recognized the same way as preferred apostrophe — ')

## 2015-09-21
 * 0.26 released
 * closure to set the scope of javascript functions
 * tests rewritten for javascript
 * added support in javascript for:
    *	"c'u" —> "цю",
    *	"s'u" —> "сю",
    * "r'u" —> "рю",
    * "z'u" —> "зю",

## 2015-09-17
 * 0.25 released
 * script rewritten to javascript
 * text —> текст error fixed

## 2015-09-13
 * 0.24 released
 * added support for
    *	"c'u" —> "цю",
    *	"s'u" —> "сю",
    * "r'u" —> "рю",
    * "z'u" —> "зю",

## 2015-08-04
 * 0.23 released
 * c'a fixed for lower and upper case
 * re-added support for ďo, ťo, ňo, ľo transliterating to дё, тё, нё, лё


## 2015-06-26
 * 0.22 released
 * hotfix for Ňanu
 * added special transliteration case — "ojo"

## 2015-01-11
 * 0.21 released
 * added support for ďu, ťu, ňu, ľu
 * added support for ďe, ťe, ňe, ľe
 * do, to, no, lo is supported as льо, not лё


## 2015-01-11
 * 0.2 released
 * character mapping and syllable mapping was merged into a single dictionary

## Summer 2014
 * 0.1 released
