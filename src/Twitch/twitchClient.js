import client from './connect'
import errorHandler from './errorHandler'
import chatListeners from './Listeners/chatListeners'
import rewardListeners from './Listeners/rewardListeners'
import whisperListeners from './Listeners/whisperListeners'

/**
 * Initialize twitch Client
 */
export default function twitchClient() {

	client.on('message', (channelName, userstate, message) => {

		const data = {
			userName: userstate.username,
			rewardIdentifier: userstate['custom-reward-id'],
			message: message
		}

		//Uncomment this to see wich rewards is being selected
		//console.log(data.rewardIdentifier)

		try {
			chatListeners(data)
			rewardListeners(data)

		} catch(err) {
			errorHandler(err, data)
		}
	})

	client.on('whisper', (from, userstate, message) => {

		const data = {
			userName: from.slice(1), //the string 'from' always come with a '#' on index 0
			message: message
		}

		try {
			whisperListeners(data)
		} catch (err) {
			errorHandler(err, data)
		}
	}) 
}