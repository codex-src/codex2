/* eslint-disable no-unused-vars */

import React from "react"
import styled from "styled-components"

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
	border-top-left-radius: ${props => (!hasOrIs(props.rounded, "tl") && !hasOrIs(props.rounded, "l") ? 0 : rem(3))};
	border-top-right-radius: ${props => (!hasOrIs(props.rounded, "tr") && !hasOrIs(props.rounded, "r") ? 0 : rem(3))};
	border-bottom-left-radius: ${props => (!hasOrIs(props.rounded, "bl") && !hasOrIs(props.rounded, "l") ? 0 : rem(3))};
	border-bottom-right-radius: ${props => (!hasOrIs(props.rounded, "br") && !hasOrIs(props.rounded, "r") ? 0 : rem(3))};
`
const Cursor = styled.span`
	margin-left: ${rem(-1.5)};
	position: absolute;
	top: 0;
	bottom: 0;
	border-right: ${props => (!props.active ? "none" : `${rem(3)} solid hsl(195, 100%, 50%)`)};
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
						<RoundedSelection active rounded={["l", "r"]}>
							dolor sit&nbsp;
						</RoundedSelection>
						<Cursor active />
						amet.
					</Relative>

					{/**/}
				</article>
			</Container>
		</Center>
	)
}
