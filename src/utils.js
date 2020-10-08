import styled from "styled-components"

export const Center = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`

export const Relative = styled.div`
	position: relative;
`

export const Absolute = styled.div`
	position: absolute;
	top: ${props => (!props.top ? "auto" : 0)};
	right: ${props => (!props.right ? "auto" : 0)};
	bottom: ${props => (!props.bottom ? "auto" : 0)};
	left: ${props => (!props.left ? "auto" : 0)};
`
