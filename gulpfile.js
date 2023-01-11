const gulp = require('gulp');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');


const transformHTML = () => gulp.src('src/**/*.html')
    .pipe(replace(/\.\.\/.*\/output\.css/, 'output.css'))
    .pipe(htmlmin({
        collapseWhitespace: true,
        ignoreCustomFragments: [/<pre[\s\S]*pre>/]
    }))
    .pipe(gulp.dest('docs'))

const transformCSS = () => gulp.src('docs/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('docs'))

const copyToDist = () => gulp.src(['src/**', '!src/input.css', '!src/index.html'])
    .pipe(gulp.dest('docs'));


exports.default = gulp.series(copyToDist, transformHTML, transformCSS);