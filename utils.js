export function getVhProperty(elementId) {
	const object = document.getElementById(elementId)
	const objectStyle = window.getComputedStyle(object)
	return parseFloat(objectStyle.getPropertyValue("height"))
}

export function getVhUnits(elementId) {
	return getVhProperty(elementId) / window.innerHeight * 100
}
