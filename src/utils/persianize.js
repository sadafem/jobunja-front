function persianizeStr(num) {
	try {
		let i = 0;
		num = num.toString().trim();
		const len = num.length;
		let res = '';
		let pos;
		const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

		for (; i < len; i++)
			if ((pos = persianNumbers[num.charAt(i)])) res += pos;
			else res += num.charAt(i);

		return res;
	} catch (err) {
		return num;
	}
}

function numberHumanize(num) {
	try {
		const humanize = num
			.toString()
			.replace(/[^-\d]/g, '')
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		if (humanize.length < num.length) return num;
		return humanize;
	} catch (err) {
		return num;
	}
}

export function persianNumberHumanize(num) {
	const humanize = numberHumanize(num);
	return persianizeStr(humanize);
}
