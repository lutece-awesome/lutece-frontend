
const ColorList = [
	'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'yellow', 'amber', 'orange', 'brown',
];

const getRandomColor = () => {
	const sz = ColorList.length;
	return ColorList[Math.floor(Math.random() * sz)];
};

export default getRandomColor;
