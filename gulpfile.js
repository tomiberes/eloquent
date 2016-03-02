'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const less = require('gulp-less');
const manifest = require('gulp-manifest');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const envify = require('envify/custom');
const watchify = require('watchify');
const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');
const conf = {
  name: 'eloquent',
  src: {
    root: './src/',
    app: './src/app.js',
    style: './src/styles/index.less',
    templates: './src/templates/',
    server: './src/server.js'
  },
  dest: './build/',
  manifest: 'ditr.manifest'
};

function logMessage(message) {
  gutil.log(message);
  browserSync.notify(message);
}

function logError(err) {
  gutil.log(err.message);
  browserSync.notify(err.message);
}

function scripts(watch) {
  let bundler = browserify(conf.src.app, {
    basedir: __dirname,
    debug: watch,
    extensions: ['.js', '.jsx'],
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  });
  bundler.transform(babelify.configure({
    sourceMapRelative: conf.root
  }));
  bundler.transform(envify({
    NODE_ENV: watch ? 'development' : 'production'
  }));

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
    bundler.on('time', (time) => {
      logMessage('Build time: ' + time / 1000 + ' s');
    });
  } else {
    bundler.transform({
      global: true
    }, 'uglifyify');
  }

  function bundle() {
    logMessage('Building Scripts...');
    return bundler.bundle()
      .on('error', (err) => logError(err))
      .pipe(source(conf.name + '.js'))
      .pipe(gulp.dest(conf.dest + 'js'));
  }

  return bundle();
}

function startBrowserSync() {
  browserSync.init({
    server: {
      baseDir: conf.dest,
      middleware: historyApiFallback()
    },
    files: [
      conf.dest + '*.html',
      conf.dest + 'js/*.js',
      conf.dest + 'css/*.css'
    ]
  });
}

gulp.task('scripts', () =>scripts(false));

gulp.task('scripts:watch', () => scripts(true));

gulp.task('less', () => {
  return gulp.src(conf.src.style)
    .pipe(less())
    .on('error', (err) => logError(err))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(conf.dest + 'css'));
});

gulp.task('copy', () => {
  return gulp.src(conf.src.templates + 'index.html')
    .pipe(gulp.dest(conf.dest));
});

gulp.task('manifest', () => {
  return gulp.src([conf.dest + '**/*'])
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['http://*', 'https://*', '*'],
      filename: conf.manifest,
      exclude: conf.manifest
    }))
    .pipe(gulp.dest(conf.dest));
});

gulp.task('build', ['scripts', 'less', 'copy'], () => {});

gulp.task('watch', ['scripts:watch', 'less', 'copy'], () => {
  startBrowserSync();
  gulp.watch(conf.src.root + '**/*.less', ['less']);
  gulp.watch(conf.src.templates + '**/*.html', ['copy']);
});

gulp.task('default', () => gutil.log('Not defined, use specific tasks.'));
