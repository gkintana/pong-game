const PADDLE_SPEED = 0.015

export default class Paddle {
	constructor(paddleElement) {
		this.paddleElement = paddleElement
		this.reset()
	}

	get position() {
		return parseFloat(getComputedStyle(this.paddleElement).getPropertyValue("--position"))
	}

	set position(coordinate) {
		this.paddleElement.style.setProperty("--position", coordinate)
	}

	reset() {
		this.position = 50
	}

	updateFrame(diff, ballHeight) {
		this.position += PADDLE_SPEED * diff * (ballHeight - this.position)
	}
}