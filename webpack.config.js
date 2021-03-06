/*module.exports = {
	entry: './src/page/index/index.js',
	output:{
		path:'./dist',
		filename:'app.js'
	}
}*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置. dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title) {
	return {
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		/* favicon     : './favicon.ico',*/
		title: title,
		inject: true,
		hash: true,
		chunks: ['common', name]
	};
};

var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'user-login': ['./src/page/user-login/user-login.js'],
		'user-register': ['./src/page/user-register/user-register.js'],
		'user-center': ['./src/page/user-center/index.js'],
		'user-center-update': ['./src/page/user-center-update/index.js'],
		'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
		'result': ['./src/page/result/result.js'],
	},
	output: {
		path: './dist',
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	extrenals: {
		'jquery': 'window.jQuery'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
			loader: 'url-loader?limit=100&name=resource/[name].[ext]'
		}, {
			test: /\.string$/,
			loader: 'html-loader'
		}]

	},
	resolve: {
		alias: {
			node_modules: __dirname + '/node_modules',
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image'
		}
	},
	plugins: [
		// 独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		// 把css单独打包到文件里
		new ExtractTextPlugin("css/[name].css"),
		// html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
	]

};

if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}


module.exports = config;