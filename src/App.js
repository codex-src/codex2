import "variables.css"

import { Absolute, Relative } from "position"
import { Antialiased, Unantialiased } from "Antialiasing"
import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"

import rem from "rem"
import useEditor from "useEditor"

// function getKeyDownModKeys(e) {
// 	const modKeys = {
// 		shiftKey: e.shiftKey,
// 		ctrlKey: e.ctrlKey,
// 		altKey: e.altKey,
// 		metaKey: e.metaKey,
// 	}
// 	return modKeys
// }

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

// https://codepen.io/ArtemGordinsky/pen/GnLBq
const blink = keyframes`
  0%,
	51% {
		opacity: 100%;
  }
  50% {
    opacity: 0%;
  }
`

// const Component = styled.div.attrs(props => ({
// 	style: {
// 		background: props.background,
// 	},
// }))`width: 100%;`

const AbsoluteCaret = styled.span.attrs(props => ({
	style: {
		left: rem(props.left),
	},
}))`
	margin-left: ${rem(-1)};
	position: absolute;
	top: 0;
	bottom: 0;
	width: ${rem(2)};
	background-color: var(--caret-color);
	border-radius: 9999px;
	animation: ${props =>
		// prettier-ignore
		!props.preventAnimation
			?  css`${blink} 1s cubic-bezier(0, 1, 0, 1) infinite`
			: "none"};
	z-index: 20;
	pointer-events: none;
	user-select: none;
`

const AbsoluteSelection = styled.span.attrs(props => ({
	style: {
		left: rem(props.left),
		width: rem(props.width),
	},
}))`
	position: absolute;
	top: 0;
	bottom: 0;
	background-color: ${props => props.backgroundColor};
	border-radius: ${rem(3)};
	z-index: 0;
	pointer-events: none;
	user-select: none;
`

export default function App() {
	const articleRef = useRef(null)
	const measureRef = useRef(null)

	const caretRef = React.useRef(null)

	const [state, dispatch] = useEditor("Veniam sunt sunt nisi est enim elit eiusmod do reprehenderit minim.")

	const [computed, setComputed] = useState({
		range: {
			start: 0,
			end: 0,
		},
	})

	useLayoutEffect(() => {
		const src = articleRef.current
		const dst = measureRef.current
		for (const each of [...src.style]) {
			dst.style[each] = src.style[each]
		}
	}, [])

	// TODO: useCaretAnimation
	React.useEffect(() => {
		if (!state.activeElement) {
			// No-op
			return
		}
		const open = state.range.start !== state.range.end
		if (!open) {
			caretRef.current.style.animationName = "none"
			const id = setTimeout(() => {
				caretRef.current.style.animationName = ""
			}, 250)
			return () => {
				clearTimeout(id)
			}
		} else {
			caretRef.current.style.animationName = "none"
		}
	}, [state.activeElement, state.range.start, state.range.end])

	// TODO: useComputed
	useLayoutEffect(
		useCallback(() => {
			while (measureRef.current.lastChild) {
				measureRef.current.lastChild.remove()
			}
			const textNode = document.createTextNode(state.content.slice(0, state.range.start))
			measureRef.current.appendChild(textNode)
			const start = measureRef.current.getBoundingClientRect().right
			measureRef.current.lastChild.nodeValue += state.content.slice(state.range.start, state.range.end)
			const end = measureRef.current.getBoundingClientRect().right
			measureRef.current.lastChild.nodeValue += state.content.slice(state.range.end)
			setComputed(current => ({
				...current,
				range: {
					...current.range,
					start,
					end,
				},
			}))
		}, [state]),
		[state.range.start, state.range.end],
	)

	return (
		<Antialiased>
			{/**/}

			<Absolute top left sty>
				<div ref={measureRef} />
			</Absolute>

			<Center>
				<Content>
					<article
						ref={articleRef}
						style={{
							whiteSpace: "pre-wrap",
							fontSize: 19,
							outline: "none",

							// pointerEvents: "none",
							userSelect: "none",
						}}
						onPointerMove={e => {
							const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY)
							let offset = caretRange.startOffset
							if (caretRange.startContainer.nodeType !== Node.TEXT_NODE) {
								offset = state.content.length
							}
							dispatch.pointerMove(offset)
						}}
						onPointerDown={e => {
							const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY)
							let offset = caretRange.startOffset
							if (caretRange.startContainer.nodeType !== Node.TEXT_NODE) {
								offset = state.content.length
							}
							dispatch.pointerDown(offset)
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
						// TODO: e.ctrlKey && e.key === "a"
						onKeyDown={e => {
							// let boundary = "char"
							// if (e.altKey && !e.metaKey) {
							// 	boundary = "word"
							// } else if (e.metaKey && !e.altKey) {
							// 	boundary = "line"
							// }

							// TODO: Add boundary.
							if (e.key === "ArrowLeft") {
								if (!e.shiftKey) {
									dispatch.moveArrowLeft()
								} else {
									if (state.range.direction !== "forwards") {
										dispatch.extendArrowToLeft()
									} else {
										dispatch.reduceArrowToLeft()
									}
								}
							} else if (e.key === "ArrowRight") {
								if (!e.shiftKey) {
									dispatch.moveArrowRight()
								} else {
									if (state.range.direction !== "backwards") {
										dispatch.extendArrowToRight()
									} else {
										dispatch.reduceArrowToRight()
									}
								}
							}
						}}
						tabIndex={0}
					>
						{/**/}

						<Relative style={{ height: rem(19 * 1.5) }}>
							{/**/}

							{state.activeElement && (
								<AbsoluteCaret
									ref={caretRef}
									left={
										// prettier-ignore
										state.range.direction === "backwards"
											? computed.range.start
											: computed.range.end
									}
								/>
							)}

							<Absolute style={{ zIndex: 10 }}>{state.content}</Absolute>

							{state.range.start !== state.range.end && (
								<AbsoluteSelection
									left={computed.range.start}
									width={computed.range.end - computed.range.start}
									backgroundColor={
										// prettier-ignore
										!state.activeElement
											? "var(--inactive-selection-color)"
											: "var(--selection-color)"
									}
								/>
							)}
						</Relative>

						{/**/}
					</article>

					<br />

					{/* prettier-ignore */}
					<div>
						<Unantialiased>
							<pre style={{ fontSize: 12 }}>
								{JSON.stringify(state, null, 2)}
							</pre>
						</Unantialiased>
					</div>

					{/**/}
				</Content>
			</Center>

			{/**/}
		</Antialiased>
	)
}
