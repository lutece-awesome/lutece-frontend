const LanguageList = [
	{
		full: 'GNU G++',
		info: 'GNU G++17',
		codeMirror: 'text/x-c++src',
		codeMirrorImport: () => import('codemirror/mode/clike/clike'),
	},
	{
		full: 'GNU GCC',
		info: 'GNU GCC 7.3',
		codeMirror: 'text/x-csrc',
		codeMirrorImport: () => import('codemirror/mode/clike/clike'),
	},
	// {
	// 	full: 'Clang',
	// 	info: 'Clang 6.0.0',
	// 	codeMirror: 'text/x-c++src',
	// },
	{
		full: 'Python',
		info: 'Python 3.6.5',
		codeMirror: 'text/x-python',
		codeMirrorImport: () => import('codemirror/mode/python/python'),
	},
	{
		full: 'Java',
		info: 'Java 10',
		codeMirror: 'text/x-java',
		// Java using clike
		codeMirrorImport: () => import('codemirror/mode/clike/clike'),
	},
	{
		full: 'Go',
		info: 'Go 1.10.2',
		codeMirror: 'text/x-go',
		codeMirrorImport: () => import('codemirror/mode/go/go'),
	},
	{
		full: 'Ruby',
		info: 'Ruby 2.5.1',
		codeMirror: 'text/x-ruby',
		codeMirrorImport: () => import('codemirror/mode/ruby/ruby'),
	},
	{
		full: 'Rust',
		info: 'Rust 1.26.1',
		codeMirror: 'text/x-rustsrc',
		codeMirrorImport: () => import('codemirror/mode/rust/rust'),
	},
];

const valueOf = result => LanguageList.find(element => element.full === result
	|| element.info === result);

const Language = {
	valueOf: result => valueOf(result),
	all: () => LanguageList,
	first: () => LanguageList[0],
};

export default Language;
