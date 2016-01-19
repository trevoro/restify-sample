import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import gulpFilter from 'gulp-filter';
import print from 'gulp-print';
import del from 'del';

gulp.task('clean', () => {
  return del(['dist/*']);
});

gulp.task('default', ['clean'], () => {
  const es6Source = [
    '**/*.js',
    '!public/js/**',
    '!dist'
  ];
  const distSource = [
    '**/*',
    '!Makefile',
    '!test',
    '!gulpfile.babel.js'
  ];
  const es6Filter = gulpFilter(es6Source, { restore: true });
  const srcFilter = gulpFilter(distSource);

  return gulp.src(['./**/*', '!./node_modules/**'])
    .pipe(srcFilter)
    .pipe(es6Filter)
    .pipe(print())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(es6Filter.restore)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});
