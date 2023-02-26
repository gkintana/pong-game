import { getVhProperty } from "./utils.js"

const INITIAL_VELOCITY = 0.02
const VELOCITY_INCREMENT = 0.00001
const MAX_VELOCITY = 0.175

let side = 0

export default class Ball {
	constructor(ballElement) {
		this.ballElement = ballElement
		this.reset()
	}

	get x() {
		return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"))
	}

	set x(coordinate) {
		this.ballElement.style.setProperty("--x", coordinate)
	}

	get y() {
		return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"))
	}

	set y(coordinate) {
		this.ballElement.style.setProperty("--y", coordinate)
	}

	rect() {
		return this.ballElement.getBoundingClientRect()
	}

	reset() {
		this.x = 50
		this.y = 50
		this.direction = {
			x: 0,
			y: 0
		}
		this.velocity = INITIAL_VELOCITY
		this.collisionX = false
		side = 0

		while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
			const heading = randomNumberFrom(0, 2 * Math.PI)
			this.direction = {
				x: Math.cos(heading),
				y: Math.sin(heading)
			}
		}
	}

	update(diff, paddleSurface) {
		console.log(this.collisionX)
		this.x += this.direction.x * this.velocity * diff
		this.y += this.direction.y * this.velocity * diff
		if (this.velocity < MAX_VELOCITY) {
			this.velocity += VELOCITY_INCREMENT * diff
		}

		if (this.collisionX && (side < 50 && this.x > 50) || (side > 50 && this.x < 50)) {
			this.collisionX = false
		}

		const rect = this.rect()
		if (rect.bottom >= window.innerHeight || rect.top <= getVhProperty("score")) {
			this.direction.y *= -1
		}

		if (!this.collisionX && paddleSurface.some(paddle => isCollided(paddle, rect))) {
			this.direction.x *= -1
			this.collisionX = true
			side = this.x;
		}
	}
}

function randomNumberFrom(min, max) {
	return Math.random() * (max - min) + min
}

function isCollided(paddleSurface, ball) {
	return paddleSurface.left <= ball.right &&
	       paddleSurface.right >= ball.left &&
	       paddleSurface.top <= ball.bottom &&
	       paddleSurface.bottom >= ball.top
}
