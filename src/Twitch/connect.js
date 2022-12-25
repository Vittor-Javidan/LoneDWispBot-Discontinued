import tmi from 'tmi.js'
import env from '../env'

const options = {
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: env.BOT_NAME,
		password: `oauth:${env.CLIENT_SECRET}`,
	},
	channels: [env.CHANNEL_NAME],
}
const client = new tmi.client(options)
client.connect()

export default client