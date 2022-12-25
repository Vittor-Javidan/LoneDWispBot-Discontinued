/* 
	Credits to 'KIRUPA' youtube channel
	tutorial video: "Accessing Your Webcam in HTML"
*/

let video = document.querySelector('#webcam');

if(navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: { width:500, height: 500 } })
		.then(function (stream) { video.srcObject = stream })
		.catch(function (error) { console.log('something went wrong') })
} else {
	console.log('getUserMedia not supported!')
}