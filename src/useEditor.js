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
	pointerMove({ coords, range }) {
		state.pointer.x = coords.x
		state.pointer.y = coords.y
		// state.pointer.down = true

		if (!state.pointer.down) {
			// No-op
			return
		}

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

	// setComputedOpenRange(computed) {
	// 	state.range.__computed = computed
	// },

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
		// __computed: {
		// 	left: 0,
		// 	right: 0,
		// },
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
