const INITIAL_VELOCITY = 0.02
const VELOCITY_INCREMENT = 0.00001

export default class Ball {
	constructor(ballElement) {
		this.ballElement = ballElement
		this.reset()
	}

	get x() {
		return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--x"))
	}

	get y() {
		return parseFloat(getComputedStyle(this.ballElement).getPropertyValue("--y"))
	}

	set x(position) {
		this.ballElement.style.setProperty("--x", position)
	}

	set y(position) {
		this.ballElement.style.setProperty("--y", position)
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
		
		while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
			const heading = randomNumberFrom(0, 2 * Math.PI)
			this.direction = {
				x: Math.cos(heading),
				y: Math.sin(heading)
			}
		}
		this.velocity = INITIAL_VELOCITY
	}

	updateFrame(diff) {
		this.x += this.direction.x * this.velocity * diff
		this.y += this.direction.y * this.velocity * diff
		this.velocity += VELOCITY_INCREMENT * diff

		const rect = this.rect()
		if (rect.bottom >= window.innerHeight || rect.top <= 0) {
			this.direction.y *= -1
		}
	}
}

function randomNumberFrom(min, max) {
	return Math.random() * (max - min) + min
}
