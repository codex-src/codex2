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

const AbsoluteCaret = styled.span`
	margin-left: ${rem(-1)};
	position: absolute;
	height: 100%;
	border-right: ${rem(2)} solid var(--caret-color);
	border-radius: 9999px;
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
	pointerMove({ x: rawX, y: rawY }) {
		state.pointer.x = Math.round(rawX)
		state.pointer.y = Math.round(rawY)
	},
	pointerDown() {
		state.pointer.down = true
	},
	pointerUp() {
		state.pointer.down = false
	},

	setRangeCoords(coords) {
		state.document.range.coords = coords
	},

	arrowUp(modKeys) {
		// ...
	},
	arrowDown(modKeys) {
		// ...
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
		if (!modKeys.shiftKey) {
			if (state.document.range.start > 0) {
				state.document.range.start--
				state.document.range.end--
			}
		} else {
			if (state.document.range.start > 0) {
				state.document.range.start--
			}
		}
	},
	keyDownArrowRight(modKeys) {
		if (!modKeys.shiftKey) {
			if (state.document.range.end < state.document.content.length) {
				state.document.range.start++
				state.document.range.end++
			}
		} else {
			if (state.document.range.end < state.document.content.length) {
				state.document.range.end++
			}
		}
	},
	focus() {
		state.activeElement = true
	},
	blur() {
		state.activeElement = false
	},
})

const initialState = {
	pointer: {
		down: false,
		x: 0,
		y: 0,
	},
	activeElement: false,
	document: {
		content: "Hello, world!",
		range: {
			open: false,
			start: 13, // FIXME
			end: 13, // FIXME
			coords: {
				x: 0,
				y: 0,
			},
		},
	},
}

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

	useLayoutEffect(() => {
		const src = articleRef.current
		const dst = measureRef.current
		for (const each of [...src.style]) {
			dst.style[each] = src.style[each]
		}
	}, [])

	useLayoutEffect(
		useCallback(() => {
			clear(measureRef.current)
			const textNode = document.createTextNode(state.document.content.slice(0, state.document.range.start))
			measureRef.current.appendChild(textNode)
			const { top, right } = measureRef.current.getBoundingClientRect()
			const coords = { x: right, y: top }
			dispatch.setRangeCoords(coords)
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

			{/* prettier-ignore */}
			<Absolute top left style={{ outline: "1px solid red" }}>
				<div ref={measureRef}>
					{/* ... */}
				</div>
			</Absolute>

			<Center>
				<Content>
					<article
						ref={articleRef}
						style={{
							fontSize: 19,
							outline: "none",
						}}
						onPointerMove={e => {
							dispatch.pointerMove({ x: e.clientX, y: e.clientY })
						}}
						onPointerDown={e => {
							dispatch.pointerDown()
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
						<Relative style={{ height: 28.5 }}>
							{state.activeElement && (
								<AbsoluteCaret style={{ left: state.document.range.coords.x }} />
							)}
							{state.document.content}
						</Relative>

						<br />
						<Unantialiased>
							<pre style={{ fontSize: 12 }}>{JSON.stringify(state, null, 2)}</pre>
						</Unantialiased>

						{/**/}
					</article>
				</Content>
			</Center>

			{/**/}
		</Antialiased>
	)
}
