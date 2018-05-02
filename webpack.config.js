var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';

//获取Htmlplugin参数方法
var getHtmlConfig     = function (name) {
    return{
        template:'./src/view/'+ name +'.html',
        filename:"view/"+ name +".html",
        inject : true,
        hash : true,
        chunks: ['common',name]
    };
};

var config = {
    entry: {
        'common':['./src/page/common/index.js'],
        'index':'./src/page/index/index.js',
        'list':'./src/page/list/index.js',
        'user-login': './src/page/user-login/index.js',
        'user-register': './src/page/user-register/index.js',
        'user-pass-reset': './src/page/user-pass-reset/index.js',
        'user-pass-update': './src/page/user-pass-update/index.js',
        'user-center': './src/page/user-center/index.js',
        'user-center-update': './src/page/user-center-update/index.js',
        'result': ['./src/page/result/index.js'],
    },
    output:{
        path:'./dist',
        publicPath:'/dist',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin({
            template:"./src/view/index.html",
            filename:"view/index.html",
            inject : true,
            hash : true,
            chunks: ['common','index']
        }),
        new HtmlWebpackPlugin(getHtmlConfig('list')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login')),
        new HtmlWebpackPlugin(getHtmlConfig('result')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;