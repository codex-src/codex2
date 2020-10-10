import useMethods from "use-methods"

const methods = state => ({
	resize(layout) {
		state.layout = layout
	},

	pointerMove({ coords, range }) {
		state.pointer.x = coords.x
		state.pointer.y = coords.y
		// state.pointer.down = true

		if (!state.pointer.down) {
			// No-op
			return
		} else if (coords.y < state.layout.top || coords.y > state.layout.bottom) {
			// No-op
			return
		} else if (coords.x < state.layout.left || coords.x > state.layout.right) {
			// No-op
			return
		}
		state.document.range.start = range.start
		// state.document.range.end = range.end
	},
	pointerDown({ coords, range }) {
		state.pointer.x = coords.x
		state.pointer.y = coords.y
		state.pointer.down = true

		state.document.range.start = range.start
		state.document.range.end = range.end
	},
	pointerUp() {
		state.pointer.down = false
	},

	// setRangeComputed(computed) {
	// 	state.document.range.__computed = computed
	// },
	setComputedOpenRange(computed) {
		state.document.range.__computed = computed
	},

	focus() {
		state.document.activeElement = true
	},
	blur() {
		state.document.activeElement = false
	},

	// dir=up
	// dir=right
	// dir=down
	// dir=left
	// boundary=rune
	// boundary=word
	// boundary=line
	// boundary=node
	// boundary=page
	//
	keyDownArrowUp(modKeys) {
		// TODO
	},
	keyDownArrowDown(modKeys) {
		// TODO
	},
	// keyDownArrowLeft(modKeys) {
	// 	// state.document.range.direction = "start"
	// 	if (state.document.range.start > 0) {
	// 		state.document.range.start--
	// 		state.document.range.end--
	// 	}
	// },
	// keyDownArrowRight(modKeys) {
	// 	// state.document.range.direction = "start"
	// 	if (state.document.range.end < state.document.content.length) {
	// 		state.document.range.start++
	// 		state.document.range.end++
	// 	}
	// },
	keyDownArrowLeft(modKeys) {
		if (!modKeys.shiftKey) {
			// state.document.range.direction = "none"
			if (state.document.range.start > 0) {
				state.document.range.start--
				state.document.range.end--
			}
		} else {
			// state.document.range.direction = "backwards"
			if (state.document.range.start > 0) {
				state.document.range.start--
			}
		}
	},
	keyDownArrowRight(modKeys) {
		if (!modKeys.shiftKey) {
			// state.document.range.direction = "none"
			if (state.document.range.end < state.document.content.length) {
				state.document.range.start++
				state.document.range.end++
			}
		} else {
			// state.document.range.direction = "forwards"
			if (state.document.range.end < state.document.content.length) {
				state.document.range.end++
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
	document: {
		activeElement: false,
		content: "Hello, world!",
		range: {
			// direction: "start", // TODO
			start: 0,
			end: 0,
			// TODO: Move computed to state.__computed.range?
			__computed: {
				left: 0,
				right: 0,
			},
		},
	},
}

function init(initialValue) {
	const state = {
		...initialState,
		document: {
			...initialState.document,
			content: initialValue,
		},
	}
	return state
}

export default function useEditor(initialValue) {
	return useMethods(methods, null, () => init(initialValue))
}
