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

const SHIFT = "shift"
const CTRL = "ctrl"
const ALT = "alt"
const META = "meta"

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
			keyDown(type) {
				const match = {
					[SHIFT]: true,
					[CTRL]: true,
					[ALT]: true,
					[META]: true,
				}[type]
				if (!match) {
					throw new Error(`keyDown: no such type; type=${type}`)
				}
				state.keyboard[type] = true
			},
			keyUp(type) {
				const match = {
					[SHIFT]: true,
					[CTRL]: true,
					[ALT]: true,
					[META]: true,
				}[type]
				if (!match) {
					throw new Error(`keyUp: no such type; type=${type}`)
				}
				state.keyboard[type] = false
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
			keyboard: {
				[SHIFT]: false,
				[CTRL]: false,
				[ALT]: false,
				[META]: false,
			},
			activeElement: false,
			document: {
				content: "Hello, world!",
				selection: {
					start: {
						offset: 0,
					},
					end: {
						offset: 0,
					},
				},
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
						onKeyDown={e => {
							const type = {
								Shift: SHIFT,
								Control: CTRL,
								Alt: ALT,
								Meta: META,
							}[e.key]
							if (type) {
								dispatch.keyDown(type)
							}
						}}
						onKeyUp={e => {
							const type = {
								Shift: SHIFT,
								Control: CTRL,
								Alt: ALT,
								Meta: META,
							}[e.key]
							if (type) {
								dispatch.keyUp(type)
							}
						}}
						tabIndex={0}
					>
						{/**/}

						{/* prettier-ignore */}
						<p>
							{state.document.content}
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
