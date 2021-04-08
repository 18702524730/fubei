var gulp = require('gulp'),
    mincss = require('gulp-mini-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    useref = require('gulp-useref'),
    replace = require('gulp-html-replace'),
    gulpreplace = require('gulp-replace');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps'),
    lazypipe = require('lazypipe');
var rev = require('gulp-rev');
var filter = require('gulp-filter');
var browserSync = require('browser-sync').create();
var proxy = require('http-proxy-middleware');

var time = new Date().getTime();

var src_css = './css',
    dest_css = './dest/css',
    src_js = './js',
    dest_js = './dest/js',
    dest = './dest';

gulp.task('clean', function(cb) {
    return del(['dest'], cb);
});

//复制文件到temp和dest
gulp.task('copyfonts', function() {
    return gulp.src('fonts/**/*.*')
        .pipe(gulp.dest('temp/fonts')).pipe(gulp.dest('dest/fonts'));
});
gulp.task('copylib', function() {
    return gulp.src('lib/**/*.*')
        .pipe(gulp.dest('temp/lib')).pipe(gulp.dest('dest/lib'));
});
gulp.task('copyjs', function() {
    return gulp.src('js/**/*.*')
        .pipe(gulp.dest('temp/js'));
});
gulp.task('copycss', function() {
    return gulp.src('css/**/*.*')
        .pipe(gulp.dest('temp/css'));
});
gulp.task('copyimg', function() {
    return gulp.src('img/**/*.*')
        .pipe(gulp.dest('temp/img')).pipe(gulp.dest('dest/img'));
});


//复制ftl文件,替换路径
gulp.task('copyftl', function() {
    return gulp.src('pages/ftl/**/*.*')
        .pipe(gulpreplace('${basePath}/portal/img', '../img'))
        .pipe(gulpreplace('${basePath}/portal/css', '../css'))
        .pipe(gulpreplace('${basePath}/portal/js', '../js'))
        .pipe(gulpreplace('${basePath}/portal/lib', '../lib'))
        .pipe(gulpreplace('${basePath}/portal/fonts', '../fonts'))
        .pipe(gulp.dest('temp/ftltemp'));
});

//处理ftl文件,合并生成压缩js和css
gulp.task('changelink', function() {
    var jsFilter = filter("**/*.js", { restore: true });
    var cssFilter = filter("**/*.css", { restore: true });
    return gulp.src('temp/ftltemp/**/*.*')
        .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(mincss())
        .pipe(cssFilter.restore)
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dest/ftltemp'));
});

//处理ftl文件,替换回原来的路径
gulp.task('changeback', function() {
    return gulp.src('dest/ftltemp/**/*.*')
        .pipe(gulpreplace('../img', '${basePath}/portal/img'))
        .pipe(gulpreplace('../css', '${basePath}/portal/css'))
        .pipe(gulpreplace('../js', '${basePath}/portal/js'))
        .pipe(gulpreplace('../lib', '${basePath}/portal/lib'))
        .pipe(gulpreplace('../fonts', '${basePath}/portal/fonts'))
        .pipe(gulpreplace(/\.min\.js/g, function(match) {
            return '.min.js?t=' + time;
        }))
        .pipe(gulpreplace(/\.min\.css/g, function(match) {
            return '.min.css?t=' + time;
        }))
        .pipe(gulp.dest('dest/ftl'));
});

//删除临时目录
gulp.task('delTemp', ['changeback'], function() {
    del('temp');
    del('dest/ftltemp');
});

//打包
gulp.task('build', function(cb) {
    runSequence('clean', ['copyfonts', 'copylib', 'copyjs', 'copycss', 'copyimg'],
        'copyftl',
        'changelink',
        'changeback',
        'delTemp',
        cb);
});
gulp.task('default', ['build']);


//监听
gulp.task('watch', function() {
    //gulp.watch(src_css+'/**/*.css',['mincss']);
    //gulp.watch(src_js+'/**/*.js',['minjs']);
});



var config = {
  baseDir: './',
  watchFiles: [ 'pages/*.html', 'css/**/*.css', 'js/**/*.js' ]
}

// 设置代理
var middleware = [
    proxy('/portalsite-cnsebe', {
        target: 'http://testcart.ipsebe.com',
        changeOrigin: true,
        ws: true, // proxy websockets
        cookieDomainRewrite: "",
        pathRewrite: {
            '^/portalsite-cnsebe' : ''
        },
        router: {}
    }),
    proxy('/iprp_portal', {
        target: 'http://testuser.ipsebe.com',
        changeOrigin: true,
        ws: true, // proxy websockets
        cookieDomainRewrite: "",
        pathRewrite: {
            '^/iprp_portal' : ''
        },
        router: {}
    })
];

gulp.task('server', function() {
  browserSync.init({
    files: config.watchFiles,
    server: {
        baseDir: "./"
    },
    middleware: middleware
  });
})
gulp.task('default',['server']); //定义默认任务