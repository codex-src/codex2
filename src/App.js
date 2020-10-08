/* eslint-disable no-unused-vars */

import styled, { css, keyframes } from "styled-components"

import React from "react"
import rem from "rem"

const Center = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`
const Container = styled.div`
	padding: 96px 24px;
	width: 100%;
	max-width: 768px;
`

const Relative = styled.div`
	position: relative;
`
const Absolute = styled.div`
	position: absolute;
	top: ${props => (!props.top ? "auto" : 0)};
	right: ${props => (!props.right ? "auto" : 0)};
	bottom: ${props => (!props.bottom ? "auto" : 0)};
	left: ${props => (!props.left ? "auto" : 0)};
`
const Transparent = styled.div`
	color: transparent;
`

// // Ex:
// //
// // hasOrIs(["a", "b", "c"], "a") -> true
// // hasOrIs("a", "a") -> true
// //
// function hasOrIs(arrOrStr, str) {
// 	if (Array.isArray(arrOrStr)) {
// 		return arrOrStr.indexOf(str) >= 0
// 	}
// 	return arrOrStr === str
// }
//
// const RoundedSelection = styled.span`
// 	display: inline-block;
// 	background-color: ${props => (!props.active ? "hsl(0, 0%, 92.5%)" : "hsl(195, 100%, 92.5%)")};
// 	border-top-left-radius: ${props => (!hasOrIs(props.rounded, "tl") && !hasOrIs(props.rounded, "l") ? 0 : rem(2))};
// 	border-top-right-radius: ${props => (!hasOrIs(props.rounded, "tr") && !hasOrIs(props.rounded, "r") ? 0 : rem(2))};
// 	border-bottom-left-radius: ${props => (!hasOrIs(props.rounded, "bl") && !hasOrIs(props.rounded, "l") ? 0 : rem(2))};
// 	border-bottom-right-radius: ${props => (!hasOrIs(props.rounded, "br") && !hasOrIs(props.rounded, "r") ? 0 : rem(2))};
// `

const Caret = styled.span`
	margin-left: ${rem(-1)};
	position: absolute;
	top: 0;
	bottom: 0;
	border-right: ${props => (!props.active ? "none" : `${rem(2)} solid hsl(195, 100%, 45%)`)};
`

const data = {
	str: "Hello, world!",
	offset: 7,
}

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
					test
				</div>
			</Absolute>

			<Center>
				<Container>
					<article ref={articleRef} style={{ fontSize: 19 }}>
						{/**/}

						{/* prettier-ignore */}
						<Relative>
							<Absolute>
								{data.str}
							</Absolute>
							<Transparent as="span" style={{ pointerEvents: "none", userSelect: "none" }}>
								{data.str.slice(0, data.offset)}
								<span
									style={{
										marginLeft: rem(-1),
										position: "absolute",
										height: "100%",
										borderRight: `${rem(2)} solid var(--caret-color)`,
										borderRadius: 9999,
									}}
								/>
								{data.str.slice(data.offset)}
							</Transparent>
						</Relative>

						{/**/}
					</article>
				</Container>
			</Center>
		</>
	)
}
