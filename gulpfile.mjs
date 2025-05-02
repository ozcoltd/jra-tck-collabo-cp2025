import gulp from 'gulp';
import browserSyncModule from 'browser-sync';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import ejs from 'gulp-ejs';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import changed from 'gulp-changed';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';

const browserSync = browserSyncModule.create();
const sass = gulpSass(dartSass);

const srcDir = './src';
const destDir = './htdocs';

const errorHandler = () =>
  plumber({ errorHandler: notify.onError('<%= error.message %>') });

const server = done => {
  browserSync.init({ server: { baseDir: destDir } });
  done();
};

const compileSass = () => {
  return gulp
    .src([`${srcDir}/assets/scss/*.scss`])
    .pipe(errorHandler())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${destDir}/assets/css/`))
    .pipe(browserSync.stream());
};

const ejsTask = () => {
  return gulp
    .src(`${srcDir}/ejs/**/!(_)*.ejs`)
    .pipe(errorHandler())
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(`${destDir}/`))
    .pipe(browserSync.stream());
};

const jsTask = async () => {
  const webpackConfig = (await import('./webpack.config.js')).default;
  return gulp
    .src(`${srcDir}/assets/js/**/*.js`)
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(`${destDir}/assets/js/`))
    .pipe(browserSync.stream());
};

const imagesTask = () => {
  return gulp
    .src(`${srcDir}/assets/images/**/*.{jpg,jpeg,png,gif}`, { encoding: false })
    .pipe(changed(`${destDir}/assets/img`))
    .pipe(imagemin([
      imageminMozjpeg({ quality: 65, progressive: true }),
      imageminPngquant({ quality: [0.6, 0.7], speed: 1 })
    ]))
    .pipe(gulp.dest(`${destDir}/assets/img`))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  gulp.watch(`${srcDir}/assets/scss/**/*.scss`, compileSass);
  gulp.watch(`${srcDir}/assets/js/**/*.js`, jsTask);
  gulp.watch(`${srcDir}/ejs/**/*.ejs`, ejsTask);
  gulp.watch(`${srcDir}/assets/images/**/*.{jpg,jpeg,png,gif}`, imagesTask);
  gulp.watch(`${destDir}/**/*.html`).on('change', browserSync.reload);
};

const baseTask = gulp.parallel(compileSass, ejsTask, jsTask);
const build = gulp.series(baseTask, server, watchFiles);
export default build;
