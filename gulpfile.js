let gulp = require('gulp'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	notify = require("gulp-notify");

gulp.task('js', function () {
	gulp.src('./src/front/*.js')
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(concat('front.js'))
		.pipe(gulp.dest('./src'));
});



gulp.task('default', ['watch',
	// 'browser-sync'
]);

gulp.task('watch', function () {
	gulp.watch('./src/front/*.js', ['js']);
});