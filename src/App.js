/* eslint-disable no-unused-vars */

import { Absolute, Center, Relative } from "utils"
import styled, { css, keyframes } from "styled-components"

import React from "react"
import rem from "rem"

const Container = styled.div`
	padding: 96px 24px;
	width: 100%;
	max-width: 768px;
`

const Input = styled.input`
	&:focus {
		outline: none;
	}
`

// border-right: ${props => (!props.active ? "none" : `${rem(2)} solid var(--caret-color)`)};
const AbsoluteCaret = styled.span`
	margin-left: rem(-1);
	position: absolute;
	height: 100%;
	border-right: ${rem(2)} solid var(--caret-color);
	border-radius: 9999;
`

// Ex:
//
// <div style="font-size: 19px"> -> { fontSize: "19px" }
//
function getStyleMapFromElement(srcElement) {
	const styleMap = {}
	const keys = [...srcElement.style]
	for (const each of keys) {
		styleMap[each] = srcElement.style[each]
	}
	return styleMap
}

// Ex:
//
// ({ fontSize: "19px" }, <div>) -> <div style="font-size: 19px">
//
function applyStyleMapToElement(styleMap, dstElement) {
	for (const each in styleMap) {
		dstElement.style[each] = styleMap[each]
	}
}

// Ex:
//
// <div><br /></div> -> <div></div>
//
function clearElement(element) {
	while (element.lastChild) {
		element.lastChild.remove()
	}
}

export default function App() {
	const measureRef = React.useRef()
	const articleRef = React.useRef()

	const [str, setStr] = React.useState("Hello, world!")
	const [pos, setPos] = React.useState(13)
	const [coords, setCoords] = React.useState(0)

	React.useLayoutEffect(() => {
		const styleMap = getStyleMapFromElement(articleRef.current)
		applyStyleMapToElement(styleMap, measureRef.current)
	}, [])

	// console.log(str.slice(0, pos), "\n", str.slice(pos))
	const measureCaretCoords = React.useCallback(() => {
		clearElement(measureRef.current)
		measureRef.current.appendChild(document.createTextNode(str.slice(0, pos)))
		const clientRect = measureRef.current.getBoundingClientRect()
		setCoords(clientRect.right)
	}, [str, pos])

	React.useLayoutEffect(measureCaretCoords, [measureCaretCoords, pos])

	return (
		<>
			<style>
				{css`
					html {
						--selection-color: hsla(200, 100%, 90%, 0.9);
						--caret-color: hsl(200, 100%, 50%);
					}
				`}
			</style>

			<Absolute top left>
				<div ref={measureRef} style={{ outline: "1px solid red" }} />
			</Absolute>

			<Center>
				<Container>
					<article ref={articleRef} style={{ fontSize: 19 }}>
						{/**/}

						{/* Inputs */}
						<div style={{ display: "flex" }}>
							<Input type="text" value={str} style={{ width: "50%" }} onChange={e => setStr(e.target.value)} />
							<Input type="number" value={pos} style={{ width: "50%" }} onChange={e => setPos(+e.target.value)} />
						</div>

						<br />
						<Relative style={{ height: 28.5 }}>
							<AbsoluteCaret style={{ left: coords }} />
							{str}
						</Relative>

						<br />
						<pre style={{ fontSize: 14 }}>{JSON.stringify({ str, pos, coords }, null, 2)}</pre>

						{/**/}
					</article>
				</Container>
			</Center>
		</>
	)
}
