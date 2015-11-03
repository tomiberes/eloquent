'use strict';

var gulp = require('gulp');
var plug = require('gulp-load-plugins')();
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var manifest = require('gulp-manifest');
var browserSync  = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var conf = {
  name: 'eloquent',
  debug: process.env.NODE_ENV !== 'production',
  // debug: false,
  src: {
    root: './src/',
    app: './src/app.js',
    style: './src/styles/index.less',
    templates: './src/templates/',
    server: './src/server.js'
  },
  dest: './build/',
  manifest: 'ditr.manifest',
  client: {

  },
  server: {

  }
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
  var bundler = browserify(conf.src.app, {
    debug: conf.debug,
    extensions: ['.js', '.jsx']
  });
  bundler.transform(babelify.configure({
    sourceMapRelative: conf.root
  }));

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
    bundler.on('time', function(time) {
      logMessage('Build time: ' + time / 1000 + ' s');
    });
  }

  function bundle() {
    logMessage('Building Scripts...');

    var stream = bundler.bundle();
    stream.on('error', function(err) {
      logError(err);
    });

    stream = stream.pipe(source(conf.name + '.js'));

    if (!conf.debug) {
      stream.pipe(plug.streamify(plug.uglify()));
    }

    stream.pipe(gulp.dest(conf.dest + 'js'));
    // Replaced by browserSync output file watcher
    // stream.pipe(browserSync.stream({ once: true }));

    return stream;
  }

  return bundle();
}

function startBrowserSync() {
  browserSync.init({
    server: {
      baseDir: conf.dest,
      middleware: historyApiFallback()
    },
    files: [conf.dest + '*.html', conf.dest + 'js/*.js', conf.dest + 'css/*.css']
  });
}

gulp.task('scripts', function() {
  return scripts(false);
});

gulp.task('scripts:watch', function() {
  return scripts(true);
});

gulp.task('less', function() {
  return gulp.src(conf.src.style)
    .pipe(plug.less())
    .on('error', function(err) {
      logError(err);
    })
    .pipe(plug.rename('style.css'))
    .pipe(gulp.dest(conf.dest + 'css'));
});

gulp.task('copy', function() {
  return gulp.src(conf.src.templates + 'index.html')
    .pipe(gulp.dest(conf.dest));
});

gulp.task('assets', function() {

});

gulp.task('manifest', function() {
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

gulp.task('test', function() {

});

gulp.task('release', function() {

});

gulp.task('watch', ['scripts:watch', 'less', 'copy'], function() {
  startBrowserSync();
  gulp.watch(conf.src.root + '**/*.less', ['less']);
  gulp.watch(conf.src.templates + '**/*.html', ['copy']);
});

gulp.task('default', ['scripts', 'less', 'copy'], function() {

});
