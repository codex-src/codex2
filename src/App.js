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

const Caret = styled.span`
	margin-left: rem(-1);
	position: absolute;
	height: 100%;
	border-right: ${props => (!props.active ? "none" : `${rem(2)} solid var(--caret-color)`)};
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

export default function App() {
	const measureRef = React.useRef()
	const articleRef = React.useRef()

	const [str, setStr] = React.useState("Hello, world!")
	const [pos, setPos] = React.useState(13)

	// Propagates articleRef styles to measureRef.
	React.useLayoutEffect(() => {
		const id = window.requestAnimationFrame(() => {
			const styleMap = getStyleMapFromElement(articleRef.current)
			applyStyleMapToElement(styleMap, measureRef.current)
		})
		return () => {
			window.cancelAnimationFrame(id)
		}
	}, [])

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

			{/* prettier-ignore */}
			<Absolute top left>
				<div ref={measureRef}>
					{str}
				</div>
			</Absolute>

			<Center>
				<Container>
					<article ref={articleRef} style={{ fontSize: 19 }}>
						{/**/}

						{/* Inputs */}
						<div style={{ display: "flex" }}>
							<Input
								type="text"
								value={str}
								style={{ width: "50%" }}
								onChange={e => {
									setStr(e.target.value)
								}}
							/>
							<Input
								type="number"
								value={13}
								style={{ width: "50%" }}
								onChange={e => {
									// Cast as a number:
									setPos(+e.target.value)
								}}
							/>
						</div>

						<br />
						<Relative>
							<Absolute>{str}</Absolute>
							<span style={{ color: "transparent", pointerEvents: "none", userSelect: "none" }}>
								{str.slice(0, pos)}
								<Caret active />
								{str.slice(pos)}
							</span>
						</Relative>

						{/**/}
					</article>
				</Container>
			</Center>
		</>
	)
}
