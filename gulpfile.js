const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cssbeautify = require('gulp-cssbeautify');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const purgecss = require("gulp-purgecss");

// Compile SCSS to CSS
function style() {
  return gulp.src('./src/assets/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssbeautify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
}

// Remove unused CSS
function purgeCss() {
  return gulp.src("./src/assets/css/*.css")
    .pipe(
      purgecss({
        content: ["./src/*.html", "./src/assets/js/*.js"],
      })
    )
    .pipe(gulp.dest("dist/css"));
}

// Include HTML files
function htmlfileinclude() {
  return gulp.src('./src/html/pages/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
}

// Watch for file changes
function watch() {
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  });

  gulp.watch('./src/assets/sass/**/*.scss', style);
  gulp.watch('./src/html/partials/*.html', htmlfileinclude);
  gulp.watch('./src/html/pages/*.html', htmlfileinclude);
  gulp.watch(['./src/html/**/*.html', './src/assets/sass/**/*.scss']).on('change', browserSync.reload);
}

// Build task
const build = gulp.series(style, purgeCss);

exports.style = style;
exports.purgeCss = purgeCss;
exports.htmlfileinclude = htmlfileinclude;
exports.watch = watch;
exports.build = build;
