import sendChatMessage from '../../../sendMessageHandler'

/** ====================================================
 * Sends a feedback whisper message to the viewer
 * 
 * @param {object} data
 * @param {string} data.userName
 */
function viewerMusicSugestion(data) {
	sendChatMessage(
		`/w ${data.userName} Assim que possível eu pessoalmente irei escutar sua música em off.
		Irei adiciona-la caso combine com a playlist do canal.`
	)
}

const musicRewardListeners = {
	viewerMusicSugestion
}

export default musicRewardListeners