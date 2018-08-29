const gulp = require('gulp');
const prettyError = require('gulp-prettyerror');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const baseDir = './themes/quotesondev-theme';

// Create basic Gulp tasks

gulp.task('sass', function() {
  return gulp
    .src(baseDir + '/sass/style.scss', { sourcemaps: true })
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('./'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(baseDir + '/build/css'));
});

gulp.task('lint', function() {
  return gulp
    .src([baseDir + '/js/*.js'])
    .pipe(prettyError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(
  'scripts',
  gulp.series('lint', function() {
    return gulp
      .src(baseDir + '/js/*.js')
      .pipe(babel({
        presets: ['latest']
       }))
      .pipe(uglify())
      .pipe(
        rename({
          extname: '.min.js'
        })
      )
      .pipe(gulp.dest(baseDir + '/build/js'));
  })
);

// Set-up BrowserSync and watch

gulp.task('browser-sync', function() {
  const files = [
    baseDir + '/build/css/*.css',
    baseDir + '/build/js/*.js',
    baseDir + '/*.php',
    baseDir + '/**/*.php'
  ];

  browserSync.init(files, {
    proxy: 'localhost:8888/quotes-on-dev'
  });

  gulp.watch(files).on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch(baseDir + '/js/*.js', gulp.series('scripts'));
  gulp.watch(baseDir + '/sass/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('watch'));
