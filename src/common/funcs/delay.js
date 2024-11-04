export async function delay(duration) {
	return await new Promise((resolve) => setTimeout(resolve, duration));
}
