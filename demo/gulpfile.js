var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');


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
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);