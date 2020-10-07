/* eslint-disable no-unused-vars */

import React from "react"
import styled from "styled-components"

const Center = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`
const Content = styled.div`
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
	border-top-left-radius: ${props => (!hasOrIs(props.rounded, "tl") && !hasOrIs(props.rounded, "l") ? 0 : "2px")};
	border-top-right-radius: ${props => (!hasOrIs(props.rounded, "tr") && !hasOrIs(props.rounded, "r") ? 0 : "2px")};
	border-bottom-left-radius: ${props => (!hasOrIs(props.rounded, "bl") && !hasOrIs(props.rounded, "l") ? 0 : "2px")};
	border-bottom-right-radius: ${props => (!hasOrIs(props.rounded, "br") && !hasOrIs(props.rounded, "r") ? 0 : "2px")};
`
const Cursor = styled.span`
	margin-left: -1px;
	position: absolute;
	top: 0;
	bottom: 0;
	border-right: ${props => (!props.active ? "none" : "2px solid hsl(195, 100%, 45%)")};
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
			<Content>
				<article>
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
			</Content>
		</Center>
	)
}
