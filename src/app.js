import client from './connect'
import errorHandler from './errorHandler'
import rewardListeners from './Listeners/rewardListeners.js'
import chatListeners from './Listeners/chatListeners.js'

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