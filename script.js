import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
import { getVhProperty } from "./utils.js"
import { getVhUnits } from "./utils.js"

const ball = new Ball(document.getElementById("ball"))
const leftPaddle = new Paddle(document.getElementById("player1-paddle"))
const leftScore = document.getElementById("player1-score")
const rightPaddle = new Paddle(document.getElementById("player2-paddle"))
const rightScore = document.getElementById("player2-score")
const winningPoint = 2

let previousTime

function gameLoop(currentTime) {
	updateStartScreen("none")
	document.removeEventListener("keydown", waitForKeyPress)

	if (previousTime != null) {
		const diff = currentTime - previousTime
		ball.update(diff, [leftPaddle.rect(), rightPaddle.rect()])
		rightPaddle.update(diff, ball.y)
	}

	if (isRallyFinished()) {
		addPointToWinner()
		resetGameObjects()

		if (getScore(leftScore) >= winningPoint || getScore(rightScore) >= winningPoint) {
			updateStartScreen("flex")
			resetScore()
			previousTime = null
			document.addEventListener("keydown", waitForKeyPress)
			return
		} else {
			ball.reset()
		}
	}

	previousTime = currentTime
	window.requestAnimationFrame(gameLoop)
}

function updateStartScreen(value) {
	var startScreen = document.getElementById("start-screen")
	startScreen.style.display = value
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

function resetGameObjects() {
	ball.reset()
	leftPaddle.reset()
	rightPaddle.reset()
}

function resetScore() {
	leftScore.textContent = 0
	rightScore.textContent = 0
}

function getScore(elementId) {
	return parseInt(elementId.textContent)
}

function waitForKeyPress(event) {
	if (event.keyCode === 13) {
		gameLoop()
	}
}

document.addEventListener("keydown", waitForKeyPress)

document.addEventListener("mousemove", element => {
	leftPaddle.position = (element.y / window.innerHeight) * 100

	if (leftPaddle.rect().top <= getVhProperty("score")) {
		leftPaddle.position = getVhUnits("score") + (getVhUnits("player1-paddle") / 2)
	} else if (leftPaddle.rect().bottom >= window.innerHeight) {
		leftPaddle.position = 100 - (getVhUnits("player1-paddle") / 2)
	}
})
