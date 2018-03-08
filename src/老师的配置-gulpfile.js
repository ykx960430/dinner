/*
 * 实现了CSS、JS、HTML、SASS修改同步刷新
 *  任务01~07
 *
 */


// 引入使用到的模块 插件
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    connect = require("gulp-connect");
    htmlmin = require("gulp-htmlmin"),
    minifyCss = require("gulp-clean-css"),
    babel = require("gulp-babel");


// 01 启动服务器
gulp.task("server", function(){
    connect.server({
        root : "dist",
        livereload : true
    });
});

// 02 定义 gulp 任务, 压缩CSS
gulp.task("css", function(){
    gulp.src("css/**/*.css")
        .pipe(minifyCss())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
});

// 03 定义 gulp 任务，压缩JS
gulp.task("js", function(){
    gulp.src("js/**/*.js")
        //.pipe(babel({
        //    presets: ['env']
        //}))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
});

// 04 定义 gulp 任务，压缩 HTML
gulp.task("html", function(){
    gulp.src("**/*.html")
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});
gulp.task("htmlIndex", function(){
    gulp.src("*.html")
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS:true, minifyJS:true}))
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

// 05 定义任务，编译 sass
gulp.task("sass", function(){
    gulp.src("sass/**/*.scss")
        .pipe(sass({outputStyle:"compressed"}))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload());
});

// 06 将图片、库、模拟的假数据复制到 dist 下
gulp.task("images", function(){
    gulp.src("images/**/*.*")
        .pipe(gulp.dest("dist/images"));
});
gulp.task("lib", function(){
    gulp.src("lib/**/*.*")
        .pipe(gulp.dest("dist/lib"));
});
gulp.task("mock", function(){
    gulp.src("mock/**/*.*")
        .pipe(gulp.dest("dist/mock"));
});
gulp.task("copyfile", ["images", "lib", "mock"]);

// 07 定义任务，监视sass 、css、html、js
gulp.task("watch", function(){
    gulp.watch("sass/**/*.scss", ["sass"]);
    gulp.watch("css/**/*.css", ["css"]);
    gulp.watch("html/**/*.html", ["html"]);
    gulp.watch("*.html", ["htmlIndex"]);
    gulp.watch("js/**/*.js", ["js"]);
})

// 08 定义默认任务
gulp.task("default", ["js", "html", "sass","htmlIndex", "server", "copyfile", "watch"]);

