var gulp = require("gulp");
const replace = require("gulp-replace");
const header = require("gulp-header");
var uglify = require("gulp-uglify");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");


var paths = {
  browser: {
    src: "src/browser_translit.js",
    name: "translit.min.js",
    dest: "dist/",
  },
  npm: {
    src: "src/translit.js",
    name: "translit_dist.min.js",
    dest: "dist/",
  },
  copyright: {
    src: "src/translit.js",
    dest: "src/",
  },
};

const packageJson = require("./package.json");
const currentYear = new Date().getFullYear();


// Copyright banner for the minified files
const copyrightBanner = `/*!
 * Translit v${packageJson.version} (Rusyn transliteration)
 * Copyright 2014–${currentYear} Braňo Šandala (https://brano.me)
 * 
 * app: https://tota.sk/translit
 * src: https://github.com/surfinzap/translit-rue
 * 
 * Licensed under MIT (https://github.com/surfinzap/translit-rue/blob/main/LICENSE.txt)
 */
`;


function updateCopyrightBanner() {
  const bannerRegex = /\/\*![\s\S]*?\*\/\s*/;

  return gulp
    .src(paths.copyright.src)
    .pipe(replace(bannerRegex, ""))
    .pipe(header(copyrightBanner))
    .pipe(gulp.dest(paths.copyright.dest));
}

/*
 * Define our tasks using plain functions
 */

function browserBuild() {
  return browserify({ entries: paths.browser.src, debug: false })
    .transform(babelify)
    .bundle()
    .pipe(source(paths.browser.name))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.browser.dest));
}

function npmBuild() {
  return browserify({
    entries: paths.npm.src,
    debug: false,
    standalone: "translit",
  })
    .transform(babelify, { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source(paths.npm.name))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.npm.dest));
}

function watch() {
  gulp.watch(paths.npm.src, npmBuild);
  gulp.watch(paths.browser.src, browserBuild);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(npmBuild, browserBuild);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */

exports.scripts = npmBuild;
exports.watch = watch;
exports.build = build;
// default task that can be called by just running `gulp` from cli
exports.default = build;

exports.updateCopyrightBanner = updateCopyrightBanner;
