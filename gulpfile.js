const gulp = require('gulp');

const gulpClean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const srcPath = './css/scss/**/*.scss';
const distPath = './css';
const cleanupPath = './css/common.css';

function compile_sass(cb) {
  return gulp
    .src(srcPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      // cascade: false,
      overrideBrowserslist: ['last 4 version', '> 5%']
    }))
    .pipe(gulp.dest(distPath))
}

function watch_sass(cb) {
  return gulp
    .watch(srcPath, compile_sass);
}

// gulp.task('sass', function () {
//   var plugins = [
//   autoprefixer({ browsers: ['last 3 version', '> 5%'] })
//   ]
//   return gulp.src('./source/scss/**/*.scss')
//   .pipe($.plumber())
//   .pipe($.sourcemaps.init())
//   .pipe($.sass().on('error', $.sass.logError))
//   // sass 編譯完成
//   .pipe($.postcss(plugins))
//   .pipe($.if(options.env === 'production', $.cleanCss()))
//   .pipe($.sourcemaps.write('.'))
//   .pipe(gulp.dest('./public/'))
//   .pipe(browserSync.stream())
//   })

function clean(cb) {
  return gulp
    .src(cleanupPath, {read: false})
    .pipe(gulpClean());
};

exports.dev = gulp.series(clean, compile_sass, watch_sass);