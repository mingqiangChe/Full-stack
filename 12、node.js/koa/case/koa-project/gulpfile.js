// gulpfile.js

const gulp = require('gulp');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require("gulp-imagemin");
const minifyCSS = require("gulp-minify-css");
gulp.task('scripts', function() {
  return gulp.src('./src/**/*.js')
        // .pipe(concat('app.js')) // 将js文件夹下的所有js文件合并至app.js
        .pipe(babel())
        .pipe(uglify())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'))
});
gulp.task('package', function () {
    return gulp.src(['./src/package.json']).pipe(gulp.dest('dist/'));
});
// gulp.task('images',() => {
//     return gulp.src('./src/**/*.{jpg,png,gif}')
//     .pipe(imagemin())//压缩图片
//     .pipe(gulp.dest('./dist/public/images'))
// })
gulp.task('public',() => {
    return gulp.src('./src/public/**/*')
    .pipe(gulp.dest('./dist/public'))
})
gulp.task('views',() => {
    return gulp.src('./src/views/**/*')
    .pipe(gulp.dest('./dist/views'))
})
// gulp.task('html',() => {
//     return gulp.src('./src/views/*.html')
//     .pipe(gulp.dest('./dist/views'))
// })

gulp.task('www',() => {
    return gulp.src('./src/bin/www')
    .pipe(gulp.dest('./dist/bin'))
})

// gulp.task('css',() => {
//     return gulp.src('./src/public/stylesheets/*.css')
//     .pipe(minifyCSS())
//     // .pipe(rename({
//     //     suffix:'.min'
//     // }))
//     .pipe(gulp.dest('dist/public/stylesheets'))
// })
gulp.task('watch',async () => {
    // gulp.watch('./src/public/stylesheets/*.css',gulp.series(['css']))
    gulp.watch('./src/**/*.js',gulp.series(['scripts']))
    // gulp.watch('./src/**/*.{jpg,png,gif}',gulp.series(['images']))
    // gulp.watch('./src/views/*.html',gulp.series(['html']))
    gulp.watch('./src/views/**/*',gulp.series(['views']))
    gulp.watch('./src/public/**/*',gulp.series(['public']))
    gulp.watch('./src/bin/www',gulp.series(['www']))
    gulp.watch('./src/package.json',gulp.series(['package']))
})
gulp.task('default',gulp.series('scripts','package','views','www','public','watch'))



