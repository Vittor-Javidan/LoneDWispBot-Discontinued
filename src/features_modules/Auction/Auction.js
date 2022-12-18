import tmi from 'tmi.js'
import env from '../../env'

export default class Auction {
	static auctions = []

	item
	minutes
	channel
	client
	participants = {}
	date = new Date()

	/**
	 * @param {string} item
	 * @param {number} minutes
	 * @param {string} channel
	 * @param {tmi.Client} client
	 */
	constructor(item, minutes, channel, client) {
		this.item = item
		this.minutes = minutes
		this.channel = channel
		this.client = client
	}

	/**
	 * @param {{
	 * 	   item: string,
	 * 	   minutes: number,
	 *     channel: string,
	 *     client: tmi.Client
	 * }} object
	 */
	static init({ item, minutes, channel, client }) {
		if (Auction.auctions.length > 1) {
			client.say(channel, `Já há um leilão em andamento`)
			return
		}

		const auction = new Auction(item, minutes, channel, client)
		this.auctions.push(auction)
		auction.startAuction()
	}

	startAuction() {
		this.client.say(
			this.channel,
			`LEILÃO DE UM ${this.item.toUpperCase()} COMEÇOU E ACABA EM ${String(
				this.minutes
			).toUpperCase()} MINUTOS!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
		)
		this.startTimer()
	}

	startTimer() {
		const timer = setInterval(() => {
			timeAlert(this.item, this.minutes, this.channel, this.client)
			//TODO: Convert the logics to seconds
			if (this.minutes > 0) {
				this.minutes--
			} else {
				clearInterval(timer)
				const winner = this.getRank()[0]
				this.client.say(
					this.channel,
					`THE WINNER IS ${winner.name} WITH ${winner.score} POINTS!!!`
				)
				Auction.auctions = []
			}
		}, 60000) // runs every minute
	}

	/**
	 * @param {string} channel
	 * @param {string} username
	 * @param {tmi.Client} client
	 * @param {number} bidValue
	 */
	bid(channel, username, client, bidValue) {
		// User bid temporary database
		if (this.participants.hasOwnProperty(username)) {
			this.participants[username] += bidValue
		} else {
			this.participants[username] = bidValue
		}

		//Adds 1 minute if it's about to finish
		if (this.minutes === 1) {
			this.minutes++
			client.say(channel, `Mais 1 minuto adicionado ao Leilão (${this.item})`)
		}

		//User feedback
		if (username !== env.channelName) {
			client.whisper(
				username,
				`${this.item} - Lance de ${bidValue} pontos em ${ this.item }, dia: ${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()} ${this.date.getHours()}:${this.date.getMinutes()}`
			)
		}
	}

	getRank() {
		const sortedArray = []
		for (const name in this.participants) {
			sortedArray.push({
				name: name,
				score: this.participants[name],
			})
		}

		sortedArray.sort((a, b) => {
			return b.score - a.score
		})
		return sortedArray
	}

	/**
	 * @returns {Auction}
	 */
	static getInstance() {
		return Auction.auctions[0]
	}
}

/**
 * @param {string} item
 * @param {number} minutes
 * @param {string} channel
 * @param {tmi.Client} client
 */
function timeAlert(item, minutes, channel, client) {
	switch (minutes) {
		case 50:
			client.say(
				channel,
				`FALTA 50 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 40:
			client.say(
				channel,
				`FALTA 40 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 30:
			client.say(
				channel,
				`FALTA 30 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 20:
			client.say(
				channel,
				`FALTA 20 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 10:
			client.say(
				channel,
				`FALTA 10 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 5:
			client.say(
				channel,
				`FALTA 5 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 4:
			client.say(
				channel,
				`FALTA 4 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 3:
			client.say(
				channel,
				`FALTA 3 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 2:
			client.say(
				channel,
				`FALTA 2 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 1:
			client.say(
				channel,
				`FALTA 1 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break
	}
}
