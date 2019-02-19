// for theme dir, ref to https://codemirror.net/theme/
const themePlugins = [
	{
		name: 'default',
		import: () => Promise.resolve(),
	},
	{
		name: '3024-day.css',
		import: () => import('codemirror/theme/3024-day.css'),
	},
	{
		name: '3024-night.css',
		import: () => import('codemirror/theme/3024-night.css'),
	},
	{
		name: 'abcdef.css',
		import: () => import('codemirror/theme/abcdef.css'),
	},
	{
		name: 'ambiance-mobile.css',
		import: () => import('codemirror/theme/ambiance-mobile.css'),
	},
	{
		name: 'ambiance.css',
		import: () => import('codemirror/theme/ambiance.css'),
	},
	{
		name: 'base16-dark.css',
		import: () => import('codemirror/theme/base16-dark.css'),
	},
	{
		name: 'base16-light.css',
		import: () => import('codemirror/theme/base16-light.css'),
	},
	{
		name: 'bespin.css',
		import: () => import('codemirror/theme/bespin.css'),
	},
	{
		name: 'blackboard.css',
		import: () => import('codemirror/theme/blackboard.css'),
	},
	{
		name: 'cobalt.css',
		import: () => import('codemirror/theme/cobalt.css'),
	},
	{
		name: 'colorforth.css',
		import: () => import('codemirror/theme/colorforth.css'),
	},
	{
		name: 'darcula.css',
		import: () => import('codemirror/theme/darcula.css'),
	},
	{
		name: 'dracula.css',
		import: () => import('codemirror/theme/dracula.css'),
	},
	{
		name: 'duotone-dark.css',
		import: () => import('codemirror/theme/duotone-dark.css'),
	},
	{
		name: 'duotone-light.css',
		import: () => import('codemirror/theme/duotone-light.css'),
	},
	{
		name: 'eclipse.css',
		import: () => import('codemirror/theme/eclipse.css'),
	},
	{
		name: 'elegant.css',
		import: () => import('codemirror/theme/elegant.css'),
	},
	{
		name: 'erlang-dark.css',
		import: () => import('codemirror/theme/erlang-dark.css'),
	},
	{
		name: 'gruvbox-dark.css',
		import: () => import('codemirror/theme/gruvbox-dark.css'),
	},
	{
		name: 'hopscotch.css',
		import: () => import('codemirror/theme/hopscotch.css'),
	},
	{
		name: 'icecoder.css',
		import: () => import('codemirror/theme/icecoder.css'),
	},
	{
		name: 'idea.css',
		import: () => import('codemirror/theme/idea.css'),
	},
	{
		name: 'isotope.css',
		import: () => import('codemirror/theme/isotope.css'),
	},
	{
		name: 'lesser-dark.css',
		import: () => import('codemirror/theme/lesser-dark.css'),
	},
	{
		name: 'liquibyte.css',
		import: () => import('codemirror/theme/liquibyte.css'),
	},
	{
		name: 'lucario.css',
		import: () => import('codemirror/theme/lucario.css'),
	},
	{
		name: 'material.css',
		import: () => import('codemirror/theme/material.css'),
	},
	{
		name: 'mbo.css',
		import: () => import('codemirror/theme/mbo.css'),
	},
	{
		name: 'mdn-like.css',
		import: () => import('codemirror/theme/mdn-like.css'),
	},
	{
		name: 'midnight.css',
		import: () => import('codemirror/theme/midnight.css'),
	},
	{
		name: 'monokai.css',
		import: () => import('codemirror/theme/monokai.css'),
	},
	{
		name: 'neat.css',
		import: () => import('codemirror/theme/neat.css'),
	},
	{
		name: 'neo.css',
		import: () => import('codemirror/theme/neo.css'),
	},
	{
		name: 'night.css',
		import: () => import('codemirror/theme/night.css'),
	},
	{
		name: 'oceanic-next.css',
		import: () => import('codemirror/theme/oceanic-next.css'),
	},
	{
		name: 'panda-syntax.css',
		import: () => import('codemirror/theme/panda-syntax.css'),
	},
	{
		name: 'paraiso-dark.css',
		import: () => import('codemirror/theme/paraiso-dark.css'),
	},
	{
		name: 'paraiso-light.css',
		import: () => import('codemirror/theme/paraiso-light.css'),
	},
	{
		name: 'pastel-on-dark.css',
		import: () => import('codemirror/theme/pastel-on-dark.css'),
	},
	{
		name: 'railscasts.css',
		import: () => import('codemirror/theme/railscasts.css'),
	},
	{
		name: 'rubyblue.css',
		import: () => import('codemirror/theme/rubyblue.css'),
	},
	{
		name: 'seti.css',
		import: () => import('codemirror/theme/seti.css'),
	},
	{
		name: 'shadowfox.css',
		import: () => import('codemirror/theme/shadowfox.css'),
	},
	{
		name: 'solarized.css',
		import: () => import('codemirror/theme/solarized.css'),
	},
	{
		name: 'ssms.css',
		import: () => import('codemirror/theme/ssms.css'),
	},
	{
		name: 'the-matrix.css',
		import: () => import('codemirror/theme/the-matrix.css'),
	},
	{
		name: 'tomorrow-night-bright.css',
		import: () => import('codemirror/theme/tomorrow-night-bright.css'),
	},
	{
		name: 'tomorrow-night-eighties.css',
		import: () => import('codemirror/theme/tomorrow-night-eighties.css'),
	},
	{
		name: 'ttcn.css',
		import: () => import('codemirror/theme/ttcn.css'),
	},
	{
		name: 'twilight.css',
		import: () => import('codemirror/theme/twilight.css'),
	},
	{
		name: 'vibrant-ink.css',
		import: () => import('codemirror/theme/vibrant-ink.css'),
	},
	{
		name: 'xq-dark.css',
		import: () => import('codemirror/theme/xq-dark.css'),
	},
	{
		name: 'xq-light.css',
		import: () => import('codemirror/theme/xq-light.css'),
	},
	{
		name: 'yeti.css',
		import: () => import('codemirror/theme/yeti.css'),
	},
	{
		name: 'zenburn.css',
		import: () => import('codemirror/theme/zenburn.css'),
	},
];

export default {
	all: () => themePlugins,
	valueOf: result => themePlugins.find(element => element.name === result),
	first: () => themePlugins[0],
};
