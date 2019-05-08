'use strict';

// This is the ES6 style of importing. If you want to use it you need to make sure you install this:
// npm install --save-dev @babel/register
// and then set the file name to gulpfile.babel.js instead of gulpfile.js. Babel is what transpiles the language at runtime
// from ES6 to browser compatible code.

// Also below you can see that I'm using a technique to deconstruct the export.
// import gulp from 'gulp' is the same as const gulp = require('gulp');
// import { parallel } from 'gulp' is the same as const parallel = require('gulp').parallel;
import gulp, { parallel, series, watch } from 'gulp';

// This renames the file so you can have index.js changed into app.js.
import rename from 'gulp-rename';

// This is necessary to compile SCSS.
import sass from 'gulp-sass';

// This allows you to transpile ES6+ syntax to browser friendly code.
import babel from 'gulp-babel';

// This is a helper library.
import del from 'del';

/**
 * This task cleans and deletes the 'dist' directory before the other scripts run.
 */
gulp.task('clean', () => {
  return del(['dist']);
});

/**
 * This task just looks for a glob of *.scss in the app directory and will compile each of the files.
 */
gulp.task('scss', () => {
  // Here you can add more commands into the pipeline, i.e. Source Maps, Autoprefixers, etc.
  return gulp.src('app/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});

/**
 * This is specifically looking for only one JS file named app.js and outputting it into the dist directory.
 */
gulp.task('js', () => {
  // Babel is what is letting you use newer JS syntax.
  return gulp.src('app/js/index.js')
    .pipe(babel())
    .pipe(rename('app.js'))
    .pipe(gulp.dest('dist'));
});

/**
 * The default task for when you just run 'gulp' by itself. If this doesn't exist gulp just doesn't work. The handy part is that we can call it
 * when we call watch, so that it runs this first.
 */
gulp.task('default', series('clean', parallel('scss', 'js')));

/**
 * This is the watch task, by default it does not compile your scripts when you first run, it is just watching for changes. So in order to fix that,
 * you do a series() which calls default first, then anything following it. The reason we use series, is because we want the default command to run
 * before it starts watching. Otherwise, you'll have race conditions.
 */
gulp.task('watch', series('default', (done) => {
  watch(['app/**/*.scss', 'app/js/**/*.js'], series('clean', parallel('scss', 'js')));

  done();
}));
