import styled from "styled-components"

// https://tailwindcss.com/docs/font-smoothing#subpixel-antialiasing
export const Antialiased = styled.div`
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
`

// https://tailwindcss.com/docs/font-smoothing#grayscale-antialiasing
export const Unantialiased = styled.div`
	-webkit-font-smoothing: auto;
	-moz-osx-font-smoothing: auto;
`
