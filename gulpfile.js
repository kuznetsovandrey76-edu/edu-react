'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    webpack = require('webpack-stream'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { 
        html: 'public_html/',
        js: 'public_html/js/',
        css: 'public_html/css/',
        img: 'public_html/img/',
        fonts: 'public_html/fonts/'
    },
    src: { 
        html: 'src/*.html', // src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',
        css: 'src/css/main.scss',
        img: 'src/img/**/*.*', // img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './public_html'
};


gulp.task('html', function () {
    return gulp.src(path.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html)) 
        .pipe(reload({stream: true})); 
});

gulp.task('js', function () {
    return gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js)) 
        .pipe(reload({stream: true}));
});

gulp.task('webpack', function () {
    return gulp.src('./src/js/main.js')
        .pipe(webpack({
            module: {
                rules: [{
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/',      
                    query: {
                        presets: ['react', 'env']
                    }                        
                }]},
                output: {
                    filename: 'bundle.js'
                }
            }))
        .pipe(gulp.dest('public_html/js/'));
});

gulp.task('css', function () {
    return gulp.src(path.src.css) 
        .pipe(sourcemaps.init()) 
        .pipe(sass()) 
        .pipe(prefixer()) 
        .pipe(cssmin()) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) 
        .pipe(reload({stream: true}));
});

gulp.task('image', function () {
    return gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('build', gulp.series(
    'html',
    'webpack',
    'css',
    'fonts',
    'image'
));


gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir: './public_html/'
        }
    });

    gulp.watch(path.watch.html, gulp.series('html'));
    gulp.watch(path.watch.css, gulp.series('css'));
    gulp.watch(path.watch.js, gulp.series('webpack'));
    gulp.watch(path.watch.img, gulp.series('image'));
    gulp.watch(path.watch.fonts, gulp.series('fonts'));

    // Reload after - npm run build
    gulp.watch('./public_html/js/bundle.js').on("change", reload);
});


gulp.task('clean', function (cb) {
    return rimraf(path.clean, cb);
});


gulp.task('default', gulp.series('build', 'watch'));