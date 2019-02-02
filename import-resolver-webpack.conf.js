const path = require('path');

module.exports = {
	entry: './src/main.js',

	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			vue$: 'vue/dist/vue.runtime.esm.js',
			'@': path.resolve(__dirname, 'src'),
		},
	},

	module: {
		rules: [
			{
				test: /\.styl(us)?$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'stylus-loader',
				],
			},
		],
	},
};
