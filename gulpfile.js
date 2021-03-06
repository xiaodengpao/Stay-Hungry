/*
    针对小型页面的gulp工具  
*/

// 导入模块
var gulp            = require('gulp');
var path            = require('path');
var browserSync     = require('browser-sync').create(); // 实时刷新
var reload          = browserSync.reload;               // reload方法
var config          = require('./config');              // 文件夹路径配置模块
var rename          = require('gulp-rename');           // 文件重命名
var concat          = require('gulp-concat');           // 文件合并
var del             = require('del');                   // 文件夹删除清空
var sass            = require('gulp-sass');             // sass编译
var cleanCSS        = require('gulp-clean-css');        // 压缩css
var babel           = require('gulp-babel');            // es6编译
var uglify          = require('gulp-uglify');           // js压缩
var imgmin          = require('gulp-imagemin');         // 图片压缩
var htmlmin         = require('gulp-htmlmin');          // html压缩
var useref          = require('gulp-useref');           // HTML引用替换插件
var header          = require('gulp-header');           // header
var replace         = require('gulp-replace');          // html 版本替换
var gulpif          = require('gulp-if');               // 逻辑判断
var browserify      = require("browserify");
var sourcemaps      = require("gulp-sourcemaps");
var source          = require('vinyl-source-stream');
var buffer          = require('vinyl-buffer');
var babelify        = require('babelify');
var plumber         = require('gulp-plumber');

/** 服务器配置 **/
gulp.task('server',()=> {
    browserSync.init({
        server: {
            baseDir: config.server.baseDir,
        },
        port: config.server.port,
    });
});

/**html**/

// 压缩，替换
gulp.task('html',()=> {
    return gulp.src(config.path.html.entry)
    .pipe(gulp.dest(
        path.join(config.path.html.output)
    ))
    .pipe(reload({stream: true}));
});


/**css**/

// 编译sass
gulp.task('sass',()=> {

    return gulp.src(config.path.sass.entry)
                // 编译sass
                .pipe(sass())
                // 重命名
                .pipe(gulp.dest(
                  config.path.sass.output
                ))
                .pipe(reload({stream: true}));
});

/**js**/

gulp.task('scripts',()=> {
    return gulp.src(config.path.scripts.entry)
    // browserify({
    //     entries: ['src/js/测试/index.js'],
    //     debug: true, 
    // })
    //     .transform("babelify", {presets: ["es2015"]})
    //     .bundle()
        .pipe(plumber())
        .pipe(buffer())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream: true}));
});


/**util**/

// 清空输出文件夹
gulp.task('clean',()=> {
    return del(
      path.join(config.path.dist,'*')
    );
});

// 将外部库文件写入输出文件夹
gulp.task('libs',()=> {
    return gulp.src(config.path.libs)
               .pipe(gulp.dest(
                 path.join(config.path.dist,'libs')
               ))
               .pipe(reload({stream: true}));
});

// 将iconfont文件夹移动到输出文件夹
gulp.task('iconFont',()=> {
    return gulp.src(config.path.iconFont.entry)
               .pipe(gulp.dest(
                 path.join(config.path.iconFont.output)
               ))
               .pipe(reload({stream: true}));
});

// 图片压缩并写入输出文件夹
gulp.task('imgmin',()=> {
    return gulp.src(config.path.img.entry)
               .pipe(gulp.dest(
                 path.join(config.path.img.output)
               ))
               .pipe(reload({stream: true}));
});


/*
    配置任务
*/

gulp.task('pre-dev', ['clean'],()=> {  
   return gulp.start('libs','imgmin','sass','scripts','html','iconFont'); 
});

gulp.task('dev', ['pre-dev'],()=> {  
    gulp.start('server'); 
    gulp.watch(config.path.scripts.entry,['scripts']);
    gulp.watch(config.path.libs,['libs']);
    gulp.watch(config.path.img.entry,['imgmin']);
    gulp.watch(config.path.html.entry,['html']);
    gulp.watch(config.path.sass.entry,['sass']);
});