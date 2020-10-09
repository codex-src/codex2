import { Antialiased, Unantialiased } from "Antialiasing"

import React from "react"
import rem from "rem"
import styled from "styled-components"
import useMethods from "use-methods"

// const a = styled.div({
// 	...flex("row"),
// 	...justifyContent("center"),
// })
//
// const b = styled.div({
// 	...py(96),
// 	...px(24),
// 	...width("100%"),
// 	...maxWidth(768),
// })

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

// 	// console.log(document.caretRangeFromPoint(e.clientX, e.clientY))
// 	const range = document.caretRangeFromPoint(e.clientX, e.clientY)
// 	if (range.startContainer.nodeType === Node.TEXT_NODE) {
// 		// console.log(range.startContainer.nodeValue.slice(0, range.startOffset))
// 		setPos(range.startOffset)
// 	}
// }}
// onKeyDown={e => {
// 	if (e.key === "ArrowLeft") {
// 		setPos(pos - 1 < 0 ? str.length : pos - 1)
// 	} else if (e.key === "ArrowRight") {
// 		setPos(pos + 1 <= str.length ? pos + 1 : 0)
// 	}

function getKeyDownModKeys(e) {
	const modKeys = {
		shiftKey: e.shiftKey,
		ctrlKey: e.ctrlKey,
		altKey: e.altKey,
		metaKey: e.metaKey,
	}
	return modKeys
}

export default function App() {
	const articleRef = React.useRef(null)

	const [state, dispatch] = useMethods(
		state => ({
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
			keyDownArrowUp(modKeys) {
				// TODO
			},
			keyDownArrowDown(modKeys) {
				// TODO
			},
			keyDownArrowLeft(modKeys) {
				if (!state.activeElement) {
					// No-op
					return
				}
				state.document.pos1--
			},
			keyDownArrowRight(modKeys) {
				if (!state.activeElement) {
					// No-op
					return
				}
				state.document.pos2++
			},
			focus() {
				state.activeElement = true
			},
			blur() {
				state.activeElement = false
			},
		}),
		{
			pointer: {
				down: false,
				x: 0,
				y: 0,
			},
			activeElement: false,
			document: {
				data: "Hello, world!",
				pos1: 0,
				pos2: 0,
			},
		},
	)

	return (
		<Antialiased>
			{/**/}

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
							const fn = {
								ArrowUp: dispatch.keyDownArrowUp,
								ArrowRight: dispatch.keyDownArrowRight,
								ArrowDown: dispatch.keyDownArrowDown,
								ArrowLeft: dispatch.keyDownArrowLeft,
							}[e.key]
							if (fn) {
								const modKeys = getKeyDownModKeys(e)
								fn(modKeys)
							}
						}}
						tabIndex={0}
					>
						{/**/}

						{/* prettier-ignore */}
						<p>
							{state.document.data}
						</p>

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
