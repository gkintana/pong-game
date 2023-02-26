function increment(elementId) {
	elementId.textContent = parseInt(elementId.textContent) + 1
}

export function addPointToWinner(rect, leftScore, rightScore) {
	rect.right >= window.innerWidth ? increment(leftScore) : increment(rightScore)
}

export function get(elementId) {
	return parseInt(elementId.textContent)
}

export function getWinner(leftScore, rightScore) {
	var n = get(leftScore) > get(rightScore) ? "1" : "2"
	return "Player " + n + " Wins!"
}

export function resetScore(leftScore, rightScore) {
	leftScore.textContent = 0
	rightScore.textContent = 0
}
