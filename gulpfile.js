var gulp       = require('gulp');
var browserify = require('browserify');
var vinyl      = require('vinyl-source-stream');

var JS_DIST_NAME       = 'popup.js';
var DIST_DIR        = './dist/';
var JS_ENTRYPOINT_PATH = './src/popup.ts';
var JS_WATCH_PATTERNS  = ['src/**/*.ts'];

gulp.task('build', ['js', 'manifest', 'assets']);

gulp.task('js', function () {
    var src = browserify({
        entries: JS_ENTRYPOINT_PATH,
    });
    src.plugin('tsify', {
        noImplicitAny: true,
    });
    return src.bundle()
        .pipe(vinyl(JS_DIST_NAME))
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('manifest', function () {
  return gulp.src(
    ['src/manifest.json'],
    {
      base: 'src/',
    }
  )
  .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
  return gulp.src(
    ['src/popup.html', 'src/images/*'],
    {
      base: 'src/',
    }
  )
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch(JS_WATCH_PATTERNS, ['js']);
});
