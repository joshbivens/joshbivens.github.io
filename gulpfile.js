var gulp = require('gulp');  
var sass = require('gulp-sass');  
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('sass', () => {  
  gulp.src('scss/styles.scss')
    .pipe(sass({includePaths: ['scss']}))
    .pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('uglify', () =>{
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('imagemin', () =>) {
  gulp.src('./img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('browser-sync', () => {  
  browserSync.init(["css/*.css", "js/*.js"], {
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['sass', 'browser-sync', 'imagemin'], () => {  
  gulp.watch("scss/*.scss", ['sass']);
});