let daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

const convertDate = (date, message) => {
	const newDate = new Date(date || '');
	let h = newDate.getHours();
	let m = newDate.getMinutes();
	let s = newDate.getSeconds();
	let yyyy = newDate.getFullYear();
	let mm = newDate.getMonth() + 1;
	let dd = newDate.getDate();
	let d = newDate.getDay();

	return {
		getDateText() {
			return date ? `${daysOfWeek[d]}, ngày ${checkTime(dd)} tháng ${checkTime(mm)} năm ${yyyy}` : message;
		},
		getDate() {
			return date ? `${yyyy}/${checkTime(mm)}/${checkTime(dd)}` : message;
		},
		getDayMonth() {
			return date ? `${checkTime(dd)}/${checkTime(mm)}` : message;
		},
		getDateFormat() {
			return date ? `${checkTime(dd)}/${checkTime(mm)}/${yyyy}` : message;
		},
		getTime() {
			return date ? `${checkTime(h)}:${checkTime(m)}` : message;
		},
		getFullTime() {
			return date ? `${checkTime(h)}:${checkTime(m)}:${checkTime(s)}` : message;
		},
		getFullDateTime() {
			return date ? `${checkTime(h)}:${checkTime(m)}, ${checkTime(dd)}/${checkTime(mm)}/${yyyy}` : message;
		},
		getMonthYear() {
			return date ? `$${checkTime(mm)}/${yyyy}` : message;
		},
		getNumberTime() {
			return date ? newDate.getTime() : message;
		},
		getDateSubmit() {
			return date ? `${yyyy}-${checkTime(mm)}-${checkTime(dd)}` : message;
		},
	};
};

function checkTime(i) {
	if (Math.abs(i) < 10) {
		i = '0' + i;
	}
	return i;
}

export function catDateAndId(date, id) {
	const newDate = new Date(date);
	let yyyy = newDate.getFullYear();
	let mm = newDate.getMonth() + 1;
	let dd = newDate.getDate();

	return `${yyyy}${mm}${dd}${id}`;
}

export default convertDate;
