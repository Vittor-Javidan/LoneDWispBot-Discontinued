import tmi from 'tmi.js'
import env from '../env'

const options = {
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: env.TWITCH.BOT_NAME,
		password: `oauth:${env.TWITCH.CLIENT_SECRET}`,
	},
	channels: [env.TWITCH.CHANNEL_NAME],
}
const client = new tmi.client(options)
client.connect()

export default client