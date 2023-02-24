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
		ball.updateFrame(diff)
		// leftPaddle.updateFrame(diff, ball.y)
		rightPaddle.updateFrame(diff, ball.y)
	}

	if (isRallyFinished()) {
		addPointToWinner()
		ball.reset()
	}

	previousTime = currentTime
	window.requestAnimationFrame(updateFrame)
}

function addPointToWinner() {
	const rect = ball.rect()
	rect.right >= window.innerWidth ? leftScore.textContent = parseInt(leftScore.textContent) + 1 :
	                                  rightScore.textContent = parseInt(rightScore.textContent) + 1
}

function isRallyFinished() {
	const rect = ball.rect();
	return rect.right >= window.innerWidth || rect.left <= 0
}

document.addEventListener("mousemove", element => {
	leftPaddle.position = (element.y / window.innerHeight) * 100
})

window.requestAnimationFrame(updateFrame)
