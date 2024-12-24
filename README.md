# translit-rue — Rusyn transliteration

![GitHub package.json version](https://img.shields.io/github/package-json/v/surfinzap/translit-rue?color=7b00cb&style=flat)
![GitHub](https://img.shields.io/github/license/surfinzap/translit-rue?color=7b00cb&style=flat)

The Rusyn language is written in the Cyrillic script, which can be challenging to type if you don’t have the right keyboard or software.

That’s where Translit comes in—a JavaScript library designed to easily transliterate Rusyn text between the Latin alphabet and Cyrillic script. Simply type in Latin letters, and Translit will convert your text to Cyrillic (or the other way around) instantly.

## Use

### Online app
Try Translit at [https://tota.sk/translit](https://tota.sk/translit).

### NPM package

Include translit as an NPM package in your web project:

```
npm install translit-rue
```


### JS library

Download `dist/translit.min.js` and include it in your web project.



## Documentation

Transliterate text between the Cyrillic script and the Latin alphabet using the `translit(string, direction)` function. Specify the transliteration direction using the `direction` parameter.

Transliterate from Cyrillic to Latin:
```javascript
translit("Коровкы", "cyrLat"); // Output: Korovkŷ
```

Transliterate from Latin to Cyrillic:
```javascript
translit("Korovkŷ", "latCyr"); // Output: Коровкы
```


## Support & Feedback
If you like Translit, [buy me a coffee](https://ko-fi.com/branosandala) to keep the project running.


## License
Licensed under MIT license. (See [LICENCE.TXT](//github.com/surfinzap/translit/blob/master/LICENSE.txt).)


## Special thanks
- [@vit-svoboda](https://github.com/vit-svoboda) for a help with gulp pipeline (2.0.0)
