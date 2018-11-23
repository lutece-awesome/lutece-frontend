const LanguageList = [
	{
		full: 'GNU G++',
		info: 'GNU G++17',
		codeMirror: 'text/x-c++src',
	},
	{
		full: 'GNU GCC',
		info: 'GNU GCC 7.3',
		codeMirror: 'text/x-csrc',
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
	},
	{
		full: 'Java',
		info: 'Java 10',
		codeMirror: 'text/x-java',
	},
	{
		full: 'Go',
		info: 'Go 1.10.2',
		codeMirror: 'text/x-go',
	},
	{
		full: 'Ruby',
		info: 'Ruby 2.5.1',
		codeMirror: 'text/x-ruby',
	},
	{
		full: 'Rust',
		info: 'Rust 1.26.1',
		codeMirror: 'text/x-rustsrc',
	},
];

const valueOf = result => LanguageList.find(element => element.full === result
	|| element.short === result);

const Language = {
	valueOf: result => valueOf(result),
	all: () => LanguageList,
	first: () => LanguageList[0],
};

export default Language;
