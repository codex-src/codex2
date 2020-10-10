import {
	extendArrowToLeft,
	extendArrowToRight,
	moveArrowLeft,
	moveArrowRight,
	reduceArrowToLeft,
	reduceArrowToRight,
} from "./arrow"

import useMethods from "use-methods"

// prettier-ignore
function setRangeFromOffset(state, offset) {
	// None:
	if (state.range.direction === "none") {
		if (offset < state.range.start) {
			state.range.direction = "backwards"
			state.range.start = offset
		} else if (offset > state.range.start) {
			state.range.direction = "forwards"
			state.range.end = offset
		}
	// Backwards:
	} else if (state.range.direction === "backwards") {
		if (offset < state.range.end) {
			state.range.start = offset
		} else {
			state.range.direction = offset === state.range.end ? "none" : "forwards"
			state.range.start = state.range.end
			state.range.end = offset
		}
	// Forwards:
	} else if (state.range.direction === "forwards") {
		if (offset > state.range.start) {
			state.range.end = offset
		} else if (offset <= state.range.start) {
			state.range.direction = offset === state.range.start ? "none" : "backwards"
			state.range.end = state.range.start // Reverse order
			state.range.start = offset
		}
	}
}

const methods = state => ({
	pointerMove(offset) {
		if (!state.pointerDown) {
			// No-op
			return
		}
		setRangeFromOffset(state, offset)
	},
	pointerDown(offset, { shiftKey }) {
		state.pointerDown = true
		if (!shiftKey) {
			state.range.direction = "none"
			state.range.start = offset
			state.range.end = offset
			return
		}
		setRangeFromOffset(state, offset)
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

	// TODO: Add boundary.

	moveArrowLeft() {
		moveArrowLeft(state)
	},
	moveArrowRight() {
		moveArrowRight(state)
	},
	extendArrowToLeft() {
		extendArrowToLeft(state)
	},
	extendArrowToRight() {
		extendArrowToRight(state)
	},
	reduceArrowToLeft() {
		reduceArrowToLeft(state)
	},
	reduceArrowToRight() {
		reduceArrowToRight(state)
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
