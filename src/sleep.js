// https://stackoverflow.com/a/39914235
export default function sleep(duration) {
	return new Promise(resolve => setTimeout(resolve, duration))
}
