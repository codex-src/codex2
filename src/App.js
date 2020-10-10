import "variables.css"

import { Absolute, Relative } from "position"
import { Antialiased, Unantialiased } from "Antialiasing"
import React, { useCallback, useLayoutEffect, useRef } from "react"
import styled, { css, keyframes } from "styled-components"

import rem from "rem"
import useEditor from "useEditor"

function getKeyDownModKeys(e) {
	const modKeys = {
		shiftKey: e.shiftKey,
		ctrlKey: e.ctrlKey,
		altKey: e.altKey,
		metaKey: e.metaKey,
	}
	return modKeys
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
  from,
	to {
		opacity: 100%;
  }
  50% {
    opacity: 0%;
  }
`

const AbsoluteCaret = styled.span`
	margin-left: ${rem(-1)};
	position: absolute;
	top: 0;
	right: auto;
	bottom: 0;
	left: ${props => rem(props.left)};
	width: ${rem(2)};
	/* background-color: ${props => props.backgroundColor}; */
	background-color: var(--caret-color);
	border-radius: 9999px;
	animation: ${props =>
		!props.preventAnimation
			? css`
					${blink} 1s cubic-bezier(0, 0.75, 0, 0.75) infinite
			  `
			: "none"};
	z-index: 20;
	pointer-events: none;
	user-select: none;
`

const AbsoluteSelection = styled.span`
	position: absolute;
	top: 0;
	right: auto;
	bottom: 0;
	left: ${props => rem(props.left)};
	width: ${props => rem(props.width)};
	background-color: ${props => props.backgroundColor};
	border-radius: ${rem(3)};
	z-index: 0;
	pointer-events: none;
	user-select: none;
`

export default function App() {
	const articleRef = useRef(null)
	const measureRef = useRef(null)

	const [state, dispatch] = useEditor("Hello, world!")

	const caretRef = React.useRef(null)

	// React.useEffect(() => {
	// 	const DURATION = 1e3
	// 	console.log("on")
	// 	const itv = setInterval(() => {
	// 		console.log("off")
	// 		setTimeout(() => {
	// 			console.log("on")
	// 		}, DURATION / 2)
	// 	}, DURATION)
	// 	return () => {
	// 		clearInterval(itv)
	// 	}
	// }, [state.document.range.start])

	React.useEffect(() => {
		if (!state.document.activeElement) {
			// No-op
			return
		}
		const open = state.document.range.start !== state.document.range.end
		if (!open) {
			caretRef.current.style.animation = "none"
			const id = setTimeout(() => {
				caretRef.current.style.animation = ""
			}, 250)
			return () => {
				clearTimeout(id)
			}
		} else {
			caretRef.current.style.animation = "none"
		}
	}, [state.document.activeElement, state.document.range.start, state.document.range.end])

	React.useLayoutEffect(() => {
		const handler = e => {
			const clientRect = articleRef.current.getBoundingClientRect()
			// prettier-ignore
			dispatch.resize({
				top:    clientRect.top,
				right:  clientRect.right,
				bottom: clientRect.bottom,
				left:   clientRect.left,
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
			clear(measureRef.current)
			const textNode = document.createTextNode(state.document.content.slice(0, state.document.range.start))
			measureRef.current.appendChild(textNode)
			computed.start = measureRef.current.getBoundingClientRect().right
			measureRef.current.lastChild.nodeValue += state.document.content.slice(
				state.document.range.start,
				state.document.range.end,
			)
			computed.end = measureRef.current.getBoundingClientRect().right
			measureRef.current.lastChild.nodeValue += state.document.content.slice(state.document.range.end)
			// dispatch.setRangeComputed(right)
			dispatch.setComputedOpenRange(computed)
		}, [state, dispatch]),
		[state.document.range.start, state.document.range.end],
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
							outline: "none", // "1px solid hsla(0, 100%, 50%, 0.25)",

							// pointerEvents: "none",
							userSelect: "none",
						}}
						// console.log({ start, end })
						onPointerMove={e => {
							const method = dispatch.pointerMove
							const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY)

							let start = caretRange.startOffset
							let end = caretRange.endOffset
							if (caretRange.startContainer.nodeType !== Node.TEXT_NODE) {
								start = state.document.content.length
								end = state.document.content.length
							}
							method({
								coords: {
									x: e.clientX,
									y: e.clientY,
								},
								range: {
									start,
									end,
								},
							})
						}}
						onPointerDown={e => {
							const method = dispatch.pointerDown
							const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY)

							let start = caretRange.startOffset
							let end = caretRange.endOffset
							if (caretRange.startContainer.nodeType !== Node.TEXT_NODE) {
								start = state.document.content.length
								end = state.document.content.length
							}
							method({
								coords: {
									x: e.clientX,
									y: e.clientY,
								},
								range: {
									start,
									end,
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

						{/* left={state.document.range.__computed.end} */}
						{/* state.document.range.__computed.start */}
						{/* state.document.range.__computed.end - state.document.range.__computed.start */}
						{/* active={!state.document.activeElement} */}

						{/* prettier-ignore */}
						<Relative style={{ height: rem(19 * 1.5) }}>

							{/* Caret */}
							{state.document.activeElement && (
								<AbsoluteCaret
									ref={caretRef}
									left={state.document.range.__computed.end}
									// preventAnimation
								/>
							)}

							{/* Content */}
							<Absolute
								style={{
									// pointerEvents: "none",
									// userSelect: "none",
									zIndex: 10,
								}}
							>
								{state.document.content}
							</Absolute>

							{/* Range */}
							{state.document.range.start !== state.document.range.end && (
								<AbsoluteSelection
									left={state.document.range.__computed.start}
									width={state.document.range.__computed.end - state.document.range.__computed.start}
									backgroundColor={
										!state.document.activeElement ? "var(--inactive-selection-color)" : "var(--selection-color)"
									}
								/>
							)}

						</Relative>

						{/**/}
					</article>

					<div>
						<br />
						<Unantialiased>
							<pre style={{ fontSize: 12 }}>{JSON.stringify({ range: state.document.range }, null, 2)}</pre>
						</Unantialiased>
					</div>
				</Content>
			</Center>

			{/**/}
		</Antialiased>
	)
}
