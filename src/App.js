import React from "react"
// import styled from "styled-components"

// // https://stackoverflow.com/a/39914235
// function sleep(forMs) {
// 	return new Promise(resolve => setTimeout(resolve, forMs))
// }

const CONTENT_WIDTH_PX = 768

// --------------------

let measureElement = null

const rawStr =
	"Occaecat ad officia ullamco occaecat do dolor sit enim culpa eiusmod ipsum. Culpa anim pariatur labore ullamco irure. Excepteur consectetur aliqua voluptate magna officia ad elit proident cillum. Proident nostrud ex ex sit reprehenderit. Et nostrud ea occaecat aute occaecat irure culpa tempor amet Lorem non irure. Do sit pariatur duis officia fugiat incididunt nostrud qui quis pariatur esse occaecat. Cillum aliquip cupidatat occaecat cillum minim laborum non aliqua exercitation sunt ad mollit pariatur ea."

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
function computeLine(element, wordArr) {
	const lineArr = []

	element.append(document.createElement("br"))
	const initialHeight = element.getBoundingClientRect().height
	removeAll(element)

	element.appendChild(document.createTextNode(""))
	for (let x = 0; x < wordArr.length; x++) {
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
function computeLines(element, str) {
	let linesArr = []

	const wordArr = wordBreaker(str)

	let lineArr = []
	for (let wcount = 0; wcount < wordArr.length; wcount += lineArr.length) {
		removeAll(element)
		lineArr = computeLine(element, wordArr.slice(wcount))
		linesArr.push(lineArr)
	}

	removeAll(element)
	return linesArr.map(each => each.join(" "))
}

// --------------------

export default function App() {
	const [value, setValue] = React.useState(rawStr)

	const [lines, setLines] = React.useState(null)

	React.useLayoutEffect(() => {
		const id = window.requestAnimationFrame(() => {
			measureElement = document.getElementById("measuerer")
			const linesArr = computeLines(measureElement, value)
			setLines(linesArr)
		})
		return () => {
			window.cancelAnimationFrame(id)
		}
	}, [value])

	return (
		<>
			<div
				id="measuerer"
				style={{
					position: "absolute",
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
					<article style={{ width: CONTENT_WIDTH_PX }}>
						<div style={{ outline: "1px solid hsl(200, 100%, 90%)" }}>
							<textarea
								type="text"
								style={{
									width: "100%",
									height: 128,
								}}
								value={value}
								onChange={e => {
									setValue(e.target.value)
								}}
							/>
						</div>

						<br />
						<div style={{ outline: "1px solid hsl(200, 100%, 90%)" }}>
							{lines &&
								lines.map((each, x) => (
									<div key={x} style={{ position: "relative" }}>
										<div
											style={{
												position: "absolute",
												width: "100%",
												height: "100%",
												outline: "1px solid hsl(0, 100%, 90%)",
											}}
										/>
										{each}
									</div>
								))}
						</div>
					</article>
				</div>
			</div>
		</>
	)
}
