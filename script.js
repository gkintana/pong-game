import Ball from "./Ball.js"
import Paddle from "./Paddle.js"
import { checkPaddlePosition } from "./utils.js"
import * as score from "./score.js"

const ball = new Ball(document.getElementById("ball"))
const leftPaddle = new Paddle(document.getElementById("player1-paddle"))
const rightPaddle = new Paddle(document.getElementById("player2-paddle"))
var leftScore = document.getElementById("player1-score")
var rightScore = document.getElementById("player2-score")
var maxPoints = 2
var previousTime = null

function gameLoop(currentTime) {
	updateDisplayProperty("start-message", "end-message", "none")
	updateEventListeners("start")
	updateGameObjects(currentTime)
	checkRally()
	if (isGameOver()) {
		return endGameLoop()
	}
	previousTime = currentTime
	window.requestAnimationFrame(gameLoop)
}

function updateDisplayProperty(startMessageId, endMessageId, value) {
	var startMessage = document.getElementById(startMessageId)
	var endMessage = document.getElementById(endMessageId)
	startMessage.style.display = endMessage.style.display = value
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

function updateGameObjects(currentTime) {
	if (previousTime != null) {
		const diff = currentTime - previousTime
		ball.update(diff, [leftPaddle.rect(), rightPaddle.rect()])
		rightPaddle.update(diff, ball.y)
	}
}

function checkRally() {
	if (isRallyFinished(ball.rect())) {
		score.addPointToWinner(ball.rect(), leftScore, rightScore)
		resetGameObjects()
	}
}

function isGameOver() {
	return score.get(leftScore) >= maxPoints || score.get(rightScore) >= maxPoints
}

function endGameLoop() {
	previousTime = null
	updateEndMessage(score.getWinner(leftScore, rightScore))
	updateDisplayProperty("start-message", "end-message", "flex")
	updateEventListeners("end")
}

function updateEndMessage(message) {
	var endMessage = document.getElementById("end-message")
	endMessage.innerHTML = message
}

function isRallyFinished(rect) {
	return rect.right >= window.innerWidth || rect.left <= 0
}

function resetGameObjects() {
	ball.reset()
	leftPaddle.reset()
	rightPaddle.reset()
}

function waitForKeyEvent(event) {
	if (event.keyCode) {
		score.resetScore(leftScore, rightScore)
		gameLoop()
	}
}

function trackMouse(event) {
	leftPaddle.position = (event.y / window.innerHeight) * 100
	checkPaddlePosition(leftPaddle)
}

document.addEventListener("keydown", waitForKeyEvent)
