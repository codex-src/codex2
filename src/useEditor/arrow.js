// TODO: Add boundary.

export function moveArrowLeft(state) {
	const n = state.range.direction !== "none" ? 0 : 1
	state.range.direction = "none"
	state.range.start = Math.max(0, state.range.start - n)
	state.range.end = state.range.start
}
export function moveArrowRight(state) {
	const n = state.range.direction !== "none" ? 0 : 1
	state.range.direction = "none"
	state.range.end = Math.min(state.range.end + n, state.content.length)
	state.range.start = state.range.end
}

export function extendArrowToLeft(state) {
	if (state.range.start - 1 >= 0 && state.range.start - 1 < state.range.end) {
		state.range.direction = "backwards"
	}
	state.range.start = Math.max(0, state.range.start - 1)
}
export function extendArrowToRight(state) {
	if (state.range.end + 1 < state.content.length && state.range.end + 1 > state.range.start) {
		state.range.direction = "forwards"
	}
	state.range.end = Math.min(state.range.end + 1, state.content.length)
}

export function reduceArrowToLeft(state) {
	if (state.range.end - 1 >= 0 && state.range.end - 1 === state.range.start) {
		state.range.direction = "none"
	}
	state.range.end = Math.max(0, state.range.end - 1)
}
export function reduceArrowToRight(state) {
	if (state.range.start + 1 < state.content.length && state.range.start + 1 === state.range.end) {
		state.range.direction = "none"
	}
	state.range.start = Math.min(state.range.start + 1, state.content.length)
}
