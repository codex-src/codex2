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
const Content = styled.div`
	padding: 96px 24px;
`

const Relative = styled.div`
	position: relative;
`
const Absolute = styled.div`
	position: absolute;
	top: 0; /* Needed */
	right: 0;
	bottom: 0;
	left: 0;
`

const TransparentText = styled.div`
	display: inline-block;
	color: transparent;
	background-color: transparent;
`
const SelectionText = styled.span`
	display: inline-block;
	background-color: hsl(195, 100%, 90%);
	border-top-left-radius: ${props => (!props.topLeft && !props.left ? 0 : rem(2))};
	border-top-right-radius: ${props => (!props.topRight && !props.right ? 0 : rem(2))};
	border-bottom-left-radius: ${props => (!props.bottomLeft && !props.left ? 0 : rem(2))};
	border-bottom-right-radius: ${props => (!props.bottomRight && !props.right ? 0 : rem(2))};
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
					${CursorBlink} 900ms step-end infinite
			  `};
	border-right: ${props => (!props.active ? "none" : `${rem(2)} solid hsl(195, 100%, 45%)`)};
`

export default function App() {
	return (
		<Center>
			<Content style={{ width: "100%", maxWidth: 768 }}>
				<article style={{ fontSize: 19 }}>
					{/**/}

					<Relative style={{ height: 28 }}>
						<TransparentText>
							<SelectionText left right>
								Do elit ut id aute duis do sit velit quis ea elit.
							</SelectionText>
							&nbsp;Esse officia voluptate sit eu amet duis&nbsp;
						</TransparentText>
						<Absolute>
							<TransparentText>
								Do elit ut id aute duis do sit velit quis ea elit.
								<Cursor active blink /> Esse officia voluptate sit eu amet duis&nbsp;
							</TransparentText>
						</Absolute>
						<Absolute>
							Do elit ut id aute duis do sit velit quis ea elit. Esse officia voluptate sit eu amet duis&nbsp;
						</Absolute>
					</Relative>

					{/**/}
					{/* <Line>aliquip nulla sint proident qui. Et aliqua ex qui nisi nulla adipisicing est culpa esse&nbsp;</Line>
					<Line>mollit ad consectetur aliqua ex.</Line> */}

					{/* <div
						style={{
							position: "relative",
							height: 28,
						}}
					>
						<div
							style={{
								display: "inline-block",
								width: "60%",
								height: "100%",
								backgroundColor: "hsl(195, 100%, 90%)",
								borderTopLeftRadius: 5,
								borderTopRightRadius: 5,
								borderBottomRightRadius: 5,
							}}
						/>
					</div>
					<div
						style={{
							position: "relative",
							height: 28,
						}}
					>
						<div
							style={{
								display: "inline-block",
								width: "50%",
								height: "100%",
								backgroundColor: "hsl(195, 100%, 90%)",
							}}
						/>
						<div
							style={{
								position: "relative",
								display: "inline-block",
								height: "100%",
							}}
						>
							<div
								style={{
									position: "absolute",
									top: 0,
									bottom: 0,
								}}
							>
								<div
									style={{
										display: "inline-block",
										width: 28,
										height: "100%",
										backgroundColor: "hsl(0, 0%, 100%)",
										borderTopLeftRadius: 5,
										borderBottomLeftRadius: 5,
									}}
								/>
							</div>
							<div
								style={{
									display: "inline-block",
									width: 28,
									height: "100%",
									backgroundColor: "hsl(195, 100%, 90%)",
								}}
							/>
						</div>
					</div>
					<div
						style={{
							position: "relative",
							height: 28,
						}}
					>
						<div
							style={{
								display: "inline-block",
								width: "60%",
								height: "100%",
								backgroundColor: "hsl(195, 100%, 90%)",
								borderTopRightRadius: 5,
								borderBottomLeftRadius: 5,
								borderBottomRightRadius: 5,
							}}
						/>
					</div> */}
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
