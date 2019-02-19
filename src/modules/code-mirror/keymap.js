const keymapPlugins = [
	{
		name: 'default',
		import: () => Promise.resolve(),
	},
	{
		name: 'sublime',
		import: () => import('codemirror/keymap/sublime'),
	},
	{
		name: 'emacs',
		import: () => import('codemirror/keymap/emacs'),
	},
	{
		name: 'vim',
		import: () => import('codemirror/keymap/vim'),
	},
];

export default {
	all: () => keymapPlugins,
	valueOf: result => keymapPlugins.find(element => element.name === result),
	first: () => keymapPlugins[0],
};
