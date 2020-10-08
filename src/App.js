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

export default function App() {
	return (
		<Center>
			<Container>
				<article style={{ fontSize: 19 }}>
					{/**/}

					{/* prettier-ignore */}
					<Relative>
						<div style={{ position: "absolute", top: 0, bottom: 0, borderRight: "2px solid red" }} />
						{data.str}
					</Relative>

					{/**/}
				</article>
			</Container>
		</Center>
	)
}
