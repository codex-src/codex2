import useMethods from "use-methods"

const methods = state => ({
	// TODO: Add support for shiftKey?
	pointerMove(range) {
		if (!state.pointer.down) {
			// No-op
			return
		}
		state.range = range
	},
	// TODO: Add support for shiftKey?
	pointerDown(range) {
		state.pointerDown = true
		state.range = range
	},
	pointerUp() {
		state.pointerDown = false
	},

	focus() {
		state.activeElement = true
	},
	blur() {
		state.activeElement = false
	},

	moveArrowLeft(/* boundary */) {
		const n = state.range.direction !== "none" ? 0 : 1
		state.range.direction = "none"
		state.range.start = Math.max(0, state.range.start - n)
		state.range.end = state.range.start
	},
	moveArrowRight(/* boundary */) {
		const n = state.range.direction !== "none" ? 0 : 1
		state.range.direction = "none"
		state.range.end = Math.min(state.range.end + n, state.content.length)
		state.range.start = state.range.end
	},

	extendArrowToLeft(/* boundary */) {
		if (state.range.start - 1 >= 0 && state.range.start - 1 < state.range.end) {
			state.range.direction = "backwards"
		}
		state.range.start = Math.max(0, state.range.start - 1)
	},
	extendArrowToRight(/* boundary */) {
		if (state.range.end + 1 < state.content.length && state.range.end + 1 > state.range.start) {
			state.range.direction = "forwards"
		}
		state.range.end = Math.min(state.range.end + 1, state.content.length)
	},

	reduceArrowToLeft(/* boundary */) {
		if (state.range.end - 1 >= 0 && state.range.end - 1 === state.range.start) {
			state.range.direction = "none"
		}
		state.range.end = Math.max(0, state.range.end - 1)
	},
	reduceArrowToRight(/* boundary */) {
		if (state.range.start + 1 < state.content.length && state.range.start + 1 === state.range.end) {
			state.range.direction = "none"
		}
		state.range.start = Math.min(state.range.start + 1, state.content.length)
	},
})

const initialState = {
	pointer: {
		x: 0,
		y: 0,
		down: false,
	},
	activeElement: false,
	content: "Hello, world!",
	range: {
		direction: "none",
		start: 0,
		end: 0,
	},
}

function init(initialValue) {
	const state = {
		...initialState,
		content: initialValue,
	}
	return state
}

export default function useEditor(initialValue) {
	return useMethods(methods, null, () => init(initialValue))
}
