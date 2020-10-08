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
	background-color: hsl(195, 100%, 92.5%);
	border-top-left-radius: ${props => (!props.topLeft && !props.left ? 0 : rem(4))};
	border-top-right-radius: ${props => (!props.topRight && !props.right ? 0 : rem(4))};
	border-bottom-left-radius: ${props => (!props.bottomLeft && !props.left ? 0 : rem(4))};
	border-bottom-right-radius: ${props => (!props.bottomRight && !props.right ? 0 : rem(4))};
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
	z-index: 10;
`

export default function App() {
	return (
		<Center>
			<Content style={{ width: "100%", maxWidth: 768 }}>
				<article style={{ fontSize: 19 }}>
					{/**/}

					<p>
						<Relative style={{ height: 28 }}>
							<TransparentText>
								Do elit ut id aute duis do sit velit quis ea elit.&nbsp;
								<span style={{ position: "absolute", transform: "translateX(-100%)" }}>
									<div style={{ position: "absolute" }}>
										<div style={{ width: 28, height: 28, backgroundColor: "white", borderBottomRightRadius: rem(4) }} />
									</div>
									<div style={{ width: 28, height: 28, backgroundColor: "hsl(195, 100%, 92.5%)" }} />
								</span>
								<SelectionText topLeft right>
									Esse officia voluptate sit eu amet duis&nbsp;
								</SelectionText>
							</TransparentText>
							<Absolute>
								Do elit ut id aute duis do sit velit quis ea elit. Esse officia voluptate sit eu amet duis&nbsp;
							</Absolute>
						</Relative>

						{/**/}
						<Relative style={{ height: 28 }}>
							<Absolute>
								<TransparentText>
									<SelectionText topLeft bottomRight>
										aliquip nulla sint proident qui. Et aliqua ex qui nisi nulla adipisicing est culpa esse&nbsp;
									</SelectionText>
								</TransparentText>
							</Absolute>
							<Absolute>
								aliquip nulla sint proident qui. Et aliqua ex qui nisi nulla adipisicing est culpa esse&nbsp;
							</Absolute>
						</Relative>

						{/**/}
						<Relative style={{ height: 28 }}>
							<TransparentText>
								<SelectionText bottomRight>mollit ad consectetur</SelectionText>
								&nbsp;aliqua ex.
							</TransparentText>
							<Absolute>mollit ad consectetur aliqua ex.</Absolute>
						</Relative>
					</p>
					<p>
						<Relative style={{ height: 28 }}>
							<TransparentText>
								<SelectionText>&nbsp;</SelectionText>
							</TransparentText>
							<Absolute>&nbsp;</Absolute>
						</Relative>
					</p>
					<p>
						<Relative style={{ height: 28 }}>
							<TransparentText>
								<SelectionText bottomLeft right>
									Et dolore dolor aute velit in cillum exercitation fugiat
									<Cursor active blink={false} />
								</SelectionText>
								&nbsp;et dolor aliquip.
							</TransparentText>
							<Absolute>Et dolore dolor aute velit in cillum exercitation fugiat et dolor aliquip.</Absolute>
						</Relative>
					</p>

					{/**/}

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
