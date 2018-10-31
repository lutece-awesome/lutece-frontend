const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			vue$: 'vue/dist/vue.runtime.esm.js',
			'@': resolve('src'),
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
