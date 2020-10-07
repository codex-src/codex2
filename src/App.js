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
	border-top-left-radius: ${props => (!props.rounded.includes("tl") && !props.rounded.includes("l") ? 0 : "2px")};
	border-top-right-radius: ${props => (!props.rounded.includes("tr") && !props.rounded.includes("r") ? 0 : "2px")};
	border-bottom-left-radius: ${props => (!props.rounded.includes("bl") && !props.rounded.includes("l") ? 0 : "2px")};
	border-bottom-right-radius: ${props => (!props.rounded.includes("br") && !props.rounded.includes("r") ? 0 : "2px")};
`
const Cursor = styled.span`
	position: absolute;
	top: 0;
	bottom: 0;
	border-right: ${props => (!props.active ? "none" : "2px solid hsl(195, 100%, 45%)")};
`

export default function App() {
	return (
		<Center>
			<Content>
				<article>
					{/**/}

					{/* prettier-ignore */}
					<Relative>
						Lorem ipsum <RoundedSelection active rounded={["l", "r"]}>dolor</RoundedSelection>
						<Cursor active />{" "}
						sit amet.
					</Relative>

					{/**/}
				</article>
			</Content>
		</Center>
	)
}
