var gulp        = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var bower = require('gulp-bower');
var notify = require("gulp-notify");

var config = {
	bowerDir: './bower_components'
};


gulp.task('bower', function() {
    return bower()
     .pipe(gulp.dest(config.bowerDir))
});

gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});



// Compile sass into CSS & auto-inject into browsers
gulp.task('css', function() {
    return gulp.src("./sass/style.scss")
        .pipe(sass({
            outputStyle: 'compressed',
        	includePaths: [
               config.bowerDir + '/font-awesome/scss',	
           ], errLogToConsole: true 
        }))

		.pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});


gulp.task('compress', function() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
        ])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js/'))
        .pipe(browserSync.stream());
});



gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./fonts'));
});

// Static server
gulp.task('serve',['sass', 'css', 'bower', 'icons', 'compress'], function() {

    browserSync.init({
        server: "./"
    });
    gulp.watch("./sass/*.scss", ['css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

//gulp.task('default', ['serve']);