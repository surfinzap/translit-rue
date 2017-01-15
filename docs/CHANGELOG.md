# Changelog for Rusyn transliterate

## 1.0.1 // 2017-01-15
* hotfix: dji > дъї (e.g. predjidlo > предъїдло)
* hotfix: ž'a > жя, ž'i > жї, ž'o > жё, ž'u > жю (e.g. Myž'a > Мижя)


## 2016-08-24
 * 1.0.0 released. This is a major version as it was tested on and used for transliteration of a book Червеный берег (by Людміла Шандалова).
 * include exceptions for "Joho, joho, Jomu, jomu, ser'jozno, ...ňo..., ťoj, zjavyla, zjemnyty, ...ľľa..., plaksyvo ..."
 * improve transliteration of soft and hard signs
 * improve transliteration of "vowel + ё"
 * set exceptions for taxi and text

## 2016-01-21
 * 0.29 released
 * fix streamline_apostrophes

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
