import tmi from 'tmi.js'
import env from './env'

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

export default client