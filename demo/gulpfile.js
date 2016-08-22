var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

var stylus = require('gulp-stylus');
var pleeease = require('gulp-pleeease');
var inlinesource = require('gulp-inline-source');

// set minifier to false to keep Sass sourcemaps support
var PleeeaseOptions = {
    import: {"path": "assets/stylus"},
    optimizers: {
        minifier: false
    }
};

// Static Server + watching scss/html files
gulp.task('serve', ['stylus'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch(["assets/stylus/**/*.styl","../**/*.styl"], ['stylus']);    
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile stylus files into CSS & auto-inject into browsers
gulp.task('stylus', function() {
    return gulp.src("assets/stylus/main.styl")
        .pipe(plumber())
        .pipe(stylus())
        .pipe(pleeease(PleeeaseOptions))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});
 
// Compile github html pages
gulp.task('gh-pages', ['stylus'], function () {
    return gulp.src('./*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('../'));
});

gulp.task('default', ['serve']);