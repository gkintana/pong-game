import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const leftPaddle = new Paddle(document.getElementById("player1-paddle"))
const leftScore = document.getElementById("player1-score")
const rightPaddle = new Paddle(document.getElementById("player2-paddle"))
const rightScore = document.getElementById("player2-score")

let previousTime

function updateFrame(currentTime) {
	if (previousTime != null) {
		const diff = currentTime - previousTime
		ball.update(diff, [leftPaddle.rect(), rightPaddle.rect()])
		rightPaddle.update(diff, ball.y)
	}

	if (isRallyFinished()) {
		addPointToWinner()
		ball.reset()
	}

	previousTime = currentTime
	window.requestAnimationFrame(updateFrame)
}

function isRallyFinished() {
	const rect = ball.rect();
	return rect.right >= window.innerWidth || rect.left <= 0
}

function increase(elementId) {
	elementId.textContent = parseInt(elementId.textContent) + 1
}

function addPointToWinner() {
	const rect = ball.rect()
	rect.right >= window.innerWidth ? increase(leftScore) : increase(rightScore)
}

document.addEventListener("mousemove", element => {
	leftPaddle.position = (element.y / window.innerHeight) * 100
})

window.requestAnimationFrame(updateFrame)
