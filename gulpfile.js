var gulp       = require('gulp');
var browserify = require('browserify');
var vinyl      = require('vinyl-source-stream');

var JS_DIST_NAME       = 'popup.js';
var JS_DIST_DIR        = './dist/';
var JS_ENTRYPOINT_PATH = './src/popup.ts';
var JS_WATCH_PATTERNS  = ['src/**/*.ts'];

gulp.task('build', ['js']);

gulp.task('js', function () {
    var src = browserify({
        entries: JS_ENTRYPOINT_PATH,
    });
    src.plugin('tsify', {
        noImplicitAny: true,
    });
    return src.bundle()
        .pipe(vinyl(JS_DIST_NAME))
        .pipe(gulp.dest(JS_DIST_DIR));
});

gulp.task('watch', function () {
    gulp.watch(JS_WATCH_PATTERNS, ['js']);
});
