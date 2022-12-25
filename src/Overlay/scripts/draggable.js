const body = document.getElementById('body')
const widgets = document.querySelectorAll('.widget')

//Makes all widgets draggable
widgets.forEach(widget => {
    makeDraggable(widget)
});

/** ====================================================
 * Makes the given container element draggable by adding event listeners to handle dragging.
 * 
 * @param {HTML_Element} child - The container element to make draggable.
 * @returns {void}
 * 
 * @warning 1 - If the container element does not have a direct "relative-absolute" position style relation with its parent element, it does not throws an error, but the draggable behavior will be weird.
 * @warning 2 - The child can have weird behavior if margin is being apply to it.
 */
function makeDraggable(child) {

	// get the current position of the element
	let currentX = 0
	let currentY = 0

	// flag to track whether the element is being dragged
	let isDragging = false

	// add event listeners to the element to handle dragging
	child.addEventListener('mousedown', onMouseDown)
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

            // set the child new position
            child.style.top = `${child.offsetTop + offsetY}px`
            child.style.left = `${child.offsetLeft + offsetX}px`

            // store the current position of the element
            currentX = e.clientX
            currentY = e.clientY
        }
	}
}