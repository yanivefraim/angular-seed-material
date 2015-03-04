'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify'); 
var paths = require('./gulp.config.json');
var plato = require('plato');
gulp.task('default', function() {
	
});

/**
 * Lint the code, create coverage report, and a visualizer
 * @return {Stream}
 */
gulp.task('analyze', function() {
    log('Analyzing source with JSHint, JSCS, and Plato');

    var jshint = analyzejshint([].concat(paths.js));
    var jscs = analyzejscs([].concat(paths.js));

    startPlatoVisualizer();

    return merge(jshint, jscs);
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src(['./app/**/*.js'])
    .pipe(ngAnnotate())
    .pipe(concat('script.js'))

    //.pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});



/**
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 */
function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    log('Running JSHint');
    log(sources);
    return gulp
        .src(sources)
        .pipe(plug.jshint(jshintrcFile))
        .pipe(plug.jshint.reporter('jshint-stylish'));
}

/**
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 */
function analyzejscs(sources) {
    log('Running JSCS');
    return gulp
        .src(sources)
        .pipe(plug.jscs('./.jscsrc'));
}

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer() {
    log('Running Plato');

    var files = glob.sync('./app/**/*.js');
    var excludeFiles = /\/app\/.*\.spec\.js/;

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = './report/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        log(overview.summary);
    }
}