export function getItemStorage(key) {
	const value = localStorage.getItem(key);
	if (value !== 'undefined') {
		return JSON.parse(value);
	} else {
		return null;
	}
}

export function setItemStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function deleteItemStorage(...keys) {
	keys.forEach((key) => {
		localStorage.removeItem(key);
	});
}
