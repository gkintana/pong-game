import Ball from "./Ball.js"

const ball = new Ball(document.getElementById("ball"))

let previousTime

function updateFrame(currentTime) {
	if (previousTime != null) {
		const diff = currentTime - previousTime
		ball.updateFrame(diff)
	}
	previousTime = currentTime
	window.requestAnimationFrame(updateFrame)
}

window.requestAnimationFrame(updateFrame)
