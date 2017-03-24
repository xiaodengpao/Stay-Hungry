/*
    路径配置
*/
module.exports = {

    path: {
        // 生产代码目录
        'dist':'./dist/',

        // 需要引入的外部库文件目录
        'libs':'./src/libs/*',

        // 图片文件夹
        'img': {
            entry: ['./src/img/*','./src/img/**/*'],
            output:  './dist/img/'
        },

        // HTML文件夹
        'html': {
            entry: ['./src/*.html'],
            output:  './dist/'
        },
        // sass文件夹
        'sass':{
            entry:'src/sass/*.scss',
            output: './dist/css/'
        },

        //icon文件夹
        'iconFont': {
            entry: './src/sass/iconfont/*',
            output: './dist/css/iconfont/'
        },

        // js文件夹
        'scripts': {
            entry: './src/js/测试/index.js',
            output: './dist/js/'
        }
    },
    
    server: {
        baseDir: './dist/',
        port: 3000
    },

    basicInfo:{
        name: 'gulp + browserify 自动化工具',
        description: '测试环境',
        version: '1.0.0'
    }
}
