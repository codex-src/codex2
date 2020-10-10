import useMethods from "use-methods"

function arrowLeft(state) {
	state.range.direction = "none"
	if (state.range.start) {
		state.range.start--
	}
	state.range.end = state.range.start
}

function arrowRight(state) {
	state.range.direction = "none"
	if (state.range.end < state.content.length) {
		state.range.end++
	}
	state.range.start = state.range.end
}

function arrowLeftExtend(state) {
	if (state.range.start) {
		if (state.range.start === state.range.end) {
			state.range.direction = "backwards"
		}
		state.range.start--
	}
}

function arrowRightExtend(state) {
	if (state.range.end < state.content.length) {
		if (state.range.start === state.range.end) {
			state.range.direction = "forwards"
		}
		state.range.end++
	}
}

function arrowLeftReduce(state) {
	if (state.range.end) {
		state.range.end--
		if (state.range.start === state.range.end) {
			state.range.direction = "none"
		}
	}
}

function arrowRightReduce(state) {
	if (state.range.start < state.content.length) {
		state.range.start++
		if (state.range.start === state.range.end) {
			state.range.direction = "none"
		}
	}
}

const methods = state => ({
	resize(layout) {
		state.layout = layout
	},

	pointerMove({ coords, range }) {
		state.pointer.x = coords.x
		state.pointer.y = coords.y
		// state.pointer.down = true

		// Scope pointer events to state.layout:
		if (!state.pointer.down) {
			// No-op
			return
		} // else if (coords.y < state.layout.top || coords.y > state.layout.bottom) {
		// 	// No-op
		// 	return
		// } else if (coords.x < state.layout.left || coords.x > state.layout.right) {
		// 	// No-op
		// 	return
		// }

		// TODO: Add state.direction values here?
		// TODO: Add support for shiftKey?
		state.range.start = range.start
		// state.range.end = range.end
	},
	pointerDown({ coords, range }) {
		state.pointer.x = coords.x
		state.pointer.y = coords.y
		state.pointer.down = true

		// TODO: Add state.direction values here?
		// TODO: Add support for shiftKey?
		state.range.start = range.start
		state.range.end = range.end
	},
	pointerUp() {
		state.pointer.down = false
	},

	// setRangeComputed(computed) {
	// 	state.range.__computed = computed
	// },
	setComputedOpenRange(computed) {
		state.range.__computed = computed
	},

	focus() {
		state.activeElement = true
	},
	blur() {
		state.activeElement = false
	},

	keyDownArrowUp(modKeys) {
		// TODO
	},
	keyDownArrowDown(modKeys) {
		// TODO
	},
	keyDownArrowLeft(modKeys) {
		if (!modKeys.shiftKey) {
			arrowLeft(state)
		} else {
			// arrowLeftExtend(state)
			if (state.range.direction === "forwards") {
				arrowLeftReduce(state)
			} else {
				arrowLeftExtend(state)
			}
		}
	},
	keyDownArrowRight(modKeys) {
		if (!modKeys.shiftKey) {
			arrowRight(state)
		} else {
			if (state.range.direction === "backwards") {
				arrowRightReduce(state)
			} else {
				arrowRightExtend(state)
			}
		}
	},

	// keyDownBackspace() {
	// 	// ...
	// },
	// keyDownForwardBackspace() {
	// 	// ...
	// },
	// keyDownCharacter(character) {
	// 	// ...
	// },
})

const initialState = {
	layout: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	pointer: {
		x: 0,
		y: 0,
		down: false,
	},
	// document: {
	activeElement: false,
	content: "Hello, world!",
	range: {
		direction: "none",
		start: 0,
		end: 0,
		// TODO: Move computed to state.__computed.range?
		__computed: {
			left: 0,
			right: 0,
		},
	},
	// },
}

function init(initialValue) {
	const state = {
		...initialState,
		// document: {
		// ...initialState,
		content: initialValue,
		// },
	}
	return state
}

export default function useEditor(initialValue) {
	return useMethods(methods, null, () => init(initialValue))
}
