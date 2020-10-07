/* eslint-disable no-unused-vars */

import React from "react"
import styled from "styled-components"

// const Selection = styled.span`
// 	display: inline-block;
// 	background-color: hsl(195, 100%, 90%);
// 	border-top-left-radius: ${props => (!props.topLeft && !props.left ? 0 : "6px")};
// 	border-top-right-radius: ${props => (!props.topRight && !props.right ? 0 : "6px")};
// 	border-bottom-left-radius: ${props => (!props.bottomLeft && !props.left ? 0 : "6px")};
// 	border-bottom-right-radius: ${props => (!props.bottomRight && !props.right ? 0 : "6px")};
// `

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
const Cursor = styled.span`
	position: absolute;
	top: 0;
	bottom: 0;
	border-right: 2px solid hsl(195, 100%, 45%);
`

export default function App() {
	return (
		<Center>
			<Content>
				<article>
					{/**/}

					{/* prettier-ignore */}
					<Relative>
						Lorem ipsum dolor
						<Cursor />{" "}
						sit amet.
					</Relative>

					{/**/}
				</article>
			</Content>
		</Center>
	)
}

// <Relative>
// 	<AbsoluteSelectionWrapper>
// 		<HiddenSelection>Occaecat ad&nbsp;</HiddenSelection>
// 		<ActiveSelection topLeft topRight bottomRight>
// 			officia ullamco occaecat do dolor sit enim culpa eiusmod ipsum. Culpa anim pariatur labore&nbsp;
// 		</ActiveSelection>
// 	</AbsoluteSelectionWrapper>
// 	Occaecat ad officia ullamco occaecat do dolor sit enim culpa eiusmod ipsum. Culpa anim pariatur labore&nbsp;
// </Relative>
// <Relative>
// 	<AbsoluteSelectionWrapper>
// 		<ActiveSelection topLeft>
// 			ullamco irure. Excepteur consectetur aliqua voluptate magna officia ad elit proident cillum.
// 			Proident&nbsp;
// 		</ActiveSelection>
// 	</AbsoluteSelectionWrapper>
// 	ullamco irure. Excepteur consectetur aliqua voluptate magna officia ad elit proident cillum. Proident&nbsp;
// </Relative>
// <Relative>
// 	<AbsoluteSelectionWrapper>
// 		<ActiveSelection topRight>
// 			nostrud ex ex sit reprehenderit. Et ngure culpa tempor amet Lorem non irure. Do sit pariatur duis
// 			officia&nbsp;
// 		</ActiveSelection>
// 	</AbsoluteSelectionWrapper>
// 	nostrud ex ex sit reprehenderit. Et ngure culpa tempor amet Lorem non irure. Do sit pariatur duis
// 	officia&nbsp;
// </Relative>
// <Relative>
// 	<AbsoluteSelectionWrapper>
// 		<ActiveSelection right>
// 			fugiat incididunt nostrud qui quis pariatur esse occaecat. Cillum aliquip cupidatat occaecat cillum
// 			minim&nbsp;
// 		</ActiveSelection>
// 	</AbsoluteSelectionWrapper>
// 	fugiat incididunt nostrud qui quis pariatur esse occaecat. Cillum aliquip cupidatat occaecat cillum
// 	minim&nbsp;
// </Relative>
// <Relative>
// 	<AbsoluteSelectionWrapper>
// 		<ActiveSelection bottomLeft bottomRight>
// 			laborum non aliqua exercitation sunt ad mollit&nbsp;
// 		</ActiveSelection>
// 		<HiddenSelection>pariatur ea.&nbsp;</HiddenSelection>
// 	</AbsoluteSelectionWrapper>
// 	laborum non aliqua exercitation sunt ad mollit pariatur ea.&nbsp;
// </Relative>
