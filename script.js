import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
import { checkPaddlePosition } from "./utils.js"

const ball = new Ball(document.getElementById("ball"))
const leftPaddle = new Paddle(document.getElementById("player1-paddle"))
const rightPaddle = new Paddle(document.getElementById("player2-paddle"))
const leftScore = document.getElementById("player1-score")
const rightScore = document.getElementById("player2-score")
const winningPoint = 1

let previousTime = null

function gameLoop(currentTime) {
	updateDisplayProperty("start-message", "end-message", "none")
	updateEventListeners("start")

	updateGameObjects(currentTime)
	if (isRallyFinished()) {
		addPointToWinner()
		resetGameObjects()

		if (getScore(leftScore) >= winningPoint || getScore(rightScore) >= winningPoint) {
			return endGameLoop()
		}
		ball.reset()
	}
	previousTime = currentTime
	window.requestAnimationFrame(gameLoop)
}

function updateGameObjects(currentTime) {
	if (previousTime != null) {
		const diff = currentTime - previousTime
		ball.update(diff, [leftPaddle.rect(), rightPaddle.rect()])
		rightPaddle.update(diff, ball.y)
	}
}

function updateEventListeners(option) {
	if (option == "start") {
		document.removeEventListener("keydown", waitForKeyEvent)
		document.addEventListener("mousemove", trackMouse)
	} else if (option == "end") {
		document.removeEventListener("mousemove", trackMouse)
		document.addEventListener("keydown", waitForKeyEvent)
	}
}

function endGameLoop() {
	previousTime = null
	updateEndMessage(getWinner())
	updateDisplayProperty("start-message", "end-message", "flex")
	updateEventListeners("end")
}

function updateDisplayProperty(startMessageId, endMessageId, value) {
	var startMessage = document.getElementById(startMessageId)
	var endMessage = document.getElementById(endMessageId)
	startMessage.style.display = endMessage.style.display = value
}

function getWinner() {
	var n = getScore(leftScore) > getScore(rightScore) ? "1" : "2"
	return "Player " + n + " Wins!"
}

function updateEndMessage(message) {
	var endMessage = document.getElementById("end-message")
	endMessage.innerHTML = message
}

function isRallyFinished() {
	const rect = ball.rect();
	return rect.right >= window.innerWidth || rect.left <= 0
}

function increment(elementId) {
	elementId.textContent = parseInt(elementId.textContent) + 1
}

function addPointToWinner() {
	const rect = ball.rect()
	rect.right >= window.innerWidth ? increment(leftScore) : increment(rightScore)
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

function trackMouse(event) {
	leftPaddle.position = (event.y / window.innerHeight) * 100
	checkPaddlePosition(leftPaddle)
}

document.addEventListener("keydown", waitForKeyEvent)
