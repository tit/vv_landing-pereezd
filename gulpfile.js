'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');
var clc = require('cli-color');
var sourcemaps = require('gulp-sourcemaps');
var cached = require('gulp-cached');
var sassPartialsImported = require('gulp-sass-partials-imported');
var svgmin = require('gulp-svgmin');

var stylesPath = 'assets/styles/**/*.{scss,sass}';
var svgPath = 'assets/styles/images/*.svg';

gulp.task('style', function () {
    gulp.src(stylesPath)
        .pipe(plumber())
        .pipe(cached('sassfiles'))
        .pipe(sassPartialsImported('assets/styles/'))
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: stylesPath }).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    '> 0.5% in RU',
                    'last 2 versions',
                    'ie 10-11',
                    'iOS 8'
                ]
            }),
        ]))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../../assets/styles'
        }))
        .pipe(gulp.dest(function (file) {
            console.log(clc.green('SASS file compiled: ' + file.path));
            return file.base;
        }));
});

gulp.task('svgmin', function () {
    gulp.src(svgPath)
        .pipe(svgmin({
            plugins: [{
                cleanupIDs: false
            },
            {
                removeTitle: true
            }]
        }))
        .pipe(gulp.dest(function (file) {
            console.log(clc.green('SVG icon optimized: ' + file.path));
            return file.base;
        }));
});

gulp.task('watch', function () {
    gulp.watch(stylesPath, ['style']);
});

gulp.task('default', ['style', 'watch']);
