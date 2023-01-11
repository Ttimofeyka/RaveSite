const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');


const minifyHTML = () => gulp.src('src/index.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        ignoreCustomFragments: [/<pre[\s\S]*pre>/]
    }))
    .pipe(gulp.dest('dist'))

const minifyCSS = () => gulp.src('dist/**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist'))

const copyToDist = () => gulp.src(['src/**', '!src/input.css', '!src/index.html'])
    .pipe(gulp.dest('dist'));


exports.default = gulp.series(copyToDist, minifyHTML, minifyCSS);