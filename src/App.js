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
			// resize(clientRect) {
			// 	state.clientRect = clientRect
			// },
			pointerMove({ x, y }) {
				state.pointer.x = x
				state.pointer.y = y
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
			// clientRect: {
			// 	top: 0,
			// 	right: 0,
			// 	bottom: 0,
			// 	left: 0,
			// 	width: 0,
			// 	height: 0,
			// 	x: 0,
			// 	y: 0,
			// },
			pointer: {
				down: false,
				x: 0,
				y: 0,
			},
			activeElement: false,
		},
	)

	// React.useLayoutEffect(() => {
	// 	const handler = e => {
	// 		const clientRect = articleRef.current.getBoundingClientRect()
	// 		dispatch.resize(clientRect)
	// 	}
	// 	handler()
	// 	window.addEventListener("resize", handler, false)
	// 	return () => {
	// 		window.removeEventListener("resize", handler, false)
	// 	}
	// }, [dispatch])

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
						{/* <p>
							{state.text}
						</p> */}

						{/* prettier-ignore */}
						<Unantialiased>
							<pre style={{ fontSize: 12 }}>
								{JSON.stringify(state, null, 2)}
							</pre>
						</Unantialiased>

						{/**/}
					</article>
				</Content>
			</Center>

			{/**/}
		</Antialiased>
	)
}
