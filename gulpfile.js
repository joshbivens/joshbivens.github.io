var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './',
  });

  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('sass', function() {
  gulp
    .src('./scss/main.scss')
    .pipe(sass({ includePaths: ['scss'] }))
    .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('uglify', function() {
  gulp
    .src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('imagemin', function() {
  gulp
    .src('./img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('default', ['serve']);
