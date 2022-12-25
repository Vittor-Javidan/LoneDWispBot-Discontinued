/* 
	Credits to 'KIRUPA' youtube channel
	tutorial video: "Accessing Your Webcam in HTML"
*/

let video = document.querySelector('#webcam');
let videoContainer = document.querySelector('#webcam-container')

if(navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: { width:500, height: 500 } })
		.then(function (stream) { video.srcObject = stream })
		.catch(function (error) { console.log('something went wrong') })
} else {
	console.log('getUserMedia not supported!')
}

// Get the video element and the two buttons
const invertButton = document.getElementById('invert-button');
const hideButton = document.getElementById('hide-button');

// Add click event listener to the invert button
invertButton.addEventListener('click', () => {

    // Check if the video is currently inverted
    if (video.style.transform === 'rotateY(180deg)') {
        // If it is, reset the transform to its original state
        video.style.transform = 'none';
    } else {
        // If it is not, rotate the video 180deg
        video.style.transform = 'rotateY(180deg)';
    }
});

// Add click event listener to the hide button
hideButton.addEventListener('click', () => {

    // Check if the video is currently hidden
    if (videoContainer.style.display === 'none') {
    // If it is, show the video
    videoContainer.style.display = 'block';
    } else {
    // If it is not, hide the video
    videoContainer.style.display = 'none';
    }
});