const gulp = require('gulp'),
  prettyError = require('gulp-prettyerror'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  eslint = require('gulp-eslint'),
  browserSync = require('browser-sync'),
  babel = require('gulp-babel');

const baseDir = './themes/quotesondev-theme';

// Create basic Gulp tasks

gulp.task('sass', () => {
  return gulp
    .src(`${baseDir}/src/scss/style.scss`, { sourcemaps: true })
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
    .pipe(gulp.dest(`${baseDir}/build/css`));
});

gulp.task('lint', () => {
  return gulp
    .src([`${baseDir}/src/js/*.js`])
    .pipe(prettyError())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(
  'scripts',
  gulp.series('lint', () => {
    return gulp
      .src(`${baseDir}/src/js/*.js`)
      .pipe(
        babel({
          presets: ['es2015']
        })
      )
      .pipe(uglify())
      .pipe(
        rename({
          extname: '.min.js'
        })
      )
      .pipe(gulp.dest(`${baseDir}/build/js`));
  })
);

// Set-up BrowserSync and watch

gulp.task('browser-sync', () => {
  const files = [
    `${baseDir}/build/css/*.css`,
    `${baseDir}/build/js/*.js`,
    `${baseDir}/*.php`,
    `${baseDir}/**/*.php`
  ];

  browserSync.init(files, {
    proxy: 'localhost:8888/quotes-on-dev'
  });

  gulp.watch(files).on('change', browserSync.reload);
});

gulp.task('watch', () => {
  gulp.watch(`${baseDir}/src/js/*.js`, gulp.series('scripts'));
  gulp.watch(`${baseDir}/src/scss/*.scss`, gulp.series('sass'));
});

gulp.task('default', gulp.series('watch'));
