// Converts px to rem.
//
// Ex:
//
// rem(16) -> "1rem"
//
export default function rem(px) {
	const n = px / 16
	return n + "rem"
}
