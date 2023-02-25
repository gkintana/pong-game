import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
import { getVhProperty } from "./utils.js"
import { getVhUnits } from "./utils.js"

const ball = new Ball(document.getElementById("ball"))
const leftPaddle = new Paddle(document.getElementById("player1-paddle"))
const leftScore = document.getElementById("player1-score")
const rightPaddle = new Paddle(document.getElementById("player2-paddle"))
const rightScore = document.getElementById("player2-score")
const winningPoint = 1

let previousTime

function gameLoop(currentTime) {
	updateDisplayProperty("start-message", "end-message", "none")
	document.removeEventListener("keydown", waitForKeyEvent)

	if (previousTime != null) {
		const diff = currentTime - previousTime
		ball.update(diff, [leftPaddle.rect(), rightPaddle.rect()])
		rightPaddle.update(diff, ball.y)
	}

	if (isRallyFinished()) {
		addPointToWinner()
		resetGameObjects()

		if (getScore(leftScore) >= winningPoint || getScore(rightScore) >= winningPoint) {
			updateDisplayProperty("start-message", "end-message", "flex")
			updateEndMessage(getWinner())
			previousTime = null
			document.addEventListener("keydown", waitForKeyEvent)
			return
		} else {
			ball.reset()
		}
	}

	previousTime = currentTime
	window.requestAnimationFrame(gameLoop)
}

function updateDisplayProperty(startMessageId, endMessageId, value) {
	var startMessage = document.getElementById(startMessageId)
	var endMessage = document.getElementById(endMessageId)
	startMessage.style.display = endMessage.style.display = value
}

function getWinner() {
	return "Player " + (getScore(leftScore) >= winningPoint ? "1" : "2") + " Wins!"
}

function updateEndMessage(message) {
	var endMessage = document.getElementById("end-message")
	endMessage.innerHTML = message
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

function waitForKeyEvent(event) {
	if (event.keyCode) {
		resetScore()
		gameLoop()
	}
}

document.addEventListener("keydown", waitForKeyEvent)

document.addEventListener("mousemove", element => {
	leftPaddle.position = (element.y / window.innerHeight) * 100

	if (leftPaddle.rect().top <= getVhProperty("score")) {
		leftPaddle.position = getVhUnits("score") + (getVhUnits("player1-paddle") / 2)
	} else if (leftPaddle.rect().bottom >= window.innerHeight) {
		leftPaddle.position = 100 - (getVhUnits("player1-paddle") / 2)
	}
})
