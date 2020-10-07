import React from "react"
import styled from "styled-components"

const SelectionWrapper = styled.div`
	pointer-events: none;
	user-select: none;
`

const Selection = styled.span`
	display: inline-block;
	background-color: hsla(200, 100%, 50%, 0.25);
`

export default function App() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<div style={{ padding: "96px 24px" }}>
				<article>
					{/**/}

					<div style={{ position: "relative" }}>
						<SelectionWrapper style={{ position: "absolute" }}>
							<span style={{ visibility: "hidden" }}>Occaecat ad&nbsp;</span>
							<Selection>
								officia ullamco occaecat do dolor sit enim culpa eiusmod ipsum. Culpa anim pariatur labore&nbsp;
							</Selection>
						</SelectionWrapper>
						Occaecat ad officia ullamco occaecat do dolor sit enim culpa eiusmod ipsum. Culpa anim pariatur labore&nbsp;
					</div>
					<div style={{ position: "relative" }}>
						<SelectionWrapper style={{ position: "absolute" }}>
							<Selection>
								ullamco irure. Excepteur consectetur aliqua voluptate magna officia ad elit proident cillum.
								Proident&nbsp;
							</Selection>
						</SelectionWrapper>
						ullamco irure. Excepteur consectetur aliqua voluptate magna officia ad elit proident cillum. Proident&nbsp;
					</div>
					<div style={{ position: "relative" }}>
						<SelectionWrapper style={{ position: "absolute" }}>
							<Selection>
								nostrud ex ex sit reprehenderit. Et ngure culpa tempor amet Lorem non irure. Do sit pariatur duis
								officia&nbsp;
							</Selection>
						</SelectionWrapper>
						nostrud ex ex sit reprehenderit. Et ngure culpa tempor amet Lorem non irure. Do sit pariatur duis
						officia&nbsp;
					</div>
					<div style={{ position: "relative" }}>
						<SelectionWrapper style={{ position: "absolute" }}>
							<Selection>
								fugiat incididunt nostrud qui quis pariatur esse occaecat. Cillum aliquip cupidatat occaecat cillum
								minim&nbsp;
							</Selection>
						</SelectionWrapper>
						fugiat incididunt nostrud qui quis pariatur esse occaecat. Cillum aliquip cupidatat occaecat cillum
						minim&nbsp;
					</div>
					<div style={{ position: "relative" }}>
						<SelectionWrapper style={{ position: "absolute" }}>
							<Selection>laborum non aliqua exercitation sunt ad mollit&nbsp;</Selection>
							<span style={{ visibility: "hidden" }}>pariatur ea.&nbsp;</span>
						</SelectionWrapper>
						laborum non aliqua exercitation sunt ad mollit pariatur ea.&nbsp;
					</div>

					{/**/}
				</article>
			</div>
		</div>
	)
}
