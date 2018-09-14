module.exports = function(grunt) {
 
    // 配置任务参数
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            combine: {
                files: {
                  'css/release/compress.css': ['css/*.css'] // 指定合并的CSS文件 ['css/base.css', 'css/global.css']
                }
            },
           minify: {
                options: {
                    keepSpecialComments: 0, /* 删除所有注释 */
                    banner: '/* minified css file */'
                },
                files: {
                    'css/release/master.min.css': ['css/master.css']
                }
            }
        }
    });
 
    // 插件加载（加载 "cssmin" 模块）
    grunt.loadNpmTasks('grunt-contrib-cssmin');
 
    // 自定义任务：通过定义 default 任务，可以让Grunt默认执行一个或多个任务。
    grunt.registerTask('default', ['cssmin']);
 
};