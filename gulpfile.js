'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
	
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src(['./app/**/*.js'])
    .pipe(concat('script.js'))
    //.pipe(stripDebug())
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});