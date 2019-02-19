// for theme dir, ref to https://codemirror.net/theme/
const themePlugins = [
	{
		name: 'default',
		import: () => Promise.resolve(),
	},
	{
		name: '3024-day',
		import: () => import('codemirror/theme/3024-day.css'),
	},
	{
		name: '3024-night',
		import: () => import('codemirror/theme/3024-night.css'),
	},
	{
		name: 'abcdef',
		import: () => import('codemirror/theme/abcdef.css'),
	},
	{
		name: 'ambiance-mobile',
		import: () => import('codemirror/theme/ambiance-mobile.css'),
	},
	{
		name: 'ambiance',
		import: () => import('codemirror/theme/ambiance.css'),
	},
	{
		name: 'base16-dark',
		import: () => import('codemirror/theme/base16-dark.css'),
	},
	{
		name: 'base16-light',
		import: () => import('codemirror/theme/base16-light.css'),
	},
	{
		name: 'bespin',
		import: () => import('codemirror/theme/bespin.css'),
	},
	{
		name: 'blackboard',
		import: () => import('codemirror/theme/blackboard.css'),
	},
	{
		name: 'cobalt',
		import: () => import('codemirror/theme/cobalt.css'),
	},
	{
		name: 'colorforth',
		import: () => import('codemirror/theme/colorforth.css'),
	},
	{
		name: 'darcula',
		import: () => import('codemirror/theme/darcula.css'),
	},
	{
		name: 'dracula',
		import: () => import('codemirror/theme/dracula.css'),
	},
	{
		name: 'duotone-dark',
		import: () => import('codemirror/theme/duotone-dark.css'),
	},
	{
		name: 'duotone-light',
		import: () => import('codemirror/theme/duotone-light.css'),
	},
	{
		name: 'eclipse',
		import: () => import('codemirror/theme/eclipse.css'),
	},
	{
		name: 'elegant',
		import: () => import('codemirror/theme/elegant.css'),
	},
	{
		name: 'erlang-dark',
		import: () => import('codemirror/theme/erlang-dark.css'),
	},
	{
		name: 'gruvbox-dark',
		import: () => import('codemirror/theme/gruvbox-dark.css'),
	},
	{
		name: 'hopscotch',
		import: () => import('codemirror/theme/hopscotch.css'),
	},
	{
		name: 'icecoder',
		import: () => import('codemirror/theme/icecoder.css'),
	},
	{
		name: 'idea',
		import: () => import('codemirror/theme/idea.css'),
	},
	{
		name: 'isotope',
		import: () => import('codemirror/theme/isotope.css'),
	},
	{
		name: 'lesser-dark',
		import: () => import('codemirror/theme/lesser-dark.css'),
	},
	{
		name: 'liquibyte',
		import: () => import('codemirror/theme/liquibyte.css'),
	},
	{
		name: 'lucario',
		import: () => import('codemirror/theme/lucario.css'),
	},
	{
		name: 'material',
		import: () => import('codemirror/theme/material.css'),
	},
	{
		name: 'mbo',
		import: () => import('codemirror/theme/mbo.css'),
	},
	{
		name: 'mdn-like',
		import: () => import('codemirror/theme/mdn-like.css'),
	},
	{
		name: 'midnight',
		import: () => import('codemirror/theme/midnight.css'),
	},
	{
		name: 'monokai',
		import: () => import('codemirror/theme/monokai.css'),
	},
	{
		name: 'neat',
		import: () => import('codemirror/theme/neat.css'),
	},
	{
		name: 'neo',
		import: () => import('codemirror/theme/neo.css'),
	},
	{
		name: 'night',
		import: () => import('codemirror/theme/night.css'),
	},
	{
		name: 'oceanic-next',
		import: () => import('codemirror/theme/oceanic-next.css'),
	},
	{
		name: 'panda-syntax',
		import: () => import('codemirror/theme/panda-syntax.css'),
	},
	{
		name: 'paraiso-dark',
		import: () => import('codemirror/theme/paraiso-dark.css'),
	},
	{
		name: 'paraiso-light',
		import: () => import('codemirror/theme/paraiso-light.css'),
	},
	{
		name: 'pastel-on-dark',
		import: () => import('codemirror/theme/pastel-on-dark.css'),
	},
	{
		name: 'railscasts',
		import: () => import('codemirror/theme/railscasts.css'),
	},
	{
		name: 'rubyblue',
		import: () => import('codemirror/theme/rubyblue.css'),
	},
	{
		name: 'seti',
		import: () => import('codemirror/theme/seti.css'),
	},
	{
		name: 'shadowfox',
		import: () => import('codemirror/theme/shadowfox.css'),
	},
	{
		name: 'solarized',
		import: () => import('codemirror/theme/solarized.css'),
	},
	{
		name: 'ssms',
		import: () => import('codemirror/theme/ssms.css'),
	},
	{
		name: 'the-matrix',
		import: () => import('codemirror/theme/the-matrix.css'),
	},
	{
		name: 'tomorrow-night-bright',
		import: () => import('codemirror/theme/tomorrow-night-bright.css'),
	},
	{
		name: 'tomorrow-night-eighties',
		import: () => import('codemirror/theme/tomorrow-night-eighties.css'),
	},
	{
		name: 'ttcn',
		import: () => import('codemirror/theme/ttcn.css'),
	},
	{
		name: 'twilight',
		import: () => import('codemirror/theme/twilight.css'),
	},
	{
		name: 'vibrant-ink',
		import: () => import('codemirror/theme/vibrant-ink.css'),
	},
	{
		name: 'xq-dark',
		import: () => import('codemirror/theme/xq-dark.css'),
	},
	{
		name: 'xq-light',
		import: () => import('codemirror/theme/xq-light.css'),
	},
	{
		name: 'yeti',
		import: () => import('codemirror/theme/yeti.css'),
	},
	{
		name: 'zenburn',
		import: () => import('codemirror/theme/zenburn.css'),
	},
];

export default {
	all: () => themePlugins,
	valueOf: result => themePlugins.find(element => element.name === result),
	first: () => themePlugins[0],
};
