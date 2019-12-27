var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


var paths = {
	browser: {
		src: 'src/browser_translit.js',
		name: 'translit.min.js',
		dest: 'dist/'
	},
	npm: {
		src: 'src/translit.js',
		name: 'translit_dist.min.js',
		dest: 'dist/'
	}
};



/*
 * Define our tasks using plain functions
 */

function browserBuild() {
	return gulp.src(paths.browser.src, { sourcemaps: false })
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat(paths.browser.name))
		.pipe(gulp.dest(paths.browser.dest));
}

function npmBuild() {
	return gulp.src(paths.npm.src, { sourcemaps: false })
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat(paths.npm.name))
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
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
