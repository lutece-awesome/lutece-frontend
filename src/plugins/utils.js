function getRank(rk) {
	let s = String(rk);
	if (s.length < 2) s = `0${s}`;
	return s;
}

function reverse(s) {
	return s.reverse();
}

export { getRank, reverse };
