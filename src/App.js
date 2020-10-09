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
				content: "Hello, world!",
				selection: {
					start: {
						// ...
					},
					end: {
						// ...
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
						style={{ fontSize: 19 }}
						onPointerMove={e => {
							dispatch.pointerMove({ x: e.clientX, y: e.clientY })
						}}
						onPointerDown={e => {
							dispatch.pointerDown()
						}}
						onPointerUp={e => {
							dispatch.pointerUp()
						}}
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
