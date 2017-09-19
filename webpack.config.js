var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpackDevServer = require('webpack-dev-server');

module.exports = {
	entry: './src/components/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, './src'),
				query: {
					presets: ['react', 'env']
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: 'url-loader?limit=8192&name=images/[name]-[hash:5].[ext]'
			},
			{
				test: /\.mp3$/,
				use: 'url-loader?limit=8192&name=audio/[name]-[hash:5].[ext]'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			title: 'MusicPlayer by React',
			filename: 'index.html',
			template: './src/index.html',
			inject: 'body'
		})
	],
	devServer: {
		contentBase: './dist',
		port: 8000
	}
}