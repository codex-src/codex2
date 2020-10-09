import styled from "styled-components"

export const Relative = styled.div`
	position: relative;
`

export const Absolute = styled.div`
	position: absolute;
	top: ${({ top }) => (!top ? "auto" : 0)};
	right: ${({ right }) => (!right ? "auto" : 0)};
	bottom: ${({ bottom }) => (!bottom ? "auto" : 0)};
	left: ${({ left }) => (!left ? "auto" : 0)};
`
