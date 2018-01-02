const path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
	BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
	// 根目录切换到项目根目录下
	ROOT_PATH = path.resolve(__dirname, '../../'),
	// 组件库源码目录
	FEGO_PATH = path.resolve(ROOT_PATH, 'src'),
	// 站点源码目录
	SRC_PATH = path.resolve(ROOT_PATH, 'www/src'),
	BUILD_PATH = path.resolve(ROOT_PATH, 'www/build/desktop'),
	BabelTransformImport = `${FEGO_PATH}/plugin/babel-transform-imports`;
let clientConfig, serverConfig, cdnPath = '/';

module.exports = {
	context: SRC_PATH,
	resolve: {
		modules: ['node_modules', 'common'],
		extensions: ['.js', '.jsx'],
		alias: {
			src: SRC_PATH,
			fego: FEGO_PATH,
			desktop: path.resolve(SRC_PATH, 'desktop'),
		}
	},
	entry: {
		vendor: ['fego/style/core', 'babel-polyfill', 'react', 'react-dom', 'react-router'],
		index: ['src/desktop/index']
	},
	output: {
		path: path.resolve(BUILD_PATH),
		publicPath: cdnPath,
		filename: '[name].[chunkhash:8].js',
		chunkFilename: 'chunk.[name].[chunkhash:8].js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			// loader: 'babel-loader',
			include: [
				FEGO_PATH,
				SRC_PATH
			],
			use: {
				loader: 'babel-loader',
				query: {
					plugins: [
						[
							require(BabelTransformImport),
							require(`${BabelTransformImport}/option`).create({
								"fego": {
									"transform": require('./transform'),
								}
							})
						]
					]
				}
			}
		}, {
			test: /\.css?$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'less-loader']
			}),
			exclude: [
				path.resolve(SRC_PATH, 'desktop/sys')
			]
		}, {
			test: /\.less?$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						modules: true,
						localIdentName: '[local]_[hash:base64:8]'
					}
				}, 'less-loader']
			}),
			include: [
				path.resolve(SRC_PATH, 'desktop/sys')
			]
		}, {
			test: /\.(png|jpg|gif)$/,
			use: 'url-loader?limit=8192&name=img/[name].[ext]?[hash:base64:8]'
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			use: 'file-loader?name=img/[name].[ext]?[hash:base64:8]'
		}, {
			test: /\.html?$/,
			use: [{
				loader: 'html-loader',
				options: {
					minimize: true,
					removeComments: true,
					collapseWhitespace: true
				}
			}]
		}]
	},
	plugins: [
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
		// 固定 module ID
		new webpack.HashedModuleIdsPlugin({ hashDigestLength: 8 }),
		// chunk ID 使用名称
		new webpack.NamedChunksPlugin(),
		// 通用模块
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: Infinity
		}),
		// webpack bootstrap runtime
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		// new webpack.LoaderOptionsPlugin({ minimize: true }),
		// new webpack.optimize.UglifyJsPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		// new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(SRC_PATH, 'desktop/index.html'),
			favicon: path.resolve(SRC_PATH, 'common/favicon.ico')
		}),
		// 提取入口模块的样式为单独的文件
		new ExtractTextPlugin({ filename: '[name].[contenthash:8].css' }),
	],
	devServer: {
		port: 3100,
		historyApiFallback: true,
		proxy: {
			'/api/*': {
				target: `http://127.0.0.1:3001`,
				secure: false
			}
		}
	},
	devtool: 'cheap-module-source-map'
}

