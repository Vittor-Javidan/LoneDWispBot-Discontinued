import env from '../env'
import client from './connect'
import errorHandler from './errorHandler'
import chatListeners from './Listeners/chatListeners'
import rewardListeners from './Listeners/rewardListeners'
import whisperListeners from './Listeners/whisperListeners'
import sendMessage from './sendMessageHandler'

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

		if(userstate.username === env.TWITCH.BROADCASTER_NAME && message.toLowerCase().startsWith('!timer')) {
			sendMessage(`Conheça a versão alpha do novo jogo do canal CHATSOULS!!! Para começar a jogar basta escrever "!chatsouls start". Você receberá novas instruções por sussuros pela twitch (づ｡◕‿‿◕｡)づ ✧.`)
			const timerMessage = message.split(' ')
			chatTimer(timerMessage[1])
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

function chatTimer(message){
	setInterval(() => {
		sendMessage(`Conheça a versão alpha do novo jogo do canal CHATSOULS!!! Para começar a jogar basta escrever "!chatsouls start". Você receberá novas instruções por sussuros pela twitch (づ｡◕‿‿◕｡)づ ✧.`)
	}, 1000 * 60 * 15) //15 minutes
}