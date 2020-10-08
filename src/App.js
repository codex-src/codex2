/* eslint-disable no-unused-vars */

import styled, { css, keyframes } from "styled-components"

import React from "react"

// Converts px to rem.
//
// Ex:
//
// rem(16) -> "1rem"
//
function rem(px) {
	const n = px / 16
	return n + "rem"
}

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
const RoundedSelection = styled.span`
	display: inline-block;
	background-color: ${props => (!props.active ? "hsl(0, 0%, 92.5%)" : "hsl(195, 100%, 92.5%)")};
	border-top-left-radius: ${props => (!hasOrIs(props.rounded, "tl") && !hasOrIs(props.rounded, "l") ? 0 : rem(2))};
	border-top-right-radius: ${props => (!hasOrIs(props.rounded, "tr") && !hasOrIs(props.rounded, "r") ? 0 : rem(2))};
	border-bottom-left-radius: ${props => (!hasOrIs(props.rounded, "bl") && !hasOrIs(props.rounded, "l") ? 0 : rem(2))};
	border-bottom-right-radius: ${props => (!hasOrIs(props.rounded, "br") && !hasOrIs(props.rounded, "r") ? 0 : rem(2))};
`

// https://codepen.io/ArtemGordinsky/pen/GnLBq
const CursorBlink = keyframes`
  from, to {
    opacity: 100%;
  }
  50% {
    opacity: 0%;
  }
`
const Cursor = styled.span`
	margin-left: ${rem(-1)};
	position: absolute;
	top: 0;
	bottom: 0;
	animation: ${props =>
		!props.blink
			? "none"
			: css`
					${CursorBlink} 1s step-end infinite
			  `};
	border-right: ${props => (!props.active ? "none" : `${rem(2)} solid hsl(195, 100%, 45%)`)};
`

function hasOrIs(arrOrStr, str) {
	// Array:
	if (Array.isArray(arrOrStr)) {
		return arrOrStr.indexOf(str) >= 0
	}
	// Non-array:
	return arrOrStr === str
}

export default function App() {
	return (
		<Center>
			<Container>
				<article style={{ fontSize: 18 }}>
					{/**/}

					<Relative>
						Lorem ipsum&nbsp;
						{/* <RoundedSelection active rounded={["l", "r"]}> */}
						dolor sit&nbsp;
						{/* </RoundedSelection> */}
						<Cursor active blink={false} />
						amet.
					</Relative>

					{/**/}
				</article>
			</Container>
		</Center>
	)
}
