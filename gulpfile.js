const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function sassCompilation() {
  return gulp
    .src("styles/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("build/"));
}

function gulpJs() {
  return gulp
    .src("scripts/*.js")
    .pipe(concat("giraflor-blackFriday.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("build/"));
}

function gulpWatch() {
  gulp.watch("styles/**/*.scss", sassCompilation);
  gulp.watch("scripts/*.js", gulpJs);
}

exports.sassCompilation = sassCompilation;
exports.gulpJs = gulpJs;
exports.gulpWatch = gulpWatch;

exports.default = gulp.parallel(gulpWatch, sassCompilation, gulpJs);
