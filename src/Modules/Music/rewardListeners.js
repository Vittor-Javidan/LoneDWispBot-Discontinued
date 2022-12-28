import env from "../../env"
import sendMessage from "../../Twitch/sendMessageHandler"

/** ====================================================
 * Sends a feedback whisper message to the viewer
 * 
 * @param {string} userName
 */
function viewerMusicSugestion(userName) {
	sendMessage(
		`/w ${userName} Assim que possível eu pessoalmente irei escutar sua música em off.
		Irei adiciona-la caso combine com a playlist do canal.`
	)
}

/**
 * Music module reward handler
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @param {string} data.rewardIdentifier - The identifier for the reward that was redeemed
 */
export default function musicRewardListeners(data){

	const {userName, message, rewardIdentifier} = data
	const musicRewardIds = env.TWITCH.MODULES.MUSIC.REWARDS_IDs

	switch (rewardIdentifier) {
		case musicRewardIds.PLAYLIST_MUSIC_SUGESTION: viewerMusicSugestion(userName); break
	}
}