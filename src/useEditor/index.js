import {
	extendArrowToLeft,
	extendArrowToRight,
	moveArrowLeft,
	moveArrowRight,
	reduceArrowToLeft,
	reduceArrowToRight,
} from "./arrow"

import useMethods from "use-methods"

const methods = state => ({
	pointerMove(offset) {
		if (!state.pointerDown) {
			// No-op
			return
		}
		// state.range.end = range.end

		if (offset < state.range.end) {
			state.range.direction = "backwards"
			state.range.start = offset
		} else if (offset === state.range.end) {
			state.range.direction = "none"
			state.range.start = offset
			state.range.end = offset
		}
	},
	pointerDown(offset) {
		state.pointerDown = true
		// state.range = range
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
