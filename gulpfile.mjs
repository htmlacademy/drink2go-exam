import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from 'gulp-postcss';
import postUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import terser from 'gulp-terser';
import sharp from 'gulp-sharp-responsive';
import svgo from 'gulp-svgmin';
import { stacksvg } from "gulp-stacksvg";
import { deleteAsync } from 'del';
import browser from 'browser-sync';
import bemlinter from 'gulp-html-bemlinter';
import { htmlValidator } from "gulp-w3c-html-validator";

const sass = gulpSass(dartSass);
let isDevelopment = true;

export function processMarkup () {
  return gulp.src('project/*.html')
    .pipe(gulp.dest('build'));
}

export function lintBem () {
  return gulp.src('project/*.html')
    .pipe(bemlinter());
}

export function validateMarkup () {
  return gulp.src('project/*.html')
		.pipe(htmlValidator.analyzer())
		.pipe(htmlValidator.reporter({ throwErrors: true }));
}

export function processStyles () {
  return gulp.src('project/sass/*.scss', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts () {
  return gulp.src('project/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

export function optimizeImages () {
  return gulp.src('project/images/**/*.{png,jpg}')
    .pipe(sharp(isDevelopment ? {
      includeOriginalFile: true,
      formats: [
        { format: 'webp' }
      ]
    } : {
      formats: [
        {
          jpegOptions: {
            progressive: true,
            mozjpeg: true
          },
          pngOptions: {
            palette: true
          }
        },
        {
          format: 'webp',
          webpOptions: {
            effort: 6
          }
        }
      ]
    }))
    .pipe(gulp.dest('build/images'));
}

export function createWebp () {
  return gulp.src('project/images/**/*.{png,jpg}')
    // .pipe(squoosh({
    //   webp: {}
    // }))
    .pipe(gulp.dest('build/images'))
}

export function optimizeVector () {
  return gulp.src(['project/images/**/*.svg', '!project/images/icons/**/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/images'));
}

export function createStack () {
  return gulp.src('project/images/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(gulp.dest('build/images/icons'));
}

export function copyAssets () {
  return gulp.src([
    'project/fonts/**/*.{woff2,woff}',
    'project/*.ico',
    'project/*.webmanifest',
  ], {
    base: 'project'
  })
    .pipe(gulp.dest('build'));
}

export function startServer (done) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reloadServer (done) {
  browser.reload();
  done();
}

function compileProject (done) {
  gulp.parallel(
    processMarkup,
    processStyles,
    processScripts,
    optimizeVector,
    createStack,
    copyAssets,
    optimizeImages,
    createWebp
  )(done);
}

function deleteBuild () {
  return deleteAsync('build');
}

export function buildProd (done) {
  isDevelopment = false;
  gulp.series(
    deleteBuild,
    compileProject
  )(done);
}
