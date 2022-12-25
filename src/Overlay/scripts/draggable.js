const body = document.getElementById('body')

const widgets = document.querySelectorAll('.widget')

widgets.forEach(widget => {
    makeDraggable({parent: body, element: widget})
});

/**
 * @param {{element: HTML_Element, parent: HTML_Element}} object
 */
function makeDraggable({ element, parent }) {
	// get the current position of the element
	let currentX = 0
	let currentY = 0

	// flag to track whether the element is being dragged
	let isDragging = false

	// add event listeners to the element to handle dragging
	element.addEventListener('mousedown', onMouseDown)
	document.addEventListener('mouseup', onMouseUp)
	document.addEventListener('mousemove', onMouseMove)

	function onMouseDown(e) {

        // set the isDragging flag to true
        isDragging = true

        // store the current position of the element
        currentX = e.clientX
        currentY = e.clientY
	}

	function onMouseUp(e) {
		// set the isDragging flag to false
		isDragging = false
	}

	function onMouseMove(e) {
		// only move the element if the isDragging flag is set to true
		if (isDragging) {
            // calculate the offset of the element
            const offsetX = e.clientX - currentX
            const offsetY = e.clientY - currentY

            // set the element's new position
            element.style.top = `${element.offsetTop + offsetY}px`
            element.style.left = `${element.offsetLeft + offsetX}px`

            // set the element's parent new position
            parent.style.top = `${parent.offsetTop + offsetY}px`
            parent.style.left = `${parent.offsetLeft + offsetX}px`

            // store the current position of the element
            currentX = e.clientX
            currentY = e.clientY
        }
	}
}