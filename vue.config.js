const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
});

// const path = require('path');
// module.exports = {
//   //基本路径
//   publicPath:process.env.NODE_ENV === 'production' ? '' : '/',
//   //输出文件目录
//   outputDir:process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
//   //exlit-loader 是否在保存的时候检查
//  // lintOnsave: true,
//   // webpack配置，see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
//   chainWebpack:(config) =>{

//   },
//   configureWebpack: (config) =>{
//     // config.resolve = {//配置解析别名
//     //   extensions:['.js','.json','.vue'],
//     //   alias:{
//     //     '@':path.resolve(__dirname,'./src'),
//     //     'public':path.resolve(__dirname,'./public'),
//     //     'components':path.resolve(__dirname,'./src/components'),
//     //     'common':path.resolve(__dirname,'./src/common'),
//     //     'api':path.resolve(__dirname,'./src/api'),
//     //   }
//     // }
//   },
//   //生产环境是否生产 sourceMap 文件
//   productionSourceMap:false,
//   //css 相关配置
//   css:{
//     //是否使用css分离插件  ExtractTextplugin
//     extract:true,
//     //开启CSS source maps?
//     sourceMap:false,
//     //css预设配置项
//   //  loaderOptions:{
//   //     sass:{
//   //       data:`@import "./src/styles/mian.scss";`
//   //     }
//   //  },
//    //启用CSS modules for all css / pre-processor files
//    //modules:false
//   },
//   //use thread-loader for babel & TS in production build
//   //exabled by default if the machine has more than 1 cores
//   parallel: require('os').cpus().length > 1,
//   pwa:{},
//   devServer:{
//     open:false,//编译完成是否打开网页
//     host:'0.0.0.0',//指定使用地址，默认localhost,0.0.0.0代表可以别外界访问
//     port:8080,//访问端口
//     https:false,//编译失败刷新页面
//     hot:true,//开启热加载
//     hotOnly:false,
//     proxy:null,//设置代理
//     overlay:{//全屏模式下是否显示脚本错误
//         warnings:true,
//         errors:true
//     },
//     before:app => {

//     }
//   },
//   pluginOptions:{}
// }

// vue.config.js
// const path = require('path');
// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// const resolve = (dir) => path.join(__dirname, dir);
//用于生产环境去除多余的css
// const PurgecssPlugin = require("purgecss-webpack-plugin");
// //全局文件路径
// const glob = require("glob-all");
// //压缩代码并去掉console
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/', // 公共路径
//   indexPath: 'index.html' , // 相对于打包路径index.html的路径
//   outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
//   assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
//   lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
//   runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
//   productionSourceMap: !IS_PROD, // 生产环境的 source map
//   parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
//   pwa: {}, // 向 PWA 插件传递选项。
//   chainWebpack: config => {
//     config.resolve.symlinks(true); // 修复热更新失效
//     // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
//     config.plugin("html").tap(args => {
//       // 修复 Lazy loading routes Error
//       args[0].chunksSortMode = "none";
//       return args;
//     });
//     config.resolve.alias // 添加别名
//       .set('@', resolve('src'))
//       .set('@assets', resolve('src/assets'))
//       .set('@components', resolve('src/components'))
//       .set('@views', resolve('src/views'))
//       .set('@store', resolve('src/store'));
//     // 压缩图片
//     // 需要 npm i -D image-webpack-loader
//     config.module
//       .rule("images")
//       .use("image-webpack-loader")
//       .loader("image-webpack-loader")
//       .options({
//         mozjpeg: { progressive: true, quality: 65 },
//         optipng: { enabled: false },
//         pngquant: { quality: [0.65, 0.9], speed: 4 },
//         gifsicle: { interlaced: false },
//         webp: { quality: 75 }
//       });
//     // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
//     if (IS_PROD) {
//       config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
//         {
//           analyzerMode: "static"
//         }
//       ]);
//     }
//   },
//   configureWebpack: config => {
//     // 开启 gzip 压缩
//     // 需要 npm i -D compression-webpack-plugin
//     const plugins = [];
//     if (IS_PROD) {
//       plugins.push(
//         new CompressionWebpackPlugin({
//           filename: "[path].gz[query]",
//           algorithm: "gzip",
//           test: productionGzipExtensions,
//           threshold: 10240,
//           minRatio: 0.8
//         })
//       );
//       //启用代码压缩
//             plugins.push(
//                 new UglifyJsPlugin({
//                     uglifyOptions: {
//                         compress: {
//                             warnings: false,
//                             drop_console: true,
//                             drop_debugger: false,
//                             pure_funcs: ["console.log"] //移除console
//                         }
//                     },
//                     sourceMap: false,
//                     parallel: true
//                 })
//             );
//             //去掉不用的css 多余的css
//             plugins.push(
//                 new PurgecssPlugin({
//                     paths: glob.sync([path.join(__dirname, "./**/*.vue")]),
//                     extractors: [
//                         {
//                             extractor: class Extractor {
//                                 static extract(content) {
//                                     const validSection = content.replace(
//                                         /<style([\s\S]*?)<\/style>+/gim,
//                                         ""
//                                     );
//                                     return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
//                                 }
//                             },
//                             extensions: ["html", "vue"]
//                         }
//                     ],
//                     whitelist: ["html", "body"],
//                     whitelistPatterns: [/el-.*/],
//                     whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
//                 })
//             );
//     }
//     config.plugins = [...config.plugins, ...plugins];
//   },
//   css: {
//     extract: IS_PROD,
//     requireModuleExtension: false,// 去掉文件名中的 .module
//      loaderOptions:{
//         sass:{
//                    data:`@import "./src/styles/mian.scss";`
//          }
//       },
//   },
//   devServer: {
//       overlay: { // 让浏览器 overlay 同时显示警告和错误
//        warnings: true,
//        errors: true
//       },
//       host: "localhost",
//       port: 8080, // 端口号
//       https: false, // https:{type:Boolean}
//       open: false, //配置自动启动浏览器
//       hotOnly: true, // 热更新
//       // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
//       proxy: { //配置多个跨域
//         "/api": {
//           target: "http://172.11.11.11:7071",
//           changeOrigin: true,
//           // ws: true,//websocket支持
//           secure: false,
//           pathRewrite: {
//             "^/api": "/"
//           }
//         },
//         "/api2": {
//           target: "http://172.12.12.12:2018",
//           changeOrigin: true,
//           //ws: true,//websocket支持
//           secure: false,
//           pathRewrite: {
//             "^/api2": "/"
//           }
//         },
//       }
//     }
// }