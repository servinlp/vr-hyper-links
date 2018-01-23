const path = require( 'path' ),
	webpack = require( 'webpack' ),
	UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' ),
	nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
	entry:  {
		filename: './src/index.js'
	},
	output: {
		filename: 'script.js',
		path:	 path.resolve( __dirname, 'dist' )
	},
	devtool: 'source-map',
	module:  {
		loaders: [
			{
				test:	/\.js$/,
				exclude: /node_modules/,
				loader:  'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	devServer: {
		contentBase: './',
		port: 9000
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify( nodeEnv ) }
		})
	]
}
