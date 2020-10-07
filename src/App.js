import React from "react"
// import styled from "styled-components"

// https://stackoverflow.com/a/39914235
function sleep(forMs) {
	return new Promise(resolve => setTimeout(resolve, forMs))
}

const CONTENT_WIDTH_PX = 768

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

// Ex:
//
// <div><br /></div> -> <div></div>
//
function removeAll(element) {
	while (element.lastChild) {
		element.lastChild.remove()
	}
}

// Ex:
//
// ["Hello, world!"] -> ["Hello,"]
//
async function computeLine(element, wordArr) {
	const lineArr = []

	element.append(document.createElement("br"))
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

	removeAll(element)
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
	for (let wcount = 0; wcount < wordArr.length - 1; wcount += lineArr.length) {
		removeAll(element)
		lineArr = await computeLine(element, wordArr.slice(wcount))
		linesArr.push(lineArr)
	}

	removeAll(element)
	return linesArr.map(each => each.join(" "))
}

// --------------------

function useRequestAnimationFrame(callback) {
	React.useLayoutEffect(() => {
		const id = window.requestAnimationFrame(callback)
		return () => {
			window.cancelAnimationFrame(id)
		}
	}, [callback])
}

export default function App() {
	const [lines, setLines] = React.useState(null)

	useRequestAnimationFrame(
		React.useCallback(() => {
			// measureElement = document.getElementById("measuerer")
			// const t = Date.now()
			// const linesArr = computeLines(measureElement, inputString)
			// console.log(Date.now() - t)
			// setLines(linesArr)

			measureElement = document.getElementById("measuerer")
			async function handleAsync() {
				const linesArr = await computeLines(measureElement, inputString)
				setLines(linesArr)
			}
			handleAsync()
		}, []),
	)

	return (
		<>
			<div
				id="measuerer"
				style={{
					// visibility: "hidden",
					position: "absolute",
					// top: -1e4,
					// right: "auto",
					// bottom: "auto",
					// left: -1e4,
					width: CONTENT_WIDTH_PX,
					outline: "1px solid hsl(200, 100%, 90%)",
					userSelect: "none",
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<div style={{ padding: "96px 24px" }}>
					<article
						style={{
							width: "100%",
							maxWidth: CONTENT_WIDTH_PX + "px",
						}}
					>
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
					</article>
				</div>
			</div>
		</>
	)
}
