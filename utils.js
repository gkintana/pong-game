export function getVhProperty(elementId) {
	const object = document.getElementById(elementId)
	const objectStyle = window.getComputedStyle(object)
	return parseFloat(objectStyle.getPropertyValue("height"))
}

function getVhUnits(elementId) {
	return getVhProperty(elementId) / window.innerHeight * 100
}

export function checkPaddlePosition(paddle) {
	if (paddle.rect().top <= getVhProperty("score")) {
		paddle.position = getVhUnits("score") + (getVhUnits("player1-paddle") / 2)
	} else if (paddle.rect().bottom >= window.innerHeight) {
		paddle.position = 100 - (getVhUnits("player1-paddle") / 2)
	}
}
