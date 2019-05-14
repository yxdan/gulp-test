const gulp = require('gulp');
//const qn = require('gulp-qn');
var del = require('del');
var qiniu = require('gulp-qiniu');

var qiniuCfg = require('./qiniu.config.json');
var pkg = require('./package.json');
var join = require('path').join;

gulp.task('clean', function(cb) {
    return del(['dist/**'], cb);
});

gulp.task('img', function() {
    return gulp.src([
        'img/**'
    ], {
        base: '.'
    }).pipe(gulp.dest('dist'));
});

gulp.task('publish:img', ['clean', 'img'], function() {
    var res = {};
    res.accessKey = qiniuCfg.cfg.accessKey;
    res.secretKey = qiniuCfg.cfg.secretKey;
    res.private = false;
    res.bucket = pkg.package.img.name;
    return gulp.src('dist/**').pipe(qiniu(res, {
        dir: join('/', pkg.package.img.name, pkg.package.img.version)
    }));

}); 

