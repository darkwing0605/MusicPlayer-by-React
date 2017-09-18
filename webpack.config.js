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
				exclude: path.resolve(__dirname, './node_modules'),
				include: path.resolve(__dirname, './src'),
				query: {
					presets: ['env', 'react']
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
				use: [
					'json-loader'
				]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
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
