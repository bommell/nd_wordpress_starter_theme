/*=============================================>>>>>
= gulpfile - all the gulptasks are here =
===============================================>>>>>*/



/*----------- variables -----------*/

// gulp
var gulp          = require('gulp');
// css stuff
var postcss       = require('gulp-postcss');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var sourcemaps    = require('gulp-sourcemaps');
var cssnext       = require('postcss-cssnext');
var lost          = require('lost');
var csswring      = require('csswring');

// javascript
var babel         = require('gulp-babel');

// jade
var jade          = require('gulp-jade-php');

// browser sync
var browserSync   = require('browser-sync').create();


/*----------- tasks -----------*/

// style task
gulp.task('styles', function(){
  var processors = [
    autoprefixer,
    cssnext,
    lost,
    csswring
  ];

  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css/'));
});

// javascript task
gulp.task('javascript', function(){
  return gulp.src('./js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./js/dist/'));
});


// jade task
gulp.task('jade', function(){
  return gulp.src('./jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./templates/'));
});


// browser sync
gulp.task('browserSync', function(){
    var files = [
      './scss/**/*.scss',
      './css/style.css',
      './*.php',
      './templates/**/*.php',
      './js/*js',
      './jade/*jade'
    ];
    browserSync.init(
      files, {
      proxy : 'localhost:8888/your_folder',
    });
});

// watching the files for changes
gulp.task('watch', function(){
  gulp.watch('./scss/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('./js/*.js', ['javascript']).on('change', browserSync.reload);
  gulp.watch('./jade/**/*.jade', ['jade']).on('change', browserSync.reload);
  gulp.watch('./templates/**/*.php').on('change', browserSync.reload);
  gulp.watch('./*.php').on('change', browserSync.reload);
});

// default gulp task
gulp.task('default', ['watch', 'browserSync', 'styles', 'javascript', 'jade']);
