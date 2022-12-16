import tmi from 'tmi.js'
import env from './env'
import chatCommand from './botCommand'
import redeemsFunctions from './channelRedeems'

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
client.on('message', (channel, userstate, message, self) => {

	if(self) return
	
	chatCommand.fockYou(channel, userstate, message, client)
	chatCommand.website(channel, userstate, message, client)
})

//Redeem Listener
client.on('redeem', (channel, userstate, message, self) => {

	redeemsFunctions.adicioneMinhaMusica(channel, self, client)
})