import "variables.css"

import { Absolute, Relative } from "position"
import React, { useCallback, useLayoutEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"

import { Antialiased } from "Antialiasing"
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
					${blink} 1s cubic-bezier(0, 1, 0, 1) infinite
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

							let direction = "none"
							if (caretRange.startOffset < caretRange.endOffset) {
								direction = "backwards"
							} else if (caretRange.startOffset > caretRange.endOffset) {
								direction = "forwards"
							}
							let start = Math.min(caretRange.startOffset, caretRange.endOffset)
							let end = Math.max(caretRange.startOffset, caretRange.endOffset)
							if (caretRange.startContainer.nodeType !== Node.TEXT_NODE) {
								start = state.content.length
								end = state.content.length
							}
							dispatch.pointerMove({
								direction,
								start,
								end,
							})
						}}
						onPointerDown={e => {
							const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY)

							let direction = "none"
							if (caretRange.startOffset < caretRange.endOffset) {
								direction = "backwards"
							} else if (caretRange.startOffset > caretRange.endOffset) {
								direction = "forwards"
							}
							let start = Math.min(caretRange.startOffset, caretRange.endOffset)
							let end = Math.max(caretRange.startOffset, caretRange.endOffset)
							if (caretRange.startContainer.nodeType !== Node.TEXT_NODE) {
								start = state.content.length
								end = state.content.length
							}
							dispatch.pointerDown({
								direction,
								start,
								end,
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

					{/* <div>
						<br />
						<Unantialiased>
							<pre style={{ fontSize: 12 }}>{JSON.stringify({ range: state.range }, null, 2)}</pre>
						</Unantialiased>
					</div> */}

					{/**/}
				</Content>
			</Center>

			{/**/}
		</Antialiased>
	)
}
