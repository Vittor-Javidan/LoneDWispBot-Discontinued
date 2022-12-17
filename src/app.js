import tmi from 'tmi.js'
import env from './env'
import chatCommands from './botCommands'
import features from './features'

const options = {
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: env.botName,
		password: `oauth:${env.clientSecret}`,
	},
	channels: [env.channelName],
}
const client = new tmi.client(options)

client.connect()

//Chat Listener
client.on('message', (channelName, userstate, message, self) => {
	
	chatCommands.website(channelName, userstate, message, client)

	//Broadcaster exclusive commands
	if(userstate.username === env.channelName) {
		chatCommands.leilaoChatCommand(channelName, message, self, client)
	}
})

//Redeem Listener
client.on('redeem', (channelName, userName, rewardIdentifier) => {

	try {
		console.log(rewardIdentifier)
		features.adicioneMinhaMusica(channelName, userName, rewardIdentifier, client)
		features.leilaoBid100(channelName, userName, rewardIdentifier, client)
		features.leilaoRank(channelName, userName, rewardIdentifier, client)
	} catch(err) {
		client.say(channelName, `Ocorreu um erro na recompensa resgatada de @${userName}. Id da recompensa: ${rewardIdentifier} `)
	}
})