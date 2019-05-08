var sass = require('gulp-sass');

var gulp = require('gulp');

gulp.watch('app/*.sass', gulp.task('sass'));
//gulp.watch('app/js/*.js', ['js']);


gulp.task('sass', function(){
  return gulp.src('app/style.scss')
  .pipe(sass())
  //.pipe(ccsnan())
  .pipe(gulp.dest('dist/css'));

});

gulp.task('watch', function () {
  gulp.watch('app/*.scss', gulp.series('sass'));
  //gulp.watch('app/js/**/*.js', ['js']);
});
