import { Absolute, Relative } from "position"
import { Antialiased, Unantialiased } from "Antialiasing"
import React, { useCallback, useLayoutEffect, useRef } from "react"
import styled, { css } from "styled-components"

import rem from "rem"
import useMethods from "use-methods"

const Center = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`
const Content = styled.div`
	padding: ${rem(96)} ${rem(24)};
	width: 100%;
	max-width: ${rem(768)};
`

// top: ${rem(-2)};
// bottom: ${rem(-2)};
const AbsoluteCaret = styled.span`
	margin-left: ${rem(-1)};
	position: absolute;
	top: 0;
	bottom: 0;
	border-right: ${rem(2)} solid var(--caret-color);
	border-radius: 9999px;

	pointer-events: none;
	user-select: none;
`

function getKeyDownModKeys(e) {
	const modKeys = {
		shiftKey: e.shiftKey,
		ctrlKey: e.ctrlKey,
		altKey: e.altKey,
		metaKey: e.metaKey,
	}
	return modKeys
}

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
	keyDownArrowLeft(modKeys) {
		// state.document.range.direction = "start"
		if (state.document.range.start > 0) {
			state.document.range.start--
			state.document.range.end--
		}
	},
	keyDownArrowRight(modKeys) {
		// state.document.range.direction = "start"
		if (state.document.range.end < state.document.content.length) {
			state.document.range.start++
			state.document.range.end++
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

	focus() {
		state.activeElement = true
	},
	blur() {
		state.activeElement = false
	},
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
	activeElement: false,
	document: {
		content: "Hello, world!",
		range: {
			direction: "start",
			start: 0,
			end: 0,
			// __computed: 0,
			__computed: {
				left: 0,
				right: 0,
			},
		},
	},
}

// const document = {
// 	range: {
// 		start: {
// 			id: "",
// 			offset: 0,
// 		},
// 		end: {
// 			id: "",
// 			offset: 0,
// 		},
// 		computed: {
// 			x1: 0,
// 			x2: 0,
// 		},
// 	},
// }

// Ex:
//
// <div><br /></div> -> <div></div>
//
function clear(element) {
	while (element.lastChild) {
		element.lastChild.remove()
	}
}

export default function App() {
	const articleRef = useRef(null)
	const measureRef = useRef(null)

	const [state, dispatch] = useMethods(methods, initialState)

	React.useLayoutEffect(() => {
		const handler = e => {
			const clientRect = articleRef.current.getBoundingClientRect()
			dispatch.resize({
				top: clientRect.top,
				right: clientRect.right,
				bottom: clientRect.bottom,
				left: clientRect.left,
			})
		}
		handler() // Once
		window.addEventListener("resize", handler, false)
		return () => {
			window.removeEventListener("resize", handler, false)
		}
	}, [dispatch])

	// Once
	useLayoutEffect(() => {
		const src = articleRef.current
		const dst = measureRef.current
		for (const each of [...src.style]) {
			dst.style[each] = src.style[each]
		}
	}, [])

	// TODO: Move to reducer?
	useLayoutEffect(
		useCallback(() => {
			const computed = {
				start: 0,
				end: 0,
			}
			// state.document.content.slice(0, state.document.range.start)
			clear(measureRef.current)
			const textNode = document.createTextNode("Hello, ")
			measureRef.current.appendChild(textNode)
			computed.start = measureRef.current.getBoundingClientRect().right
			measureRef.current.lastChild.nodeValue += "world"
			computed.end = measureRef.current.getBoundingClientRect().right
			measureRef.current.lastChild.nodeValue += "!"
			// dispatch.setRangeComputed(right)
			dispatch.setComputedOpenRange(computed)
		}, [state, dispatch]),
		[state.document.range.start, state.document.range.end],
	)

	return (
		<Antialiased>
			{/**/}

			<style>
				{css`
					html {
						--selection-color: hsla(200, 100%, 90%, 0.9);
						--caret-color: hsl(200, 100%, 50%);
					}
				`}
			</style>

			<Absolute top left sty>
				<div ref={measureRef} />
			</Absolute>

			{/* <Relative style={{ height: 28 }}>
				<TransparentText>
					Do elit ut id aute duis do sit velit quis ea elit.&nbsp;
					<span style={{ position: "absolute", transform: "translateX(-100%)" }}>
						<div style={{ position: "absolute" }}>
							<div
								style={{ width: 28, height: 28, backgroundColor: "white", borderBottomRightRadius: rem(4) }}
							/>
						</div>
						<div style={{ width: 28, height: 28, backgroundColor: "var(--selection-background-color)" }} />
					</span>
					<SelectionText topLeft right>
						Esse officia voluptate sit eu amet duis&nbsp;
					</SelectionText>
				</TransparentText>
				<Absolute>
					Do elit ut id aute duis do sit velit quis ea elit. Esse officia voluptate sit eu amet duis&nbsp;
				</Absolute>
			</Relative> */}

			<Center>
				<Content>
					<article
						ref={articleRef}
						style={{
							whiteSpace: "pre-wrap",
							fontSize: 19,
							// outline: "1px solid hsla(0, 100%, 50%, 0.25)",

							// pointerEvents: "none",
							userSelect: "none",
						}}
						onPointerMove={e => {
							const method = dispatch.pointerMove
							const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY)
							method({
								coords: {
									x: e.clientX,
									y: e.clientY,
								},
								range: {
									start: caretRange.startOffset,
									end: caretRange.endOffset,
								},
							})
						}}
						onPointerDown={e => {
							const method = dispatch.pointerDown
							const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY)
							method({
								coords: {
									x: e.clientX,
									y: e.clientY,
								},
								range: {
									start: caretRange.startOffset,
									end: caretRange.endOffset,
								},
							})
						}}
						onPointerUp={e => {
							dispatch.pointerUp()
						}}
						onBlur={e => {
							dispatch.blur()
						}}
						onFocus={e => {
							dispatch.focus()
						}}
						onKeyDown={e => {
							// prettier-ignore
							const method = {
								ArrowUp:    dispatch.keyDownArrowUp,
								ArrowRight: dispatch.keyDownArrowRight,
								ArrowDown:  dispatch.keyDownArrowDown,
								ArrowLeft:  dispatch.keyDownArrowLeft,
							}[e.key]
							if (method) {
								const modKeys = getKeyDownModKeys(e)
								method(modKeys)
							}
						}}
						tabIndex={0}
					>
						{/**/}

						{/* prettier-ignore */}
						{/* <AbsoluteCaret style={{ left: state.document.range.__computed, zIndex: 20 }} /> */}
						<Relative style={{ height: rem(19 * 1.5) }}>
							{/* {state.activeElement && ( */}
							<div
								style={{
									marginLeft: rem(-1),
									position: "absolute",
									top: 0,
									right: "auto",
									bottom: 0,
									left: state.document.range.__computed.end,
									borderRight: `${rem(2)} solid var(--caret-color)`,
									borderRadius: 9999,
									zIndex: 20,
									pointerEvents: "none",
									userSelect: "none",
								}}
							/>
							{/* )} */}
							<Absolute style={{ zIndex: 10 }}>{state.document.content}</Absolute>
							<div
								style={{
									position: "absolute",
									top: 0,
									right: "auto",
									bottom: 0,
									left: state.document.range.__computed.start,
									width: state.document.range.__computed.end - state.document.range.__computed.start,
									backgroundColor: "var(--selection-color)",
									borderRadius: rem(3),
									zIndex: 0,
									pointerEvents: "none",
									userSelect: "none",
								}}
							/>
						</Relative>

						{/**/}
					</article>

					{/* prettier-ignore */}
					<div>
						<br />
						<Unantialiased>
							<pre style={{ fontSize: 12 }}>{JSON.stringify(state, null, 2)}</pre>
						</Unantialiased>
					</div>
				</Content>
			</Center>

			{/**/}
		</Antialiased>
	)
}
