import React from "react"
import styled from "styled-components"

// https://stackoverflow.com/a/39914235
function sleep(forMs) {
	return new Promise(resolve => setTimeout(resolve, forMs))
}

// --------------------

const CONTENT_WIDTH_PX = 768

const Center = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`

const PaddingInset = styled.div`
	padding: 96px 24px;
`

const Document = styled.div`
	width: 100%;
	max-width: ${CONTENT_WIDTH_PX}px;
`

// --------------------

let measureElement = null

const inputString =
	"Culpa in veniam in sint reprehenderit sunt. Incididunt magna proident consequat et est consectetur aute excepteur eiusmod laborum qui. Lorem fugiat enim minim deserunt aliqua duis aliquip exercitation minim esse. Non et adipisicing magna nulla magna veniam reprehenderit in. Sint proident deserunt quis veniam Lorem duis esse elit nostrud ad culpa. Aliqua velit tempor labore mollit tempor."

// Ex:
//
// "Hello, world!" -> ["Hello,", "world!"]
//
function wordBreaker(str) {
	return str.split(" ")
}

// Iteratively removes all nested nodes from an element.
function removeAll(element) {
	while (element.lastChild) {
		element.lastChild.remove()
	}
}

// Ex:
//
// <div></div> -> <div><br /></div>
//
function appendBrElement(element) {
	element.append(document.createElement("br"))
}

// Ex:
//
// ["Hello, world!"] -> ["Hello,"]
//
async function computeLine(element, wordArr) {
	const lineArr = []

	appendBrElement(element)
	const initialHeight = element.getBoundingClientRect().height
	removeAll(element)

	element.appendChild(document.createTextNode(""))
	for (let x = 0; x < wordArr.length - 1; x++) {
		await sleep(100)
		element.lastChild.nodeValue += " " + wordArr[x]
		const currentHeight = element.getBoundingClientRect().height
		if (currentHeight / initialHeight > 1) {
			break
		}
		lineArr.push(wordArr[x])
	}

	return lineArr
}

// Ex:
//
// ["Hello, world!"] -> [["Hello,"], ["world!"]]
//
async function computeLines(element, str) {
	let linesArr = []

	const wordArr = wordBreaker(str)

	let lineArr = []
	for (let count = 0; count < wordArr.length - 1; count += lineArr.length) {
		removeAll(element)
		lineArr = await computeLine(element, wordArr.slice(count))
		linesArr.push(lineArr)
	}

	removeAll(element)
	return linesArr.map(each => each.join(" "))
}

export default function App() {
	const [lines, setLines] = React.useState(null)

	React.useEffect(() => {
		measureElement = document.getElementById("measuerer")
		async function handleAsync() {
			setLines(await computeLines(measureElement, inputString))
		}
		handleAsync()
	}, [])

	return (
		<>
			<div
				id="measuerer"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: CONTENT_WIDTH_PX,
					outline: "1px solid hsl(200, 100%, 90%)",
				}}
			/>
			<Center>
				<PaddingInset>
					<Document style={{ position: "relative" }}>
						<div
							style={{
								// position: "absolute",
								// top: 0,
								// right: 0,
								// bottom: "auto",
								// left: 0,
								width: CONTENT_WIDTH_PX,
								outline: "1px solid hsl(200, 100%, 90%)",
							}}
						>
							{inputString}
						</div>

						<br />
						<div style={{ outline: "1px solid hsl(200, 100%, 90%)" }}>
							{lines &&
								lines.map((each, x) => (
									<p key={x} style={{ outline: "1px solid hsl(200, 100%, 90%)" }}>
										{each}
									</p>
								))}
						</div>
					</Document>
				</PaddingInset>
			</Center>
		</>
	)
}
