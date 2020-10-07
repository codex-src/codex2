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
const InsetPadding = styled.div`
	padding: 96px 24px;
`

export default function App() {
	return (
		<Center>
			<InsetPadding style={{ width: "100%", maxWidth: 768 }}>
				<article>
					{/**/}

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
					</div>

					{/**/}
				</article>
			</InsetPadding>
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
